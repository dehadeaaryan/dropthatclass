'use server'

import { auth, signIn, signOut } from "@/lib/auth"
import { deleteUserByEmail, getUserByEmail, updateUsernameByEmail } from "@/controllers/user";
import { UserType } from "@/types/user";
import newUsername from "@/lib/usernameGenerator";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export async function signInAccountAction() {
    await signIn("google", { redirectTo: "/app"});
}

export async function signOutAccountAction() {
    await signOut({ redirectTo: "/" });
}

export async function getSessionAccountAction() {
    const session = await auth();
    return session;
}

export async function getSessionUserAccountAction() {
    const session = await auth();
    return session?.user;
}

export async function getUserFromDatabase(): Promise<UserType> {
    const session = await auth();
    const user = await getUserByEmail(session!.user!.email ?? "") ?? {
        email: "",
        username: "",
        image: "",
        name: "",
        createdAt: new Date(),
        university: "",
    };

    const userObj: UserType = {
        email: user.email,
        username: user.username,
        image: user.image,
        name: user.name,
        createdAt: user.createdAt,
        university: user.university,
    }
    return userObj;
}

export async function changeUsernameAccountAction() {
    const session = await auth();
    const username = newUsername(session?.user?.email ?? "");
    const result = await updateUsernameByEmail(session?.user?.email ?? "", username);
    return result;
}

export async function deleteAccountAction(email: string) {
    const result = await deleteUserByEmail(email);
    await signOut({ redirectTo: "/", redirect: true });
}