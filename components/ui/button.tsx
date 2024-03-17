"use client";

export default function Button({ children, onClick=()=>{} }: { children: React.ReactNode, onClick?: () => any }) {
    return (
        <button onClick={onClick} className="border hover:bg-white hover:text-black transition-all duration-200 text-white rounded p-2">
            {children}
        </button>
    );
}