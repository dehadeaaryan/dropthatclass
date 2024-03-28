"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddSvg, UserSvg, ReportSvg, LikeSvg, DislikeSvg, LeftArrowCircleSvg, InfoSvg, ContactSvg, PrivacySvg, TermsSvg, HamburgerSvg, CrossSvg } from "./svgs";
import Button from "./ui/button";
// import { getAllReviews, getReviewById, reportReview, likeReview, dislikeReview, unlikeReview, undislikeReview } from "@/controllers/review";
// import { getAllUsers, getUserByEmail } from "@/controllers/user";
import { ReviewType } from "@/types/reviews";
import Image from "next/image";
import { SearchBar } from "./ui/input";
import Link from "next/link";
import { DeleteAccountModal } from "./modal";
import Account from "./account";
import { UserType } from "@/types/user";
import { WithId } from "mongodb";
// import { getSessionUserAccountAction, getUserFromDatabase } from "@/app/actions";

// function ReviewCards(reviews: ReviewType[]) {
//     return (
//         <div id="reviews" className="h-full overflow-y-auto flex flex-col items-center justify-start w-full">
//             {reviews.map((review) => {
//                 return (
//                     <></>
//                 )
//             })}
//         </div>
//     ) as JSX.Element;
// }

// function ReviewCard(review: any, reviews: any, setReviews: any, user: any, setUser: any) {
//     function isInLikes(review: any, user: string) {
//         return review.likes.includes(user);
//     }
//     function isInDislikes(review: any, user: string) {
//         return review.dislikes.includes(user);
//     }
//     function onReport(_id: string) {
//         reportReview(_id).then(() => {
//             getAllReviews().then((reviews) => {
//                 setReviews(reviews.filter((review: { _id: string; }) => review._id !== _id));
//             }).catch((error) => {
//                 console.error("Error fetching reviews:", error);
//             });
//         })
//     }
//     function onLike(_id: string) {
//         getReviewById(_id).then((review) => {
//             if (review.likes.includes(user._id)) {
//                 unlikeReview(_id, user._id).then(() => {
//                     getAllReviews().then((reviews) => {
//                         setReviews(reviews);
//                     }).catch((error) => {
//                         console.error("Error fetching reviews:", error);
//                     });
//                 })
//             } else {
//                 likeReview(_id, user._id).then(() => {
//                     getAllReviews().then((reviews) => {
//                         setReviews(reviews);
//                     }).catch((error) => {
//                         console.error("Error fetching reviews:", error);
//                     });
//                 })
//                 if (review.dislikes.includes(user._id)) {
//                     undislikeReview(_id, user._id).then(() => {
//                         getAllReviews().then((reviews) => {
//                             setReviews(reviews);
//                         }).catch((error) => {
//                             console.error("Error fetching reviews:", error);
//                         });
//                     })
//                 }
//             }
//         })
//     }
//     function onDislike(_id: string) {
//         getReviewById(_id).then((review) => {
//             if (review.dislikes.includes(user._id)) {
//                 undislikeReview(_id, user._id).then(() => {
//                     getAllReviews().then((reviews) => {
//                         setReviews(reviews);
//                     }).catch((error) => {
//                         console.error("Error fetching reviews:", error);
//                     });
//                 })
//             } else {
//                 dislikeReview(_id, user._id).then(() => {
//                     getAllReviews().then((reviews) => {
//                         setReviews(reviews);
//                     }).catch((error) => {
//                         console.error("Error fetching reviews:", error);
//                     });
//                 })
//                 if (review.likes.includes(user._id)) {
//                     unlikeReview(_id, user._id).then(() => {
//                         getAllReviews().then((reviews) => {
//                             setReviews(reviews);
//                         }).catch((error) => {
//                             console.error("Error fetching reviews:", error);
//                         });
//                     })
//                 }
//             }
//         })
//     }
//     return (
//         <div key={review._id} className="flex flex-col w-full bg-neutral-900 rounded-2xl gap-2 px-8 py-4">
//             <div className="flex flex-row items-center justify-between w-full">
//                 <span className="flex flex-row gap-2 items-center">
//                     <UserSvg solid={true} />
//                     <p className="text-sm">{`review.author`}</p>
//                 </span>
//                 <p className="text-sm">{`review.professor`}</p>
//             </div>
//             <p className="text-xl truncate">{review.content}</p>
//             <div className="flex flex-row items-center justify-between w-full">
//                 <Button onClick={() => onReport(review._id)}><ReportSvg solid={false} /></Button>
//                 <div className="flex flex-row items-center justify-end gap-4">
//                     <Button onClick={() => onLike(review._id)}><LikeSvg solid={isInLikes(review, user._id)} /></Button>
//                     <p className="text-sm">{review.likes.length}</p>
//                     <Button onClick={() => onDislike(review._id)}><DislikeSvg solid={isInDislikes(review, user._id)} /></Button>
//                     <p className="text-sm">{review.dislikes.length}</p>
//                 </div>
//             </div>
//         </div>
//     ) as JSX.Element;
// }

function Sidebar({ isOpen, setIsOpen, university, setUniversity }: { isOpen: boolean, setIsOpen: Function, university: string, setUniversity: Dispatch<SetStateAction<string>> }): JSX.Element | null {
    function SidebarInternal({ isOpen, setIsOpen, university, setUniversity }: { isOpen: boolean, setIsOpen: Function, university: string, setUniversity: Dispatch<SetStateAction<string>> }) {
        return (
            <div id="sidebar-internal" className="flex flex-col justify-between flex-1">
                <div id="sidebar-top" className="flex flex-col gap-4">
                    <div id="mobile-sidebar-top" className="md:hidden flex flex-row items-center justify-between w-full">
                        <h2 className="text-3xl font-bold">Menu</h2>
                        <Button onClick={() => setIsOpen(false)}><CrossSvg solid={true} /></Button>
                    </div>
                    <div id="logo" className="flex flex-row items-center justify-between w-full">
                        <Link href="/"><Image priority={true} src="/logo.png" alt="DTC" width={100} height={100} className="rounded-lg h-20 w-20" /></Link>
                    </div>
                    <div id="university-search">
                        <SearchBar placeholder="University" value={university} onChange={(e) => { setUniversity(e.target.value) }} />
                    </div>
                    <div id="professor-search">
                        <SearchBar placeholder="Professor" value={""} onChange={(e) => { }} />
                    </div>
                    <span id="line" className="w-full h-0.5 bg-neutral-300" />
                    <div id="add-button">
                        <Button onClick={() => { /* Open Modal */ }}>Add a review</Button>
                    </div>
                </div>
                <div id="sidebar-bottom">
                    <ul id="sidebar-links" className="flex flex-col gap-2 text-lg">
                        <Link href="/about"><li className="rounded-lg hover:bg-neutral-100 p-2 flex flex-row items-center gap-2"><InfoSvg solid={false} />About</li></Link>
                        <Link href="/contact"><li className="rounded-lg hover:bg-neutral-100 p-2 flex flex-row items-center gap-2"><ContactSvg solid={false} />Contact</li></Link>
                        <Link href="/privacy"><li className="rounded-lg hover:bg-neutral-100 p-2 flex flex-row items-center gap-2"><PrivacySvg solid={false} />Privacy Policy</li></Link>
                        <Link href="/terms"><li className="rounded-lg hover:bg-neutral-100 p-2 flex flex-row items-center gap-2"><TermsSvg solid={false} />Terms of Service</li></Link>
                    </ul>
                </div>
            </div>
        );
    }
    if (isOpen)
        return (
            <div id="mobile-sidebar-container" className="z-20 fixed top-0 left-0 w-full h-full bg-white p-4 flex md:hidden">
                <div id="mobile-sidebar" className="flex-1 flex flex-col gap-4 p-4 shadow-[0_0px_24px_12px_rgba(0,0,0,0.3)] rounded-3xl">
                    <SidebarInternal isOpen={isOpen} setIsOpen={setIsOpen} university={university} setUniversity={setUniversity} />
                </div>
            </div>
        );
    else
        return (
            <div id="sidebar" className="hidden md:flex flex-col justify-between p-4 gap-4 rounded-3xl shadow-[0_0px_24px_12px_rgba(0,0,0,0.3)]">
                <SidebarInternal isOpen={isOpen} setIsOpen={setIsOpen} university={university} setUniversity={setUniversity} />
            </div>
        );
}

export default function App({ user }: { user: UserType }) {
    const [university, setUniversity] = useState<string>("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    return (
        <div id="reviews-page" className="max-h-screen flex flex-row flex-1 p-4 gap-4 bg-white">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} university={university} setUniversity={setUniversity} />
            <div id="content" className="flex-1 flex flex-col items-center justify-start md:px-8 md:py-4 gap-4">
                <div id="reviews-header" className="basis-1/12 flex flex-row items-center justify-between w-full">
                    <div id="review-header-left" className="flex flex-row items-center gap-4">
                        <button className="md:hidden" onClick={() => {
                            setSidebarOpen(!sidebarOpen);
                        }}><HamburgerSvg solid={false} /></button>
                        <h2 className="text-3xl md:text-5xl font-bold text-start">Reviews</h2>
                    </div>
                    <div id="review-header-right" className="flex flex-row items-center gap-4">
                        <Account current_user={user} />
                    </div>
                </div>
                <div id="reviews" className="basis-11/12 max-h-full w-full overflow-y-scroll flex flex-col gap-2">
                    {
                        university === "" ? <p className="flex-1 flex items-center justify-center text-3xl text-center text-neutral-500">Please Choose a University to see reviews</p> :
                            [...Array(10)].map((_, i) => {
                                return (
                                    <div key={i} className="flex flex-col w-full bg-neutral-200 rounded-2xl gap-2 px-8 py-4">
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <span className="flex flex-row gap-2 items-center">
                                                <UserSvg solid={true} />
                                                <p className="text-sm">Author</p>
                                            </span>
                                            <p className="text-sm">Professor</p>
                                        </div>
                                        <p className="text-xl truncate">Content</p>
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <Button><ReportSvg solid={false} /></Button>
                                            <div className="flex flex-row items-center justify-end gap-4">
                                                <Button><LikeSvg solid={false} /></Button>
                                                <p className="text-sm">0</p>
                                                <Button><DislikeSvg solid={false} /></Button>
                                                <p className="text-sm">0</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}