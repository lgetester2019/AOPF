'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function MenuBar({ editor }: { editor: any }) {
    if (!editor) return null;

    return (
        <div className="flex gap-2 mb-3 flex-wrap">
            {[1, 2, 3].map((level) => (
                <button
                    key={level}
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    className={`px-3 py-1 rounded border ${
                        editor.isActive('heading', { level }) ? 'bg-gray-800 text-white' : 'bg-white'
                    }`}
                >
                    H{level}
                </button>
            ))}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded border ${
                    editor.isActive('bold') ? 'bg-gray-800 text-white' : 'bg-white'
                }`}
            >
                <b>B</b>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded border ${
                    editor.isActive('italic') ? 'bg-gray-800 text-white' : 'bg-white'
                }`}
            >
                <i>I</i>
            </button>
        </div>
    );
}

export default function EditPostPage() {
    const router = useRouter();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingPost, setLoadingPost] = useState(true);


    const [content, setContent] = useState('');


    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: false }),
            Heading.configure({ levels: [1, 2, 3] }),
            Bold,
            Italic,
        ],
        content,
        onUpdate: ({ editor }) => setContent(editor.getHTML()),
    });

    useEffect(() => {
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
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!id) return;

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
            setImageUrl(data.image_url);
            setCategoryId(data.category_id || null);
            setContent(data.content || '');
            setLoadingPost(false);
        }

        fetchPost();
    }, [id]);


    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content);
        }
    }, [editor, content]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('posts')
            .update({
                title,
                description,
                content, // тут html из tiptap
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
                        <MenuBar editor={editor} />
                        <EditorContent
                            editor={editor}
                            className="border p-3 rounded-2xl min-h-[200px] bg-white"
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
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
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
