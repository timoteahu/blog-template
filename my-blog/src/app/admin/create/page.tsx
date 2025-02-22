'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content }]);

    if (error) {
      alert(error.message);
      return;
    }

    // On success, go back to admin page
    router.push('/admin');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />

        <button type="submit" style={{ marginTop: '1rem' }}>
          Create Post
        </button>
      </form>
    </div>
  );
}