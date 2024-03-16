"use client";

import { AddSvg } from "./svgs";

export default function Reviews(props: any) {
    const reviews = props.reviews;
    return (
        <div className="flex flex-1 flex-col items-center justify-start px-8 py-4 gap-4">
            <div id="reviews-header" className="flex flex-row items-center justify-between w-full">
                <h2 className="text-5xl font-bold text-start w-full">Reviews</h2>
                <button onClick={() => {window.location.href = "/reviews/create"}} className="border hover:bg-white hover:text-black transition-all duration-200 text-white rounded p-2">
                    <AddSvg solid={true} />
                </button>
            </div>
            <div id="reviews" className="flex flex-col items-center justify-start w-full"></div>
            {reviews.map((review: any) => {
                return (
                    <div key={review._id} className="flex flex-col w-full bg-neutral-900 rounded-2xl px-8 py-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <p className="text-2xl font-bold">{review.author}</p>
                            <p className="text-lg">{review.professor}</p>
                        </div>
                        <p className="text-xl truncate">{review.content}</p>
                        <p className="text-lg">{review.likes.length}</p>
                        <p className="text-lg">{review.dislikes.length}</p>
                    </div>
                )
            })}
        </div>
    )
}