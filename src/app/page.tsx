'use client';

import { lazy, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Copy } from 'lucide-react';

// Dynamically import heavy animation libraries
const Typewriter = dynamic(() => import('typewriter-effect'), {
  ssr: false,
  loading: () => <span className="text-2xl">Full Stack Developer, India</span>,
});

// Lazy load components below the fold
const Activities = lazy(() => import('@/components/myComponents/Activities/Activities'));
const DiscordMessageBox = lazy(() => import('@/components/myComponents/Contact/MessageBox'));

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Manpreet Singh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Manpreet Singh is a Full Stack Developer from India, specializing in building scalable and efficient web applications using modern technologies like React, Next.js, and TypeScript.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies does Manpreet Singh work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Manpreet Singh works with React, Next.js, TypeScript, JavaScript, Node.js, Tailwind CSS, and various other modern web development tools and frameworks.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col">
        <main className="grow px-4 max-w-3xl mx-auto py-8">
          <h1 className="text-4xl font-bold mb-4">Manpreet Singh</h1>
          <h2 className="text-2xl text-gray-500 mb-6">
            <Typewriter
              options={{
                strings: ['Full Stack Developer, India', 'Tech Enthusiast', 'Open For Internships'],
                autoStart: true,
                loop: true,
                delay: 75,
                cursor: '_',
              }}
            />
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I work with latest technologies to build scalable and efficient web applications. My
            expertise lies in full-stack development, with a focus on creating seamless user
            experiences and robust backend systems.
          </p>

          <div className="flex items-center gap-3">
            <pre
              className="px-3 py-2 rounded-lg font-mono text-sm 
               bg-gray-100 text-gray-900 border border-gray-300
               dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700"
            >
              <code>$ npx hello-mannu</code>
            </pre>

            <button
              onClick={async () => {
                await navigator.clipboard.writeText('npx hello-mannu');
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              title="Copy"
              className="
      px-2 py-2 rounded-lg border border-gray-300 
      bg-gray-100 text-gray-700
      hover:bg-gray-200 hover:border-gray-400 
      dark:bg-neutral-900 dark:hover:bg-neutral-800 
      dark:text-neutral-300 dark:border-neutral-700
      transition-colors flex items-center gap-1
    "
            >
              {copied ? (
                <span className="text-xs text-gray-600 dark:text-neutral-400">Copied</span>
              ) : (
                <Copy size={16} className="text-gray-600 dark:text-neutral-400" />
              )}
            </button>
          </div>
        </main>
        <Suspense fallback={<div className="h-40 animate-pulse bg-muted rounded-lg" />}>
          <Activities />
        </Suspense>

        <section className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">Send me a message</h2>

          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <DiscordMessageBox />
          </Suspense>
        </section>
      </div>
    </>
  );
}
