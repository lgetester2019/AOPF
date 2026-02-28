'use client'

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

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Post {
    id: string;
    title: string;
    description: string;
    content: string;
    created_at: string;
    publish_date: string;
    category_id: string | null;
    author: string | null;
    status: string;
    slug: string;
    image_url: string | null;
    categories?: Category | null;
}

export default function AdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('id, name, slug')
                .order('name');

            if (error) {
                console.error('Ошибка загрузки категорий:', error);
                return;
            }

            setCategories(data || []);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    async function fetchPosts() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    id,
                    title,
                    description,
                    content,
                    created_at,
                    publish_date,
                    category_id,
                    author,
                    status,
                    slug,
                    image_url,
                    categories:category_id (id, name, slug)
                `)
                .order('publish_date', { ascending: false });

            if (error) {
                alert('Ошибка загрузки постов: ' + error.message);
                setLoading(false);
                return;
            }

            const formattedData = (data || []).map((item: any) => ({
                ...item,
                categories: Array.isArray(item.categories) && item.categories.length > 0 
                    ? item.categories[0] 
                    : null
            }));

            setPosts(formattedData);
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteConfirmed() {
        if (!deletingPostId) return;
        
        try {
            const { error } = await supabase.from('posts').delete().eq('id', deletingPostId);
            
            if (error) {
                alert('Ошибка удаления: ' + error.message);
            } else {
                await fetchPosts();
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при удалении');
        } finally {
            setDeletingPostId(null);
        }
    }

    const filteredPosts = posts.filter(post => {
        if (filter !== 'all' && post.status !== filter) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                post.title?.toLowerCase().includes(term) ||
                post.description?.toLowerCase().includes(term) ||
                post.author?.toLowerCase().includes(term)
            );
        }
        return true;
    });

    const getCategoryName = (post: Post) => {
        if (post.categories && typeof post.categories === 'object' && 'name' in post.categories) {
            return post.categories.name;
        }
        if (post.category_id) {
            const category = categories.find(c => c.id === post.category_id);
            return category?.name || 'Без категории';
        }
        return 'Без категории';
    };

    return (
        <AdminAuth>
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Управление статьями</h1>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/edit/new">
                            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
                                + Новая статья
                            </Button>
                        </Link>
                        <Link href="/admin/categories">
                            <Button variant="outline" className="rounded-full px-5">
                                📁 Категории
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="🔍 Поиск по статьям..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="sm:w-48">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">Все статьи</option>
                            <option value="published">Опубликованные</option>
                            <option value="draft">Черновики</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <span className="ml-3 text-gray-600">Загрузка...</span>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center">
                        <p className="text-gray-500 text-lg mb-4">Пока нет ни одной статьи</p>
                        <Link href="/admin/edit/new">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Создать первую статью
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="p-5">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    {post.title}
                                                </h2>
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    post.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 line-clamp-2 mb-3">
                                                {post.description || 'Нет описания'}
                                            </p>
                                            
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <span>📅</span>
                                                    <span>
                                                        {new Date(post.publish_date || post.created_at).toLocaleDateString('ru-RU', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-1">
                                                    <span>🏷️</span>
                                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full">
                                                        {getCategoryName(post)}
                                                    </span>
                                                </div>
                                                
                                                {post.author && (
                                                    <div className="flex items-center gap-1">
                                                        <span>👤</span>
                                                        <span>{post.author}</span>
                                                    </div>
                                                )}
                                                
                                                {post.image_url && (
                                                    <div className="flex items-center gap-1">
                                                        <span>🖼️</span>
                                                        <span className="text-xs">Есть изображение</span>
                                                    </div>
                                                )}
                                            </div>

                                            {post.slug && (
                                                <div className="mt-2 text-xs text-gray-400">
                                                    URL: /articles/{post.slug}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex lg:flex-col gap-2 lg:min-w-[120px]">
                                            <Link
                                                href={`/admin/edit/${post.id}`}
                                                className="flex-1 lg:flex-none text-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                                            >
                                                ✏️ Редактировать
                                            </Link>
                                            
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        onClick={() => setDeletingPostId(post.id)}
                                                        className="flex-1 lg:flex-none px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                                                    >
                                                        🗑️ Удалить
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Статья "{post.title}" будет навсегда удалена из базы данных.
                                                            Это действие нельзя отменить.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={() => setDeletingPostId(null)}>
                                                            Отмена
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction 
                                                            onClick={handleDeleteConfirmed}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Удалить
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && posts.length > 0 && (
                    <div className="mt-6 text-sm text-gray-500 text-center">
                        Всего статей: {posts.length} • 
                        Опубликовано: {posts.filter(p => p.status === 'published').length} • 
                        Черновиков: {posts.filter(p => p.status === 'draft').length}
                    </div>
                )}
            </div>
        </AdminAuth>
    );
}
