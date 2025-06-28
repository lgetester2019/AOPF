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
    Menu,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import DropdownMenu from "@/components/DropdownMenu";
import SearchToggle from "@/components/SearchToggle";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            {/* Верхняя полоса — скрыта до lg */}
            <div className="hidden lg:block w-full bg-green-600/20">
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
                    {/* Логотип - слева всегда */}
                    <div className="flex items-center gap-3">
                        <img src="/logo_aopf.png" alt="Логотип" className="h-10 w-auto" />
                    </div>

                    {/* Навигация - видна с lg */}
                    <nav className="hidden lg:flex gap-3 text-base font-semibold text-gray-800 flex-shrink-0">
                        <a
                            href="#"
                            className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300"
                        >
                            Услуги
                        </a>
                        <a
                            href="#"
                            className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300"
                        >
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
                        <a
                            href="#"
                            className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300"
                        >
                            Контакты
                        </a>
                        <a
                            href="#"
                            className="relative px-3 py-1 hover:text-green-600 transition-colors duration-300"
                        >
                            Документы
                        </a>
                    </nav>

                    {/* Кнопки справа (поиск + заявка) для десктопа, видны с lg */}
                    <div className="hidden lg:flex items-center gap-4 ml-auto">
                        <SearchToggle />
                        <Button className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-full px-5 py-2 font-semibold transition-colors duration-300 shadow-sm">
                            Подать заявку
                        </Button>
                    </div>

                    {/* Мобильный блок справа — виден до lg */}
                    <div className="flex items-center gap-3 lg:hidden ml-auto">
                        <a
                            href="mailto:info@aopf.ru"
                            className="rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} className="text-green-600" />
                        </a>
                        <a
                            href="tel:88124413778"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Телефон"
                        >
                            <Phone size={20} className="text-green-600" />
                        </a>
                        <a
                            href="https://wa.me/79111234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="WhatsApp"
                        >
                            <BsWhatsapp size={20} className="text-[#25D366]" />
                        </a>
                        <a
                            href="https://t.me/your_channel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Telegram"
                        >
                            <Send size={20} className="text-[#0088cc]" />
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <AiOutlineClose size={24} className="text-green-600" />
                            ) : (
                                <Menu size={24} className="text-green-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильное меню - полный экран */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col p-3 overflow-y-auto">
                    {/* Кнопка закрытия в правом верхнем углу */}
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="self-end p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
                        aria-label="Close menu"
                    >
                        <AiOutlineClose size={28} className="text-green-600" />
                    </button>

                    <nav className="flex flex-col gap-6 text-lg font-semibold text-gray-800">
                        <a
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-green-600 transition-colors"
                        >
                            Услуги
                        </a>
                        <a
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-green-600 transition-colors"
                        >
                            Лаборатория
                        </a>

                        {/* Подменю "О нас" для мобилки */}
                        <MobileSubMenu title="О нас">
                            <DropdownMenu />
                        </MobileSubMenu>

                        <a
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-green-600 transition-colors"
                        >
                            Контакты
                        </a>
                        <a
                            href="#"
                            onClick={() => setMobileMenuOpen(false)}
                            className="hover:text-green-600 transition-colors"
                        >
                            Документы
                        </a>
                    </nav>

                    <div className="mt-auto">
                        <SearchToggle />
                        <Button
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full mt-6 bg-green-600 text-white rounded-full px-5 py-3 font-semibold shadow-lg"
                        >
                            Подать заявку
                        </Button>
                    </div>
                </div>
            )}

        </header>
    );
};

const MobileSubMenu: React.FC<{ title: string; children: React.ReactNode }> = ({
                                                                                   title,
                                                                                   children,
                                                                               }) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
            >
                {title}
                <ChevronDown
                    size={20}
                    className={`transform transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            {open && <div className="pl-4 border-l border-gray-300">{children}</div>}
        </div>
    );
};

export default Header;
