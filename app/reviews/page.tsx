import { auth, signIn } from "@/lib/auth";
import { getAllReviews, createReview, deleteReview, likeReview, unlikeReview, dislikeReview, undislikeReview, reportReview, updateReview } from "@/controllers/review";
import Reviews from "@/components/reviews";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        const reviews = await getAllReviews();
        return (
            <Reviews 
                reviews={reviews} 
                likeReview={likeReview} 
                dislikeReview={dislikeReview}
                unlikeReview={unlikeReview}
                undislikeReview={undislikeReview}
                reportReview={reportReview}
            />
        )
    }
}
