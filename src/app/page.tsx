// app/page.tsx (или src/app/page.tsx)
import Header from "@/components/Header";
import FirstBlock from "@/components/FirstBlock";
import {Stats} from "@/components/Stats";

export default function Home() {
  return (
      <div >
        <Header />
          <FirstBlock></FirstBlock>
          <Stats></Stats>
      </div>
  );
}
