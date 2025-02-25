'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login');
      } else {
        setEmail(data.session.user.email || '');
        // Fetch posts after authentication
        fetchPosts();
      }
    }).catch((error) => {
      console.error('Error fetching session:', error);
      router.replace('/admin/login');
    });
  }, [router]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    setPosts(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .match({ id: postId });

    if (error) {
      alert('Error deleting post: ' + error.message);
      return;
    }

    fetchPosts(); // Refresh the posts list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{email}</span>
            <button 
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
                <Link 
                  href="/" 
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
              <Link 
                href="/admin/create" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create New Post
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {posts.map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No posts yet. Create your first post!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}