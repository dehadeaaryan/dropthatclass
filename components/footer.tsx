'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathName: string = usePathname();
    const isPrivacy: boolean = pathName === "/privacy";
    const isTerms: boolean = pathName === "/terms";
    return (
        <footer className="w-full mt-auto flex items-center justify-between gap-12 py-4 px-4 text-sm md:text-lg">
            <p className="text-wrap w-12">
                {`${new Date().getFullYear()}`}
            </p>
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-12 text-center w-fit">
                <Link href="/privacy">
                    <span className={`${isPrivacy && "underline"}`}>Privacy Policy</span>
                </Link>
                <Link href="/terms">
                    <span className={`${isTerms && "underline"}`}>Terms of Service</span>
                </Link>
            </div>
        </footer>
    );
}