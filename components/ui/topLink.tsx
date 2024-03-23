'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const names = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "About",
        href: "/about"
    },
    {
        name: "Contact",
        href: "/contact"
    },
    {
        name: "Privacy Policy",
        href: "/privacy"
    },
    {
        name: "Terms of Service",
        href: "/tos"
    },
]

export default function TopLink({ name }: { name: string }) {
    const pathName: string = usePathname();
    const isHome: boolean = pathName === "/";
    const isAbout: boolean = pathName === "/about";
    const isContact: boolean = pathName === "/contact";
    const href = names.find((n) => n.name === name)?.href;
    return (
        <Link href={href!}>
            <span className={`text-lg ${pathName === href && "underline"} underline-offset-4`}>{name}</span>
        </Link>
    )
}
