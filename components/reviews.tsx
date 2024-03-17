"use client";

import { useEffect, useState } from "react";
import { AddSvg, UserSvg, ReportSvg, LikeSvg, DislikeSvg } from "./svgs";
import Button from "./ui/button";
import { getAllReviews, getReviewById, reportReview, likeReview, dislikeReview, unlikeReview, undislikeReview } from "@/controllers/review";
import { getAllUsers, getUserByEmail } from "@/controllers/user";
import { get } from "http";

export default function Reviews(u: any) {
    const [user, setUser] = useState<any>(u.user);
    const [reviews, setReviews] = useState([{
        _id: "",
        likes: [],
        dislikes: [],
        reports: 0,
        content: "",
        professor: "",
    }]);
    useEffect(() => {
        getUserByEmail(user.email).then((user) => {
            setUser(user);
        }).catch((error) => {
            console.error("Error fetching user:", error);
        });
        getAllReviews().then((reviews) => {
            setReviews(reviews);
        }).catch((error) => {
            console.error("Error fetching reviews:", error);
        });
    }, []);
    function isInLikes(review: any, user: string) {
        return review.likes.includes(user);
    }
    function isInDislikes(review: any, user: string) {
        return review.dislikes.includes(user);
    }
    function onReport(_id: string) {
        reportReview(_id).then(() => {
            getAllReviews().then((reviews) => {
                setReviews(reviews.filter((review: { _id: string; }) => review._id !== _id));
            }).catch((error) => {
                console.error("Error fetching reviews:", error);
            });
        })
    }
    function onLike(_id: string) {
        getReviewById(_id).then((review) => {
            if (review.likes.includes(user._id)) {
                unlikeReview(_id, user._id).then(() => {
                    getAllReviews().then((reviews) => {
                        setReviews(reviews);
                    }).catch((error) => {
                        console.error("Error fetching reviews:", error);
                    });
                })
            } else {
                likeReview(_id, user._id).then(() => {
                    getAllReviews().then((reviews) => {
                        setReviews(reviews);
                    }).catch((error) => {
                        console.error("Error fetching reviews:", error);
                    });
                })
                if (review.dislikes.includes(user._id)) {
                    undislikeReview(_id, user._id).then(() => {
                        getAllReviews().then((reviews) => {
                            setReviews(reviews);
                        }).catch((error) => {
                            console.error("Error fetching reviews:", error);
                        });
                    })
                }
            }
        })
    }
    function onDislike(_id: string) {
        getReviewById(_id).then((review) => {
            if (review.dislikes.includes(user._id)) {
                undislikeReview(_id, user._id).then(() => {
                    getAllReviews().then((reviews) => {
                        setReviews(reviews);
                    }).catch((error) => {
                        console.error("Error fetching reviews:", error);
                    });
                })
            } else {
                dislikeReview(_id, user._id).then(() => {
                    getAllReviews().then((reviews) => {
                        setReviews(reviews);
                    }).catch((error) => {
                        console.error("Error fetching reviews:", error);
                    });
                })
                if (review.likes.includes(user._id)) {
                    unlikeReview(_id, user._id).then(() => {
                        getAllReviews().then((reviews) => {
                            setReviews(reviews);
                        }).catch((error) => {
                            console.error("Error fetching reviews:", error);
                        });
                    })
                }
            }
        })
    }
    return (
        <div className="flex flex-1 flex-col items-center justify-start px-8 py-4 gap-4">
            <div id="reviews-header" className="flex flex-row items-center justify-between w-full">
                <h2 className="text-5xl font-bold text-start w-full">Reviews</h2>
                <button onClick={() => { window.location.href = "/reviews/create" }} className="border hover:bg-white hover:text-black transition-all duration-200 text-white rounded p-2">
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
                            <Button onClick={() => onReport(review._id)}><ReportSvg solid={false} /></Button>
                            <div className="flex flex-row items-center justify-end gap-4">
                                <Button onClick={() => onLike(review._id)}><LikeSvg solid={isInLikes(review, user._id)} /></Button>
                                <p className="text-sm">{review.likes.length}</p>
                                <Button onClick={() => onDislike(review._id)}><DislikeSvg solid={isInDislikes(review, user._id)} /></Button>
                                <p className="text-sm">{review.dislikes.length}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}