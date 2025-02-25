import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Blog',
  description: 'A Next.js 13 Blog with Supabase Auth',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>{children}</body>
    </html>
  );
}