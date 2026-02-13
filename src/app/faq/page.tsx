import Header from "@/components/Header";
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export default function FaqPage() {
    return (
        <>
            <Header />
            <main className="max-w-[1350px] mx-auto px-6 py-40 pb-16 font-sans text-gray-800">
                <header className="relative rounded-3xl overflow-hidden shadow-lg mb-12">
                    <div className="relative w-full h-80">
                        <Image
                            src="/ask.jpg"
                            alt="Вопросы и ответы"
                            fill
                            className="object-cover brightness-90"
                            sizes="100vw"
                            priority={false}
                        />
                    </div>
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Вопросы и ответы
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Часто задаваемые вопросы по оценке условий труда
                        </p>
                    </div>
                </header>

                <section className="space-y-10 leading-relaxed text-gray-700">
                    <Accordion type="single" collapsible className="space-y-6">

                        {}
                        <AccordionItem value="faq1">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Верно ли, что если рабочее место является временным и создано на срок менее 12
                                    месяцев, то специальная оценка условий труда по нему все равно должна проводиться,
                                    несмотря на ст. 17 Федерального закона от 28.12.2013 N 426-ФЗ, согласно которой
                                    внеплановая спецоценка проводится в течение 12 месяцев со дня ввода в эксплуатацию
                                    вновь организованного рабочего места?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    МИНИСТЕРСТВО ТРУДА И СОЦИАЛЬНОЙ ЗАЩИТЫ РОССИЙСКОЙ ФЕДЕРАЦИИ<br/>
                                    ПИСЬМО от 28 августа 2017 г. № 15-1/ООГ-2410<br/><br/>
                                    В соответствии со статьей 212 ТК РФ проведение СОУТ является обязанностью
                                    работодателя. Согласно ст. 3 ФЗ № 426-ФЗ, СОУТ не проводится только в отношении
                                    надомников, дистанционных работников и тех, кто работает на физлиц (не
                                    ИП).<br/><br/>
                                    На всех других рабочих местах СОУТ обязательна, в том числе на временных и сезонных
                                    местах. Она может быть проведена в период фактической деятельности на таких местах.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {}
                        <AccordionItem value="faq2">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Что делать, если работник отказывается подписывать карту специальной оценки условий
                                    труда?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    Работника необходимо ознакомить с картой СОУТ под подпись в течение 30 дней с
                                    момента её проведения (ч. 2 п. 4 ст. 4 ФЗ-426).<br/>
                                    Если сотрудник отказывается, нужно составить акт об отказе в произвольной форме.
                                    Главное – зафиксировать факт ознакомления.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {}
                        <AccordionItem value="faq3">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Кто обязан проводить специальную оценку условий труда – работодатель или
                                    организация-клиент, где фактически работают сотрудники работодателя?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base mb-4">
                                    СОУТ всегда проводит сам работодатель, даже если сотрудники трудятся на территории
                                    клиента. Исключение – дистанционные работники, для которых СОУТ не требуется.
                                </p>
                                <p className="text-base italic">
                                    Обоснование: ст. 212 ТК РФ, ст. 3 и ст. 8 ФЗ № 426-ФЗ. Работодатель организует и
                                    финансирует СОУТ. Для рабочих мест вне территории работодателя взаимодействие с
                                    клиентами должно быть зафиксировано договором.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {}
                        <AccordionItem value="faq5">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Проводится ли внеплановая специальная оценка условий труда при изменении
                                    наименования должности в штатном расписании?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base mb-4">
                                    Да, если изменились условия труда. Если условия остались прежними – внеплановая СОУТ
                                    не обязательна, но решение об этом должно быть оформлено протоколом комиссии.
                                </p>
                                <p className="text-base italic mb-2">Обоснование:</p>
                                <p className="text-base">
                                    Согласно п. 1 ч. 1 ст. 17 ФЗ № 426-ФЗ, внеплановая СОУТ проводится при вводе новых
                                    рабочих мест. Переименование, повлекшее изменение условий труда – это новое место.
                                </p>
                                <p className="text-base text-gray-600">(Письмо Минтруда РФ от 25.04.2016 №
                                    15-1/ООГ-1635)</p>
                            </AccordionContent>
                        </AccordionItem>

                        {}
                        <AccordionItem value="faq6">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Нужна ли внеплановая СОУТ, если работодатель переместил рабочее место в новый офис?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base mb-4">
                                    Да. Перемещение рабочего места = ввод нового. СОУТ нужно провести в течение 12
                                    месяцев с начала работы на новом месте.
                                </p>
                                <p className="text-base mb-4">
                                    Внеплановая СОУТ обязательна при:
                                </p>
                                <ul className="list-disc text-base list-inside ml-6 space-y-2">
                                    <li>изменении технологии, материалов, СИЗ;</li>
                                    <li>несчастных случаях/профзаболеваниях;</li>
                                    <li>вводе новых рабочих мест.</li>
                                </ul>
                                <p className="mt-4 bg-red-100 border-l-4 border-red-400 text-base p-4 rounded">
                                    Нарушение сроков = штраф по ст. 5.27.1 КоАП РФ:
                                    <br/>– должностные и ИП: 5–10 тыс. ₽;
                                    <br/>– юрлица: 60–80 тыс. ₽.
                                </p>
                                <p className="text-base mt-2 text-gray-600">
                                    (Письмо Минтруда от 23.01.2017 № 15-1/ООГ-169)
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {}
                        <AccordionItem value="faq7">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Надо ли вносить изменения в трудовой договор по результатам проведения СОУТ?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base mb-4">
                                    Да. По ст. 57 ТК РФ и письму Минтруда от 14.07.2016 № 15-1/ООГ-2516, необходимо
                                    указать условия труда, гарантии и компенсации.
                                </p>
                                <ul className="list-disc text-base list-inside ml-6 space-y-2 mb-4">
                                    <li>При приеме на новое место – указать общие характеристики.</li>
                                    <li>После СОУТ – внести класс условий и компенсации.</li>
                                    <li>При изменении условий – уведомить за 2 месяца, оформить допсоглашение.</li>
                                </ul>
                                <p className="text-base">
                                    Важно: уведомление ≠ ознакомление. Работник должен расписаться в карте СОУТ.
                                </p>
                                <p className="text-base mt-2 text-gray-600">
                                    (Письмо Минтруда от 14.07.2016 № 15-1/ООГ-2516)
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        {}
                        <AccordionItem value="faq8">
                            <AccordionTrigger>
                                <h2 className="text-xl font-bold border-l-4 border-green-600 pl-4 text-green-600">
                                    Вносятся ли дополнительные страховые взносы, если спецоценкой были установлены
                                    вредные условия труда?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base mb-4">
                                    Да. По ФЗ № 212-ФЗ, если рабочему месту присвоен класс условий труда 3.1 и выше,
                                    работодатель обязан платить допвзносы на пенсионное страхование.
                                </p>
                                <p className="text-base mb-4">
                                    Для класса 3.1 – ставка 2%, для более вредных – выше.
                                </p>
                                <p className="text-base mb-4">
                                    При улучшении условий проводится внеочередная СОУТ. Если класс снижается до 2,
                                    допвзносы можно не платить с даты вступления отчета в силу.
                                </p>
                                <p className="text-base text-gray-600">
                                    (Федеральный закон от 24.07.2009 № 212-ФЗ)
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </section>

                <ContactForm/>
            </main>
            <Footer></Footer>
        </>
    );
}
