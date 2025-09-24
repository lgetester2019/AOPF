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
        <!-- Yandex.Metrika counter -->
        <script type="text/javascript">
            (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104262961', 'ym');
    
            ym(104262961, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/104262961" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->   
        {children}
        </body>
        </html>
    );
}
