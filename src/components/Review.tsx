"use client";

import Image from "next/image";

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
        name: "Екатерина К.",
        company: 'Компания ОАО "Твой дом"',
        works: "специальная оценка условий труда для 50 рабочих мест сборщиков диванов",
        scanSrc: "/reviews/scan-placeholder-1.jpg",
    },
    {
        id: 2,
        name: "Иван П.",
        company: 'Компания ООО "СтройСервис"',
        works: "экспертная оценка производственных рисков на строительной площадке",
        scanSrc: "/reviews/scan-placeholder-2.jpg",
    },
    {
        id: 3,
        name: "Марина С.",
        company: 'ЗАО "ЭкоПром"',
        works: "проведение экологического мониторинга и анализ выбросов",
        scanSrc: "/reviews/scan-placeholder-3.jpg",
    },
    {
        id: 4,
        name: "Алексей В.",
        company: 'ООО "ТехноСтрой"',
        works: "аудит системы охраны труда и внедрение новых стандартов безопасности",
        scanSrc: "/reviews/scan-placeholder-4.jpg",
    },
];

export default function Reviews() {
    return (
        <section className="pb-10 mb-10 md:py-12 rounded-3xl bg-white max-w-[1350px] mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-900 relative inline-block">
                Отзывы клиентов
                <span className="block h-1 w-full bg-green-600 rounded-full mx-auto mt-3"></span>
            </h2>

            <div
                className="
                    flex overflow-x-auto scroll-smooth hide-scrollbar gap-4
                    sm:grid sm:grid-cols-2 sm:gap-6
                    md:grid-cols-4
                "
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {reviews.map(({ id, name, company, works, scanSrc }) => (
                    <div
                        key={id}
                        className="flex-shrink-0 w-[280px] sm:w-auto bg-gray-50 rounded-2xl border-2 border-gray-200 p-5 flex flex-col"
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                            <p className="text-gray-700 text-sm">{company}</p>
                        </div>
                        <p className="text-gray-700 mb-4 text-sm line-clamp-3">{works}</p>

                        <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-gray-300 mt-auto">
                            <Image
                                src={scanSrc}
                                alt={`Скан отзыва от ${name}`}
                                fill
                                sizes="(max-width: 768px) 280px, 320px"
                                style={{ objectFit: "cover", objectPosition: "center" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
