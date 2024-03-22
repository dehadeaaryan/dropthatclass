"use client";

export default function Button({ children, onClick=()=>{} }: { children: React.ReactNode, onClick?: () => any }) {
    return (
        <button onClick={onClick} className="border bg-black text-neutral-200 transition-all duration-200 rounded-full py-2 px-4 text-sm">
            {children}
        </button>
    );
}