import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
    const client = await clientPromise;
    const keyCol = client.db("test").collection("Keys");
    const key = await keyCol.findOne({ key: request.headers.get("x-api-key") });
    if (!key) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    // const session = await auth();
    // if (!session || !session?.user) {
    //     return new Response("Not authorized", {
    //         headers: { "content-type": "application/json" },
    //         status: 401
    //     });
    // }
    const db = client.db("test");
    const col = db.collection("Comments");
    const comments = await col.find().toArray();
    return new Response(JSON.stringify(comments), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request: Request) {
    const client = await clientPromise;
    const keyCol = client.db("test").collection("Keys");
    const key = await keyCol.findOne({ key: request.headers.get("x-api-key") });
    if (!key) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    // const session = await auth();
    // if (!session || !session?.user) {
    //     return new Response("Not authorized", {
    //         headers: { "content-type": "application/json" },
    //         status: 401
    //     });
    // }
    const db = client.db("test");
    const col = db.collection("Comments");
    let req = await request.json();
    req.createdAt = new Date();
    const result = await col.insertOne(req);
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const client = await clientPromise;
    const keyCol = client.db("test").collection("Keys");
    const key = await keyCol.findOne({ key: request.headers.get("x-api-key") });
    if (!key) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    // const session = await auth();
    // if (!session || !session?.user) {
    //     return new Response("Not authorized", {
    //         headers: { "content-type": "application/json" },
    //         status: 401
    //     });
    // }
    const db = client.db("test");
    const col = db.collection("Comments");
    const req = await request.json();
    if (req.func === "report") {
        const result = await col.updateOne({ _id: req._id }, { $inc: { reports: 1 } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "edit") {
        const result = await col.updateOne({ _id: req._id }, { $set: { content: req.content } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else {
        return new Response("Invalid request", {
            headers: { "content-type": "application/json" },
        });
    }
}

export async function DELETE(request: Request) {
    const client = await clientPromise;
    const keyCol = client.db("test").collection("Keys");
    const key = await keyCol.findOne({ key: request.headers.get("x-api-key") });
    if (!key) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    // const session = await auth();
    // if (!session || !session?.user) {
    //     return new Response("Not authorized", {
    //         headers: { "content-type": "application/json" },
    //         status: 401
    //     });
    // }
    const db = client.db("test");
    const col = db.collection("Comments");
    const req = await request.json();
    const result = await col.deleteOne({ _id: req._id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}