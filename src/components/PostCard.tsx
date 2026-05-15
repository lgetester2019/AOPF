import Link from 'next/link';
import ArticleDate from './ArticleDate';
import Image from 'next/image';
interface PostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    slug: string;
    publish_date: string;
    created_at: string;
    image_url?: string | null; // Добавляем null
    author?: string | null;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {post.image_url && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
           </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <ArticleDate 
              date={post.publish_date || post.created_at} 
              format="short" 
            />
            {post.author && (
              <span className="text-gray-400">👤 {post.author}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
