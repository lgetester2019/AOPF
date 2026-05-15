import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import ArticleDate from '@/components/ArticleDate';
import Link from 'next/link';
import Image from 'next/image';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Правильная типизация для Next.js 15+ (params - это Promise)
type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published');

  console.log('Generating static params for posts:', posts?.map(p => p.slug));

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;
export const revalidate = 0;

export default async function BlogPostPage({ params }: PageProps) {
  // Ждем params, так как это Promise
  const { slug } = await params;
  
  console.log('=== BLOG POST PAGE ===');
  console.log('Extracted slug:', slug);

  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories:category_id (name, slug)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    console.log(`Post with slug "${slug}" not found`);
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/blog" className="text-indigo-600 hover:text-indigo-800">
          ← Назад к списку
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-4 border-b">
        <ArticleDate
          date={post.publish_date || post.created_at}
          format="full"
        />
        {post.author && <span>👤 {post.author}</span>}
        {post.categories && (
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
            {post.categories.name}
          </span>
        )}
      </div>

      {post.image_url && (
         <div className="relative mb-8 rounded-lg overflow-hidden w-full h-[500px]">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
      )}

      {post.description && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg italic text-gray-700">
          {post.description}
        </div>
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
    </article>
  );
}
