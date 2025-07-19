
import Link from "next/link";
import {ArrowRight, FileText} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import { Droplets, Wind, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Все услуги по охране труда и экологии — СОУТ, риски, замеры, СУОТ",
    description:
        "Полный список услуг по охране труда: специальная оценка условий труда (СОУТ), оценка профессиональных рисков, разработка СУОТ, измерения факторов, производственный контроль и анализ воды.",
};


export default function ServicesPage() {
    return (
        <>
        <Header></Header>
            <main className="max-w-[1350px] mx-auto px-6 pt-36">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
                    Наши услуги
                </h1>
                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className="group relative block overflow-hidden rounded-3xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-80 w-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    priority={false}
                                    quality={75}
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />


                                {}
                                <div className="absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-sm p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                        {service.description}
                                    </p>
                                    <div
                                        className="inline-flex items-center gap-2 text-green-700 font-semibold group-hover:translate-x-1 transition-transform">
                                        Подробнее
                                        <ArrowRight className="w-5 h-5"/>
                                    </div>
                                </div>
                            </div>
                        </Link>


                    ))}
                </div>
                <section className="my-10 relative overflow-hidden rounded-3xl shadow-xl bg-green-600/80">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl"></div>
                    <div className="relative z-10 p-10 text-white">
                        <h2 className="text-3xl font-extrabold mb-8 text-white drop-shadow-lg text-center">
                            Дополнительные услуги
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 text-white/90">
                            {}
                            <div
                                className="flex flex-col items-center text-center bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-2xl p-6 shadow-md">
                                <Droplets className="w-10 h-10 mb-4 text-white"/>
                                <h3 className="text-xl font-semibold mb-2">Услуги экологического направления</h3>
                                <p className="text-sm">
                                    Исследования воды. Контроль качества питьевой, сточной, природной воды<br/>
                                    по санитарным нормам и проектам.
                                </p>
                            </div>

                            {}
                            <div
                                className="flex flex-col items-center text-center bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-2xl p-6 shadow-md">
                                <ShieldCheck className="w-10 h-10 mb-4 text-white"/>
                                <h3 className="text-xl font-semibold mb-2">Производственный контроль</h3>
                                <p className="text-sm">
                                    Создание и ведение программы ПК<br/>
                                    по всем необходимым измерениям.
                                </p>
                            </div>

                            {}
                            <div
                                className="flex flex-col items-center text-center bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-2xl p-6 shadow-md">
                                <FileText className="w-10 h-10 mb-4 text-white"/>
                                <h3 className="text-xl font-semibold mb-2">Транспортно-технологические карты</h3>
                                <p className="text-sm">
                                    Разработка и оформление технологических карт<br/>
                                    на погрузо-разгрузочные работы (ПРР).
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


            </main>
            <Footer></Footer>
        </>
    );
}
