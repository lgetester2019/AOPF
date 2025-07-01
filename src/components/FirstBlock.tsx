"use client";

import React from "react";
import Link from "next/link";

const FirstBlock = () => {
    return (
        <section
            className="relative bg-[#26428b] rounded-3xl max-w-[1350px] lg:mx-auto px-6 sm:px-8 py-16 sm:py-20 mt-10  shadow-xl overflow-hidden"
            style={{ minHeight: '480px' }}
        >
            <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-10  h-full">
                {/* Левая часть: Текст */}
                <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl mx-auto lg:mx-0 lg:pl-[50px]">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
                        Безопасность труда
                        <br className="hidden lg:block" />
                        и экология — наша забота
                    </h1>
                    <p className="text-white text-lg lg:text-xl leading-relaxed mb-6 lg:mb-10">
                        Более 10 лет мы проводим спецоценку условий труда, анализ воды и воздуха, производственный контроль и создаем системы управления охраной труда, в том числе профриски и технологические карты.
                    </p>

                    {/* Кнопка видна только на lg и выше */}
                    <div className="hidden lg:flex justify-start">
                        <Link href="#services" passHref>
                            <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-7 py-3 font-semibold shadow-sm transition-colors duration-300">
                                Подробнее об услугах
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Правая часть: SVG */}
                <div className="flex-1 flex justify-center items-center max-w-md lg:max-w-lg lg:ml-12 lg:pr-[50px]">
                    <img
                        src="/FB.svg"
                        alt="Лаборатория"
                        className="w-full h-auto drop-shadow-2xl"
                        style={{ maxHeight: '360px', maxWidth: '100%' }}
                    />
                </div>
            </div>

            {/* Кнопка для телефонов и планшетов (до lg) — под изображением */}
            <div className="mt-8 lg:hidden flex justify-center">
                <Link href="#services" passHref>
                    <button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-7 py-3 font-semibold shadow-sm transition-colors duration-300">
                        Подробнее об услугах
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default FirstBlock;
