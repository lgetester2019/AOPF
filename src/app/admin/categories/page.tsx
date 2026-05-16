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
import { Button } from '@/components/ui/button';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
}

export default function CategoriesAdminPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [editingSlug, setEditingSlug] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [editingSortOrder, setEditingSortOrder] = useState(0);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const { data } = await supabase
            .from('categories')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('name');
        setCategories(data || []);
    }

    // Автоматическое создание slug из названия
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setSlug(generateSlug(newName));
    };

    async function handleAdd() {
        if (!name.trim()) return;
        
        const finalSlug = slug || generateSlug(name);
        
        await supabase.from('categories').insert([{ 
            name, 
            slug: finalSlug,
            description: description || null,
            sort_order: sortOrder
        }]);
        
        // Сброс формы
        setName('');
        setSlug('');
        setDescription('');
        setSortOrder(0);
        fetchCategories();
    }

    async function handleDeleteConfirmed() {
        if (!deletingId) return;

        // Проверяем, есть ли статьи с этой категорией
        const { count } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('category', deletingId);

        if (count && count > 0) {
            alert('Нельзя удалить категорию, в которой есть статьи');
            setDeletingId(null);
            return;
        }

        await supabase.from('categories').delete().eq('id', deletingId);
        setDeletingId(null);
        fetchCategories();
    }

    function startEditing(cat: Category) {
        setEditingId(cat.id);
        setEditingName(cat.name);
        setEditingSlug(cat.slug);
        setEditingDescription(cat.description || '');
        setEditingSortOrder(cat.sort_order);
    }

    function cancelEditing() {
        setEditingId(null);
        setEditingName('');
        setEditingSlug('');
        setEditingDescription('');
        setEditingSortOrder(0);
    }

    async function saveEditing() {
        if (!editingName.trim() || !editingId) return;

        const finalSlug = editingSlug || generateSlug(editingName);

        await supabase
            .from('categories')
            .update({ 
                name: editingName.trim(),
                slug: finalSlug,
                description: editingDescription || null,
                sort_order: editingSortOrder
            })
            .eq('id', editingId);

        cancelEditing();
        fetchCategories();
    }

    // Функция для перемещения категории вверх/вниз
    async function moveCategory(id: string, direction: 'up' | 'down') {
        const index = categories.findIndex(c => c.id === id);
        if (
            (direction === 'up' && index === 0) || 
            (direction === 'down' && index === categories.length - 1)
        ) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const currentCat = categories[index];
        const swapCat = categories[newIndex];

        // Меняем sort_order местами
        await supabase
            .from('categories')
            .update({ sort_order: swapCat.sort_order })
            .eq('id', currentCat.id);

        await supabase
            .from('categories')
            .update({ sort_order: currentCat.sort_order })
            .eq('id', swapCat.id);

        fetchCategories();
    }

    return (
        <AdminAuth>
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Управление категориями</h1>
                    <Button
                        variant="outline"
                        onClick={() => window.location.href = '/admin'}
                    >
                        ← Назад к статьям
                    </Button>
                </div>

                {/* Форма добавления новой категории */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Добавить категорию</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Название *</label>
                            <input
                                value={name}
                                onChange={handleNameChange}
                                className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 rounded-md w-full transition"
                                placeholder="Например: Новости"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                            <input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 rounded-md w-full transition"
                                placeholder="news"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                URL: /category/{slug || 'slug'}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Описание</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 rounded-md w-full transition"
                                placeholder="Краткое описание категории"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Порядок сортировки</label>
                            <input
                                type="number"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                                className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-4 py-2 rounded-md w-32 transition"
                            />
                        </div>
                        <Button
                            onClick={handleAdd}
                            disabled={!name.trim()}
                            className="bg-green-700 hover:bg-green-600"
                        >
                            Добавить категорию
                        </Button>
                    </div>
                </div>

                {/* Список категорий */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Порядок
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Название
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Описание
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Действия
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((cat, index) => (
                                <tr key={cat.id} className="hover:bg-gray-50">
                                    {editingId === cat.id ? (
                                        // Режим редактирования
                                        <td colSpan={5} className="px-6 py-4">
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input
                                                        value={editingName}
                                                        onChange={(e) => setEditingName(e.target.value)}
                                                        className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-3 py-2 rounded-md w-full"
                                                        placeholder="Название"
                                                    />
                                                    <input
                                                        value={editingSlug}
                                                        onChange={(e) => setEditingSlug(e.target.value)}
                                                        className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-3 py-2 rounded-md w-full"
                                                        placeholder="slug"
                                                    />
                                                </div>
                                                <textarea
                                                    value={editingDescription}
                                                    onChange={(e) => setEditingDescription(e.target.value)}
                                                    className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-3 py-2 rounded-md w-full"
                                                    placeholder="Описание"
                                                    rows={2}
                                                />
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        value={editingSortOrder}
                                                        onChange={(e) => setEditingSortOrder(parseInt(e.target.value) || 0)}
                                                        className="border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none px-3 py-2 rounded-md w-24"
                                                    />
                                                    <Button
                                                        onClick={saveEditing}
                                                        size="sm"
                                                        className="bg-blue-600 hover:bg-blue-700"
                                                    >
                                                        Сохранить
                                                    </Button>
                                                    <Button
                                                        onClick={cancelEditing}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Отмена
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                    ) : (
                                        // Обычный режим отображения
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-900">{cat.sort_order}</span>
                                                    <div className="flex flex-col">
                                                        <button
                                                            onClick={() => moveCategory(cat.id, 'up')}
                                                            disabled={index === 0}
                                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                                            title="Переместить вверх"
                                                        >
                                                            ↑
                                                        </button>
                                                        <button
                                                            onClick={() => moveCategory(cat.id, 'down')}
                                                            disabled={index === categories.length - 1}
                                                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                                            title="Переместить вниз"
                                                        >
                                                            ↓
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {cat.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cat.slug}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                {cat.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                <button
                                                    onClick={() => startEditing(cat)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium"
                                                >
                                                    Редактировать
                                                </button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button
                                                            onClick={() => setDeletingId(cat.id)}
                                                            className="text-red-600 hover:text-red-900 font-medium"
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
                                                                Категория "{cat.name}" будет удалена. 
                                                                Это действие нельзя отменить.
                                                                {cat.description && (
                                                                    <span className="block mt-2 text-yellow-600">
                                                                        Внимание: категорию нельзя удалить, если в ней есть статьи.
                                                                    </span>
                                                                )}
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
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminAuth>
    );
}
