"use client";

export default function Button({ children, props }: { children: React.ReactNode, props: any }) {
    return (
        <button onClick={props ? props.func : ""} className="border hover:bg-white hover:text-black transition-all duration-200 text-white rounded p-2">
            {children}
        </button>
    );
}