"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchToggle = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="relative flex items-center">
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
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <button
                onClick={() => setOpen((prev) => !prev)}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={open ? "Close search" : "Open search"}
            >
                {open ? <X size={20} /> : <Search size={20} />}
            </button>
        </div>
    );
};

export default SearchToggle;
