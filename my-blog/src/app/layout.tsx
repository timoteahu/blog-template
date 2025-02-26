import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: "Tim's Thoughts",
  description: 'A blog about my experiences and thoughts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300'>{children}</body>
    </html>
  );
}