'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../../lib/supabaseClient';

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: ''
  });

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        return;
      }

      if (data) {
        setPost({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt || ''
        });
      }
    }

    fetchPost();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .update({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
      })
      .eq('id', resolvedParams.id);

    if (error) {
      alert('Error updating post');
      console.error('Error:', error);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-800"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Excerpt</label>
          <input
            type="text"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full p-2 border rounded h-64 dark:bg-gray-800"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 