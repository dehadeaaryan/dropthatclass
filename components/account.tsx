"use client"

import { UserType } from "@/types/user";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import newUsername from "@/lib/usernameGenerator";
import universities from '@/data/universities.json'; // Importing options from JSON file


export default function Account({ user }: { user: UserType }) {
    const [username, setUsername] = useState(user.username);
    const [university, setUniversity] = useState(user.university);

    async function handleUsernameChange(e: any) {
        const newUsernameVar = newUsername(user.email!);
        const response = await fetch(`api/data/user/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username: newUsernameVar,
                university: user.university,
            }),
        });
        if (response.status === 200) {
            setUsername(newUsernameVar);
        } else {
            console.error("Username change failed");
        }
    }

    async function handleUniversityChange(e: any) {
        const newUniversity = e.target.value;
        const response = await fetch(`api/data/user/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username: user.username,
                university: newUniversity,
            }),
        });
        if (response.status === 200) {
            setUniversity(newUniversity);
        } else {
            console.error("University change failed");
        }
    }


    return (
        <div className="flex flex-1 flex-col items-center justify-start px-8">
            <div className="flex flex-row w-full justify-between items-center h-36">
                <h2 className="text-4xl font-bold">{user.name}&apos;s account</h2>
                <img className="w-20 h-20 rounded-full border-4 border-white" src={user.image} alt={user.name} />
            </div>
            <div className="flex flex-1 flex-col gap-4 text-2xl items-center justify-center">
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="email">Email: </label>
                    <p id="email">{user.email}</p>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <form onSubmit={handleUsernameChange} className="flex flex-row items-center justify-center gap-4">
                        <label htmlFor="username">Username: </label>
                        <p id="username">{username}</p>
                        <Button>Change</Button>
                    </form>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="university">University: </label>
                    <select name="university" id="university" value={university} onChange={handleUniversityChange} className="text-2xl text-white bg-black">
                        {universities.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <label htmlFor="createdAt">With us since: </label>
                    <p id="createdAt">{user.createdAt.getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}