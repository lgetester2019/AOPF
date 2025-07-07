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
import DropdownServices from "@/components/DropdownServices";

import MobileMenu from "./MobileMenu";
import TopBar from "@/components/Header/TopBar";

const Header: React.FC = () => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimeoutRef = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleServicesMouseEnter = () => {
        clearTimeoutRef();
        setIsServicesOpen(true);
    };

    const handleServicesMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsServicesOpen(false);
        }, 100);
    };

    const handleAboutMouseEnter = () => {
        clearTimeoutRef();
        setIsAboutOpen(true);
    };

    const handleAboutMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsAboutOpen(false);
        }, 100);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white">
            <header className="w-full">
                {}
               <TopBar></TopBar>

                {}
                <div className="bg-white rounded-b-4xl shadow-sm">
                    <div className="max-w-[1350px] mx-auto flex items-center justify-between px-6 py-4 gap-6">
                        <div className="flex items-center gap-4">
                            <a href="/" aria-label="Главная">
                                <img
                                    src="/logo_aopf.png"
                                    alt="Логотип"
                                    className="h-10 w-auto cursor-pointer"
                                />
                            </a>
                            <div
                                className="hidden lg:flex flex-col text-green-600 font-semibold select-none"
                                style={{lineHeight: "1", marginTop: "-0.15rem"}}
                            >
                                <span className="text-lg leading-none">СОУТ от</span>
                                <span className="text-base leading-none">профессионалов</span>
                            </div>
                        </div>

                        {}
                        <nav className="hidden lg:flex gap-3 text-base font-semibold text-gray-800">
                            <div
                                className="relative"
                                onMouseEnter={handleServicesMouseEnter}
                                onMouseLeave={handleServicesMouseLeave}
                            >
                                <button className="flex items-center gap-1 px-3 py-1 hover:text-green-600 transition">
                                    Услуги <ChevronDown size={16}/>
                                </button>
                                {isServicesOpen && (
                                    <div
                                        className="absolute left-0 top-full mt-2 bg-white border shadow-lg rounded-lg z-50 min-w-[220px]">
                                        <DropdownServices/>
                                    </div>
                                )}
                            </div>
                            <a href="#" className="px-3 py-1 hover:text-green-600 transition">
                                Лаборатория
                            </a>
                            <div
                                className="relative"
                                onMouseEnter={handleAboutMouseEnter}
                                onMouseLeave={handleAboutMouseLeave}
                            >
                                <button className="flex items-center gap-1 px-3 py-1 hover:text-green-600 transition">
                                    О нас <ChevronDown size={16}/>
                                </button>
                                {isAboutOpen && (
                                    <div
                                        className="absolute left-0 top-full mt-2 bg-white border shadow-lg rounded-lg z-50 min-w-[220px]">
                                        <DropdownMenu/>
                                    </div>
                                )}
                            </div>
                            <a href="/contacts" className="px-3 py-1 hover:text-green-600 transition">
                                Контакты
                            </a>
                            <a href="#" className="px-3 py-1 hover:text-green-600 transition">
                                Документы
                            </a>
                        </nav>

                        {}
                        <div className="hidden lg:flex items-center gap-4 ml-auto">
                            <SearchToggle/>
                            <Button
                                className="bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white rounded-full px-5 py-2 font-semibold transition">
                                Подать заявку
                            </Button>
                        </div>

                        {}
                        <div className="flex items-center gap-3 lg:hidden ml-auto">
                            <a
                                href="mailto:info.aopf@gmail.com"
                                className="rounded-full hover:bg-gray-100"
                                aria-label="Email"
                            >
                                <Mail size={20} className="text-green-600"/>
                            </a>
                            <a
                                href="tel:88124413778"
                                className="rounded-full hover:bg-gray-100"
                                aria-label="Телефон"
                            >
                                <Phone size={20} className="text-green-600"/>
                            </a>
                            <a
                                href="https://wa.me/79111234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full hover:bg-gray-100"
                                aria-label="WhatsApp"
                            >
                                <BsWhatsapp size={20} className="text-[#25D366]"/>
                            </a>
                            <a
                                href="https://t.me/your_channel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full hover:bg-gray-100"
                                aria-label="Telegram"
                            >
                                <Send size={20} className="text-[#0088cc]"/>
                            </a>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                aria-label="Toggle mobile menu"
                            >
                                {mobileMenuOpen ? (
                                    <AiOutlineClose size={24} className="text-green-600"/>
                                ) : (
                                    <Menu size={24} className="text-green-600"/>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {}
                {mobileMenuOpen && (
                    <MobileMenu onClose={() => setMobileMenuOpen(false)}/>
                )}
            </header>
        </div>
    );
};

export default Header;
