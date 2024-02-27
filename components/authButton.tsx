import { auth, signIn, signOut } from "@/lib/auth";
import Button from "@/components/ui/button";

export default async function AuthButton() {
    const session = await auth();
    if (!session?.user) {
        return (
            <form action={async () => {
                "use server"
                await signIn()
            }
            }>
                <Button>Sign In</Button>
            </form>
        );
    }
    return (
        <form action={async () => {
            "use server"
            await signOut()
        }
        }>
            <Button>Sign Out</Button>
        </form>
    )
}