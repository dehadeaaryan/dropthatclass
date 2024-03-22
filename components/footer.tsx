'use client';

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full mt-auto flex items-center justify-between gap-12 py-4 px-4 text-lg">
            <p className="">
                {`${new Date().getFullYear()} DropThatClass`}
            </p>
            <div className="flex flex-1 items-center justify-end gap-12 text-lg">
                <Link href="/privacyPolicy">Privacy Policy</Link>
                <Link href="/termsOfService">Terms of Service</Link>
            </div>
        </footer>
    );
}