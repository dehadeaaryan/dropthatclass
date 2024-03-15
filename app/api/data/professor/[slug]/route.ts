import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, context: { params: any }) {
    const client = await clientPromise;
    const id = context.params.slug;
    const db = client.db("test");
    const col = db.collection("Professors");
    const professor = await col.findOne({ _id: id });
    return new Response(JSON.stringify(professor), {
        headers: { "content-type": "application/json" },
    });
}