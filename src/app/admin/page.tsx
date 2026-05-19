'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
import { Plus, Folder, Pencil, Trash2, Search, Calendar, Tag, User, Image as ImageIcon } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Category { id: string; name: string; slug: string; }
interface Post {
  id: string; title: string; description: string; content: string;
  created_at: string; publish_date: string; category_id: string | null;
  author: string | null; status: string; slug: string; image_url: string | null;
  categories?: Category | null;
}

function formatDate(str: string) {
  const d = new Date(str);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchPosts(); fetchCategories(); }, []);

  async function fetchCategories() {
    try {
      const { data } = await supabase.from('categories').select('id, name, slug').order('name');
      setCategories(data || []);
    } catch (e) { console.error(e); }
  }

  async function fetchPosts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, description, content, created_at, publish_date, category_id, author, status, slug, image_url, categories:category_id(id, name, slug)')
        .order('publish_date', { ascending: false });

      if (error) { alert('Ошибка загрузки: ' + error.message); return; }

      const formatted = (data || []).map((item: any) => ({
        ...item,
        categories: Array.isArray(item.categories) && item.categories.length > 0
          ? item.categories[0] : null,
      }));
      setPosts(formatted);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleDeleteConfirmed() {
    if (!deletingPostId) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', deletingPostId);
      if (error) { alert('Ошибка удаления: ' + error.message); }
      else { await fetchPosts(); }
    } catch (e) { console.error(e); alert('Произошла ошибка при удалении'); }
    finally { setDeletingPostId(null); }
  }

  const filteredPosts = posts.filter((post) => {
    if (filter !== 'all' && post.status !== filter) return false;
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      return (
        post.title?.toLowerCase().includes(t) ||
        post.description?.toLowerCase().includes(t) ||
        post.author?.toLowerCase().includes(t)
      );
    }
    return true;
  });

  const getCategoryName = (post: Post) => {
    if (post.categories?.name) return post.categories.name;
    if (post.category_id) {
      return categories.find((c) => c.id === post.category_id)?.name || 'Без категории';
    }
    return 'Без категории';
  };

  return (
    <AdminAuth>
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Заголовок */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Статьи блога</h1>
            {!loading && (
              <p className="text-sm text-gray-500 mt-0.5">
                Всего: {posts.length} &nbsp;·&nbsp;
                Опубликовано: {posts.filter((p) => p.status === 'published').length} &nbsp;·&nbsp;
                Черновики: {posts.filter((p) => p.status === 'draft').length}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Link href="/admin/edit/new">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition-colors">
                <Plus size={15} />
                Новая статья
              </button>
            </Link>
            <Link href="/admin/categories">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                <Folder size={15} />
                Категории
              </button>
            </Link>
          </div>
        </div>

        {/* Поиск и фильтр */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 mb-5 flex flex-col sm:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по статьям..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="sm:w-44 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Все статьи</option>
            <option value="published">Опубликованные</option>
            <option value="draft">Черновики</option>
          </select>
        </div>

        {/* Список */}
        {loading ? (
          <div className="flex justify-center items-center py-16 gap-3 text-gray-500">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
            Загрузка...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
            <p className="text-gray-400 text-base mb-4">Статей не найдено</p>
            <Link href="/admin/edit/new">
              <button className="px-4 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition-colors">
                Создать статью
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Заголовок + статус */}
                      <div className="flex items-start gap-2 flex-wrap mb-1.5">
                        <h2 className="text-base font-semibold text-gray-900 leading-snug">
                          {post.title}
                        </h2>
                        {/* Исправлен баг: был bg-green-700 text-green-800 (невидимый текст) */}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                        </span>
                      </div>

                      {/* Описание */}
                      <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                        {post.description || 'Нет описания'}
                      </p>

                      {/* Мета-данные */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {formatDate(post.publish_date || post.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={11} />
                          {getCategoryName(post)}
                        </span>
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User size={11} />
                            {post.author}
                          </span>
                        )}
                        {post.image_url && (
                          <span className="flex items-center gap-1">
                            <ImageIcon size={11} />
                            Есть обложка
                          </span>
                        )}
                      </div>

                      {post.slug && (
                        <div className="mt-1.5 text-xs text-gray-300 font-mono">
                          /blog/{post.slug}
                        </div>
                      )}
                    </div>

                    {/* Кнопки */}
                    <div className="flex lg:flex-col gap-2 lg:w-32 flex-shrink-0">
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-lg transition-colors border border-gray-200"
                      >
                        <Pencil size={13} />
                        Редактировать
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            onClick={() => setDeletingPostId(post.id)}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition-colors border border-red-100"
                          >
                            <Trash2 size={13} />
                            Удалить
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
                            <AlertDialogDescription>
                              «{post.title}» будет навсегда удалена из базы данных. Это действие нельзя отменить.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeletingPostId(null)}>
                              Отмена
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteConfirmed}
                              className="bg-red-600 hover:bg-red-700 text-white"
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
      </div>
    </AdminAuth>
  );
}
