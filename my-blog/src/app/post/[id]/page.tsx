import { supabase } from '../../../../lib/supabaseClient';
import { notFound } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>Posted on: {new Date(post.created_at).toDateString()}</small>
    </main>
  );
}
