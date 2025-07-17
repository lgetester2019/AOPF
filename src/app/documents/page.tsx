// app/documents/page.tsx

import Header from "@/components/Header";
import Certificates from "@/components/Certificates";
import Footer from "@/components/Footer";
import DocumentsSamples from "@/components/DocumentsSamples";

export default function DocumentsPage() {
    return (
        <>
            <Header />
            <div className="max-w-[1350px] m-auto mt-40  md:px-0 px-2">
                <header className="max-w-[1350px] mb-6 mx-auto relative rounded-3xl overflow-hidden shadow-lg">
                    <img
                        src="/documents_image.jpg" // Убедись, что файл есть в public/
                        alt="Документы"
                        className="w-full h-80 object-cover brightness-90"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6">
                        <h1 className="lg:text-4xl text-xl font-extrabold mb-2 drop-shadow-lg text-center">
                            Документы имеют значение
                        </h1>
                        <p className="max-w-xl text-center text-lg drop-shadow-md">
                            Правильно оформленные документы — это гарантия прозрачности, доверия и юридической чистоты всех процессов. Мы обеспечим точность и порядок в каждом документе.
                        </p>
                    </div>
                </header>

                <DocumentsSamples></DocumentsSamples>
                <Certificates></Certificates>
            <Footer></Footer>
            </div>
        </>
    );
}
