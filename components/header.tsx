'use client';

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathName = usePathname();
    const isHome = pathName === "/";
    const isAbout = pathName === "/about";
    const isContact = pathName === "/contact";
    return (
        <header className="w-full sticky flex items-center justify-between gap-12 px-4 py-2">
            <div className="flex flex-1 items-center justify-start gap-12">
                <h1 className="text-4xl font-bold text-center">
                    <Link href={"/"}>
                        <Image priority={true} src="/logo.png" alt="DTC" width={100} height={100} className="rounded-lg h-20 w-20" />
                    </Link>
                </h1>
            </div>
            <div className={`flex items-center justify-end gap-4 text-lg`}>
                <Link className={`${isContact && "underline underline-offset-4"}`} href="/contact">Contact</Link>
                <Link className={`${isAbout && "underline underline-offset-4"}`} href="/about">About</Link>
                <Link href="/api/auth/signin">
                    <Button>Sign In</Button>
                </Link>
            </div>
        </header>
    );
}