
import { getArticlesByQuery } from "@/lib/db";
import { getStaticMatches } from "@/lib/staticPages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

type SearchParams = {
    [key: string]: string | string[] | undefined;
};

export default async function SearchPage({
                                             searchParams,
                                         }: {
    searchParams?: SearchParams;
}) {
    const queryRaw = searchParams?.query;
    const query = Array.isArray(queryRaw) ? queryRaw[0] : queryRaw;
    const trimmedQuery = query?.trim();

    const articles = trimmedQuery ? await getArticlesByQuery(trimmedQuery) : [];
    const staticMatches = trimmedQuery ? getStaticMatches(trimmedQuery) : [];

    return (
        <>
            <Header />
            <div className="max-w-[1350px] mx-auto mt-40 px-4 md:px-6">
                {}
                <header className="mb-10 rounded-3xl overflow-hidden relative shadow-xl">
                    <div className="relative w-full h-80">
                        <Image
                            src="/search_banner.jpg" // добавь подходящее изображение
                            alt="Поиск"
                            fill
                            className="object-cover brightness-90"
                            sizes="100vw"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center px-6 text-white">
                        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow mb-2 text-center">
                            Результаты поиска
                        </h1>
                        <p className="max-w-2xl text-center text-lg drop-shadow-md">
                            Мы нашли то, что может вас заинтересовать
                        </p>
                    </div>
                </header>

                {}
                <main className="mb-20 space-y-10">
                    {!trimmedQuery && (
                        <p className="text-gray-600 text-center text-lg">
                            Пожалуйста, введите поисковый запрос.
                        </p>
                    )}

                    {trimmedQuery && !articles.length && !staticMatches.length && (
                        <p className="text-center text-lg text-gray-700">
                            Ничего не найдено по запросу «
                            <span className="font-semibold">{trimmedQuery}</span>».
                        </p>
                    )}

                    {trimmedQuery && (articles.length > 0 || staticMatches.length > 0) && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-center">
                                Результаты для «{trimmedQuery}»
                            </h2>

                            {}
                            {articles.length > 0 && (
                                <div className="mb-12">
                                    <h3 className="text-xl font-semibold mb-4 text-green-600">
                                        Статьи
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {articles.map((article) => (
                                            <a
                                                key={article.id}
                                                href={`/blog/${article.slug}`}
                                                className="block p-5 rounded-2xl border border-gray-200 hover:shadow-md hover:border-green-300 transition duration-200 group"
                                            >
                                                <h4 className="text-lg font-medium text-green-600 group-hover:underline">
                                                    {article.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Читать статью →
                                                </p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {}
                            {staticMatches.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-green-600">
                                        Страницы сайта
                                    </h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {staticMatches.map((page) => (
                                            <a
                                                key={page.href}
                                                href={page.href}
                                                className="block p-5 rounded-2xl border border-gray-200 hover:shadow-md hover:border-green-300 transition duration-200 group"
                                            >
                                                <h4 className="text-lg font-medium text-green-600 group-hover:underline">
                                                    {page.label}
                                                </h4>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Перейти →
                                                </p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
}
