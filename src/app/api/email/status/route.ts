import {NextRequest, NextResponse} from 'next/server'
import { db } from '@/server/db'

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams;
    const accountId = params.get("accountId");

    const inboxNum = await db.thread.count({
        where: {
            accountId: accountId!,
            inboxStatus: true,
        },
    });

    const sentNum = await db.thread.count({
        where: {
            accountId: accountId!,
            sentStatus: true,
        },
    });

    const draftNum = await db.thread.count({
        where: {
            accountId: accountId!,
            draftStatus: true,
        },
    });

    return NextResponse.json({ inboxNum, sentNum, draftNum }, { status: 200 });
}