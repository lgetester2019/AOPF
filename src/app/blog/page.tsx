import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import ArticleDate from '@/components/ArticleDate';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, description, slug, publish_date, created_at, image_url')
    .eq('status', 'published')
    .order('publish_date', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Блог</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <ArticleDate 
                  date={post.publish_date || post.created_at} 
                  format="short" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
