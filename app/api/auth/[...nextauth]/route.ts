import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

export const handler = (req: CombineRequest, res: CombineResponse) => NextAuth(req, res, {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
    ],
});

export { handler as GET, handler as POST }