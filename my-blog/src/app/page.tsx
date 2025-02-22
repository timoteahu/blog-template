import { supabase } from '../../lib/supabaseClient';

export const revalidate = 0; 
// or set a number (in seconds) if you want incremental revalidation

async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>My Blog</h1>
      {posts.map((post) => (
        <article key={post.id} style={{ marginBottom: '2rem' }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>Posted on: {new Date(post.created_at).toDateString()}</small>
        </article>
      ))}
    </main>
  );
}
