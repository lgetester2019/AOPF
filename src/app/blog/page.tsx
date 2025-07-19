'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import PostCard from '@/components/PostCard';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from '@/components/ui/pagination';
import PostCardSkeleton from "@/components/PostCardSkeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PAGE_SIZE = 6;

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [page, selectedCategory]);

    async function fetchCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (!error && data) setCategories(data);
    }

    async function fetchPosts() {
        setLoading(true);

        let query = supabase
            .from('posts')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (selectedCategory) {
            query = query.eq('category_id', selectedCategory);
        }

        const { data: allData, count, error: countError } = await query;

        if (countError) {
            alert('Ошибка при подсчёте: ' + countError.message);
            setLoading(false);
            return;
        }

        setTotal(count || 0);

        // Пагинация
        let pagedQuery = supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

        if (selectedCategory) {
            pagedQuery = pagedQuery.eq('category_id', selectedCategory);
        }

        const { data, error } = await pagedQuery;

        if (error) {
            alert('Ошибка при загрузке статей: ' + error.message);
            setLoading(false);
            return;
        }

        setPosts(data || []);
        setLoading(false);
    }

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <>
            <Header />
            <div className="max-w-[1350px] mt-32 mx-auto p-6 space-y-6">
                {/* Хедер баннер */}
                <header className="max-w-[1350px] mb-6 mx-auto relative rounded-3xl overflow-hidden shadow-lg">

                    <div className="relative w-full h-80">
                        <Image
                            src="/blog_image.jpg"
                            alt="Блог"
                            fill
                            sizes="100vw"
                            quality={75}
                            priority={false}
                            className="object-cover brightness-90"
                        />
                    </div>
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="lg:text-4xl text-xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Блог и полезные материалы
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Тут мы размещаем наиболее актуальные разъяснения, новости и кейсы по СОУТ и измерениям.
                        </p>
                    </div>
                </header>

                {/* Фильтр по категориям */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <button
                        onClick={() => {
                            setSelectedCategory(null); setPage(1); }}
                        className={`px-4 py-2 rounded-full text-sm border ${
                            selectedCategory === null
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Все категории
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => { setSelectedCategory(category.id); setPage(1); }}
                            className={`px-4 py-2 rounded-full text-sm border ${
                                selectedCategory === category.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Посты */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <PostCardSkeleton key={i} />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-600">Статей пока нет.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {/* Пагинация */}
                <Pagination className="mt-10 mb-6 justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={page === i + 1}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <Footer />
        </>
    );
}
