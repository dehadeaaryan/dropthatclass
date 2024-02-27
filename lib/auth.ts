import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const config = {
    providers: [
        GitHub, Google,
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            return true
        },
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)