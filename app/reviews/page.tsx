import { auth, signIn } from "@/lib/auth";
import Reviews from "@/components/reviews";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        return (
            <Reviews />
        )
    }
}
