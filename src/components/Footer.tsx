"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="max-w-[1350px]  mx-auto bg-white text-black rounded-t-[45px] pt-10 border border-t border-gray-300 border-b-0">
            <div className="max-w-[1350px] mx-auto px-6 lg:px-[60px]">
                {}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center text-center lg:text-left mb-10 gap-6">
                    {}
                    <div>
                        <img
                            src="/logo_aopf.png"
                            alt="Логотип"
                            className="h-10
                             w-auto cursor-pointer mx-auto lg:mx-0"
                        />
                    </div>

                    {}
                    <nav className="flex flex-col items-center gap-3 lg:flex-row lg:gap-8 text-sm lg:text-base">
                        <a href="/services" className="hover:underline">Услуги</a>
                        <a href="/documents" className="hover:underline">Документы</a>
                        <a href="/about" className="hover:underline">О нас</a>
                        <a href="/contacts" className="hover:underline">Контакты</a>
                        <a href="/blog" className="hover:underline">Блог</a>

                    </nav>

                    {}
                    <div className="flex justify-center gap-4 text-2xl">
                        <a
                            href="https://t.me/mikeS60"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Telegram"
                            className="hover:text-gray-600"
                        >
                            <FaTelegramPlane />
                        </a>
                        <a
                            href="https://wa.me/79111234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="hover:text-gray-600"
                        >
                            <BsWhatsapp />
                        </a>
                    </div>
                </div>

                {}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10 text-sm lg:text-base">
                    <div className="flex items-center gap-3">
                        <Mail size={16} />
                        <a href="mailto:info.aopf@gmail.com" className="underline hover:text-gray-700">
                            info.aopf@gmail.com
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={16} />
                        <span>8 (812) 441–37–78</span>
                    </div>
                    <div className="text-center sm:text-left">
                        <span>Адрес: 194044, Санкт-Петербург, Б. Сампсониевский пр., 64</span>
                    </div>
                </div>

                <hr className="border-gray-300 mb-6" />

                {}
                <div className="text-center text-xs lg:text-sm pb-6 text-black">
                    &copy; 2025 АОПФ. Все права защищены. Информация на сайте носит исключительно информационный характер и не является публичной офертой.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
