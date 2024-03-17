import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function GET(request: Request, context: { params: any }) {
    const client = await clientPromise;
    const session = await auth();
    if (!session || !session?.user) {
        return new Response(JSON.stringify({message: "Not authorized"}), {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    const email = context.params.slug;
    const db = client.db("test");
    const users = db.collection("Users");
    const user = await users.findOne({ email: email });
    return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
    });
}