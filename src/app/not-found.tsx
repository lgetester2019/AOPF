import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
    return (
        <>
            <Header />
            <div className="max-w-[1350px] mx-auto mb-16 mt-44 px-4 md:px-6">
                <div className="rounded-3xl overflow-hidden  bg-green-50 py-24 px-8 md:py-32 md:px-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6 ">
                        404 — Страница не найдена
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
                        К сожалению, такой страницы не существует. Возможно, она была удалена или вы перешли по неверной ссылке.
                    </p>
                    <a
                        href="/"
                        className="inline-block px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-full hover:bg-green-700 transition duration-200 shadow-md"
                    >
                        Вернуться на главную
                    </a>
                </div>

            </div>
            <Footer />
        </>
    );
}
