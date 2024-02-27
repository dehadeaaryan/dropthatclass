"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <button onClick={() => signOut()}>Sign out</button>
        );
    }
    return (
        <button onClick={() => signIn()}>Sign in</button>
    );
}

export default function Navbar() {
    const { data: session } = useSession();
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
                {session?.user?.name ?? "Logged out"}
                <AuthButton />
            </div>
        </nav>
    );
}