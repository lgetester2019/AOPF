"use client";

import { CheckCircle, Star, ShieldCheck, Settings2, Users, FileCheck2 } from "lucide-react";

const benefits = [
    {
        icon: ShieldCheck,
        title: "Профессионализм",
        text: "Аттестованные специалисты с опытом в промышленности, строительстве и медицине.",
    },
    {
        icon: Settings2,
        title: "Современное оснащение",
        text: "Лаборатория выполняет измерения приборами 1го класса точности: шум, вибрация, микроклимат и т.д.",
    },
    {
        icon: FileCheck2,
        title: "Соблюдение норм",
        text: "Работаем по 426-ФЗ, СанПиН, ТР ТС. Шаблоны отчетов – для всех ведомств.",
    },
    {
        icon: Users,
        title: "Ориентация на клиента",
        text: "Гибкие условия, быстрая сдача, поддержка после завершения проекта.",
    },
    {
        icon: Star,
        title: "Прозрачность и репутация",
        text: "Работаем с крупными компаниями. Понятные тарифы, без скрытых платежей.",
    },
    {
        icon: CheckCircle,
        title: "Комплексный подход",
        text: "Обучение, аутсорсинг ОТ, документация – всё в одном месте.",
    },
];

export default function BenefitsBlock() {
    return (
        <section className="py-10 mt-14 sm:py-10">
            <div className="max-w-[1350px] bg-[#26428b]/90 rounded-3xl py-6 lg:py-14 px-4 sm:px-6 md:px-12 mx-auto text-white">
                <div className="flex flex-col gap-10">
                    <h2 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold text-white">
                        Наши преимущества
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map(({ icon: Icon, title, text }) => (
                            <div key={title} className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                                {/* Иконка на яркой зелёной подложке — хорошо видна на тёмном фоне */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/30 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-green-300" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{title}</h3>
                                    <p className="text-sm text-white/80 mt-1">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
