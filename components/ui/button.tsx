"use client";

import { ClickHandlerAsync, ClickHandler } from "@/types/global";

export default function Button({
    children,
    onClick = () => { },
    disabled = false
}: {
    children: React.ReactNode,
    onClick?: ClickHandlerAsync | ClickHandler,
    disabled?: boolean
}) {
    return (
        <button disabled={disabled} type="submit" onClick={onClick} className={`border ${disabled ? "bg-neutral-500" : "bg-black"} text-neutral-200 transition-all duration-200 rounded-full py-2 px-4 text-sm`}>
            {children}
        </button>
    );
}
