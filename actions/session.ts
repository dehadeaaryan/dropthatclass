'use server';

import { auth, signIn, signOut } from "@/lib/auth";
import { Session, User } from "next-auth";

export async function signInAction(): Promise<void> {
    await signIn("google", { redirectTo: "/app"});
}

export async function signOutAction(): Promise<void> {
    await signOut({ redirectTo: "/" });
}

export async function getSessionAction(): Promise<Session | null> {
    const session = await auth();
    return session;
}

export async function getUserAction(): Promise<User | undefined>{
    const session = await auth();
    return session?.user;
}