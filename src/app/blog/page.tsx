import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;

  // Загружаем категории
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name');

  // Загружаем посты с фильтром по категории если нужно
  let query = supabase
    .from('posts')
    .select('id, title, description, slug, publish_date, created_at, image_url, author, category_id, categories:category_id(name, slug)')
    .eq('status', 'published')
    .order('publish_date', { ascending: false });

  if (activeCategory && activeCategory !== 'all') {
    // Находим ID категории по slug
    const cat = categories?.find((c) => c.slug === activeCategory);
    if (cat) {
      query = query.eq('category_id', cat.id);
    }
  }

  const { data: posts } = await query;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Заголовок раздела */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-3">
          <Link href="/" className="hover:text-green-700 transition-colors">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Блог</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Блог</h1>
        <p className="mt-2 text-gray-500 text-lg">
          Полезные статьи об охране труда, СОУТ и безопасности на производстве
        </p>
      </div>

      {/* Фильтр по категориям */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              !activeCategory || activeCategory === 'all'
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-gray-700 border-gray-300 hover:border-green-700 hover:text-green-700'
            }`}
          >
            Все статьи
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat.slug
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-700 hover:text-green-700'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Сетка статей */}
      {!posts || posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Статей пока нет.</p>
          <Link href="/blog" className="mt-4 inline-block text-green-700 hover:underline">
            Посмотреть все статьи
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const category = Array.isArray(post.categories) ? post.categories[0] : post.categories;
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-200"
              >
                {/* Изображение — фиксированная высота */}
                <div className="relative h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
                  {post.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                      <span className="text-5xl text-green-200 select-none">📄</span>
                    </div>
                  )}
                  {/* Категория поверх картинки */}
                  {category && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100 flex items-center gap-1">
                      <Tag size={11} />
                      {category.name}
                    </span>
                  )}
                </div>

                {/* Контент карточки — flex-grow выравнивает высоту */}
                <div className="flex flex-col flex-grow p-5">
                  <h2 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h2>
                  {/* description — зафиксированная высота через line-clamp */}
                  <p className="text-sm text-gray-500 line-clamp-3 flex-grow">
                    {post.description || ''}
                  </p>

                  {/* Футер карточки — всегда внизу */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(post.publish_date || post.created_at)}
                      </span>
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {post.author}
                        </span>
                      )}
                    </div>
                    <span className="text-green-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs font-semibold whitespace-nowrap">
                      Читать <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
