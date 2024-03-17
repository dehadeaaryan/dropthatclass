

export default function Create() {
    return (
        <div className="flex flex-1 flex-col items-center justify-start px-8 py-4 gap-4">
            <h2 className="text-5xl font-bold text-start w-full">Create Review</h2>
            <form id="create-review" className="flex flex-col items-center justify-start w-full gap-4">
                <input type="text" id="professor" className="w-full border rounded p-2" placeholder="Professor" />
                <textarea id="content" className="w-full border rounded p-2" placeholder="Content" />
                <button type="submit" className="border hover:bg-white hover:text-black transition-all duration-200 text-white rounded p-2">Submit</button>
            </form>
        </div>
    )
}