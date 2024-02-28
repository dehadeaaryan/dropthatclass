import Link from "next/link";

let links = [
    { path: "/privacyPolicy", name: "Privacy Policy" },
    { path: "/termsOfService", name: "Terms of Service" },
];

export default function Footer() {
    return (
        <header className="bottom-0 flex items-center justify-between border-t bottom-white gap-12 py-4 px-4">
            <p className="">
                {`${new Date().getFullYear()} DropThatClass`}
            </p>
            <div className="flex flex-1 items-center justify-end gap-12">
                <ul className="flex h-full gap-4">
                    {links.map((link) => (
                        <li className="" key={link.path}>
                            <Link href={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}