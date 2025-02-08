import {NextRequest, NextResponse} from "next/server";
import {db} from "@/server/db";

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams;
    const accountId = params.get("accountId");
    const status = params.get("status");

    let filter = {
        inboxStatus: false,
        sentStatus: false,
        draftStatus: false,
    };
    if (status === "inbox") {
        filter.inboxStatus = true;
    } else if (status === "sent") {
        filter.sentStatus = true;
    } else if (status === "draft") {
        filter.draftStatus = true;
    }

    const threads = await db.thread.findMany({
        where: {
            accountId: accountId!,
            ...filter,
        },
        orderBy: {
            lastMessageDate: "desc",
        },
        include: {
            emails: {
                include: {
                    from: true,
                }
            },
        },
    });

    return NextResponse.json({ data: threads }, { status: 200 });
}