'use client';

import { lazy, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { Copy, Check, Github, Instagram, Terminal } from 'lucide-react';
import { FaDiscord, FaDev } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npx hello-mannu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="text-xl sm:text-2xl text-muted-foreground font-medium h-8 flex items-center mb-8">
            <span className="mr-2 text-foreground/50">{'>'}</span>
            <Typewriter
              options={{
                strings: ['Full Stack Developer', 'Tech Enthusiast', 'Open For Internships'],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
                cursor: '_',
              }}
            />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            I work with latest technologies to build scalable and efficient web applications. My
            expertise lies in full-stack development, with a focus on creating seamless user
            experiences and robust backend systems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* NPX Card */}
            <button
              onClick={handleCopy}
              className="group cursor-pointer flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Copy npx command"
            >
              <Terminal className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <code className="font-mono text-sm text-foreground">npx hello-mannu</code>
              <div className="pl-3 border-l border-border/50 ml-1">
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500 animate-in zoom-in" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </div>
            </button>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href="https://github.com/MannuVilasara"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href="https://instagram.com/dev_mannuu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                asChild
              >
                <a
                  href="https://discord.com/users/786926252811485186"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDiscord className="h-5 w-5" />
                </a>
              </Button>
            </div>
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
