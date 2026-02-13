"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactMap() {
    return (
        <div className=" max-w-[1350px]  mx-auto">
        <section className="bg-green-600/60 py-12 my-16 px-4 sm:px-6 md:px-10 rounded-3xl">
            <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start text-white">
                {}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                        ООО «АГЕНТСТВО ОЦЕНКИ ПРОИЗВОДСТВЕННЫХ ФАКТОРОВ»
                    </h2>

                    <div className="space-y-5 text-sm sm:text-base md:text-xl leading-relaxed">
                        <p className="flex items-start gap-3">
                            <MapPin className="mt-1 text-white flex-shrink-0" size={24} />
                            <span>
                                <strong>Адрес:</strong><br />
                                194044, Санкт-Петербург,<br />
                                Б. Сампсониевский пр., 64<br />
                                (офис на территории завода «Компрессор»)
                            </span>
                        </p>

                        <p className="flex items-start gap-3">
                            <Phone className="mt-1 text-white flex-shrink-0" size={24} />
                            <span>
                                <strong>Тел.:</strong><br />
                                <a href="tel:+78129236867" className="underline hover:text-green-300">
                                    (812) 923-68-67
                                </a><br />
                                <a href="tel:+78124413778" className="underline hover:text-green-300">
                                    (812) 441-37-78
                                </a>
                            </span>
                        </p>

                        <p className="flex items-start gap-3">
                            <Mail className="mt-1 text-white flex-shrink-0" size={24} />
                            <span>
                                <strong>E-mail:</strong><br />
                                <a href="mailto:info.aopf@gmail.com" className="underline hover:text-green-300">
                                    info.aopf@gmail.com
                                </a>
                            </span>
                        </p>
                    </div>
                </div>

                {}
                <div className="w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=30.338093%2C59.976427&mode=whatshere&tab=inside&whatshere%5Bpoint%5D=30.338092%2C59.976427&whatshere%5Bzoom%5D=17&z=17"
                        width="100%"
                        height="100%"
                        frameBorder="1"
                        allowFullScreen
                        style={{position: 'relative', border: 'none'}}
                        title="Карта - адрес компании"
                    ></iframe>
                </div>
            </div>
        </section>
        </div>
    );
}
