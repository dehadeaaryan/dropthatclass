

export default function Card({props}: {props: any}) {
    return (
        <div className="flex flex-col w-full bg-neutral-900 rounded-2xl px-8 py-4">
            <p className="text-2xl">{props.content}</p>
            <p className="text-lg">{props.likes}</p>
            <p className="text-lg">{props.comments}</p>
        </div>
    )
}