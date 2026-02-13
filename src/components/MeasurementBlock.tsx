import React from "react";
import { FiFileText, FiCheckCircle, FiUserCheck, FiShield } from "react-icons/fi";

const MeasurementBlock: React.FC = () => {
    const items = [
        {
            icon: <FiFileText className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Юридическая обязательность",
            description:
                "Проведение измерений в рамках производственного контроля обязательно согласно статье 214 ТК РФ и регулируется законом №52-ФЗ и СанПиН 1.2.3685-21.",
        },
        {
            icon: <FiUserCheck className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Выбор аккредитованной организации",
            description:
                "Работодатель обязан заключить договор с организацией, имеющей аккредитованную в Росаккредитации лабораторию, с необходимой областью аккредитации.",
        },
        {
            icon: <FiCheckCircle className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Процедура выполнения измерений",
            description:
                "Специалист лаборатории измеряет производственные факторы в соответствии с программой ПК и оформляет протоколы измерений.",
        },
        {
            icon: <FiShield className="text-green-600 w-6 h-6 sm:w-8 sm:h-8 shrink-0" />,
            title: "Полученные результаты",
            description:
                "Используются для оценки соответствия гигиеническим нормативам условий труда сотрудников организации и принятия мероприятий по их улучшению.",
        },
    ];

    return (
        <section className="bg-green-50 rounded-3xl px-2 py-6 sm:p-14 my-12 sm:my-16 shadow-lg max-w-[1350px] mx-auto text-gray-900">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-8 sm:mb-10 text-green-700 drop-shadow-md text-center leading-tight">
                Всё о производственном контроле и измерениях
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-[600px] sm:max-w-[900px] mx-auto text-center px-4 sm:px-0">
                Измерения в рамках производственного контроля — это обязательная процедура, направленная на выявление вредных факторов на рабочих местах и проверку соответствия условий труда гигиеническим нормативам.
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

export default MeasurementBlock;
