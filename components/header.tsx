import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/authButton";

let links = [
    { path: "/posts", name: "Posts" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
];

export default function Header() {
    return (
        <header className="sticky flex items-center justify-between border-b bottom-white gap-12 px-4">
            <div className="flex flex-1 items-center justify-start gap-12">
                <h1 className="text-4xl font-bold text-center">
                    <Link href={"/"}><Image priority={true} src="/logo.png" alt="DTC" width={100} height={100} /></Link>
                </h1>
                <ul className="flex h-full gap-4">
                    {links.map((link) => (
                        <li className="" key={link.path}>
                            <Link href={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <AuthButton />
        </header>
    );
}