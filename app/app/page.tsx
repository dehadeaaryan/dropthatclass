import { auth, signIn } from "@/lib/auth";
import Reviews from "@/components/reviews";
import { UserType } from "@/types/user";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        return (
            <Reviews user={session.user} />
        )
    }
}
