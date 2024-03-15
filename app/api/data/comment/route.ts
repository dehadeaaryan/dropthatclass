import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Comments");
    const comments = await col.find().toArray();
    return new Response(JSON.stringify(comments), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Comments");
    let req = await request.json();
    req.createdAt = new Date();
    const reviewCol = db.collection("Reviews");
    const review = await reviewCol.findOne({ _id: req.review });
    if (review) {
        const reviewResult = await reviewCol.updateOne({ _id: req.review }, { $push: { comments: req._id } });
    } else {
        return new Response("Review not found", {
            headers: { "content-type": "application/json" },
        });
    }
    const result = await col.insertOne(req);
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const client = await clientPromise;
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
    const db = client.db("test");
    const col = db.collection("Comments");
    const req = await request.json();
    const comment = await col.findOne({ _id: req._id });
    if (comment) {
        const reviewCol = db.collection("Reviews");
        const removeResult = await reviewCol.updateOne({ _id: comment.review }, { $pull: { comments: req._id } });
        const result = await col.deleteOne({ _id: req._id });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else {
        return new Response("Comment not found", {
            headers: { "content-type": "application/json" },
        });
    }
}