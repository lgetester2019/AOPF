import React from "react";
import { FiSearch, FiFileText, FiUsers, FiCheckCircle } from "react-icons/fi";

const ServiceBlock: React.FC = () => {
    const items = [
        {
            icon: <FiSearch className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Глубокий анализ процессов",
            description:
                "Выявляем потенциальные риски и узкие места в вашей системе охраны труда.",
        },
        {
            icon: <FiFileText className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Разработка документации",
            description:
                "Создаём подробные инструкции и регламенты, которые легко внедрить в работу предприятия.",
        },
        {
            icon: <FiUsers className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Обучение персонала",
            description:
                "Проводим тренинги и консультации для повышения квалификации и осознанности сотрудников.",
        },
        {
            icon: <FiCheckCircle className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Внедрение и сопровождение",
            description:
                "Помогаем настроить систему контроля и регулярного аудита для минимизации рисков.",
        },
    ];

    return (
        <section className="bg-green-50 rounded-3xl px-2 py-6 sm:p-14 my-12 sm:my-16 shadow-lg max-w-[1350px] mx-auto text-gray-900">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-green-700 drop-shadow-md text-center leading-tight">
                Подробнее об услуге разработки системы управления охраной труда (СУОТ)
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-[600px] sm:max-w-[900px] mx-auto text-center px-4 sm:px-0">
                Наша команда предлагает комплексный подход к созданию эффективной системы управления охраной труда, полностью
                соответствующей требованиям российского законодательства и уникальным особенностям вашего производства.
            </p>

            <ul className="max-w-[1350px] mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 px-4 sm:px-0">
                {items.map(({ icon, title, description }, idx) => (
                    <li
                        key={idx}
                        className="flex items-start space-x-4 sm:space-x-6 group bg-green-100 rounded-xl p-4 sm:p-6 transition-colors duration-300 shadow-sm"
                    >
                        <div className="mt-1">{icon}</div>
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

export default ServiceBlock;
