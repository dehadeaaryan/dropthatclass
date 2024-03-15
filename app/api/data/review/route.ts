import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const reviews = await col.find().toArray();
    return new Response(JSON.stringify(reviews), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Reviews");
    let review = await request.json();
    review.createdAt = new Date();
    const result = await col.insertOne(review);
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const req = await request.json();
    if (req.func === "like") {
        const result = await col.updateOne({ _id: req._id }, { $push: { likes: req.userId } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "unlike") {
        const result = await col.updateOne({ _id: req._id }, { $pull: { likes: req.userId } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "dislike") {
        const result = await col.updateOne({ _id: req._id }, { $push: { dislikes: req.userId } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "undislike") {
        const result = await col.updateOne({ _id: req._id }, { $pull: { dislikes: req.userId } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "report") {
        const result = await col.updateOne({ _id: req._id }, { $inc: { reports: 1 } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "edit") {
        const result = await col.updateOne({ _id: req._id }, { $set: { content: req.content } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "comment") {
        const result = await col.updateOne({ _id: req._id }, { $push: { comments: req.commentId } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else {
        return new Response("Invalid function", {
            headers: { "content-type": "application/json" },
        });
    }
}

export async function DELETE(request: Request) {
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const review = await request.json();
    const toDelete = await col.findOne({ _id: review._id });
    if (toDelete && toDelete.comments.length > 0) {
        const comments = db.collection("Comments");
        const commentResult = await comments.deleteMany({ _id: { $in: toDelete.comments } });
    }
    const result = await col.deleteOne({ _id: review._id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}