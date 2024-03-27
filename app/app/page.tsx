import { auth, signIn } from "@/lib/auth";
import App from "@/components/app";
import { UserType } from "@/types/user";
import { Session, User } from "next-auth";
import { getUserByEmail } from "@/controllers/user";
import { WithId, Document } from "mongodb";
import { permanentRedirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element | undefined> {
    const session: Session | null = await auth();
    const user: User | undefined = session?.user;
    if (!session || !user) {
        await signIn();
    } else {
        const db_user: WithId<Document> | null = await getUserByEmail(user.email as string);
        if (!db_user) {
            permanentRedirect("/");
        } else {
            const user_object: UserType = {
                email: db_user.email,
                username: db_user.username,
                image: db_user.image,
                name: db_user.name,
                createdAt: db_user.createdAt,
                university: db_user.university,
            }
            return (
                <App user={user_object} />
            )
        }
    }
}
