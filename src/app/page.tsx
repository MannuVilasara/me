'use client';

import { useState, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import heavy animation libraries
const Typewriter = dynamic(() => import('typewriter-effect'), {
  ssr: false,
  loading: () => <span className="text-2xl">Full Stack Developer, India</span>,
});

const MotionSpan = dynamic(() => import('framer-motion').then((mod) => mod.motion.span), {
  ssr: false,
  loading: () => <span>→</span>,
});

// Lazy load components below the fold
const Activities = lazy(() => import('@/components/myComponents/Activities'));
const DiscordMessageBox = lazy(() => import('@/components/myComponents/MessageBox'));

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

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

          <Button asChild className="text-sm px-6 py-3 rounded-full font-bold">
            <Link
              href="/about"
              className="flex items-center gap-1 cursor-pointer mono"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              About{' '}
              <MotionSpan
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ display: 'inline-block' }}
              >
                →
              </MotionSpan>
            </Link>
          </Button>
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
