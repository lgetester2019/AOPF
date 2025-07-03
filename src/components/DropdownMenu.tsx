
"use client";

const DropdownMenu = () => {
    return (
        <div className="flex flex-col py-2">
            <a href="#" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 transition">
                Аттестат аккредитации
            </a>
            <a href="#" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 transition">
                Внесение в реестр
            </a>
            <a href="#" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 transition">
                Сертификаты экспертов
            </a>
            <a href="#" className="px-4 py-2 hover:bg-green-50 hover:text-green-700 transition">
                Вопросы и ответы
            </a>
        </div>
    );
};

export default DropdownMenu;
