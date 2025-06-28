"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

const SearchToggle = () => {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    return (
        <div className="relative flex items-center">
            {/* Анимация поиска */}
            <div
                className={`transition-all duration-300 overflow-hidden ${
                    open ? "w-48 sm:w-64 ml-2" : "w-0"
                }`}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Поиск..."
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none"
                />
            </div>

            {/* Кнопка переключения */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={open ? "Закрыть поиск" : "Открыть поиск"}
            >
                {open ? <X size={20} /> : <Search size={20} />}
            </button>
        </div>
    );
};

export default SearchToggle;
