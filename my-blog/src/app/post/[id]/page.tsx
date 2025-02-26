import { supabase } from '../../../../lib/supabaseClient';
import { notFound } from 'next/navigation';
import { playfair } from '@/app/fonts';
import { raleway } from '@/app/fonts';

import Link from 'next/link';
import { FaArrowLeft, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ThemeToggle from '@/app/components/ThemeToggle';
import { FaXTwitter } from 'react-icons/fa6';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main className={`${raleway.className} max-w-4xl mx-auto p-8 animate-fade-in`}>
            <header className="mb-16 border-b pb-8 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className={`${playfair.className} text-5xl font-semibold mb-4`}>
            Tim&apos;s Thoughts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-light text-lg mb-4">
            Exploring ideas, documenting things, and talking about personal insights.
            <br />
            <span className='text-xs'>This is basically a public diary lmao </span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/timoteahu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/timoteahu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com/in/timoteahu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </header>
      
      <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors mb-4">
        <FaArrowLeft className="mr-2" />
      </Link>

      <article className="prose dark:prose-invert max-w-none">
        <h1 className={`${playfair.className} text-4xl font-semibold mb-4 !mt-0`}>
          {post.title}
        </h1>
        
        <div className="mb-8 !mt-0">
          <small className="text-gray-500 dark:text-gray-300 font-light">
            Posted at {new Date(post.created_at).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </small>
        </div>

        <p dangerouslySetInnerHTML={{ 
          __html: post.content.replace(/\n/g, '<br />') 
        }} />
      </article>

      <div className="mt-16 pt-8 border-t">
        <Link 
          href="/" 
          className="text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>
    </main>
  );
}
