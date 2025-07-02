import Header from "@/components/Header";
import FirstBlock from "@/components/FirstBlock";
import {Stats} from "@/components/Stats";
import Benefits from "@/components/Benefits";
import ContactForm from "@/components/ContactForm";
import ServicesPreview from "@/components/ServicesPreview";
import ClientsSection from "@/components/ClientsSection";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="px-4 pt-28 w-full max-w-[1350px] mx-auto">
                <FirstBlock/>
                <Stats/>
                <Benefits/>
                <ServicesPreview></ServicesPreview>
                <ClientsSection></ClientsSection>
<ContactForm></ContactForm>
            </div>
        </div>
    );
}

