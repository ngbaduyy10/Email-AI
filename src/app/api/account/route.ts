import { NextResponse, NextRequest } from 'next/server';
import {auth} from "@clerk/nextjs/server";
import {db} from "@/server/db";

export const GET = async (request : NextRequest) => {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const accounts = await db.account.findMany({
        where: {
            userId,
        },
    });

    return NextResponse.json({ data: accounts }, { status: 200 });
}