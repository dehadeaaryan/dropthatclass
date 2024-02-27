import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";

import SessionProvider from "@/components/sessionProvider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DropThatClass",
    description: "Class review and rating platform",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <main className="flex flex-col min-h-screen">
                        <Navbar />
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
