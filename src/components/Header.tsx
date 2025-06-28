"use client";

import React, { useState, useRef } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    ChevronDown,
    Send,
    PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DropdownMenu from "@/components/DropdownMenu";
import SearchToggle from "@/components/SearchToggle";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    return (
        <header className="w-full">
            {/* Верхняя полоса */}
            <div className="w-full bg-green-600/20">
                <div className="max-w-[1350px] mx-auto flex justify-between items-center px-6 py-2 text-sm text-gray-700">
                    {/* Слева: город и время */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-gray-900 font-bold" />
                            <span>Санкт-Петербург</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-gray-900" />
                            <span>Пн–Пт 9:00–18:00</span>
                        </div>
                    </div>

                    {/* Справа: email, телефон и соцсети */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-900" />
                            <span>info@aopf.ru</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-900" />
                            <span>8 (812) 441–37–78</span>
                        </div>

                        {/* Telegram */}
                        <a
                            href="https://t.me/your_channel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Telegram"
                        >
                            <Send size={18} className="text-[#0088cc]" />
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/79111234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="WhatsApp"
                        >
                            <PhoneCall size={18} className="text-[#25D366]" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Основной хедер */}
            <div className="bg-white rounded-b-4xl shadow-sm">
                <div className="max-w-[1350px] mx-auto flex items-center justify-between px-6 py-4 gap-6">
                    {/* Логотип */}
                    <div className="flex items-center gap-3">
                        <img src="/logo_aopf.png" alt="Логотип" className="h-10 w-auto" />
                    </div>

                    {/* Центр: Меню */}
                    <nav className="flex gap-3 text-base font-semibold text-gray-800 flex-shrink-0">
                        <a href="#" className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300">
                            Услуги
                        </a>
                        <a href="#" className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300">
                            Лаборатория
                        </a>
                        <div
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className="flex items-center gap-1 px-3 py-1 hover:text-green-600 transition-colors duration-300"
                                aria-haspopup="true"
                                aria-expanded={isOpen}
                            >
                                О нас
                                <ChevronDown size={16} className="mt-[1px]" />
                            </button>
                            {isOpen && (
                                <div className="absolute left-0 top-full mt-2 flex-col bg-white shadow-lg rounded-lg border z-50 min-w-[220px]">
                                    <DropdownMenu />
                                </div>
                            )}
                        </div>
                        <a href="#" className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300">
                            Контакты
                        </a>
                        <a href="#" className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300">
                            Документы
                        </a>
                    </nav>

                    {/* Справа: Поиск и кнопка */}
                    <div className="flex items-center gap-4 ml-auto">
                        <SearchToggle />
                        <Button className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-full px-5 py-2 font-semibold transition-colors duration-300 shadow-sm">
                            Подать заявку
                        </Button>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
