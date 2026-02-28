import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function DebugPostsPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, status')
    .order('created_at');

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Debug: Все статьи в базе</h1>
      <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Test Link</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td><strong>{post.slug}</strong></td>
              <td>{post.status}</td>
              <td>
                <a href={`/blog/${post.slug}`} target="_blank">
                  /blog/{post.slug}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
