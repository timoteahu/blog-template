import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { supabase } from '../../lib/supabaseClient';

export default function CreatePage() {
  const handleCreate = async () => {
    // Insert a new post into the 'posts' table
    const { data, error } = await supabase.from('posts').insert([
      {
        title: 'New Post Title',
        content: 'This is the content of the new post.',
        created_at: new Date().toISOString(),
      },
    ]);
    console.log(data);
    if (error) {
      console.error(error);
      alert('Error creating record');
    } else {
      alert('Created record successfully!');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Create Page</h1>
      <button onClick={handleCreate}>Create Something in Supabase</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  if (cookies.admin !== 'true') {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};