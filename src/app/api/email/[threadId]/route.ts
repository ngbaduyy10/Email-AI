import {NextRequest, NextResponse} from 'next/server';
import { db } from '@/server/db';

type Params = {
    threadId: string;
};

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    const threadId = params.threadId;

    const thread = await db.thread.findUnique({
        where: { id: threadId },
        include: {
            emails: {
                include: {
                    from: true,
                }
            }
        }
    });

    return NextResponse.json( { data: thread }, { status: thread ? 200 : 404 });
}