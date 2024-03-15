import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, context: { params: any }) {
    const reviewId = context.params.slug;
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Comments");
    const firstComment = await col.findOne();
    const comments = await col.find({ review: reviewId }).toArray();
    return new Response(JSON.stringify(comments), {
        headers: { "content-type": "application/json" },
    });
}