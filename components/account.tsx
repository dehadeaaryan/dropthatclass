"use client";

import { UserType } from "@/types/user";
import { useEffect, useState } from "react";
import Button from "./ui/button";


export default function Account({ user }: { user: UserType }) {
    const [username, setUsername] = useState(user.username);
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: any) => {
        const res = fetch("/api/mongo/updateusername", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username: username,
            }),
        });
        setSubmitted(true);
    }
    useEffect(() => {
        setUsername(username);
    }, [username]);
    return (
        <div className="flex flex-1 flex-col items-center justify-between px-8">
            <div className="flex flex-row w-full justify-between items-center h-36">
                <h2 className="text-4xl font-bold">{user.name}&apos;s account</h2>
                <img className="w-20 h-20 rounded-full border-4 border-white" src={user.image} alt={user.name} />
            </div>
            <div className="flex flex-row gap-4 text-2xl items-center">
                <label htmlFor="email">Email: </label>
                <p id="email">{user.email}</p>
            </div>
            <div className="flex flex-row gap-4 text-2xl items-center">
                <form action={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} className="bg-black text-white" type="text" id="username" />
                    <Button>Change</Button>
                    <span className="text-2xl">{submitted && (username !== user.username ? "Username changed!" : "")}</span>
                </form>
            </div>
            <div className="flex flex-row gap-4 text-2xl items-center">
                <label htmlFor="university">University: </label>
                <p id="university">{user.university}</p>
            </div>
            <div className="flex flex-row gap-4 text-2xl items-center">
                <label htmlFor="createdAt">With us since: </label>
                <p id="createdAt">{user.createdAt.getFullYear()}</p>
            </div>
        </div>
    )
}