'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Post {
    id: string;
    title: string;
    description: string;
    created_at: string;
}

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select('id, title, description, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            alert('Ошибка загрузки постов: ' + error.message);
            setLoading(false);
            return;
        }

        setPosts(data || []);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Удалить статью?')) return;
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) alert('Ошибка удаления: ' + error.message);
        else fetchPosts();
    }

    return (
        <AdminAuth>
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Список статей</h1>
                    <Link
                        href="/admin/new"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Добавить статью
                    </Link>
                </div>

                {loading ? (
                    <p>Загрузка...</p>
                ) : posts.length === 0 ? (
                    <p>Статей пока нет</p>
                ) : (
                    <ul className="space-y-4">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="border p-4 rounded flex justify-between items-center"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold">{post.title}</h2>
                                    <p className="text-gray-600">{post.description}</p>
                                    <p className="text-gray-400 text-sm">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <Link
                                        href={`/admin/edit/${post.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Редактировать
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminAuth>
    );
}
