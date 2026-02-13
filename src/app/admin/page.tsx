'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

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
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

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

    async function handleDeleteConfirmed() {
        if (!deletingPostId) return;
        const { error } = await supabase.from('posts').delete().eq('id', deletingPostId);
        if (error) alert('Ошибка удаления: ' + error.message);
        else fetchPosts();
        setDeletingPostId(null);
    }

    return (
        <AdminAuth>
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Список статей</h1>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/new">
                            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
                                + Добавить статью
                            </Button>
                        </Link>
                        <Link
                            href="/admin/categories"
                            className="text-indigo-600 font-medium hover:underline text-sm sm:text-base self-center"
                        >
                            Управление категориями
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <p className="text-gray-600">Загрузка...</p>
                ) : posts.length === 0 ? (
                    <p className="text-gray-500 italic">Пока нет ни одной статьи.</p>
                ) : (
                    <ul className="space-y-5">
                        {posts.map((post) => (
                            <li
                                key={post.id}
                                className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                                        <p className="text-gray-600 mt-1 line-clamp-2">{post.description}</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {new Date(post.created_at).toLocaleDateString('ru-RU')}
                                        </p>
                                    </div>
                                    <div className="flex gap-3 shrink-0">
                                        <Link
                                            href={`/admin/edit/${post.id}`}
                                            className="text-indigo-600 font-medium hover:underline"
                                        >
                                            Редактировать
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    onClick={() => setDeletingPostId(post.id)}
                                                    className="text-red-600 font-medium hover:underline"
                                                >
                                                    Удалить
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Это действие нельзя будет отменить. Статья будет навсегда удалена из базы.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel
                                                        onClick={() => setDeletingPostId(null)}
                                                    >
                                                        Отмена
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction onClick={handleDeleteConfirmed}>
                                                        Удалить
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminAuth>
    );
}
