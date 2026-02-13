"use client";

import Image from "next/image";

const documents = [
    {
        title: "Декларация соответствия",
        files: [
            { href: "/docs/deklaraciya_sootvetstviya_obrazec.pdf", type: "pdf" },
            { href: "/docs/Декларация образец.docx", type: "word" },
        ],
    },
    {
        title: "Образец приказа о завершении СОУТ",
        files: [
            { href: "/docs/obrazec_prikaza_o_zavershenii_sout.pdf", type: "pdf" },
            { href: "/docs/Образец приказа о завершении СОУТ.docx", type: "word" },
        ],
    },
    {
        title: "Образец приказа о создании комиссии и график",
        files: [
            { href: "/docs/obrazec_prikaza_o_sozdanii_komissii_i_grafik.pdf", type: "pdf" },
            { href: "/docs/Приказ СОУТ  о созд. комисс.docx", type: "word" },
        ],
    },

    {
        title: "Пример оформления доп. соглашения по результатам СОУТ",
        files: [
            { href: "/docs/primer__oformleniya_dop._soglasheniya_po_rezuljtatam_sout.pdf", type: "pdf" },
            { href: "/docs/Приказ на внеплан. cпецоценке.docx", type: "word" },
        ],
    },
    {
        title: "Образец техзадания",
        files: [
            { href: "/docs/obrazec_tehzadaniya.pdf", type: "pdf" },
        ],
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
                    {documents.map(({ title, files }, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-44 md:w-52 lg:w-60 flex flex-col items-center bg-gray-50 rounded-2xl border-2 border-gray-200 p-4 sm:p-5"
                        >
                            <div className="flex flex-row gap-3 justify-center mb-4">
                                {files.map((file, i) => (
                                    <a
                                        key={i}
                                        href={file.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:shadow-md transition-shadow duration-300 rounded-lg border border-dashed border-gray-300 bg-white p-2"
                                    >
                                        <Image
                                            src={file.type === "pdf" ? "/pdf-file.svg" : "/word.svg"}
                                            alt={`${file.type.toUpperCase()} файл`}
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </a>
                                ))}
                            </div>

                            <p className="text-center text-gray-900 font-semibold text-sm sm:text-base">
                                {title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
