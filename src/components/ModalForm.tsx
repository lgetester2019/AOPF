'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

const ModalForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('sent');
                setFormData({ name: '', phone: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white text-gray-900 w-full max-w-lg mx-auto rounded-2xl shadow-xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                <h3 className="text-2xl font-bold mb-4">Оставьте заявку</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-sm">Ваше имя</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border bg-green-600/10 border-green-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            placeholder="Иван (необязательно)"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Номер телефона *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-green-400 bg-green-600/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            placeholder="+7 (999) 123-45-67"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Комментарий</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-green-400 bg-green-600/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-all duration-300"
                            placeholder="Дополнительная информация..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 font-semibold shadow-sm transition-colors duration-300"
                    >
                        {status === 'sending' ? 'Отправка...' : 'Оставить заявку'}
                    </button>

                    {status === 'sent' && <p className="text-green-600 font-medium mt-4">Форма успешно отправлена!</p>}
                    {status === 'error' && <p className="text-red-600 font-medium mt-4">Ошибка при отправке. Попробуйте позже.</p>}
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
