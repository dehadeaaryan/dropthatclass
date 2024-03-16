import { auth, signIn } from "@/lib/auth";
import Card from "@/components/ui/card";
import { getAllReviews, createReview, deleteReview, likeReview, unlikeReview, dislikeReview, undislikeReview, reportReview, updateReview } from "@/controllers/review";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        const reviews = await getAllReviews();
    //    const result = await createReview("111111111111111111111111", "111111111111111111111111", "This is a test review.");
        // const result = await deleteReview("65f5cbc5f860f1fdcc9003a5");
        // // const result = await reportReview("65f6027d841d81b87ff7a42d")
        // const result = await updateReview("65f6027d841d81b87ff7a42d", "WOW! This is a test review.");
        // console.log(result)
        return (
            <div className="flex flex-1 flex-col items-center justify-between px-8 py-4">
                <h2 className="text-5xl font-bold text-start w-full">Posts</h2>
                {reviews.map((review: any) => {
                    return <Card key={review._id} props={{content: review.content, likes: review.likes.length, comments: 10}} />
                })}
            </div>
        )
    }
}
