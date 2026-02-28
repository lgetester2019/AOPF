'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewArticlePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('Заполните все поля');
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([{
                    title,
                    content,
                    created_at: new Date().toISOString(),
                }])
                .select()
                .single();

            if (error) throw error;
            router.push('/admin');
        } catch (error) {
            console.error('Error:', error);
            alert('Ошибка при создании статьи');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminAuth>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Новая статья</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Заголовок</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Содержание</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows={15}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Сохранение...' : 'Создать'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </AdminAuth>
    );
}
