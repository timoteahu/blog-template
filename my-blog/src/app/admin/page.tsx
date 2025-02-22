'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login');
      } else {
        setEmail(data.session.user.email || '');
      }
    }).catch((error) => {
      console.error('Error fetching session:', error);
      router.replace('/admin/login');
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <main>
      <h1>Admin Panel</h1>
      <p>Welcome, {email}</p>
      <button onClick={handleLogout}>Logout</button>
      <hr />
      <p>
        <Link href="/admin/create">Create New Post</Link>
      </p>
    </main>
  );
}