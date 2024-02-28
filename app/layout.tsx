import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DropThatClass",
    description: "Class review and rating platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="ButtonTheme flex flex-col h-screen bg-black text-white">
                            <Header />
                            {children}
                            <Footer />
                </div>
            </body>
        </html>
    );
}
