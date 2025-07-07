import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import OtherServices from "@/components/OtherServices";
import ContactForm from "@/components/ContactForm";
import ClientsSection from "@/components/ClientsSection";
import Certificates from "@/components/Certificates";

export default function SUOTFullPage() {
    return (
        <>
            <Header />
            <main className="max-w-[1350px] mx-auto px-6 pt-40 pb-10 font-sans text-gray-800">
                <header className="relative rounded-3xl overflow-hidden shadow-lg mb-12">
                    <img
                        src="/suot.jpg"
                        alt="Система управления охраной труда"
                        className="w-full h-80 object-cover brightness-90"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Аудит, разработка системы управления охраной труда (СУОТ)
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            В соответствии со статьей 212 ТК РФ работодатель обязан обеспечить создание и функционирование системы управления охраной труда
                        </p>
                        <button className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300">
                            Заказать консультацию
                        </button>
                    </div>
                </header>

                <section className="space-y-8 leading-relaxed text-gray-700">
                    <h2 className="text-2xl font-bold text-green-600 border-l-4 border-green-600 pl-4 mb-4">
                        Перечень документов системы управления охраной труда
                    </h2>

                    <p className="mt-8 text-lg  ">
                        Система управления охраной труда (СУОТ) включает разработку комплекса нормативных документов, регламентирующих деятельность организации в сфере охраны труда.
                    </p>

                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Положение о системе управления охраной труда:</strong>
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-700">
                                <li>Основные направления политики Компании в области охраны труда</li>
                                <li>Процедура распределения обязанностей по обеспечению охраны труда</li>
                                <li>Реестр опасностей, причины и источники возникновения</li>
                                <li>Процедура идентификации опасностей, оценки и управления профессиональными рисками</li>
                                <li>Процедура разработки и применения инструкций по охране труда</li>
                                <li>Процедура проведения обучения и инструктажей по охране труда и проверки знаний</li>
                                <li>Процедура проведения стажировки новых сотрудников (при необходимости)</li>
                                <li>Процедура оказания первой (доврачебной) помощи пострадавшим при несчастном случае</li>
                                <li>Процедура прохождения медосмотров (предварительных и периодических)</li>
                                <li>Процедура расследования и учета несчастных случаев</li>
                                <li>Процедура обеспечения СИЗ (при необходимости), обучение их использования</li>
                            </ul>
                        </li>

                        <li>
                            <strong>Процедура подготовки работников по охране труда:</strong>
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-700">
                                <li>Перечень должностей сотрудников, освобожденных от прохождения первичного и повторных инструктажей на рабочем месте</li>
                                <li>Приказ о назначении сотрудников, ответственных за проведение инструктажа на рабочем месте</li>
                                <li>Перечень должностей и видов работ, для которых разрабатываются инструкции по ОТ</li>
                                <li>Перечень инструкций по охране труда</li>
                                <li>Перечень наставников (должность, ФИО) для стажировки по охране труда</li>
                                <li>Перечень должностей работников, проходящих обучение и проверку знаний в учебном центре</li>
                                <li>Перечень должностей работников, проходящих подготовку по ОТ в аттестационной комиссии организации</li>
                                <li>Перечень профессий и видов работ с повышенными требованиями безопасности (если применимо)</li>
                            </ul>
                        </li>
                    </ol>
                </section>
                <Certificates />

                <OtherServices currentHref="/services/audit" />
                <ClientsSection />

                <ContactForm></ContactForm>

            </main>

            <Footer></Footer>

        </>
    );
}
