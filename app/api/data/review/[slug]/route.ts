import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, context: { params: any }) {
    const id = context.params.slug;
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const result = await col.findOne({ _id: id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}