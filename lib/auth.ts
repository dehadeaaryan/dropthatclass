import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const config = {
    theme: {
        brandColor: "#000000",
        logo: "https://raw.githubusercontent.com/dehadeaaryan/dropthatclass/main/public/logo.png",
        colorScheme: "auto",
    },
    providers: [
        GitHub, Google,
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
            const { pathname } = request.nextUrl
            return true
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)