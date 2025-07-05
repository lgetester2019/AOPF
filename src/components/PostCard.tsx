import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Post {
    id: string;
    slug: string;
    title: string;
    description: string;
    content?: string;
    image_url: string;
    created_at: string; // ISO дата
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <div className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col h-full">
            {post.image_url && (
                <img src={post.image_url} alt={post.title} className="h-48 w-full object-cover" />
            )}
            <div className="p-4 flex flex-col flex-grow space-y-2">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
                <div className="text-sm text-gray-400">{new Date(post.created_at).toLocaleDateString()}</div>
                <div className="mt-auto pt-2">
                    <Link href={`/blog/${post.slug}`} className="text-green-600 font-semibold">
                        Читать →
                    </Link>
                </div>
            </div>
        </div>
    );
}
