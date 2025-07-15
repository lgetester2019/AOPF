"use client";

import Image from "next/image";

const documents = [
    {
        title: "Декларация соответствия",
        href: "/docs/deklaraciya_sootvetstviya_obrazec.pdf",
    },
    {
        title: "Образец приказа о завершении СОУТ",
        href: "/docs/obrazec_prikaza_o_zavershenii_sout.pdf",
    },
    {
        title: "Образец приказа о создании комиссии и график",
        href: "/docs/obrazec_prikaza_o_sozdanii_komissii_i_grafik.pdf",
    },
    {
        title: "Образец техзадания",
        href: "/docs/obrazec_tehzadaniya.pdf",
    },
    {
        title: "Пример оформления доп. соглашения по результатам СОУТ",
        href: "/docs/primer__oformleniya_dop._soglasheniya_po_rezuljtatam_sout.pdf",
    },
];

export default function DocumentsSamples() {
    return (
        <section className="pb-10 md:py-12 rounded-3xl bg-white">
            <div className="max-w-[1350px] mx-auto px-4 sm:px-6 md:px-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-900 relative inline-block">
                    Образцы документов
                    <span className="block h-1 w-full bg-green-600 rounded-full mx-auto mt-3 sm:mt-4"></span>
                </h2>

                <div
                    className="flex gap-4 sm:gap-10 overflow-x-auto px-1 sm:px-4 md:px-0 scroll-smooth hide-scrollbar"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {documents.map(({ title, href }, index) => (
                        <a
                            key={index}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-44 md:w-56 lg:w-64
                flex flex-col items-center bg-gray-50 rounded-2xl border-2 border-gray-200
                p-4 sm:p-5 cursor-pointer hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="relative w-full h-[160px] sm:h-[200px] md:h-[250px] flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-300">
                                <Image
                                    src="/pdf-file.svg"
                                    alt="PDF файл"
                                    width={90}
                                    height={90}
                                    className="object-contain"
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
