"use client"

export function getAllReviews() {
    return fetch(`/api/data/review`, {
        cache: "no-cache",
        method: "GET",
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch reviews (Status: ${response.status})`);
        }
        return response.json();
    });
}


export function getReviewById(id: string) {
    return fetch(`${process.env.LOCATION}/api/data/review/${id}`, {
        cache: "no-cache",
        method: "GET",
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function createReview(author: string, professor: string, content: string) {
    const body = {
        author: author,
        professor: professor,
        content: content
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to create review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function updateReview(id: string, content: string) {
    const body = {
        _id: id,
        content: content,
        func: "edit"
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to update review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function likeReview(id: string, userId: string) {
    const body = {
        _id: id,
        userId: userId,
        func: "like"
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to like review (Status: ${response.status})`);
        }
        return response.json();
    
    });
}

export async function unlikeReview(id: string, userId: string) {
    const body = {
        _id: id,
        userId: userId,
        func: "unlike"
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to unlike review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function dislikeReview(id: string, userId: string) {
    const body = {
        _id: id,
        userId: userId,
        func: "dislike"
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to dislike review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function undislikeReview(id: string, userId: string) {
    const body = {
        _id: id,
        userId: userId,
        func: "undislike"
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to undislike review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function reportReview(id: string) {
    const body = {
        _id: id,
        func: "report"
    }
    return fetch(`${process.env.LOCATION}/api/data/review`, {
        cache: "no-cache",
        method: "PUT",
        body: JSON.stringify(body),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to report review (Status: ${response.status})`);
        }
        return response.json();
    });
}

export async function deleteReview(id: string) {
    return fetch(`${process.env.LOCATION}/api/data/review/${id}`, {
        cache: "no-cache",
        method: "DELETE",
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to delete review (Status: ${response.status})`);
        }
        return response.json();
    });
}