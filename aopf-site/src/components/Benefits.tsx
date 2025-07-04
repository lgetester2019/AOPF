'use client';

import React from 'react';
import {
    ShieldCheck,
    Brain,
    BadgeCheck,
    ScrollText,
    FileCheck,
    Lightbulb,
} from 'lucide-react';

const benefits = [
    {
        icon: ShieldCheck,
        title: 'Собственная лаборатория',
        description: 'Аккредитованная лаборатория с 14-летним стажем работы.',
    },
    {
        icon: Brain,
        title: 'Квалифицированные консультации',
        description: 'Опытные менеджеры помогут вам на каждом этапе.',
    },
    {
        icon: BadgeCheck,
        title: 'Аттестованные методики',
        description: 'Все измерения проводятся строго по утвержденным методикам.',
    },
    {
        icon: ScrollText,
        title: 'Подтверждённое качество',
        description: 'Результаты подтверждены межлабораторными сравнительными испытаниями (МСИ).',
    },
    {
        icon: FileCheck,
        title: 'Сопровождение отчётности',
        description: 'Индивидуальное отслеживание подписания отчёта и сдачи декларации.',
    },
    {
        icon: Lightbulb,
        title: 'Инновационные подходы',
        description: 'Современные технологии и программные решения в оценке рисков.',
    },
];

export default function Benefits() {
    return (
        <section
            id="benefits"
            className="bg-white py-10 max-w-[1350px] mx-auto rounded-3xl"
        >
            <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-16">
                Наши преимущества
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {benefits.map(({ icon: Icon, title, description }, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center p-8 rounded-xl border-4 border-gray-900 hover:shadow-lg hover:shadow-green-300 transition-shadow duration-300 cursor-pointer"
                    >
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white mb-5">
                            <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3 text-center">{title}</h3>
                        <p className="text-gray-700 text-center text-lg leading-relaxed">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
