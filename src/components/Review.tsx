'use client';

import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface Review {
    id: number;
    name: string;
    company: string;
    works: string;
    scanSrc: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "А.А. Лобан",
        company: 'ООО «КНАУФ ГИПС», Северо-Западная сбытовая дирекция',
        works: "производственный контроль, СОУТ, анализы воды",
        scanSrc: "/reviews/knauf.jpg",
    },
    {
        id: 2,
        name: "В.Л. Кириллов",
        company: 'ЗАО «Племенной завод «Рабитицы»',
        works: "специальная оценка условий труда",
        scanSrc: "/reviews/rabitici.jpg",
    },
    {
        id: 3,
        name: "ЛЮ.В. Потапов",
        company: 'ООО «Торгсервис 6б»',
        works: "СОУТ, профриски, тех.карты",
        scanSrc: "/reviews/torgservice.jpg",
    },
];

export default function Reviews() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    const openModal = (src: string) => {
        setActiveImage(src);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setActiveImage(null);
    };

    return (
        <section className="pb-10 mb-10 md:py-12 rounded-3xl bg-white max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900 relative inline-block">
                Отзывы клиентов
                <span className="block h-1 w-full bg-green-600 rounded-full mx-auto mt-3"></span>
            </h2>

            <div className="flex overflow-x-auto scroll-smooth hide-scrollbar gap-4 sm:grid sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
                {reviews.map(({ id, name, company, works, scanSrc }) => (
                    <div key={id} className="flex-shrink-0 w-[280px] sm:w-auto bg-gray-50 rounded-2xl border-2 border-gray-200 p-5 flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                            <p className="text-gray-700 text-sm">{company}</p>
                        </div>
                        <p className="text-gray-700 mb-4 text-sm line-clamp-3">{works}</p>

                        <button
                            onClick={() => openModal(scanSrc)}
                            className="relative w-full h-[180px] rounded-lg overflow-hidden border border-gray-300 mt-auto focus:outline-none"
                        >
                            <Image
                                src={scanSrc}
                                alt={`Скан отзыва от ${name}`}
                                fill
                                sizes="(max-width: 768px) 280px, 320px"
                                className="object-cover object-center"
                            />
                        </button>
                    </div>
                ))}
            </div>

            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <Dialog.Panel className="relative max-w-3xl w-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center text-white bg-black/50 rounded-full hover:bg-black transition"
                        >
                            ✕
                        </button>

                        {activeImage && (
                            <Image
                                src={activeImage}
                                alt="Скан отзыва"
                                width={1000}
                                height={800}
                                className="w-full h-auto rounded-lg"
                            />
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </section>
    );
}
