'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface AdminAuthProps {
    children: ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Логин и пароль из env (чтобы были строки)
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

    if (!mounted) {
        // Не рендерим ничего до монтирования, чтобы избежать гидратационных ошибок
        return null;
    }

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Вход в админ-панель</h2>
                    {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
                    <input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full mb-4 p-3 border rounded-2xl"
                        autoFocus
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 p-3 border rounded-2xl"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700 transition"
                    >
                        Войти
                    </button>
                </form>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-end p-4 bg-gray-100 border-b border-gray-300">
                <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-semibold"
                >
                    Выйти
                </button>
            </div>
            {children}
        </>
    );
}
