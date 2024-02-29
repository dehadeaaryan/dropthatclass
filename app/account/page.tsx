import { auth, signIn } from "@/lib/auth";
import { WithId } from "mongodb";
import { getUserByEmail, insertUser, updateUserName } from "@/lib/mongoCRUD";
import { UserType } from "@/types/user";
import Account from "@/components/account";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        if (!(await getUserByEmail(session.user.email as string))) {
            await insertUser(session.user.email as string, session.user.name as string, session.user.image as string, "Unknown");
        }
        // Fetch the new user object from the database
        const user: WithId<UserType> = await getUserByEmail(session.user.email as string) as WithId<UserType>;

        const semiUser = {
            email: user.email,
            name: user.name,
            username: user.username,
            image: user.image,
            createdAt: user.createdAt,
            university: user.university,
        }
        // Render the user's account page
        return (
            <Account user={semiUser} />
        )
    }
}