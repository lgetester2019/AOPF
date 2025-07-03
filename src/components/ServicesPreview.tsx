"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesPreview() {
    const previewServices = services.slice(0, 4);

    return (
        <section className="py-20">
            <div className="max-w-[1350px] bg-green-600/60 rounded-3xl py-6 lg:py-14 px-4 md:px-12 mx-auto">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-0 md:gap-12 items-start">
                    {}
                    <div className="flex flex-col order-1 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                            Наши ключевые услуги
                        </h2>
                        <p className="text-white/90 text-lg mb-4">
                            Мы предоставляем комплексные решения в области охраны труда, гигиены труда и производственного
                            контроля. Наши услуги ориентированы на соблюдение законодательства, безопасность персонала и
                            оптимизацию рабочих процессов.
                        </p>
                        <p className="text-white/90 text-lg mb-4">
                            Команда экспертов с многолетним опытом работы в различных отраслях помогает выявлять и устранять
                            риски, сопровождает проверочные мероприятия и предоставляет полный цикл поддержки — от
                            консультаций до оформления необходимой документации.
                        </p>
                        <p className="text-white/90 text-lg mb-8">
                            Мы ценим доверие клиентов и стремимся к прозрачному, качественному и эффективному
                            сотрудничеству.
                        </p>

                        {}
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
                    <div className="order-2 md:order-2 flex flex-col gap-6">
                        {previewServices.map((service, index) => (
                            <Link
                                key={index}
                                href={service.href}
                                className="flex items-center gap-4 bg-[#26428b] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow p-4"
                            >
                                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-white/80 mt-1 line-clamp-2">
                                        {service.description}
                                    </p>
                                </div>
                            </Link>
                        ))}

                        {}
                        <div className="mt-1 md:hidden">
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
