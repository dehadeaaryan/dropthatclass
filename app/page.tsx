import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

export default async function Home() {
    const client: MongoClient = await clientPromise;
    const result = await client.db("test").collection("Posts").aggregate([
        {
            $lookup: {
                from: "Users",            // Name of the Users collection
                localField: "author",     // Field in the Posts collection
                foreignField: "_id",      // Field in the Users collection
                as: "userDetails"         // Alias for the merged data
            }
        },
        {
            $unwind: "$userDetails"     // Unwind the array created by $lookup
        },
        {
            $project: {
                _id: 1,                  // Include the Post's _id
                content: 1,               // Include the Post's title
                author: "$userDetails.username"  // Include the User's username
            }
        }
    ]).toArray();
    return (
        <main className="flex min-w-screen min-h-screen flex-col items-center justify-center">
            <div className="z-10 w-full items-center justify-center font-mono">
                <h1 className="w-full text-center font-extrabold text-5xl md:text-8xl lg:text-9xl drop-shadow-[0_0.5rem_0.5rem_rgba(255,255,255,0.5)] animate-[dropshadow_8s_ease-in-out_infinite]">
                    {`DropThatClass`}
                </h1>
                <p className="w-full text-center text-neutral-500 text-md md:text-2xl animate-bounce">
                    {`Coming Soon`}
                </p>
            </div>
        </main>
    );
}
