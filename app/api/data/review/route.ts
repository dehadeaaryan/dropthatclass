import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const reviews = db.collection("Reviews");
    const review = await reviews.find().toArray();
    return new Response(JSON.stringify(review), {
        headers: { "content-type": "application/json" },
    });
}