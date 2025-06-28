"use client";

import React from "react";
import Link from "next/link";

const FirstBlock = () => {
    return (
        <section
            className="relative bg-gray-900 rounded-3xl max-w-[1350px] mx-auto px-8 py-20 mt-14 shadow-xl overflow-hidden"
            style={{ minHeight: '480px' }}
        >
            <div className="flex flex-col-reverse md:flex-row items-center gap-14 md:gap-20 h-full">
                {/* Левая часть: Текст */}
                <div className="flex-1 flex flex-col justify-center text-center md:text-left max-w-2xl mx-auto md:mx-0 md:pl-[50px]">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        Безопасность труда
                        и экология — наша забота
                    </h1>
                    <p className="text-white text-lg md:text-xl leading-relaxed mb-10">
                        Более 10 лет мы проводим спецоценку условий труда, анализ воды и воздуха, производственный контроль и создаём системы управления профессиональными рисками.
                    </p>
                    <div className="flex justify-center md:justify-start">
                        <Link href="#services" passHref>
                            <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-7 py-3 font-semibold shadow-sm">
                                Подробнее об услугах
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Правая часть: SVG */}
                <div className="flex-1 flex justify-center items-center max-w-md md:max-w-lg md:ml-12 md:pr-[50px]">
                    <img
                        src="/FB.svg"
                        alt="Лаборатория"
                        className="w-full h-auto drop-shadow-2xl"
                        style={{ maxHeight: '360px' }}
                    />
                </div>
            </div>
        </section>
    );
};

export default FirstBlock;
