import {NextRequest, NextResponse} from 'next/server';
import { db } from '@/server/db';

export const GET = async (req: NextRequest, { params }: { params: { accountId: string } }) => {
    const {accountId} = params;

    const account = await db.account.findUnique({
        where: { id: accountId },
    });

    return NextResponse.json( { data: account }, { status: account ? 200 : 404 });
}