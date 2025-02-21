import { supabase } from '../../lib/supabaseClient'

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default async function HomePage() {
  // Fetch posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
  }

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Welcome to My Next.js + Supabase App</h1>
      <p>This is the public homepage.</p>
      <p>Try going to <strong>/admin</strong> to see the protected admin panel.</p>

      <div className="mt-8">
        <h2>Latest Posts</h2>
        {posts ? (
          <div className="space-y-4">
            {posts.map((post: Post) => (
              <article key={post.id} className="border p-4 rounded-lg">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="mt-2">{post.content}</p>
              </article>
            ))}
          </div>
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
}