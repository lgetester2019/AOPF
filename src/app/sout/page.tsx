"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React from "react";

export default function SOUTFullPage() {
    return (
        <>
        <Header></Header>
        <main className="max-w-[1350px] mx-auto px-6 py-36 font-sans text-gray-800">
            {/* Хедер с фото и заголовком */}
            <header className="relative rounded-3xl overflow-hidden shadow-lg mb-12">
                <img
                    src="/sout.jpg"
                    alt="Специальная оценка условий труда"
                    className="w-full h-72 object-cover brightness-90"
                />
                <div
                    className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                    <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg text-center">
                        Специальная оценка условий труда (СОУТ)
                    </h1>
                    <p className="max-w-xl text-center text-lg drop-shadow-md">
                        Профессионально, надежно и в полном соответствии с требованиями законодательства
                    </p>
                    <button
                        className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300">
                        Заказать консультацию
                    </button>
                </div>
            </header>

            {/* Контент — разбит на блоки с заголовками и аккуратным форматированием */}
            <section className="space-y-10 leading-relaxed">
                {/* Этапы проведения */}
                <article>
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                        Этапы проведения специальной оценки условий труда
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 text-gray-700">
                        <li>
                            <strong>Заключение гражданско-правового договора</strong> с организацией, проводящей СОУТ.
                        </li>
                        <li>
                            <strong>Выезд специалиста</strong> для проведения идентификации потенциально вредных и (или) опасных производственных факторов и их измерений (при необходимости).
                        </li>
                        <li>
                            <strong>Подготовка отчёта</strong> организацией, проводящей СОУТ, который включает:
                            <ul className="list-disc list-inside mt-2 ml-6 space-y-1 text-gray-600">
                                <li>Сведения об организации с копиями подтверждающих документов;</li>
                                <li>Перечень рабочих мест с указанием вредных и опасных факторов;</li>
                                <li>Карты специальной оценки условий труда с классами условий труда;</li>
                                <li>Протоколы исследований и измерений;</li>
                                <li>Протокол комиссии о невозможности проведения исследований (если есть);</li>
                                <li>Сводная ведомость СОУТ;</li>
                                <li>Перечень мероприятий по улучшению условий и охраны труда;</li>
                                <li>Заключения эксперта организации.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Подписание отчета</strong> и уведомление специализированной организации в течение 3 рабочих дней.
                        </li>
                        <li>
                            <strong>Ознакомление работников</strong> с результатами СОУТ под роспись в срок до 30 календарных дней (с учетом отпусков, командировок и временной нетрудоспособности).
                        </li>
                    </ol>
                </article>

                {/* Что делать после СОУТ */}
                <article>
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                        Что делать после СОУТ?
                    </h2>
                    <p className="mb-4 text-gray-700">
                        После оформления документов эксперты ООО «АОПФ» заполняют для заказчика <strong>Декларацию соответствия условий труда</strong>, которая предоставляется в бумажном и электронном виде.
                    </p>
                    <p className="mb-4 text-gray-700">
                        Декларация оформляется для рабочих мест, где вредные или опасные факторы не выявлены или условия признаны допустимыми. Подписывает декларацию руководитель организации.
                    </p>
                    <p className="mb-4 text-gray-700">
                        <strong>Подача декларации</strong> в Государственную инспекцию по труду должна быть произведена в течение 30 рабочих дней после подписания отчета СОУТ. Можно подать лично, почтой или в электронном виде через сайт Роструда.
                    </p>
                    <p className="mb-4 text-gray-700 italic bg-green-600/30 p-4 rounded border-l-4 border-green-600/50">
                        Не подлежат декларированию: рабочие места с вредными условиями труда, включенные в списки досрочного назначения пенсии, места с измененными условиями труда или вновь организованные.
                    </p>
                </article>

                {/* Обязанности комиссии */}
                <article>
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-600 pl-4 text-green-600">
                        Обязанности комиссии по проведению СОУТ
                    </h2>
                    <p className="mb-4 text-gray-700">
                        Для проведения СОУТ работодатель формирует комиссию с нечетным числом членов, которую возглавляет руководитель или его представитель. Основные обязанности комиссии:
                    </p>
                    <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700">
                        <li>Утверждает перечень рабочих мест и график проведения СОУТ.</li>
                        <li>Организует подготовку рабочих мест и сбор необходимой документации.</li>
                        <li>Обеспечивает взаимодействие с экспертами и анализ договора.</li>
                        <li>Формирует перечень вредных и опасных факторов для исследований.</li>
                        <li>Принимает решения по проведению исследований и оценки условий труда.</li>
                        <li>Подписывает отчет и прилагает особое мнение в случае разногласий.</li>
                        <li>Учитывает результаты СОУТ при планировании улучшений условий труда.</li>
                        <li>Рассматривает споры и разъясняет работникам вопросы по СОУТ.</li>
                    </ul>
                </article>
            </section>



        </main>
        </>
    );
}
