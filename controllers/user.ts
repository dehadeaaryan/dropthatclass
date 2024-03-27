import clientPromise from "@/lib/mongodb";
import { WithId, Document, Collection, Db, MongoClient, UpdateResult, DeleteResult, ObjectId } from "mongodb";

const db_name: string = process.env.DB_NAME ?? "test";

export async function getAllUsers(): Promise<WithId<Document>[] | null> {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(db_name);
    const users: Collection<Document> = db.collection("Users");
    const result: WithId<Document>[] | null = await users.find({}).toArray();
    return result as WithId<Document>[] | null;
}

export async function getUserByEmail(email: string): Promise<WithId<Document> | null> {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(db_name);
    const users: Collection<Document> = db.collection("Users");
    const user: WithId<Document> | null = await users.findOne({ email: email });
    return user as WithId<Document> | null;
}

export async function updateUsernameByEmail(email: string, username: string): Promise<UpdateResult<Document> | null> {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(db_name);
    const users: Collection<Document> = db.collection("Users");
    const result: UpdateResult<Document> | null = await users.updateOne({ email: email }, { $set: { username: username } });
    return result as UpdateResult<Document> | null;
}

export async function deleteUserByEmail(email: string): Promise<boolean> {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(db_name);
    const users: Collection<Document> = db.collection("Users");
    let userId: WithId<Document>| ObjectId | null = await users.findOne({ email: email }).then((res) => res!._id);
    const result: DeleteResult = await users.deleteOne({ email: email });
    let accounts = db.collection("Accounts");
    await accounts.deleteOne({ userId: userId });
    return result.deletedCount === 1;
}
