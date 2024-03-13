"use client"

import { UserType } from "@/types/user";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import newUsername from "@/lib/usernameGenerator";
import universities from '@/data/universities.json'; // Importing options from JSON file
import { signOut } from "next-auth/react";


export default function Account({ user }: { user: UserType }) {
    const [username, setUsername] = useState(user.username);
    const [university, setUniversity] = useState(user.university != null ? user.university : "Unknown");

    function handleUsernameChange(e: any) {
        const newUsernameVar = newUsername(user.email!);
        fetch(`api/data/user/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username: newUsernameVar,
                university: user.university,
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setUsername(newUsernameVar);
                } else {
                    console.error("Username change failed");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    function handleUniversityChange(e: any) {
        const newUniversity = e.target.value;
        fetch(`api/data/user/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                username: user.username,
                university: newUniversity,
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setUniversity(newUniversity);
                } else {
                    console.error("University change failed");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
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
                    <p id="createdAt">{user.createdAt ? user.createdAt.getFullYear() : 2024}</p>
                </div>
                <div className="flex flex-row gap-4 text-2xl items-center">
                    <form onSubmit={() => {
                        const savedUser = user;
                        signOut({ callbackUrl: "/" });
                        fetch("/api/data/user", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: savedUser.email,
                            }),
                        }).then(() => true)
                    }} className="flex flex-row items-center justify-center gap-4">
                        <Button>Delete account</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}