import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import OtherServices from "@/components/OtherServices";
import ContactForm from "@/components/ContactForm";
import ClientsSection from "@/components/ClientsSection";
import Certificates from "@/components/Certificates";
import BenefitsBlock from "@/components/BenefitsBlock";
import PricePreview from "@/components/PricePreview";
import AudienceBlock from "@/components/AudienceBlock";
import ServiceBlock from "@/components/ServiceBlock";
import ServiceProcess from "@/components/ServiceProcess";
import Reviews from "@/components/Review";
import AuditFAQ from "@/components/AuditFAQ";
import ContactMap from "@/components/ContactMap";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export const metadata = {
    title: "Измерения шума, освещённости, вибрации и других факторов на рабочих местах",
    description:
        "Проводим измерения физических факторов: шум, освещённость, вибрация, микроклимат и другие. Сертифицированная лаборатория, точные результаты, протоколы.",
};


const measurementData = [
    { service: "Отбор проб воздуха рабочей зоны", price: "1000 рублей" },
];
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
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="lg:text-4xl text-xl  font-extrabold mb-2 drop-shadow-lg text-center">
                            Измерение физических и химических факторов
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Профессиональные инструментальные измерения для оценки условий труда
                        </p>
                        <button
                            className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300">
                            Заказать консультацию
                        </button>
                    </div>
                </header>

                <Accordion type="multiple" className="space-y-6 mt-16">
                    {/* Физические факторы */}
                    <AccordionItem value="physical-factors">
                        <AccordionTrigger className="hover:no-underline hover:text-green-600/80">
                            <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                Список измеряемых физических факторов
                            </h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc text-lg list-inside ml-4 space-y-1 text-gray-700">
                                <li>Микроклимат (температура, скорость движения воздуха, давление, относительная влажность, интенсивность теплового облучения)</li>
                                <li>Освещенность</li>
                                <li>Шум</li>
                                <li>Ультразвук</li>
                                <li>Инфразвук</li>
                                <li>Аэронный состав воздуха</li>
                                <li>Электромагнитные поля (промышленной частоты 50 Гц, от компьютеров, радиочастотного диапазона, постоянное магнитное поле)</li>
                                <li>Электростатическое поле</li>
                                <li>Ультрафиолетовое излучение</li>
                                <li>Геомагнитное поле</li>
                                <li>Вибрация (общая, локальная)</li>
                                <li>Ионизирующее излучение</li>
                                <li>Аэрозоли преимущественно фиброгенного действия (АПФД)</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Химические факторы */}
                    <AccordionItem value="chemical-factors">
                        <AccordionTrigger className="hover:no-underline hover:text-green-600/80">
                            <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                Список измеряемых химических факторов
                            </h2>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc text-lg  list-inside ml-4 space-y-1 text-gray-700">
                                <li>Аденин</li>
                                <li>Акрилонитрил</li>
                                <li>Алюминий, оксид алюминия</li>
                                <li>Аммиак</li>
                                <li>Ацетон</li>
                                <li>Едкие щелочи</li>
                                <li>Аэрозоль индустриальных масел</li>
                                <li>Серная кислота</li>
                                <li>Бутилакрилат</li>
                                <li>Бутилацетат</li>
                                <li>Гидрофторид</li>
                                <li>Сероводород</li>
                                <li>Оксиды азота</li>
                                <li>Диоксид серы</li>
                                <li>Дициандиагумин</li>
                                <li>Железо</li>
                                <li>Марганец</li>
                                <li>Кобальт</li>
                                <li>Медь</li>
                                <li>Никель</li>
                                <li>Хром</li>
                                <li>Цинк</li>
                                <li>Моноэтаноламин</li>
                                <li>Меркаптаны</li>
                                <li>Озон</li>
                                <li>Свинец</li>
                                <li>Скипидар</li>
                                <li>и др.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <BenefitsBlock></BenefitsBlock>
                <ServiceBlock></ServiceBlock>
                <AudienceBlock/>
                <ServiceProcess></ServiceProcess>
                <ContactForm></ContactForm>
                <Reviews></Reviews>
                <PricePreview
                    title="Измерения и лабораторные исследования"
                    data={measurementData}
                    href="/prices#measurement"
                    customPriceText="150 рублей за 1 показатель"
                />
                <ClientsSection/>
                <AuditFAQ></AuditFAQ>
                <Certificates/>
                <OtherServices currentHref="/services/measurement"/>
                <ContactMap></ContactMap>
            </main>


            <Footer></Footer>

        </>
    );
}
