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
            <head>
                {/* ADD START: Яндекс.Метрика */}
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                  ym(XXXXXX, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                  });
                ` }} />
                <noscript>
                    <div>
                        <img src="https://mc.yandex.ru/watch/XXXXXX" style={{ position: 'absolute', left: '-9999px' }} alt="" />
                    </div>
                </noscript>
                {/* ADD END */}
            </head>
        <body className="antialiased">
        {children}
        </body>
        </html>
    );
}
