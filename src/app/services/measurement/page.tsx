import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import OtherServices from "@/components/OtherServices";
import ContactForm from "@/components/ContactForm";
import ClientsSection from "@/components/ClientsSection";
import Certificates from "@/components/Certificates";

export default function MeasurementsPage() {
    return (
        <>
            <Header />
            <main className="max-w-[1350px] mx-auto px-6 pb-10 pt-40 font-sans text-gray-800">
                <header className="relative rounded-3xl overflow-hidden shadow-lg mb-12">
                    <img
                        src="/measurements.jpg"
                        alt="Измерения физических факторов"
                        className="w-full h-80 object-cover brightness-90"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Измерения физических факторов
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Профессиональные инструментальные измерения для оценки условий труда
                        </p>
                        <button className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300">
                            Заказать консультацию
                        </button>
                    </div>
                </header>

                <section className="space-y-8 leading-relaxed text-gray-700">
                    <h2 className="text-2xl font-bold text-green-600 border-l-4 border-green-600 pl-4 mb-4">
                        Список измеряемых физических факторов:
                    </h2>

                    <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                        <li>Микроклимат</li>
                        <li>Освещенность</li>
                        <li>Шум</li>
                        <li>Ультразвук</li>
                        <li>Инфразвук</li>
                        <li>Аэронный состав воздуха</li>
                        <li>Электромагнитные поля (промышленной частоты 50 Гц, от компьютеров, радиочастотного
                            диапазона, постоянное магнитное поле)
                        </li>
                        <li>Электростатическое поле</li>
                        <li>Геомагнитное поле</li>
                        <li>Вибрация (общая, локальная)</li>
                        <li>Ионизирующее излучение</li>
                        <li>Аэрозоли преимущественно фиброгенного действия (АПФД)</li>
                    </ul>

                </section>
                <Certificates />

                <OtherServices currentHref="/services/measurement" />
                <ClientsSection />

                <ContactForm></ContactForm>
            </main>


            <Footer></Footer>

        </>
    );
}
