"use client";
import React, { useState, useRef } from "react";
import TopBar from "./Header/TopBar";
import MobileMenu from "./Header/MobileMenu";
import MainHeader from "./Header/MainHeader";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white">
            <header className="w-full">
                <TopBar />
                <MainHeader/>
                {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
            </header>
        </div>
    );
};

export default Header;
