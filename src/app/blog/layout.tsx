import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {/* pt-28 компенсирует фиксированный хедер (TopBar ~40px + MainHeader ~72px) */}
      <main className="pt-28 min-h-screen bg-gray-50">
        {children}
      </main>
      <Footer />
    </>
  );
}
