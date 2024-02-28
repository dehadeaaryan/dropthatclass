import { MongoClient, Db, Collection, InsertOneResult, WithId, UpdateResult} from "mongodb"; 
import clientPromise from "@/lib/mongodb";
import { UserType } from "@/types/user";
import randomUsername from "@/lib/randomUsername";

export async function getUserByEmail(email: string) {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("test");
    const users: Collection = db.collection("Users");
    const user: WithId<UserType> = await users.findOne({ email: email }) as WithId<UserType>;
    return user;
}

export async function insertUser(email: string, name: string, image: string, university: string) {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("test");
    const users: Collection = db.collection("Users");
    const user: UserType = {
        email: email,
        name: name,
        username: randomUsername(email),
        image: image,
        createdAt: new Date(),
        university: university,
    }
    const result: InsertOneResult = await users.insertOne(user) as InsertOneResult;
    return result;
}

export async function updateUserName(email: string, username: string) {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("test");
    const users: Collection = db.collection("Users");
    const result: UpdateResult = await users.updateOne({ email: email }, { $set: { username: username } });
    return result;
}