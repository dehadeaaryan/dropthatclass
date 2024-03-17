"use client";

import { useEffect, useState } from "react";
import { AddSvg, UserSvg, ReportSvg, LikeSvg, DislikeSvg } from "./svgs";
import Button from "./ui/button";
import { getAllReviews } from "@/controllers/review";

export default function Reviews() {
    const [reviews, setReviews] = useState([{
        _id: "",
        likes: [],
        dislikes: [],
        reports: 0,
        content: "",
        professor: "",
    }]);
    useEffect(() => {
        getAllReviews()
            .then((reviews) => {
                setReviews(reviews);
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    }, []);    
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
                    <div key={review._id} className="flex flex-col w-full bg-neutral-900 rounded-2xl gap-2 px-8 py-4">
                        <div className="flex flex-row items-center justify-between w-full">
                            <span className="flex flex-row gap-2 items-center">
                                <UserSvg solid={true} />
                                <p className="text-sm">{`review.author`}</p>
                            </span>
                            <p className="text-sm">{`review.professor`}</p>
                        </div>
                        <p className="text-xl truncate">{review.content}</p>
                        <div className="flex flex-row items-center justify-between w-full">
                            <Button onClick={() => {}}><ReportSvg solid={true} /></Button>
                            <div className="flex flex-row items-center justify-end gap-4">
                                <Button onClick={() => {}}><LikeSvg solid={true} /></Button>
                                <p className="text-sm">{review.likes.length}</p>
                                <Button onClick={() => {}}><DislikeSvg solid={true} /></Button>
                                <p className="text-sm">{review.dislikes.length}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}