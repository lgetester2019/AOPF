'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, PhoneCall, MapPin, Clock } from 'lucide-react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        message: ''
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <section
            className="bg-[#26428b] my-10 mt-10 text-white lg:py-12 py-8 px-4 sm:px-6 md:px-10 rounded-3xl max-w-[1350px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
                {}
                <div className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                        Свяжитесь с нами, и наши эксперты<br className="hidden sm:block"/>
                        в течение суток приедут по указанному адресу
                    </h2>
                    <p className="text-base sm:text-xl text-blue-100">
                        Мы работаем быстро, качественно, со строгим соблюдением условий договора и установленных сроков.
                    </p>

                    {}
                    <div className="space-y-5 text-white text-sm sm:text-base">
                        <div className="flex items-center gap-3">
                            <MapPin size={18}/>
                            <span>Санкт-Петербург</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={18}/>
                            <span>Пн–Пт 9:00–18:00</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18}/>
                            <span>8 (812) 441–37–78</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18}/>
                            <span>info.aopf@gmail.com</span>
                        </div>

                        {}
                        <div className="flex items-center gap-6 pt-2">
                            <a
                                href="https://t.me/your_channel"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Telegram"
                                className="hover:opacity-80 transition"
                            >
                                <Send size={22} className="text-[#0088cc]"/>
                            </a>
                            <a
                                href="https://wa.me/79111234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="hover:opacity-80 transition"
                            >
                                <PhoneCall size={22} className="text-[#25D366]"/>
                            </a>
                        </div>
                    </div>
                </div>

                {}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white text-gray-900 p-4 md:p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
                >
                    <div>
                        <label className="block mb-1 font-medium text-sm">Ваше имя *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border bg-green-600/10 border-green-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                            placeholder="Иван"
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
                            rows={6}
                            className="w-full px-4 py-2.5 border border-green-400 bg-green-600/10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-all duration-300"
                            placeholder="Дополнительная информация..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 font-semibold shadow-sm transition-colors duration-300"
                    >
                        Оставить заявку
                    </button>
                </form>
            </div>
        </section>

    );
};

export default ContactForm;
