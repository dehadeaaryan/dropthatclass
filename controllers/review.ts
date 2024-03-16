import { ObjectId } from "mongodb";

export async function getAllReviews() {
    "use server";
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
    "use server";
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
    "use server";
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

export async function updateReview(id: string, content: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        _id: id,
        content: content,
        func: "edit"
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function likeReview(id: string, userId: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        _id: id,
        userId: userId,
        func: "like"
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function unlikeReview(id: string, userId: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        _id: id,
        userId: userId,
        func: "unlike"
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function dislikeReview(id: string, userId: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        _id: id,
        userId: userId,
        func: "dislike"
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function undislikeReview(id: string, userId: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        _id: id,
        userId: userId,
        func: "undislike"
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function reportReview(id: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const body = {
        _id: id,
        func: "report"
    }
    const review = await fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });
    const output = await review.json();
    return output;
}

export async function deleteReview(id: string) {
    "use server";
    const headers = new Headers();
    headers.append("x-api-key", process.env.API_KEY || "");
    const result = await fetch(`${process.env.LOCATION}/api/data/review/${id}`, {
        cache: "no-cache",
        method: "DELETE",
        headers
    });
    const output = await result.json();
    return output;
}