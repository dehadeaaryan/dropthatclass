import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(request: Request, context: { params: any }) {
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
    const id = context.params.slug;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const result = await col.findOne({ _id: id });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}

export async function DELETE(request: Request, context: { params: any }) {
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
    const id = context.params.slug;
    const db = client.db("test");
    const col = db.collection("Reviews");
    const objectId = new ObjectId(id as string);
    const comments = db.collection("Comments");
    const commentResult = await comments.deleteMany({ review: id });
    const professorsReviews = db.collection("ProfessorsReviews");
    const professorReviewsResult = await professorsReviews.deleteOne({ review: objectId });
    const result = await col.deleteOne({ _id: objectId });
    return new Response(JSON.stringify(result), {
        headers: { "content-type": "application/json" },
    });
}