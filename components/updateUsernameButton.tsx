

import { UserType } from "@/types/user";
import Button from "./ui/button";
import { updateUserName } from "@/lib/mongoCRUD";

export default async function UpdateUsernameButton(user: UserType) {
    return (
        <form action={async (e) => {
            "use server"
            console.log(e)
            await updateUserName(user.email, e.values().next().value as string)
        }}>
            <label htmlFor="email">Username: </label>
            <input className="bg-black text-white border-4 rounded p-2" type="text" id="username" defaultValue={user.username} />
            <Button>Change</Button>
        </form>
    )
}