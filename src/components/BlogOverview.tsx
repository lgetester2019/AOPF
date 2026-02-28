'use client';

import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  publish_date: string;
  created_at: string;
  image_url?: string | null;
  author?: string | null;
}

interface BlogOverviewProps {
  posts?: Post[] | null;
}

export default function BlogOverview({ posts = [] }: BlogOverviewProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Последние статьи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
