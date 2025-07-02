import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const MobileSubMenu: React.FC<{ title: string; children: React.ReactNode }> = ({
                                                                                   title,
                                                                                   children,
                                                                               }) => {
    const [open, setOpen] = useState(false);
    const contentId = `submenu-${title.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
                aria-expanded={open}
                aria-controls={contentId}
                type="button"
            >
                {title}
                <ChevronDown
                    size={20}
                    className={`transform transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            {open && (
                <div
                    id={contentId}
                    className="pl-4 border-l border-gray-300"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default MobileSubMenu;
