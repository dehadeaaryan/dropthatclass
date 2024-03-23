

export function SearchBar({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (e: any) => void }) {
    return (
        <input type="text" placeholder={placeholder} value={value} onChange={onChange} 
        className="w-full rounded-full bg-neutral-100 px-4 py-2 outline-none"/>
    ) as JSX.Element;
}
