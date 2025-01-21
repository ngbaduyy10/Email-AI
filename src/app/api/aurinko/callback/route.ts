import {auth} from "@clerk/nextjs/server";
import {NextResponse, NextRequest} from "next/server";
import {getAurinkoToken, getAccountDetails} from "@/lib/aurinko";
import {db} from "@/server/db";
import {waitUntil} from "@vercel/functions";
import axios from "axios";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = req.nextUrl.searchParams;
    const status = params.get('status');
    if (status !== 'success') {
        return NextResponse.json({ error: "Authorization failed" }, { status: 400 });
    }
    const code = params.get('code');
    const tokenResponse = await getAurinkoToken(code!);
    if (!tokenResponse) {
        return NextResponse.json({ error: "Fetch token failed" }, { status: 400 });
    }

    const accountDetails = await getAccountDetails(tokenResponse.accessToken);
    const account = await db.account.upsert({
        where: {
            userId_email: {
                userId,
                email: accountDetails.email
            }
        },
        create: {
            id: tokenResponse.accountId.toString(),
            userId,
            token: tokenResponse.accessToken,
            provider: 'Aurinko',
            email: accountDetails.email,
            name: accountDetails.name
        },
        update: {
            token: tokenResponse.accessToken,
        }
    });

    waitUntil(
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/email-sync`, {
            accountId: account.id,
        })
    )

    return NextResponse.redirect(new URL('/mail', req.url));
}