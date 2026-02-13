"use client";

import Image from "next/image";

const clients = [
    { name: "Газпром Нефть", logo: "/clients/logo-gazprom-neft.png" },
    { name: "Knauf", logo: "/clients/knauf-logo.png" },
    { name: "Medicine21", logo: "/clients/medicine21.svg" },
    { name: "Светофор", logo: "/clients/Svetofor-logo.png" },
    { name: "Отделстрой", logo: "/clients/content_otdelstroylogo.jpg" },

];

export default function Clients() {
    return (
        <section className="pb-10 md:pb-16 pt-10 rounded-3xl bg-white">
            <div className="max-w-[1350px] mx-auto ">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-gray-900 relative inline-block">
                    Наши клиенты
                    <span className="block h-1 w-full bg-green-600 rounded-full mx-auto mt-3 sm:mt-4"></span>
                </h2>

                <div
                    className="flex gap-4 sm:gap-6 overflow-x-auto px-1 sm:px-4 md:px-0 scroll-smooth hide-scrollbar"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-32 md:w-60 lg:h-52 h-32
                                flex items-center justify-center bg-white rounded-2xl
                                border-2 border-gray-200
                                transition-shadow duration-300 cursor-pointer p-3 sm:p-4"
                        >
                            <Image
                                src={client.logo}
                                alt={client.name}
                                width={150}
                                height={100}
                                className="object-contain w-full h-auto max-h-[60px] sm:max-h-[80px] md:max-h-[100px]"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
