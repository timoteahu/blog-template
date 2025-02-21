import { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      // Redirect to admin home
      router.push('/admin');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>
          Login
        </button>
      </form>
    </div>
  );
}

// If user is already logged in, redirect them away from the login page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  if (cookies.admin === 'true') {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return { props: {} };
};