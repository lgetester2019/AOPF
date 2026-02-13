import React from "react";
import { FiClipboard, FiSearch, FiFileText, FiUsers, FiCheckCircle } from "react-icons/fi";

const steps = [
    {
        icon: <FiClipboard className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0 mt-1" />,
        title: "1. Предварительный аудит",
        description:
            "Оцениваем текущие процессы и выявляем ключевые риски по охране труда на вашем предприятии.",
    },
    {
        icon: <FiSearch className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0 mt-1" />,
        title: "2. Анализ и разработка документации",
        description:
            "Создаём комплекс нормативных документов, регламентов и инструкций с учётом специфики производства.",
    },
    {
        icon: <FiFileText className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0 mt-1" />,
        title: "3. Согласование и утверждение",
        description:
            "Обсуждаем проект с заказчиком, вносим правки и утверждаем окончательный вариант документов.",
    },
    {
        icon: <FiUsers className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0 mt-1" />,
        title: "4. Обучение и инструктаж",
        description:
            "Проводим обучение персонала, организуем инструктажи и повышаем уровень осведомленности сотрудников.",
    },
    {
        icon: <FiCheckCircle className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0 mt-1" />,
        title: "5. Внедрение и сопровождение",
        description:
            "Помогаем внедрить систему управления охраной труда, обеспечиваем сопровождение и регулярный аудит.",
    },
];

const ServiceProcess: React.FC = () => {
    return (
        <section className="bg-green-50 rounded-3xl px-2 py-6 sm:p-14 my-12 sm:my-16 shadow-lg max-w-[1350px] mx-auto text-gray-900">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-green-700 drop-shadow-md text-center leading-tight">
                Порядок проведения услуги по разработке СУОТ
            </h2>

            <ul className="max-w-[1350px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 px-4 sm:px-0">
                {steps.map(({ icon, title, description }, idx) => (
                    <li
                        key={idx}
                        className={`flex items-start space-x-4 sm:space-x-6 group bg-green-100 rounded-xl p-4 sm:p-6 transition-colors duration-300 shadow-sm
                        ${idx === steps.length - 1 ? "sm:col-span-2" : ""}
                        `}
                    >
                        <div>{icon}</div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 group-hover:text-green-700 transition-colors duration-300 leading-snug">
                                {title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ServiceProcess;
