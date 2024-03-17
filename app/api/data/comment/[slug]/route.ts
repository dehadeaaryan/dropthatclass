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
    const reviewId = context.params.slug;
    const db = client.db("test");
    const col = db.collection("Comments");
    const comments = await col.find({ review: reviewId }).toArray();
    return new Response(JSON.stringify(comments), {
        headers: { "content-type": "application/json" },
    });
}