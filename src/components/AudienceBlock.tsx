"use client";

export default function AudienceBlock() {
    const title = "Кому это необходимо?";
    const description = `
        Это необходимо всем работодателям – от крупных производств до небольших офисов и ИП с наемными работниками.

        Независимо от сферы деятельности — будь то IT-компания, стройфирма, медицинский центр или магазин — работодатель обязан:

        • внедрить СУОТ (систему управления охраной труда);
        • провести оценку профессиональных рисков;
        • выполнить СОУТ;
        • разработать программу производственного контроля с измерениями.

        Требования едины для всех. Нарушение грозит штрафами до 80 тыс. руб., приостановкой деятельности и, в случае несчастного случая, уголовной ответственностью.
    `;

    const points = [
        "Крупные промышленные предприятия",
        "Небольшие компании и ИП с наемным трудом",
        "Офисные команды",
        "Работодатели в любых отраслях: от IT до строительства",
        "Все организации, обязанные соблюдать ТК РФ",
    ];

    return (
        <section className="py-10 px-4 md:px-10 my-10 mb-24 bg-green-600/60 rounded-3xl max-w-[1350px] mx-auto text-white">
            <div className="flex flex-col md:flex-row gap-12">
                {}
                <div className="md:w-[50%] space-y-4">
                    <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
                    <div className="text-white text-base leading-[1.6] space-y-2">
                        {description.trim().split("\n").map((paragraph, idx) => (
                            <p key={idx}>{paragraph.trim()}</p>
                        ))}
                    </div>
                    <p className="text-white font-bold text-base mt-4">
                        Если вы относитесь к перечисленным категориям — наша услуга создана для вас.
                    </p>
                </div>

                {}
                <div className="md:w-[55%] flex flex-col gap-6">
                    {points.map((point, idx) => (
                        <div
                            key={idx}
                            className="bg-[#26428b] rounded-3xl p-5 shadow-lg border border-white/30"
                        >
                            <p className="text-white text-lg font-semibold">{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
