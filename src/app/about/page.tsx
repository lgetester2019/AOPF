import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutCompany from '@/components/AboutCompany';
import ContactForm from "@/components/ContactForm";
import AuditFAQ from "@/components/AuditFAQ";
import ContactMap from "@/components/ContactMap";

export const metadata = {
    title: "О компании | Агентство оценки производственных факторов — Санкт-Петербург",
    description:
        "Наша лаборатория аккредитована в Росаккредитации и Минтруде. Предлагаем полный спектр услуг в сфере охраны труда, СОУТ, экологического мониторинга и производственного контроля.",
};

export default function AboutPage() {
    return (
        <>
            <Header />

            {/* 📘 Шапка с изображением */}
            <section className="max-w-[1350px] mx-auto mt-40 px-4">
                <header className="relative rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src="/about_header.jpg"
                        alt="О компании"
                        className="w-full h-80 object-cover brightness-90"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="lg:text-4xl text-xl font-extrabold mb-2 drop-shadow-lg text-center">
                            О компании
                        </h1>
                        <p className="max-w-2xl text-center text-lg drop-shadow-md">
                            Более 10 лет работы в сфере охраны труда, специальной оценки условий труда и экологического анализа.
                        </p>
                    </div>
                </header>
            </section>

            {/* 🔷 Основной блок с описанием */}
            <section className="my-20 px-4">

                    <AboutCompany />
<ContactForm />
                <AuditFAQ></AuditFAQ>
                <ContactMap></ContactMap>
            </section>

            <Footer />
        </>
    );
}
