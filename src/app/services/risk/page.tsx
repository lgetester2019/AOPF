import Header from "@/components/Header";
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"; // поправь путь если нужно

export default function RiskAssessmentPage() {
    return (
        <>
            <Header />
            <main className="max-w-[1350px] mx-auto px-6 py-40 font-sans text-gray-800">
                {/* Хедер с фото и заголовком */}
                <header className="relative rounded-3xl overflow-hidden shadow-lg mb-12">
                    <img
                        src="/risks.jpg"
                        alt="Оценка профессиональных рисков"
                        className="w-full h-80 object-cover brightness-90"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Оценка профессиональных рисков
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Безопасность, здоровье и соответствие закону — наш приоритет
                        </p>
                        <button className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300">
                            Получить консультацию
                        </button>
                    </div>
                </header>

                {/* Контент — аккордеон */}
                <section className="space-y-10 leading-relaxed  text-gray-700">
                    <Accordion type="single" collapsible className="space-y-6 ">
                        <AccordionItem value="definition w-full cursor-pointer  hover:bg-green-600/10">
                            <AccordionTrigger className="hover:no-underline hover:text-green-600/80  ">
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 hover:text-green-600/80 pl-4 text-green-600">
                                    Что такое профессиональный риск?
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    Профессиональный риск — это вероятность причинения вреда здоровью в
                                    результате воздействия вредных и (или) опасных производственных
                                    факторов при исполнении работником обязанностей по трудовому
                                    договору или в иных случаях, установленных законодательством.
                                </p>
                                <p className="mt-4 italic text-sm">Трудовой Кодекс РФ, статья 209</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="goal">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Цель и обязательность оценки профессиональных рисков
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    Цель оценки и управления профессиональными рисками — обеспечить
                                    безопасность и сохранить здоровье работников в процессе трудовой
                                    деятельности. В соответствии со статьей 212 ТК РФ работодатель обязан
                                    создать и поддерживать систему управления охраной труда, частью которой
                                    является управление профессиональными рисками.
                                </p>
                                <p className="mt-4 bg-green-600/20 p-4 rounded border-l-4 border-green-600/50">
                                    Отсутствие оценки профессиональных рисков — нарушение законодательства
                                    и повод для штрафа до 80 000 ₽ (ч.1 ст. 5.27.1 КоАП РФ).
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="system">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Система управления профессиональными рисками
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">

                                    Для внедрения системы необходимо опираться на анализ исходных данных:</p>
                                <ul className="list-disc text-base mt-2 list-inside ml-6 space-y-2">
                                    <li>
                                        Данные об организационной структуре, штатной численности, видах
                                        деятельности, рабочих местах, оборудовании.
                                    </li>
                                    <li>Результаты анализа производственного травматизма и заболеваний.</li>
                                    <li>Результаты предварительных и периодических медицинских осмотров.</li>
                                    <li>Информация о ранее проведённых мероприятиях по снижению рисков.</li>
                                </ul>
                                <p className="mt-2 text-base">
                                    В системе необходимо назначить ответственных за управление рисками и
                                    проведение оценки, или заключить договор со специализированной
                                    организацией.
                                </p>
                                <p className="text-base">
                                    Работодатель должен обеспечить функционирование процедур:</p>
                                <ul className="list-disc text-base mt-2 list-inside ml-6 space-y-2">
                                    <li>Обучение и подготовка персонала;</li>
                                    <li>Идентификация опасностей и оценка рисков;</li>
                                    <li>Управление рисками;</li>
                                    <li>Документирование;</li>
                                    <li>Информирование и участие работников;</li>
                                    <li>Подготовка к аварийным ситуациям и реагирование на них.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="identification">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Идентификация опасностей и оценка профессиональных рисков
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    Процедуры должны учитывать:</p>
                                <ul className="list-disc text-base mt-2 list-inside ml-6 space-y-2">
                                    <li>Все виды деятельности работников, включая внешних подрядчиков.</li>
                                    <li>Человеческий фактор: ошибки, утомляемость, напряжение.</li>
                                    <li>Опасности в зоне и вне зоны выполнения работ.</li>
                                    <li>Инфраструктуру, оборудование, материалы.</li>
                                    <li>Изменения в процессах, оборудовании и организации труда.</li>
                                </ul>
                                <p className="mt-2 text-base">
                                    Оценка должна соответствовать сложности работ и возможным последствиям.
                                    В случае высокого риска применяются инструментальные и лабораторные
                                    методы.
                                </p>
                                <p className="text-base">
                                    Идентификация и оценка рисков проводится совместно работодателем и
                                    компетентной аттестующей организацией.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="documentation">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Документирование и контроль системы управления рисками
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    Работодатель должен вести актуальную документацию, подтверждающую
                                    внедрение и поддержание системы. Необходимо обеспечивать:
                                </p>
                                <ul className="list-disc list-inside mt-2 text-base ml-6 space-y-2">
                                    <li>Учет нормативных требований и их актуализацию;</li>
                                    <li>Доведение информации до работников и заинтересованных лиц;</li>
                                    <li>Мониторинг условий труда и профессиональных рисков;</li>
                                    <li>Расследование несчастных случаев и заболеваний;</li>
                                    <li>Внутренние аудиты для оценки соответствия и эффективности системы.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="frequency">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Периодичность проведения оценки профессиональных рисков
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">
                                    Процедуру рекомендуется проводить не реже одного раза в год, а также обязательно
                                    при:</p>
                                <ul className="list-disc text-base mt-2 list-inside ml-6 space-y-2">
                                    <li>Установке нового оборудования;</li>
                                    <li>Переносе рабочих мест;</li>
                                    <li>Изменениях в организации труда или материалах;</li>
                                    <li>Любых значимых изменениях в производственном процессе.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="procedure">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Порядок оценки профессионального риска
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <ol className="list-decimal text-base list-inside ml-6 space-y-2">
                                    <li>Определение рабочих мест и профессий.</li>
                                    <li>Анализ операций, выполняемых работниками.</li>
                                    <li>Идентификация опасностей и рисков для каждой операции.</li>
                                    <li>Анализ и расчет рисков и возможных последствий.</li>
                                    <li>Разработка и внедрение мероприятий по снижению рисков.</li>
                                </ol>
                                <p className="mt-4 text-base">
                                    Для оценки целесообразно создать комиссию из руководства,
                                    инженера по охране труда и при необходимости привлечь внешних
                                    экспертов.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="conclusion">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                                    Заключение
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="bg-green-100/40 p-6 rounded-xl border border-green-300 text-base">
                                    Наша организация обладает большим опытом в проведении аттестации
                                    рабочих мест и оценке профессиональных рисков, а также поможет
                                    разработать мероприятия по снижению рисков и подготовить
                                    необходимые документы для системы управления охраной труда.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </main>
        </>
    );
}
