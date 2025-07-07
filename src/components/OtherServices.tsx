// components/OtherServices.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

type Props = {
    currentHref: string;
};

const OtherServices: React.FC<Props> = ({ currentHref }) => {
    const filteredServices = services.filter(service => service.href !== currentHref);

    return (
        <section className="max-w-[1350px] m-auto  my-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Наши другие услуги
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
                    <Link
                        key={index}
                        href={service.href}
                        className="group block overflow-hidden rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-60 w-full">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="bg-white p-5">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-2 mb-4">
                                {service.description}
                            </p>
                            <div className="inline-flex items-center text-green-700 font-medium group-hover:translate-x-1 transition-transform">
                                Подробнее
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default OtherServices;
