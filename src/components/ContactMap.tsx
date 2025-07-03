"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactMap() {
    return (
        <section className="bg-green-600/60 py-12 my-16 px-4 sm:px-6 md:px-10 rounded-3xl">
            <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start text-white">
                {/* Контакты */}
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

                {/* Карта */}
                <div className="w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=30.342882%2C59.973558&mode=routes&rtext=59.971199%2C30.347189~59.976427%2C30.338092&rtt=auto&ruri=ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3Dstation__10104983~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzQ3MTEwNRJt0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0JHQvtC70YzRiNC-0Lkg0KHQsNC80L_RgdC-0L3QuNC10LLRgdC60LjQuSDQv9GA0L7RgdC_0LXQutGCLCA2NCIKDWu08kEV3edvQg%2C%2C&z=16.25"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        title="Карта - адрес компании"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
