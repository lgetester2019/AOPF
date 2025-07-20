import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import SearchToggle from "@/components/SearchToggle";
import DropdownMenu from "@/components/DropdownMenu";
import DropdownServices from "@/components/DropdownServices";
import MobileSubMenu from "./MobileSubMenu";
import ModalForm from "@/components/ModalForm";
import MobileSearchInput from "@/components/MobileSearchInput";

interface MobileMenuProps {
    onClose: () => void;
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
}

export default function MobileMenu({ onClose, isModalOpen, setModalOpen }: MobileMenuProps) {
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-3 overflow-y-auto">
            <button
                onClick={onClose}
                className="self-end p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
                aria-label="Close menu"
            >
                <AiOutlineClose size={28} className="text-green-600" />
            </button>

            <nav className="flex flex-col gap-6 text-lg font-semibold text-gray-800">
                <MobileSubMenu title="Услуги">
                    <DropdownServices/>
                </MobileSubMenu>

                <a href="/documents" onClick={onClose} className="hover:text-green-600">
                    Документы
                </a>
                <MobileSubMenu title="О нас">
                    <DropdownMenu/>
                </MobileSubMenu>
                <a href="/contacts" onClick={onClose} className="hover:text-green-600">
                    Контакты
                </a>
                <a href="/blog" onClick={onClose} className="hover:text-green-600">
                    Блог
                </a>
            </nav>

            <div className="mt-auto">
                <MobileSearchInput onClose={onClose} />
                <Button
                    onClick={() => {
                        setModalOpen(true);

                    }}
                    className="w-full mt-6 bg-green-600 text-white rounded-full px-5 py-3 font-semibold shadow-lg"
                >
                    Подать заявку
                </Button>


                <ModalForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            </div>
        </div>
    );
}
