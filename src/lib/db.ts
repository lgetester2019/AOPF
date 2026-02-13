import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getArticlesByQuery(query: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug') // выбирай нужные поля
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Ошибка при поиске статей:", error);
        return [];
    }

    return data;
}
