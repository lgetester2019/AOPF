import type { Metadata } from "next";
import "./globals.css";

const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

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
        "декларация условий труда",
    ],
    openGraph: {
        title: "Охрана труда и безопасность — лаборатория с аккредитацией",
        description: "Комплексные услуги по охране труда и экологии. СОУТ, контроль, обучение. Работаем по всей России.",
        url: "https://example.com",
        siteName: "Охрана труда",
        type: "website",
    },
    alternates: {
        canonical: "https://aopf.ru",
    },
    metadataBase: new URL("https://aopf.ru/"),
    verification: {
        yandex: "61bd324922a76a55",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <head>
                <script src="https://analytics.ahrefs.com/analytics.js" data-key="e1Y9fJE4WXLIjkLnZ2UaFg" async></script>
                <meta name="yandex-verification" content="61bd324922a76a55" />
                {/* Preload главного изображения на главной странице.
                    Это заставляет браузер загрузить FB.svg в первую очередь,
                    ещё до того как он разберёт весь HTML — улучшает LCP. */}
                <link
                    rel="preload"
                    href="/FB.svg"
                    as="image"
                    type="image/svg+xml"
                />

                {/* Яндекс.Метрика */}
                {YANDEX_METRIKA_ID && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                                m[i].l=1*new Date();
                                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                                ym(${YANDEX_METRIKA_ID}, "init", {
                                    clickmap:true,
                                    trackLinks:true,
                                    accurateTrackBounce:true,
                                    webvisor:true
                                });
                            `,
                        }}
                    />
                )}
            </head>
            <body className="antialiased">
                {children}

                {YANDEX_METRIKA_ID && (
                    <noscript>
                        <div>
                            <img
                                src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
                                style={{ position: "absolute", left: "-9999px" }}
                                alt=""
                            />
                        </div>
                    </noscript>
                )}
            </body>
        </html>
    );
}
