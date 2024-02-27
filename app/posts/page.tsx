import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Page() {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    return (
        <h1>Welcome, {session.user.name}</h1>
    )
}
