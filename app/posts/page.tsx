import { auth, signIn } from "@/lib/auth";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async function Page() {
    const session = await auth();
    const client: MongoClient = await clientPromise;
    if (!session || !session?.user) {
        await signIn();
    } else {
        return (
            <h1>Welcome, {session.user.email}</h1>
        )
    }
}
