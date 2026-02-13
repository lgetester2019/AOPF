import React from "react";
import { FiFileText, FiCheckCircle, FiUserCheck, FiShield } from "react-icons/fi";

const ServiceBlock: React.FC = () => {
    const items = [
        {
            icon: <FiFileText className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Юридическая обязательность",
            description:
                "Проведение СОУТ обязательно согласно статье 214 ТК РФ и регулируется законом №426-ФЗ. Исключение — только для государственных служащих.",
        },
        {
            icon: <FiUserCheck className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Выбор аккредитованной организации",
            description:
                "Работодатель обязан заключить договор с организацией, внесённой в реестр Минтруда и имеющей аккредитованную лабораторию и аттестованных экспертов.",
        },
        {
            icon: <FiCheckCircle className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Процедура оценки условий труда",
            description:
                "Эксперт определяет факторы производственной среды, проводит измерения, оформляет отчёт по методике Минтруда и присваивает классы условий труда.",
        },
        {
            icon: <FiShield className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Результаты и гарантии для работников",
            description:
                "На основании класса условий труда назначаются льготы и компенсации: молоко, отпуск, надбавки, медосмотры, досрочная пенсия. Данные заносятся в реестр Минтруда.",
        },
    ];

    return (
        <section className="bg-green-50 rounded-3xl px-2 py-6 sm:p-14 my-12 sm:my-16 shadow-lg max-w-[1350px] mx-auto text-gray-900">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-green-700 drop-shadow-md text-center leading-tight">
                Всё о проведении специальной оценки условий труда (СОУТ)
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-[600px] sm:max-w-[900px] mx-auto text-center px-4 sm:px-0">
                СОУТ — это обязательная процедура для всех работодателей, направленная на выявление и оценку вредных и опасных факторов. Она проводится аккредитованными экспертами и определяет права работников на льготы и компенсации.
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
