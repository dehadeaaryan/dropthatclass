import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import newUsername from "./usernameGenerator"

export const config = {
    theme: {
        brandColor: "#000000",
        logo: "https://raw.githubusercontent.com/dehadeaaryan/dropthatclass/main/public/logo.png",
        colorScheme: "auto",
    },
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
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            fetch(`${process.env.LOCATION}/api/data/user/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    fetch(`${process.env.LOCATION}/api/data/user`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            username: newUsername(user.email!),
                            image: user.image,
                            university: "Unknown",
                            createdAt: new Date(),
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => response.json())
                    .then((data) => { return !!data })
                }
            })

            // if (response.status === 404) {
            //     const newUser = await fetch(`${process.env.LOCATION}/api/data/user`, {
            //         method: "POST",
            //         body: JSON.stringify({
            //             email: user.email,
            //             name: user.name,
            //             username: newUsername(user.email!),
            //             image: user.image,
            //             university: "Unknown",
            //             createdAt: new Date(),
            //         }),
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     })
            // }

            if (isAllowedToSignIn) {
                return true
            } else {
                return false
                // Or return a URL to redirect to:
                // return '/unauthorized'
            }
        }
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)