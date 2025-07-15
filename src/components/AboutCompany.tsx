"use client";

export default function AboutCompany() {
    const reasons = [
        "Собственная химическая лаборатория (55 показателей в воздухе рабочей зоны).",
        "Опыт сотрудников более 10 лет в области оценки условий труда и охраны труда.",
        "Знание трудового законодательства и консультации в процессе работы.",
        "Отчетность в стандартизированном и понятном виде.",
        "Бесплатный предварительный расчет количества рабочих мест по штатному расписанию.",
    ];

    return (
        <section className="py-10 mb-24 mt-6 px-4 md:px-10 bg-green-600/60 rounded-3xl max-w-[1350px] mx-auto text-white">
            <div className="flex flex-col md:flex-row gap-12 mx-auto">
                <div className="md:w-1/2 space-y-4">
                    {/*<h2 className="text-4xl font-extrabold mb-4 text-white">*/}
                    {/*    Уважаемые гости нашего сайта!*/}
                    {/*</h2>*/}
                    <h3 className="text-4xl font-extrabold mb-4 text-white">Почему выбирают нас?</h3>

                    <p className="text-white text-lg leading-relaxed">
                        Наша аккредитованная испытательная лаборатория работает уже почти 10 лет. Мы предлагаем комплекс
                        услуг в сфере охраны труда и экологии, соответствующих требованиям ТК РФ:
                    </p>

                    <ul className="list-disc list-inside text-white text-lg space-y-2">
                        <li>Разработка системы управления профессиональными рисками.</li>
                        <li>Специальная оценка условий труда (СОУТ) с оформлением деклараций.</li>
                        <li>Производственный контроль, включая программы и измерения по воде.</li>
                        <li>Анализ воды (питьевой, природной, сточной) собственной лабораторией.</li>
                        <li>Исследования атмосферного воздуха в рамках экологического мониторинга.</li>
                        <li>Разработка положений и стандартов по охране труда на предприятии.</li>
                        <li>Сопровождение и документооборот по СИЗам и инструктажам.</li>
                    </ul>

                    {/*<p className="text-black/50 font-bold text-lg mt-4">*/}
                    {/*    Мы помогаем организациям выполнять обязательные требования законодательства, снижать риски и*/}
                    {/*    заботиться о здоровье сотрудников.*/}
                    {/*</p>*/}
                </div>

                <div className="md:w-1/2 flex flex-col gap-6">
                    {/*<h3 className="text-4xl font-extrabold mb-2 text-white">Почему выбирают нас?</h3>*/}
                    <ul className="space-y-4">
                        {reasons.map((reason, idx) => (
                            <li
                                key={idx}
                                className="bg-[#26428b] rounded-3xl p-5 shadow-lg border border-white/30 text-white text-lg"
                            >
                                {reason}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
