import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, context: { params: any }) {
    const email = context.params.slug;
    const client = await clientPromise;
    const db = client.db("test");
    const users = db.collection("Users");
    const user = await users.findOne({ email: email });
    if (user) {
        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify({ message: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
}