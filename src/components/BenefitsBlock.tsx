"use client";

import { CheckCircle, Star, ShieldCheck, Settings2, Users, FileCheck2 } from "lucide-react";

export default function BenefitsBlock() {
    return (
        <section className="py-10 mt-14 sm:py-10">
            <div className="max-w-[1350px] bg-[#26428b]/90 rounded-3xl py-6 lg:py-14 px-4 sm:px-6 md:px-12 mx-auto text-white">
                <div className="flex flex-col gap-10">
                    <h2 className="text-2xl text-center sm:text-3xl md:text-4xl font-extrabold  text-white">
                        Наши преимущества
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 1 */}
                        <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                            <ShieldCheck className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg">Профессионализм</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Аттестованные специалисты с опытом в промышленности, строительстве и медицине.
                                </p>
                            </div>
                        </div>

                        {/* 2 */}
                        <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                            <Settings2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg">Современное оснащение</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Лаборатория и точные приборы: шум, микроклимат, вибрация и др.
                                </p>
                            </div>
                        </div>

                        {/* 3 */}
                        <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                            <FileCheck2 className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg">Соблюдение норм</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Работаем по 426-ФЗ, СанПиН, ТР ТС. Шаблоны отчетов – для всех ведомств.
                                </p>
                            </div>
                        </div>

                        {/* 4 */}
                        <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                            <Users className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg">Ориентация на клиента</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Гибкие условия, быстрая сдача, поддержка после завершения проекта.
                                </p>
                            </div>
                        </div>

                        {/* 5 */}
                        <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                            <Star className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg">Прозрачность и репутация</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Работаем с крупными компаниями. Понятные тарифы, без скрытых платежей.
                                </p>
                            </div>
                        </div>

                        {/* 6 */}
                        <div className="flex items-start gap-4 bg-white/10 p-5 rounded-2xl">
                            <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-lg">Комплексный подход</h3>
                                <p className="text-sm text-white/90 mt-1">
                                    Обучение, аутсорсинг ОТ, документация – всё в одном месте.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
