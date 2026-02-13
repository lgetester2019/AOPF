"use client";

import Link from "next/link";

type PricePreviewProps = {
    title: string;
    data: { service: string; price: string }[];
    href: string;
    customPriceText?: string;
};

function getMinPrice(data: { price: string }[]): number | null {
    const prices = data
        .map(({ price }) => {
            const match = price.match(/(\d+)/);
            return match ? Number(match[1]) : null;
        })
        .filter((val): val is number => val !== null);
    return prices.length ? Math.min(...prices) : null;
}

export default function PricePreview({ title, data, href, customPriceText }: PricePreviewProps) {
    const minPrice = getMinPrice(data);

    return (
        <section className="py-16 sm:py-10">
            <div className="max-w-[1350px] bg-green-600/70 rounded-3xl py-10 px-4 lg:px-12 mx-auto shadow-lg">
                <h3 className="md:text-3xl text-2xl font-extrabold text-white mb-6 lg:text-center text-left ">{title}</h3>
                <p className="text-white/90 max-w-[1350px] mx-auto mb-6 lg:text-center text-left leading-relaxed text-lg">
                    Мы предлагаем качественные услуги по охране труда с прозрачным ценообразованием и индивидуальным подходом к каждому клиенту. Наша команда профессионалов поможет провести замеры, аудит и предоставить рекомендации для повышения безопасности и снижения рисков на вашем предприятии.
                </p>
                <p className="text-white/90 max-w-[1350px] mx-auto mb-4 lg:text-center text-left leading-relaxed text-lg">
                    Ознакомьтесь с ориентировочными ценами и переходите к полному прайсу для детальной информации. Мы всегда готовы разъяснить для вас полученные результаты и оказать помощь при проведении проверок.
                </p>

                {customPriceText ? (
                    <p className="lg:text-center text-left lg:text-2xl text-xl font-semibold text-white mb-5">
                        Стоимость от <span className="underline decoration-green-300">{customPriceText}</span>
                    </p>
                ) : minPrice ? (
                    <p className="lg:text-center text-left lg:text-2xl text-xl  font-semibold text-white mb-5">
                        Стоимость от{" "}
                        <span className="underline decoration-green-300">{minPrice} рублей</span>
                    </p>
                ) : (
                    <p className="lg:text-center text-left text-xl text-white/90 mb-5">
                        Стоимость уточняется — свяжитесь с нами для консультации
                    </p>
                )}

                <div className="flex justify-center">
                    <Link
                        href={href}
                        className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full font-semibold text-lg hover:bg-green-50 transition-shadow shadow-md"
                    >
                        Смотреть полный прайс
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
