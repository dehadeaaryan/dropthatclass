import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./mongodb"

export const config = {
    theme: {
        brandColor: "#000000",
        logo: "https://raw.githubusercontent.com/dehadeaaryan/dropthatclass/main/public/logo.png",
        colorScheme: "auto",
    },
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "test",
        collections: {
            Users: "Users",
            Sessions: "Sessions",
            Accounts: "Accounts",
        },
    }),
    providers: [
        GitHub, Google,
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }

                const user = await fetch(`${process.env.LOCATION}/api/data/user/${credentials.email}`).then((res) => res.json())
                if (!user || user.password !== credentials.password) {
                    return null
                }
                const { password, ...rest } = user
                return rest
            }
        }),
    ],
    // pages: {
    //     signIn: "/signin",
    //     signOut: "/auth/signout",
    //     error: "/auth/error",
    //     verifyRequest: "/auth/verify-request",
    //     newUser: "/auth/new-user",
    // },
    callbacks: {
        authorized({ request, auth }) {
            // const { pathname } = request.nextUrl
            return true
        },
        signIn({ user, account, profile, email, credentials }) {
            fetch(`${process.env.LOCATION}/api/data/user/${user.email}`).then((res) => res.json()).then((res) => {
                if (!res.username) {
                    fetch(`${process.env.LOCATION}/api/data/user/`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            username: user.email!.split("@")[0],
                            university: "Unknown",
                        }),
                    })
                        .then(() => true)
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }
            })
            return true
        }
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)