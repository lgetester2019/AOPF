"use client";

import Image from "next/image";

const certificates = [
    {
        title: "Аттестат аккредитации",
        src: "/certificates/Аттестат аккредитации.jpg",
        href: "/certificates/Аттестат аккредитации.jpg",
        isPdf: false,
    },
    {
        title: "Уведомление о внесении в реестр",
        src: "/certificates/Уведомление о внесение  в реестр.jpg",
        href: "/certificates/Уведомление о внесение  в реестр.jpg",
        isPdf: false,
    },
    {
        title: "Свидетельство МСИ 2024",
        src: "/certificates/2024.png",
        href: "/certificates/Свидетельство МСИ 2024.pdf",
        isPdf: true,
    },
    {
        title: "Свидетельство об участии в МСИ 4 раунд 2023",
        src: "/certificates/2023.png",
        href: "/certificates/свидетельство об участии в МСИ 4 раунд 2023.pdf",
        isPdf: true,
    },
];

export default function Certificates() {
    return (
        <section className="pb-10 md:py-12 rounded-3xl bg-white">
            <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-900 relative inline-block">
                    Наши сертификаты
                    <span className="block h-1 w-full bg-green-600 rounded-full mx-auto mt-3 sm:mt-4"></span>
                </h2>

                <div
                    className="flex gap-4 sm:gap-10 overflow-x-auto px-1 sm:px-4 md:px-0 scroll-smooth hide-scrollbar"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {certificates.map(({ title, src, href, isPdf }, index) => (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={isPdf}
                            className="flex-shrink-0 w-44 md:w-56 lg:w-64
                              flex flex-col items-center bg-gray-50 rounded-2xl border-2 border-gray-200
                              p-4 sm:p-5 cursor-pointer
                              transition-shadow duration-300 "
                        >
                            <div className="relative w-full h-[160px] sm:h-[200px] md:h-[250px] rounded-lg overflow-hidden">
                                <Image
                                    src={src}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 220px"
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                    className="transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <p className="mt-4 text-center text-gray-900 font-semibold text-sm sm:text-base">
                                {title}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
