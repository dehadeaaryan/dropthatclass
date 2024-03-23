import { Session } from "next-auth";
import { auth, signIn, signOut } from "@/lib/auth";
import { ClickHandlerAsync } from "@/types/global";

export default async function AuthButton(): Promise<JSX.Element> {
    const session: Session | null = await auth();

    const handleSignIn: ClickHandlerAsync = async () => {
        await signIn("google", { callbackUrl: `${process.env.LOCATION}/app` });
    }

    const handleSignOut: ClickHandlerAsync = async () => {
        await signOut();
    }

    if (!session?.user) {
        return (
            <button className="border bg-black text-neutral-200 transition-all duration-200 rounded-full py-2 px-4 text-sm" onClick={handleSignIn}>
                Sign In
            </button>
        );
    }
    return (
        <button className="border bg-black text-neutral-200 transition-all duration-200 rounded-full py-2 px-4 text-sm" onClick={handleSignOut}>
            Sign Out
        </button>
    )
}