import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Охрана труда и безопасность — лаборатория с аккредитацией",
    description: "Профессиональные услуги в сфере охраны труда: СОУТ, управление рисками, производственный контроль, анализ воды, обучение и документация.",
    keywords: [
        "охрана труда",
        "СОУТ",
        "управление рисками",
        "анализ воды",
        "экологический мониторинг",
        "производственный контроль",
        "обучение охране труда",
        "оценка условий труда",
        "испытательная лаборатория",
        "спецоценка",
        "разработка положений по ОТ",
        "декларация условий труда"
    ],
    openGraph: {
        title: "Охрана труда и безопасность — лаборатория с аккредитацией",
        description: "Комплексные услуги по охране труда и экологии. СОУТ, контроль, обучение. Работаем по всей России.",
        url: "https://example.com",
        siteName: "Охрана труда",
        type: "website",
    },
    alternates: {
        canonical: "https://example.com",
    },
    metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}
