import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

// Way 1
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
    const col = db.collection("Reviews");
    const reviews = await col.find().toArray();
    return new Response(JSON.stringify(reviews), {
        headers: { "content-type": "application/json" },
    });
}

// Way 2
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
    const col = db.collection("Reviews");
    const { professor, ...review } = await request.json();
    review.author = new ObjectId(review.author as string);
    review.createdAt = new Date();
    review.reports = 0;
    review.likes = [];
    review.dislikes = [];
    const result = await col.insertOne(review);
    const id = result.insertedId;
    const professorsReviews = db.collection("ProfessorsReviews");
    const professorReviewsResult = await professorsReviews.insertOne({ professor: new ObjectId(professor as string), review: id });
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
    } else {
        return new Response("Invalid function", {
            headers: { "content-type": "application/json" },
        });
    }
}

// Change this to deletemany
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
    const col = db.collection("Reviews");
    const review = await request.json();
    review._id = new ObjectId(review._id as string);
    const comments = db.collection("Comments");
    const commentResult = await comments.deleteMany({ review: review._id });
    const professorsReviews = db.collection("ProfessorsReviews");
    const professorReviewsResult = await professorsReviews.deleteOne({ review: review._id });
    const result = await col.deleteOne({ _id: review._id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}