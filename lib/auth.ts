import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import GitHub, { GitHubProfile } from "next-auth/providers/github"
import Google, { GoogleProfile } from "next-auth/providers/google"
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
        GitHub({
            profile(profile: GitHubProfile) {
                return {
                    id: profile.id.toString(),
                    username: profile.email?.split("@")[0] || profile.login,
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    university: "Unknown",
                    createdAt: new Date(),
                }
            }
        }), 
        Google({
            profile(profile: GoogleProfile) {
                return {
                    id: profile.id,
                    username: profile.email?.split("@")[0] || profile.name,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    university: "Unknown",
                    createdAt: new Date(),
                }
            }
        }),
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
            return true
        }
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)