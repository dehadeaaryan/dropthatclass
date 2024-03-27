'use server'

import { auth, signIn, signOut } from "@/lib/auth"
import { deleteUserByEmail, getUserByEmail, updateUsernameByEmail } from "@/controllers/user";
import { UserType } from "@/types/user";
import newUsername from "@/lib/usernameGenerator";

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