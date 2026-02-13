"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesPreview() {
    const previewServices = services.slice(0, 4);

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-[1350px] bg-green-600/60 rounded-3xl py-6 lg:py-14 px-4 sm:px-6 md:px-12 mx-auto">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-12 items-start">

                    {}
                    <div className="flex flex-col order-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6">
                            Наши ключевые услуги
                        </h2>
                        <p className="text-white/90 text-base sm:text-lg mb-3">
                            Мы предоставляем комплексные решения в области охраны труда, гигиены труда и производственного
                            контроля. Наши услуги ориентированы на соблюдение законодательства, безопасность персонала и
                            оптимизацию рабочих процессов.
                        </p>
                        <p className="text-white/90 text-base sm:text-lg mb-3">
                            Команда экспертов с многолетним опытом работы в различных отраслях помогает выявлять и устранять
                            риски, сопровождает проверочные мероприятия и предоставляет полный цикл поддержки — от
                            консультаций до оформления необходимой документации.
                        </p>
                        <p className="text-white/90 text-base sm:text-lg mb-6">
                            Мы ценим доверие клиентов и стремимся к прозрачному, качественному и эффективному
                            сотрудничеству.
                        </p>

                        <div className="hidden md:block">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-[#26428b] bg-white px-5 py-2.5 rounded-full font-semibold text-lg hover:bg-gray-100 hover:gap-3 transition-all"
                            >
                                Подробнее
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {}
                    <div className="order-2 flex flex-col gap-4 sm:gap-6">
                        {previewServices.map((service) => (
                            <div
                                key={service.href}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#26428b] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow py-2 px-4"
                            >
                                <div className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h3 className="text-base font-semibold text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-white/80 mt-1 line-clamp-2">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                                        <Link
                                            href="/#form"
                                            className="text-sm text-center font-semibold px-3 py-1 rounded-full bg-white text-[#26428b] hover:bg-gray-100 transition"
                                        >
                                            Заказать
                                        </Link>
                                        <Link
                                            href={service.href}
                                            className="text-sm text-center font-semibold px-3 py-1 rounded-full border border-white text-white hover:bg-white hover:text-[#26428b] transition"
                                        >
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {}
                        <div className="mt-2 md:hidden">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-[#26428b] bg-white px-5 py-2.5 rounded-full font-semibold text-lg hover:bg-gray-100 hover:gap-3 transition-all"
                            >
                                Подробнее
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
