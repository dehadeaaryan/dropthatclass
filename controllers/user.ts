"use client";

export function getAllUsers() {
    return fetch(`/api/data/user`, {
        cache: "no-cache",
        method: "GET",
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch users (Status: ${response.status})`);
        }
        return response.json();
    });
}

export function getUserByEmail(email: string) {
    return fetch(`/api/data/user/${email}`, {
        cache: "no-cache",
        method: "GET",
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch user (Status: ${response.status})`);
        }
        return response.json();
    });
}
