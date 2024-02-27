

export default function Button({ children }: { children: React.ReactNode }) {
    return (
        <button className="bg-blue-500 text-white rounded p-2">
            {children}
        </button>
    );
}