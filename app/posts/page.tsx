import { auth, signIn } from "@/lib/auth";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";
import Card from "@/components/ui/card";

export default async function Page() {
    const session = await auth();
    const client: MongoClient = await clientPromise;
    if (!session || !session?.user) {
        await signIn();
    } else {
        return (
            <div className="flex flex-1 flex-col items-center justify-between px-8 py-4">
                <h2 className="text-5xl font-bold text-start w-full">Posts</h2>
                <Card props={{content: "This is the first post", likes: 5, comments: 10}} />
            </div>

        )
    }
}
