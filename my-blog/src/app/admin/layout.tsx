'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          router.replace('/admin/login');
        }
        setLoading(false); // Set loading to false regardless of login status
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false); // Set loading to false even if there's an error
        router.replace('/admin/login');
      }
    };

    checkSession();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* You can include a sidebar or admin nav here */}
      {children}
    </div>
  );
}
