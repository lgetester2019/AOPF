import { services } from "@/data/services";

const DropdownServices = () => {
    return (
        <div className="flex flex-col py-2">
            <a
                href="/services" // ссылка на страницу со всеми услугами
                className="px-4 py-2 font-semibold hover:bg-green-50 hover:text-green-700 transition"
            >
                Все услуги
            </a>
            {services.map((service, index) => (
                <a
                    key={index}
                    href={service.href}
                    className="px-4 py-2 hover:bg-green-50 hover:text-green-700 transition"
                >
                    {service.title}
                </a>
            ))}
        </div>
    );
};

export default DropdownServices;
