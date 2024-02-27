import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }
    return (
        <h1>Welcome, {session.user.name}</h1>
    )
}
