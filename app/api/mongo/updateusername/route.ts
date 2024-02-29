import { updateUserName } from "@/lib/mongoCRUD";
import { NextResponse } from "next/server";

export async function POST(req: any) {
    const { email, username } = await req.json();
    const result = await updateUserName(email, username);
    return NextResponse.json({ result });
}