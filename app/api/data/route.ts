

const heading = "How to use the DropThatClass API";
const message = "To use the DropThatClass API, you need to make a GET request to the /api/data endpoint.";

export async function GET(request: Request) {
    return new Response(JSON.stringify({ heading: heading, message: message }), {
        headers: { "content-type": "application/json" },
    });
}