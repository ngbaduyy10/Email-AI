import { NextRequest, NextResponse } from 'next/server';
import {db} from "@/server/db";
import {emailSync} from "@/lib/email";
import {emailSyncToDb} from "@/lib/emailSyncToDb";

export const POST = async (req: NextRequest) => {
    const { accountId } = await req.json();
    const account = await db.account.findUnique({
        where: { id: accountId }
    })
    if (!account) {
        return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const response = await emailSync(account.token);
    const { emails, deltaToken } = response!;
    await emailSyncToDb(emails, accountId);

    await db.account.update({
        where: {
            token: account.token,
        },
        data: {
            nextDeltaToken: deltaToken,
        },
    });
    return NextResponse.json({ message: "Emails synced" }, { status: 200 });
}