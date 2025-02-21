// pages/index.js
import React from 'react'
import { supabase } from '../lib/supabaseClient'
import Link from 'next/link'

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Public Blog</h1>
      <ul className="space-y-6 mb-8">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-6">
            <time className="text-gray-500 text-sm">
              {new Date(post.created_at).toLocaleDateString('en-US')}
            </time>
            <h2 className="text-xl font-semibold mt-2">
              <Link href={`/post/${post.id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-700 mt-2">{post.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
      <Link 
        href="/admin" 
        className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Admin Panel
      </Link>
    </main>
  )
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  let posts = data || []  // Initialize posts with data or an empty array

  if (error) {
    console.error(error)
    posts = []  // Reassign posts if there's an error
  }

  return {
    props: { posts },
  }
}
