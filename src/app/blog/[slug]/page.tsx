import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published');
  return (posts || []).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from('posts')
    .select('title, description')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export const dynamicParams = true;
export const revalidate = 0;

function formatDate(dateStr: string, includeTime = false) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  if (includeTime) { opts.hour = '2-digit'; opts.minute = '2-digit'; }
  return d.toLocaleDateString('ru-RU', opts);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*, categories:category_id(name, slug)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    notFound();
  }

  const category = Array.isArray(post.categories) ? post.categories[0] : post.categories;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-green-700 transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-green-700 transition-colors">Блог</Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/blog?category=${category.slug}`}
              className="hover:text-green-700 transition-colors"
            >
              {category.name}
            </Link>
          </>
        )}
      </nav>

      {/* Заголовок */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-5">
        {post.title}
      </h1>

      {/* Мета-блок */}
      <div className="flex flex-wrap items-center gap-3 mb-8 pb-5 border-b border-gray-200">
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar size={14} className="text-green-600" />
          {formatDate(post.publish_date || post.created_at)}
        </span>
        {post.author && (
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <User size={14} className="text-green-600" />
            {post.author}
          </span>
        )}
        {category && (
          <Link
            href={`/blog?category=${category.slug}`}
            className="flex items-center gap-1.5 text-sm px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 hover:bg-green-100 transition-colors"
          >
            <Tag size={12} />
            {category.name}
          </Link>
        )}
      </div>

      {/* Главное изображение */}
      {post.image_url && (
        <div className="relative mb-8 rounded-2xl overflow-hidden w-full h-[300px] sm:h-[420px]">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Лид / описание */}
      {post.description && (
        <div className="mb-8 p-5 bg-green-50 border-l-4 border-green-600 rounded-r-xl text-gray-700 italic text-base leading-relaxed">
          {post.description}
        </div>
      )}

      {/* Основное содержание — используем blog-content для корректного рендера HTML из Quill */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />

      {/* Нижняя навигация */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          Все статьи блога
        </Link>
      </div>
    </div>
  );
}
