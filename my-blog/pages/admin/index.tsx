import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Link from 'next/link';

export default function AdminHome() {
  return (
    <div style={{ margin: '2rem' }}>
      <h1>Welcome to the Admin Panel</h1>
      <p>You are authenticated as an admin.</p>

      <ul>
        <li>
          <Link href="/admin/create">Create Something</Link>
        </li>
        <li>
          <button
            onClick={async () => {
              await fetch('/api/admin-logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
          >
            Logout
          </button>
        </li>
      </ul>
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