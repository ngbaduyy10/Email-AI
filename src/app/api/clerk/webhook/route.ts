import {NextResponse} from "next/server";
import {db} from "@/server/db";

export const POST = async (req: Request) => {
    const { data } = await req.json();

    await db.user.upsert({
        where: { id: data.id },
        create: {
            id: data.id,
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            imageUrl: data.image_url,
        },
        update: {
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            imageUrl: data.image_url,
        }
    });

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}