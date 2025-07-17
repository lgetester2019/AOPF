
import { MapPin, Phone, Mail, Car, Footprints } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from "@/components/ContactForm";

export const metadata = {
    title: "Контакты | Агентство оценки производственных факторов — Санкт-Петербург",
    description:
        "Свяжитесь с нами: адрес, телефоны, e-mail, карта проезда. ООО «Агентство оценки производственных факторов» — официальный офис в Санкт-Петербурге.",
};

export default function ContactsPage() {
    return (
        <>
            <Header/>
            <div className="max-w-[1350px] m-auto mt-40 md:px-0 px-2 ">
            <header className="max-w-[1350px] mx-auto relative rounded-3xl overflow-hidden shadow-lg">
                <img
                    src="/contact_image.jpg"
                    alt="Как с нами связаться"
                    className="w-full  h-80 object-cover brightness-90"
                />
                <div
                    className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                    <h1 className="lg:text-4xl text-xl font-extrabold mb-2 drop-shadow-lg text-center">
                        Как с нами связаться?
                    </h1>
                    <p className="max-w-xl text-center text-lg drop-shadow-md">
                        Получите персональную консультацию любым удобным способом у наших специалистов
                    </p>
                    <a
                        href="tel:+78129236867"
                        className="bg-green-600 mt-4 hover:bg-green-700 text-white rounded-full px-6 py-3 font-semibold shadow-sm transition-colors duration-300"
                    >
                        Позвонить: (812) 923-68-67
                    </a>
                </div>
            </header>
            </div>

            {/* 🟩 Зелёный блок: Адрес + Как добраться + Карта */}
            <section className="px-2 mt-16 my-16">
                <div
                    className="max-w-[1350px] rounded-3xl text-white bg-[#26428b] py-10 px-4 sm:px-6 md:px-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">

                    {/* Левая колонка: Адрес + Как добраться */}
                    <div className="space-y-8 text-sm sm:text-base md:text-lg leading-relaxed">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            Как добраться
                        </h2>

                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 flex-shrink-0" size={24}/>
                            <span>
                                <strong>Адрес:</strong><br/>
                                194044, Санкт-Петербург,<br/>
                                Б. Сампсониевский пр., 64<br/>
                                (офис на территории завода «Компрессор»)
                            </span>
                        </div>

                        {/* На автомобиле */}
                        <div>
                            <div className="flex items-center gap-2 font-semibold">
                                <Car className="h-6 w-6"/>
                                <span>На автомобиле:</span>
                            </div>
                            <p className="pl-8">
                                Двигайтесь по Большому Сампсониевскому проспекту до перекрёстка с ул. Литовской.
                                Вход через проходную завода «Компрессор».
                            </p>
                        </div>

                        {/* Пешком */}
                        <div>
                            <div className="flex items-center gap-2 font-semibold">
                                <Footprints className="h-6 w-6"/>
                                <span>Пешком:</span>
                            </div>
                            <p className="pl-8">
                                15 минут от метро «Выборгская». От выхода двигайтесь налево, далее по ул. Смолячкова
                                до Б. Сампсониевского проспекта, затем направо до проходной завода «Компрессор».
                            </p>
                        </div>
                    </div>

                    {/* Правая колонка: Карта */}
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

            {/* 🔵 Синий блок: Клиентский отдел + Основные контакты */}
            <section className="px-2 mb-20">
                <div
                    className=" bg-green-600/60  text-white py-12 px-4 sm:px-6 md:px-10 rounded-3xl max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Клиентский отдел */}
                    <div className="space-y-8">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Отдел по работе с клиентами</h3>

                        <div className="space-y-6 text-sm sm:text-base md:text-xl">
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

                    {/* Общие контакты */}
                    <div className="space-y-8 text-sm sm:text-base md:text-xl">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Контакты</h3>

                        <p className="flex items-start gap-3">
                            <Phone className="mt-1 flex-shrink-0" size={24}/>
                            <span>
                                <strong>Тел.:</strong><br/>
                                <a href="tel:+78129236867"
                                   className="underline hover:text-green-300">923-68-67</a><br/>
                                <a href="tel:+78124413778"
                                   className="underline hover:text-green-300">(812) 441-37-78</a>
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
            </section>
            <ContactForm/>
            <Footer/>
        </>
    );
}
