
import { MapPin, Phone, Mail, Car, Footprints } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
    title: "Контакты | Агентство оценки производственных факторов — Санкт-Петербург",
    description:
        "Свяжитесь с нами: адрес, телефоны, e-mail, карта проезда. ООО «Агентство оценки производственных факторов» — официальный офис в Санкт-Петербурге.",
};


export default function ContactsPage() {
    return (
        <>
            <Header/>

            {/* Основной контактный блок */}
            <section className=" px-2 my-16 mt-36  ">
                <div
                    className="max-w-[1350px] rounded-3xl text-white bg-green-600/60 py-10 px-4 sm:px-6 md:px-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                            ООО «АГЕНТСТВО ОЦЕНКИ ПРОИЗВОДСТВЕННЫХ ФАКТОРОВ»
                        </h2>

                        <div className="space-y-5 text-sm sm:text-base md:text-xl leading-relaxed">
                            <p className="flex items-start gap-3">
                                <MapPin className="mt-1 flex-shrink-0" size={24}/>
                                <span>
                  <strong>Адрес:</strong><br/>
                  194044, Санкт-Петербург,<br/>
                  Б. Сампсониевский пр., 64<br/>
                  (офис на территории завода «Компрессор»)
                </span>
                            </p>

                            <p className="flex items-start gap-3">
                                <Phone className="mt-1 flex-shrink-0" size={24}/>
                                <span>
                  <strong>Тел.:</strong><br/>
                  <a href="tel:+78129236867" className="underline hover:text-green-300">(812) 923-68-67</a><br/>
                  <a href="tel:+78124413778" className="underline hover:text-green-300">(812) 441-37-78</a>
                </span>
                            </p>

                            <p className="flex items-start gap-3">
                                <Mail className="mt-1 flex-shrink-0" size={24}/>
                                <span>
                  <strong>E-mail:</strong><br/>
                  <a href="mailto:info.aopf@gmail.com" className="underline hover:text-green-300">
                    info.aopf@gmail.com
                  </a>
                </span>
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-[250px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=30.342882%2C59.973558&mode=routes&rtext=59.971199%2C30.347189~59.976427%2C30.338092&rtt=auto"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                            title="Карта - адрес компании"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Объединённый блок: Клиентский отдел + Как добраться */}
            <section
                className="px-2">
                <div className="bg-[#26428b] text-white py-12 px-4 sm:px-6 md:px-10 rounded-3xl max-w-[1350px] mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Клиентский отдел */}
                    <div className="space-y-10">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Отдел по работе с клиентами</h3>

                        <div className="space-y-10 text-sm sm:text-base md:text-xl">
                            <p className="font-semibold">Курилова Людмила Борисовна</p>

                            <div className="flex items-center gap-3">
                                <Phone size={20}/>
                                <span>
                  <a href="tel:+78124413778" className="underline hover:text-green-300">(812) 441-37-78</a>,{' '}
                                    <a href="tel:+79626847783" className="underline hover:text-green-300">+7 962 684-77-83</a>
                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={20}/>
                                <a href="mailto:kurilova.aopf@gmail.com" className="underline hover:text-green-300">
                                    kurilova.aopf@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Как добраться */}
                    <div className="space-y-6">
                        <h4 className="text-xl md:text-2xl font-bold">Как добраться</h4>

                        <div className="space-y-6 text-sm sm:text-base md:text-lg">
                            {/* На автомобиле */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 font-semibold">
                                    <Car className="h-6 w-6" />
                                    <span>На автомобиле:</span>
                                </div>
                                <p className="pl-8">
                                    Двигайтесь по Большому Сампсониевскому проспекту до перекрёстка с ул. Литовской.
                                    Вход через проходную завода «Компрессор».
                                </p>
                            </div>

                            {/* Пешком */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 font-semibold">
                                    <Footprints className="h-6 w-6" />
                                    <span>Пешком:</span>
                                </div>
                                <p className="pl-8">
                                    15 минут от метро «Выборгская». От выхода двигайтесь налево, далее по ул. Смолячкова
                                    до Б. Сампсониевского проспекта, затем направо до проходной завода «Компрессор».
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer/>
        </>
    );
}
