"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface MobileSearchInputProps {
    onClose: () => void;
}

const MobileSearchInput = ({ onClose }: MobileSearchInputProps) => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/search?query=${encodeURIComponent(trimmed)}`);
            onClose(); // Закрыть меню
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="flex items-center gap-2 mt-6">
            <input
                type="text"
                placeholder="Найти..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                onClick={handleSearch}
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                aria-label="Search"
            >
                <Search size={20} />
            </button>
        </div>
    );
};

export default MobileSearchInput;
