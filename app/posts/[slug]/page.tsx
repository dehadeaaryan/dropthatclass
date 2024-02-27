

export default function Post({ params }: { params: { slug: string } }) {
    return (
        <div>
        <h1>Post: {params.slug}</h1>
        </div>
    );
}