'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CategoriesAdminPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const { data } = await supabase.from('categories').select('*').order('name');
        setCategories(data || []);
    }

    async function handleAdd() {
        if (!name.trim()) return;
        await supabase.from('categories').insert([{ name }]);
        setName('');
        fetchCategories();
    }

    async function handleDelete(id: string) {
        if (!confirm('Удалить категорию?')) return;
        await supabase.from('categories').delete().eq('id', id);
        fetchCategories();
    }

    function startEditing(id: string, currentName: string) {
        setEditingId(id);
        setEditingName(currentName);
    }

    function cancelEditing() {
        setEditingId(null);
        setEditingName('');
    }

    async function saveEditing() {
        if (!editingName.trim() || !editingId) return;

        await supabase
            .from('categories')
            .update({ name: editingName.trim() })
            .eq('id', editingId);

        cancelEditing();
        fetchCategories();
    }

    return (
        <AdminAuth>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Категории</h1>

                <div className="flex gap-2 mb-4">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border px-3 py-2 rounded w-full"
                        placeholder="Новая категория"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Добавить
                    </button>
                </div>

                <ul className="space-y-2">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            className="border p-3 rounded flex justify-between items-center gap-4"
                        >
                            {editingId === cat.id ? (
                                <div className="flex-1 flex gap-2">
                                    <input
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="border px-3 py-2 rounded w-full"
                                    />
                                    <button
                                        onClick={saveEditing}
                                        className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className="text-gray-500 hover:underline"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="flex-1">{cat.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => startEditing(cat.id, cat.name)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </AdminAuth>
    );
}
