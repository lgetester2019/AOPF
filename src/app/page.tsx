// app/page.tsx (или src/app/page.tsx)
import Header from "@/components/Header";
import FirstBlock from "@/components/FirstBlock";
import {Stats} from "@/components/Stats";
import Benefits from "@/components/Benefits";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="px-4 w-full max-w-[1350px] mx-auto">
                <FirstBlock/>
                <Stats/>
                <Benefits/>

            </div>
        </div>
    );
}

