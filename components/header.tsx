'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { HeaderProps } from "@/types/props";
import Button from "./ui/button";

export default function Header(props: HeaderProps): JSX.Element {
    const pathName: string = usePathname();
    const isAbout: boolean = pathName === "/about";
    const isContact: boolean = pathName === "/contact";
    return (
        <header className="w-full sticky flex items-center justify-between gap-12 px-4 py-2">
            <div className="flex flex-1 items-center justify-start gap-12">
                <h1 className="text-4xl font-bold text-center">
                    <Link href={"/"}>
                        <Image priority={true} src="/logo.png" alt="DTC" width={100} height={100} className="rounded-lg h-20 w-20" />
                    </Link>
                </h1>
            </div>
            <div className={`flex items-center justify-end gap-4 underline-offset-4 text-sm md:text-lg`}>
                <Link href="/contact">
                    <span className={`${isContact && "underline"}`}>Contact</span>
                </Link>
                <Link href="/about">
                    <span className={`${isAbout && "underline"}`}>About</span>
                </Link>
                {
                    !props.signedIn ?
                        <Link href={"/api/auth/signin"}><Button>Sign In</Button></Link> :
                        <Link href={"/api/auth/signout"}><Button>Sign Out</Button></Link>
                }
            </div>
        </header>
    );
}