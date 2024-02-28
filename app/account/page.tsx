import { auth, signIn } from "@/lib/auth";
import { MongoClient, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getUserByEmail, insertUser, updateUserName } from "@/lib/mongoCRUD";
import { UserType } from "@/types/user";

export default async function Page() {
    const session = await auth();
    const client: MongoClient = await clientPromise;
    if (!session || !session?.user) {
        await signIn();
    } else {
        if (!(await getUserByEmail(session.user.email as string))) {
            await insertUser(session.user.email as string, session.user.name as string, session.user.image as string, "Unknown");
        }
        // Fetch the new user object from the database
        const user: WithId<UserType> = await getUserByEmail(session.user.email as string) as WithId<UserType>;
        let newUsername = user.username;

        // Render the user's account page
        return (
            <div className="flex flex-1 flex-col items-center justify-between px-8">
                <div className="flex flex-row w-full justify-between items-center h-36">
                    <h2 className="text-4xl font-bold">{user.name}&apos;s account</h2>
                    <img className="w-20 h-20 rounded-full border-4 border-white" src={user.image} alt={user.name} />
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="email">Email: </label>
                    <p>{user.email}</p>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="username">Username: </label>
                    <p>{user.username}</p>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="university">University: </label>
                    <p>{user.university}</p>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="createdAt">With us since: </label>
                    <p>{user.createdAt.getFullYear()}</p>
                </div>
            </div>
        )
    }
}