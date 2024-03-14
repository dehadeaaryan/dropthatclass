import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const users = db.collection("Users");
    const user = await users.find().toArray();
    return new Response(JSON.stringify(user), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const users = db.collection("Users");
    const user = await request.json();
    const result = await users.insertOne(user);
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const users = db.collection("Users");
    const user = await request.json();
    const result = await users.updateOne({ email: user.email }, { $set: { username: user.username, university: user.university } });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function DELETE(request: Request) {
    const client = await clientPromise;
    let db = client.db("test");
    let users = db.collection("Users");
    let user = await request.json();
    let userId = await users.findOne({ email: user.email }).then((res) => res!._id);
    const result = await users.deleteOne({ email: user.email });
    let accounts = db.collection("Accounts");
    await accounts.deleteOne({ userId: userId });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}