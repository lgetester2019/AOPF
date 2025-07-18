import Header from "@/components/Header";
import FirstBlock from "@/components/FirstBlock";
import { Stats } from "@/components/Stats";
import Benefits from "@/components/Benefits";
import ContactForm from "@/components/ContactForm";
import ServicesPreview from "@/components/ServicesPreview";
import ClientsSection from "@/components/ClientsSection";
import ContactMap from "@/components/ContactMap";
import Certificates from "@/components/Certificates";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import BlogOverview from "@/components/BlogOverview";

import { createClient } from '@supabase/supabase-js';
import Reviews from "@/components/Review";

export const metadata = {
    title: "Охрана труда и безопасность — аккредитованная лаборатория",
    description:
        "Почти 10 лет оказываем услуги по охране труда: СОУТ, анализ воды, производственный контроль, обучение, оценка рисков и разработка документации. Аккредитация, опыт и прозрачные цены.",
};


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2);

    const latestPost = posts?.[0] || null;
    console.log("posts:", posts);

    return (
        <div>
            <Header />
            <div className="px-4 pt-28 w-full max-w-[1350px] mx-auto">
                <FirstBlock />
                <Stats />
                <Benefits />
                <ServicesPreview />
                <ClientsSection />
                <AboutUs />
                <ContactForm />
                <Certificates />

                <BlogOverview latestPosts={posts?.slice(0, 2) ?? []} />
                <Reviews></Reviews>
                <ContactMap />
                <Footer />
            </div>
        </div>
    );
}
