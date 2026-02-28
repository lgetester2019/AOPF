import Header from '@/components/Header';
import FirstBlock from '@/components/FirstBlock';
import ServicesPreview from '@/components/ServicesPreview';
import Benefits from '@/components/Benefits';
import Certificates from '@/components/Certificates';
import BlogOverview from '@/components/BlogOverview';
import Review from '@/components/Review';
import ContactMap from '@/components/ContactMap';
import Footer from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 60;

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, description, slug, publish_date, created_at, image_url, author')
    .eq('status', 'published')
    .order('publish_date', { ascending: false })
    .limit(3);

  return (
    <>
      <Header />
      <main className="pt-24 px-4 sm:px-6"> {/* Добавляем padding-top */}
        <FirstBlock />
        <ServicesPreview />
        <Benefits />
        <Certificates />
        <BlogOverview posts={posts} />
        <Review />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
