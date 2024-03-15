import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function GET(request: Request, context: { params: any }) {
    const session = await auth();
    if (!session || !session?.user) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    const id = context.params.slug;
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const result = await col.findOne({ _id: id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}