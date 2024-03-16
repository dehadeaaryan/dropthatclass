import { auth, signIn } from "@/lib/auth";
import Card from "@/components/ui/card";
import { getAllReviews, createReview, deleteReview } from "@/controllers/review";

export default async function Page() {
    const session = await auth();
    if (!session || !session?.user) {
        await signIn();
    } else {
        const reviews = await getAllReviews();
        // createReview(new ObjectId(), new ObjectId(), "This is a test review.");
        // deleteReview("65f545065c69e6a3d166eff9");
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
