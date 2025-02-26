import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "Tim's Thoughts",
  description: 'A blog about my experiences and thoughts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-white dark:bg-gray-900 transition-colors duration-300'>{children}</body>
    </html>
  );
}