import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import { Raleway } from 'next/font/google'
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter} from 'react-icons/fa6';
import ThemeToggle from './components/ThemeToggle';
const raleway = Raleway({ subsets: ['latin'] })

export const revalidate = 0; 
// or set a number (in seconds) if you want incremental revalidation

async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, created_at, excerpt')  // Add excerpt to the selection
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className={`${raleway.className} max-w-4xl mx-auto p-8 animate-fade-in `}>
      <header className="mb-16 border-b pb-8 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-5xl font-light mb-4">Tim&apos;s Thoughts</h1>
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
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
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
      
      <div className="space-y-2">
        {posts.map((post) => (
          <article key={post.id} className="group border-b pb-6">
            <div className="mb-2">
              <small className="text-gray-500 font-light">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </small>
            </div>
            <Link 
              href="/" 
              className="inline-block group-hover:text-purple-600 transition-colors"
            >
              <h2 className="text-2xl font-light">
                {post.title}
              </h2>
            </Link>
            {post.excerpt && (
              <p className="text-gray-600 font-light mt-2">
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 font-light">No posts yet.</p>
        )}
        
        <p className="text-sm text-gray-400 italic mt-8 text-center animate-typing">
          More thoughts coming soon...
        </p>
      </div>
    </main>
  );
}
