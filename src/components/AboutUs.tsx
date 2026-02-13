"use client";

export default function AboutUs() {
    const accreditations = [
        {
            title: "Федеральный орган по аккредитации",
            text: "№ РОСС RU.0001.518730 (аттестат аккредитации)",
            color: "bg-[#26428b]",
        },
        {
            title: "Реестр Минтруда организаций, проводящих СОУТ",
            text: "№470 (документ о внесении в реестр)",
            color: "bg-[#26428b]",
        },
        {
            title: "Лицензия РусГидромета",
            text: "Р/2015/2972/100/Л",
            color: "bg-[#26428b]",
        },
    ];

    return (
        <section className="py-10 mb-24 mt-6 px-4 md:px-10 bg-green-600/60 rounded-3xl max-w-[1350px] mx-auto text-white">
            <div className="flex flex-col md:flex-row gap-12  mx-auto">
                {}
                <div className="md:w-1/2 space-y-2">
                    <h2 className="text-4xl font-extrabold mb-4 text-white" >
                        О компании
                    </h2>

                    <p className="text-white text-lg leading-relaxed">
                        Аккредитованная санитарно-промышленная лаборатория ООО «АОПФ»
                        специализируется на оказании услуг по двум направлениям: охрана труда и
                        определение качества воды (сточной, природной и питьевой) в рамках
                        экологического контроля.
                    </p>

                    <p className="text-white text-lg leading-relaxed">
                        ООО «АОПФ» по направлению «Охрана труда» проводит специальную оценку
                        условий труда, расчет профессиональных рисков, аутсорсинг охраны труда,
                        аудит и разработку СУОТ, программы производственного контроля и
                        измерения по ней, документации по СИЗам, оформление
                        транспортно-технологических карт. За 14 лет работы лаборатории мы
                        собрали коллектив компетентных менеджеров и специалистов. Обратившись к
                        нам, вы получаете качественные консультации по проведению и
                        результатам СОУТ, медосмотрам, обучению и другим вопросам охраны труда.
                    </p>

                    <p className="text-black/50 font-bold text-lg   mt-4">
                        Организация функционирует как орган публичной власти, осуществляя
                        деятельность по оценке (подтверждению) соответствия.
                    </p>
                </div>

                {}
                <div className="md:w-1/2 flex flex-col gap-8">
                    {accreditations.map(({ title, text, color }, idx) => (
                        <div
                            key={idx}
                            className={`${color} rounded-3xl p-6 shadow-lg border border-white/30`}
                        >
                            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
                            <p className="text-white">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
