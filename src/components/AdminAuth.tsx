'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { LogOut, Lock } from 'lucide-react';

interface AdminAuthProps {
  children: ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_LOGIN = process.env.NEXT_PUBLIC_ADMIN_LOGIN || '';
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';

  useEffect(() => {
    setMounted(true);
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setError('');
    } else {
      setError('Неверный логин или пароль');
    }
  }

  function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
    setLogin('');
    setPassword('');
  }

  if (!mounted) return null;

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-700 rounded-2xl mb-4">
              <Lock size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Вход в админ-панель</h2>
            <p className="text-gray-500 text-sm mt-1">Только для авторизованных пользователей</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Логин</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                autoFocus
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2.5 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Войти
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Тонкая полоска admin-навигации */}
      <div className="bg-gray-900 text-white px-4 py-2.5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-green-400">Админ-панель</span>
          <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
            Статьи
          </Link>
          <Link href="/admin/categories" className="text-gray-300 hover:text-white transition-colors">
            Категории
          </Link>
          <Link href="/blog" target="_blank" className="text-gray-300 hover:text-white transition-colors">
            Просмотр блога ↗
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-gray-300 hover:text-red-400 transition-colors"
        >
          <LogOut size={14} />
          Выйти
        </button>
      </div>
      {children}
    </>
  );
}
