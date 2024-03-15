import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
    const session = await auth();
    if (!session || !session?.user) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Professors");
    const professors = await col.find().toArray();
    return new Response(JSON.stringify(professors), {
        headers: { "content-type": "application/json" },
    });
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session || !session?.user) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Professors");
    let req = await request.json();
    req.createdAt = new Date();
    const result = await col.insertOne(req);
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function PUT(request: Request) {
    const session = await auth();
    if (!session || !session?.user) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Professors");
    const req = await request.json();
    if (req.func === "name") {
        const result = await col.updateOne({ _id: req._id }, { $set: { name: req.name } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else if (req.func === "university") {
        const result = await col.updateOne({ _id: req._id }, { $set: { university: req.university } });
        return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify({ error: "Invalid function" }), {
            headers: { "content-type": "application/json" },
        });
    }
}

export async function DELETE(request: Request) {
    const session = await auth();
    if (!session || !session?.user) {
        return new Response("Not authorized", {
            headers: { "content-type": "application/json" },
            status: 401
        });
    }
    const client = await clientPromise;
    const db = client.db("test");
    const col = db.collection("Professors");
    const req = await request.json();
    const result = await col.deleteOne({ _id: req._id });
    const reviews = db.collection("Reviews");
    const reviewsResult = await reviews.deleteMany({ professor: req._id });
    const professorsReviews = db.collection("ProfessorsReviews");
    const professorReviewsResult = await professorsReviews.deleteMany({ professor: req._id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}