// app/page.tsx (или src/app/page.tsx)
import Header from "@/components/Header";
import FirstBlock from "@/components/FirstBlock";

export default function Home() {
  return (
      <div >
        <Header />
          <FirstBlock></FirstBlock>
      </div>
  );
}
