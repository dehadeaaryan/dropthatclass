'use server';

import { deleteUserByEmail, getUserByEmail, updateUsernameByEmail } from "@/controllers/user";
import { auth, signOut } from "@/lib/auth";
import newUsername from "@/lib/usernameGenerator";
import { UserType } from "@/types/user";
import { Document, UpdateResult, WithId } from "mongodb";
import { Session, User } from "next-auth";

export async function getUserFromDatabase(): Promise<UserType> {
    const session = await auth();
    const sessionUser: User | undefined = session?.user;
    const email: string = sessionUser?.email ?? "";
    const user: WithId<Document> | UserType = await getUserByEmail(email) ?? {
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
    return userObj as UserType;
}

export async function changeUsernameAccountAction(): Promise<UpdateResult<Document> | null> {
    const session: Session | null = await auth();
    const user: User | undefined = session?.user;
    const email: string | null | undefined = user?.email;
    const username: string = newUsername(email ?? "");
    const result: UpdateResult<Document> | null = await updateUsernameByEmail(email ?? "", username);
    return result as UpdateResult<Document> | null;
}

export async function deleteAccountAction(email: string): Promise<void> {
    const result: boolean = await deleteUserByEmail(email);
    await signOut({ redirectTo: "/", redirect: true });
}