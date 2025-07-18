'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EditPostPage() {
    const router = useRouter();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const [categories, setCategories] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    const [loadingPost, setLoadingPost] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!id) return;
        fetchPost();
    }, [id]);

    async function fetchCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            alert('Ошибка при загрузке категорий: ' + error.message);
        } else {
            setCategories(data || []);
        }
    }

    async function fetchPost() {
        setLoadingPost(true);
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert('Ошибка загрузки статьи: ' + error.message);
            setLoadingPost(false);
            return;
        }

        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
        setImageUrl(data.image_url);
        setCategoryId(data.category_id || null);
        setLoadingPost(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('posts')
            .update({
                title,
                description,
                content,
                image_url: imageUrl,
                category_id: categoryId,
            })
            .eq('id', id);

        if (error) {
            alert('Ошибка при сохранении: ' + error.message);
            setLoading(false);
            return;
        }

        router.push('/admin');
    }

    if (loadingPost) {
        return (
            <AdminAuth>
                <div className="max-w-3xl mx-auto p-6">
                    <p>Загрузка статьи...</p>
                </div>
            </AdminAuth>
        );
    }

    return (
        <AdminAuth>
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Редактировать статью</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-semibold">Заголовок</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border p-3 rounded-2xl"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Описание</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border p-3 rounded-2xl"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Контент</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border p-3 rounded-2xl"
                            rows={6}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">URL картинки</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full border p-3 rounded-2xl"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Категория</label>
                        <select
                            value={categoryId || ''}
                            onChange={(e) => setCategoryId(e.target.value || null)}
                            className="w-full border p-3 rounded-2xl"
                        >
                            <option value="">Без категории</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white py-3 px-6 rounded-2xl hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Сохраняем...' : 'Сохранить'}
                    </button>
                </form>
            </div>
        </AdminAuth>
    );
}
