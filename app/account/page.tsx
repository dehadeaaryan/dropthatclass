import { auth, signIn } from "@/lib/auth";
import { WithId } from "mongodb";
import { UserType } from "@/types/user";
import Account from "@/components/account";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        // Get the user's data
        const user = await fetch(`${process.env.LOCATION}/api/data/user/${session.user.email}`).then((res) => res.json());
        user && (user.createdAt = new Date(user.createdAt));
        // Render the user's account page
        return (
            <Account user={user} />
        )
    }
}