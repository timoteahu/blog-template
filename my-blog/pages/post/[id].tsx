import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'
import { GetServerSidePropsContext } from 'next'

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

export default function PostPage({ post }: { post: Post }) {
  if (!post) return <div>Post not found</div>

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to all posts
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500 block mb-8">
          {new Date(post.created_at).toLocaleDateString()}
        </time>
        <div className="prose max-w-none">
          {post.content}
        </div>
      </article>
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.params as { id: string }
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) {
    return { notFound: true }
  }

  return {
    props: { post },
  }
}