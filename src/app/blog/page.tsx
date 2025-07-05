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

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PAGE_SIZE = 6;

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);

            const { count } = await supabase
                .from('posts')
                .select('*', { count: 'exact', head: true });

            setTotal(count || 0);

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })
                .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

            if (error) {
                alert('Ошибка при загрузке статей: ' + error.message);
                setLoading(false);
                return;
            }

            setPosts(data || []);
            setLoading(false);
        }

        fetchPosts();
    }, [page]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <>
            <Header></Header>
        <div className="max-w-[1350px] mt-32 mx-auto p-6 space-y-6">
            <h1 className="text-4xl font-bold mb-6">Блог</h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <PostCardSkeleton key={i} />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <p>Статей пока нет.</p>
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
            <Footer></Footer>
        </>
    );
}
