import Link from 'next/link';

interface Post {
    id: string;
    slug: string;
    title: string;
    description: string;
    content?: string;
    image_url: string;
    created_at: string;
}

interface BlogOverviewProps {
    latestPosts: Post[];
}

function MiniPostCard({ post }: { post: Post }) {
    return (
        <div className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col h-full">
            {post.image_url && (
                <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full object-cover h-32 sm:h-40"
                />
            )}
            <div className="p-4 flex flex-col flex-grow space-y-2">
                <h3 className="text-lg sm:text-xl font-bold">{post.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{post.description}</p>
                <div className="mt-auto pt-2">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="text-green-600 font-semibold hover:underline text-sm sm:text-base"
                    >
                        Читать →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function BlogOverview({ latestPosts }: BlogOverviewProps) {
    if (!latestPosts || latestPosts.length === 0) return null;

    const sortedPosts = [...latestPosts].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const postsToShow = sortedPosts.slice(0, 2);

    return (
        <section className="max-w-[1350px] my-10 mt-24 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#26428b] rounded-3xl shadow-lg p-6 md:p-10 text-white">
            {}
            <div className="flex flex-col justify-center space-y-6 mb-8 md:mb-0">
                <h2 className="text-3xl sm:text-4xl font-bold">Блог нашей лаборатории</h2>
                <p className="text-white/90 text-base sm:text-xl leading-relaxed">
                    В нашем блоге мы регулярно публикуем актуальные и полезные материалы, связанные с охраной труда, экологией, нормативными требованиями и смежными темами. Здесь вы найдёте не только разъяснения сложных правил и законодательных нововведений, но и практические рекомендации, советы экспертов, а также реальные кейсы из профессиональной деятельности нашей лаборатории.
                </p>
                <p className="text-white/90 text-base sm:text-xl leading-relaxed">
                    Мы стараемся делать информацию максимально доступной и понятной, чтобы она была полезна как для специалистов, так и для руководителей предприятий. Следите за обновлениями, чтобы всегда быть в курсе последних изменений, повысить безопасность на рабочем месте и улучшить экологическую ситуацию.
                </p>
                <Link href="/blog" className="text-green-400 font-semibold hover:underline mt-4 text-sm sm:text-base">
                    Перейти ко всем статьям →
                </Link>
            </div>

            {}
            <div className="flex flex-col gap-4 text-black">
                {postsToShow.map(post => (
                    <MiniPostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
