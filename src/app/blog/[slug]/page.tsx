import { createClient } from '@supabase/supabase-js';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        return <p className="p-6">Статья не найдена</p>;
    }

    return (
        <>
            <Header></Header>
        <article className="max-w-3xl mt-32 mb-10 mx-auto p-6 space-y-6">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
            </div>
            {post.image_url && (
                <Image
                    src={post.image_url}
                    alt={post.title}
                    width={800} // укажи реальные размеры, если знаешь
                    height={400}
                    className="rounded shadow-md w-full max-h-96 object-cover"
                    style={{ width: '100%', height: 'auto' }}
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            )}
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{__html: post.content}}
            />

        </article>
            <Footer></Footer>
        </>
    );
}
