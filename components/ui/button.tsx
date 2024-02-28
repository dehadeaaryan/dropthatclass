

export default function Button({ children }: { children: React.ReactNode }) {
    return (
        <button className="border hover:bg-white hover:text-black transition-all duration-200 text-white rounded p-2">
            {children}
        </button>
    );
}