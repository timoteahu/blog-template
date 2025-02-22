import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'My Blog',
  description: 'A Next.js 13 Blog with Supabase Auth',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}