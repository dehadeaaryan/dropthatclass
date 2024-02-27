import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/lib/auth";

async function AuthButton() {
    const session = await auth();
    if (!session?.user) {
        return (
            <form
                action={async () => {
                    "use server"
                    await signIn()
                }}
            >
                <button>Sign In</button>
            </form>
        );
    }
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            {session.user.image && <img src={session.user.image} alt={session.user.name ?? ""} />}
            <button>Sign Out</button>
        </form>
    );
}

export default async function Navbar() {
    return (
        <nav className="flex w-full justify-between items-center">
            <ul className="flex justify-between items-center gap-4">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li>
                    <Link href="/privacyPolicy">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/termsOfService">Terms of Service</Link>
                </li>
                <li>
                    <Link href="/posts">Posts</Link>
                </li>
            </ul>
            <div className="flex justify-end gap-4">
                <AuthButton />
            </div>
        </nav>
    );
}