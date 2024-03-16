import { ObjectId } from "mongodb";

export async function getAllReviews() {
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const reviews = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "GET",
        headers
    });
    const output = await reviews.json();
    return output;
}

export async function getReviewById(id: string) {
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const review = await fetch(`${process.env.LOCATION}/api/data/review/${id}`, {
        cache: "no-cache",
        method: "GET",
        headers
    });
    const output = await review.json();
    return output;
}

export async function createReview(author: string, professor: string, content: string) {
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        author: author,
        professor: professor,
        content: content
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function deleteReview(id: string) {
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const review = await fetch(`${process.env.LOCATION}/api/data/review/`, {
        cache: "no-cache",
        method: "DELETE",
        headers,
        body: JSON.stringify({ _id: id })
    });
    const output = await review.json();
    return output;
}