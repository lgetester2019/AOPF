'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import AdminAuth from '@/components/AdminAuth';
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

export default function CategoriesAdminPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

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

    async function handleDeleteConfirmed() {
        if (!deletingId) return;
        await supabase.from('categories').delete().eq('id', deletingId);
        setDeletingId(null);
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
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Категории</h1>

                <div className="flex gap-3 mb-6">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 rounded-md w-full transition"
                        placeholder="Новая категория"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-5 py-2 rounded-md shadow-md transition"
                    >
                        Добавить
                    </button>
                </div>

                <ul className="space-y-3">
                    {categories.map((cat) => (
                        <li
                            key={cat.id}
                            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition"
                        >
                            {editingId === cat.id ? (
                                <div className="flex-1 flex gap-3">
                                    <input
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-3 py-2 rounded-md w-full transition"
                                    />
                                    <button
                                        onClick={saveEditing}
                                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-4 py-2 rounded-md shadow-md transition"
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className="text-gray-600 hover:text-gray-800 font-medium px-3 py-2 rounded-md transition"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="flex-1 text-gray-900 font-medium">{cat.name}</span>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => startEditing(cat.id, cat.name)}
                                            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
                                        >
                                            Редактировать
                                        </button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button
                                                    onClick={() => setDeletingId(cat.id)}
                                                    className="text-red-600 hover:text-red-800 font-semibold transition"
                                                >
                                                    Удалить
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="max-w-md rounded-xl shadow-2xl p-6">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-xl font-bold text-gray-900">
                                                        Удалить категорию?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="mt-2 text-gray-600">
                                                        Это действие нельзя будет отменить. Вы уверены?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter className="mt-6 flex justify-end gap-4">
                                                    <AlertDialogCancel
                                                        onClick={() => setDeletingId(null)}
                                                        className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 transition font-medium"
                                                    >
                                                        Отмена
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={handleDeleteConfirmed}
                                                        className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold transition"
                                                    >
                                                        Удалить
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
