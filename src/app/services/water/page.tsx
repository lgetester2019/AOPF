
import Header from "@/components/Header";
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
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

export const metadata = {
    title: "Исследование воды — качество, безопасность и соответствие нормам",
    description:
        "Профессиональный анализ воды: органолептические, микробиологические и химические исследования для оценки качества и безопасности воды.",
};

const waterData = [
    { service: "Комплексное исследование воды", price: "от 1200 рублей за пробу" },
];

export default function WaterAnalysisPage() {
    return (
        <>
            <Header />
            <main className="max-w-[1350px] mx-auto px-6 pt-40 pb-10 font-sans text-gray-800">
                <header className="relative rounded-3xl overflow-hidden shadow-lg mb-12">
                    <img
                        src="/water.jpg"
                        alt="Исследование воды"
                        className="w-full h-80 object-cover brightness-90"
                    />
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="lg:text-4xl text-xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Исследование воды
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Качество и безопасность вашей воды — наша забота
                        </p>
                        <button
                            className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300">
                            Получить консультацию
                        </button>
                    </div>
                </header>

                <section className="space-y-10 leading-relaxed text-gray-700">
                    <Accordion type="single" collapsible className="space-y-6">

                        <AccordionItem value="why-analysis-needed">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Зачем нужен анализ воды?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc ml-6 space-y-2 text-base">
                                    <li>Определение качества и безопасности воды: выявление загрязняющих веществ,
                                        патогенов, токсинов.
                                    </li>
                                    <li>Контроль соответствия санитарным нормам и требованиям законодательства.</li>
                                    <li>Обеспечение экологической безопасности — выявление загрязнения природных
                                        водоёмов.
                                    </li>
                                    <li>Оптимизация производственных процессов и снижение затрат на предприятиях.</li>
                                    <li>Для научных исследований водной среды, круговорота воды, влияния климата и
                                        т.д.
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="types-of-analysis">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Какие виды анализа воды существуют?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc ml-6 space-y-2 text-base">
                                    <li><strong>Органолептический анализ:</strong> вкус, запах, цветность, мутность
                                        воды.
                                    </li>
                                    <li><strong>Микробиологический анализ:</strong> общее микробное число, наличие
                                        колиморфных бактерий, колифагов.
                                    </li>
                                    <li><strong>Химический анализ:</strong> кислотность (pH), жёсткость, минерализация,
                                        нитраты, фосфаты, соли тяжёлых металлов.
                                    </li>
                                    <li><strong>Биохимическое потребление кислорода (БПК):</strong> показатель
                                        органического загрязнения.
                                    </li>
                                    <li><strong>Специализированные исследования:</strong> состав сточных вод для
                                        оформления отчётности и расчётов сбросов.
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="water-types">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Какие типы воды анализируются?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc ml-6 space-y-2 text-base">
                                    <li><strong>Питьевая вода:</strong> физические, химические, микробиологические
                                        показатели.
                                    </li>
                                    <li><strong>Природная вода:</strong> вода из рек, озёр, скважин — проверка на
                                        загрязнения и природные параметры.
                                    </li>
                                    <li><strong>Сточная вода:</strong> воды после использования в быту и промышленности
                                        — анализ по показателям загрязнения и нормативам сброса.
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="sampling-rules">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Как правильно отбирать пробы воды?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ol className="list-decimal ml-6 space-y-2 text-base">
                                    <li>Используйте чистую пластиковую или стеклянную тару. Не используйте бутылки
                                        из-под сладких и газированных напитков.
                                    </li>
                                    <li>Перед забором воды пролейте её сильной струёй 3–5 минут.</li>
                                    <li>Ополосните тару водой, которую будете отбирать. Моющие средства не
                                        использовать.
                                    </li>
                                    <li>Для микробиологического анализа используйте стерильный контейнер, обработайте
                                        кран спиртом.
                                    </li>
                                    <li>При заборе проб из природных вод — отбирайте с глубины 15–30 см ниже
                                        поверхности.
                                    </li>
                                    <li>Для сточных вод определяйте места отбора: у сбросов, очистных сооружений и
                                        т.д.
                                    </li>
                                    <li>Доставьте пробу в лабораторию не позднее 6 часов с момента отбора, с заполнением
                                        акта отбора.
                                    </li>
                                </ol>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="analysis-steps">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Этапы анализа воды
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc ml-6 space-y-2 text-base">
                                    <li>Отбор проб с соблюдением всех санитарных требований.</li>
                                    <li>Регистрация и оформление образцов в лаборатории.</li>
                                    <li>Проведение органолептических, микробиологических и химических анализов.</li>
                                    <li>Интерпретация результатов с учётом нормативов.</li>
                                    <li>Формирование итогового протокола и выдача заказчику.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="about-company">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    О нас
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="bg-green-100/40 p-6 rounded-xl border border-green-300 text-base">
                                    ООО «АОПФ» — аккредитованная лаборатория с 2011 года. Мы проводим анализ питьевой,
                                    природной и сточной воды по широкому спектру параметров. В составе нашей команды —
                                    опытные специалисты с профильным образованием. Мы используем современное
                                    оборудование и строго соблюдаем требования национальной системы аккредитации.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </section>


                <BenefitsBlock/>
                <ServiceBlock/>
                <AudienceBlock/>
                <ServiceProcess/>
                <ContactForm/>
                <Reviews/>
                <PricePreview
                    title="Анализ воды"
                    data={waterData}
                    href="/prices#water"
                />
                <ClientsSection/>
                <AuditFAQ/>
                <Certificates/>
                <OtherServices currentHref="/services/water"/>
                <ContactMap/>
            </main>
            <Footer/>
        </>
    );
}
