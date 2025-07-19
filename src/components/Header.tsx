"use client";
import React, { useState, useRef } from "react";
import TopBar from "./Header/TopBar";
import MobileMenu from "./Header/MobileMenu";
import MainHeader from "./Header/MainHeader";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {

        }, 100);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white">
            <header className="w-full">
                <TopBar />
                <MainHeader
                    openMobileMenu={() => setMobileMenuOpen(true)}
                    openModal={() => setIsModalOpen(true)}
                />
                {mobileMenuOpen && (
                    <MobileMenu
                        onClose={() => setMobileMenuOpen(false)}
                        isModalOpen={isModalOpen}
                        setModalOpen={setIsModalOpen}
                    />
                )}
            </header>
        </div>
    );
};

export default Header;
