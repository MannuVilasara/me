'use client';

import { lazy, Suspense, useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Github, Instagram, Terminal } from 'lucide-react';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import LiveTelemetryBar from '@/components/myComponents/LiveTelemetryBar';
import CraftWorkbench from '@/components/myComponents/CraftWorkbench';
import FeaturedProjects from '@/components/myComponents/FeaturedProjects';

// Lazy load below the fold components
const Activities = lazy(() => import('@/components/myComponents/Activities/Activities'));
const DiscordMessageBox = lazy(() => import('@/components/myComponents/Contact/MessageBox'));

export default function HomeContent() {
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
          text: 'Manpreet Singh (Mannu Vilasara) is a Full Stack Developer and Platform Engineer from India, building scalable web systems with React, Next.js, TypeScript, and Docker.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies does Manpreet Singh work with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Manpreet works with React, Next.js, TypeScript, Tailwind CSS, Node.js, Docker, PostgreSQL, and modern cloud deployment pipelines.',
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

      <div className="flex flex-col space-y-4">
        {/* HERO SECTION (Oil UI + Oil Tone) */}
        <section className="pt-2 sm:pt-4 pb-4">
          {/* Top Meta Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-card/70 backdrop-blur-xs text-xs text-muted-foreground font-mono shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for select engineering opportunities</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted-foreground/70">
              <span>Punjab, India</span>
              <span>•</span>
              <span>IST (UTC+5:30)</span>
            </div>
          </div>

          {/* Heading & Role */}
          <div className="space-y-2.5 mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-display">
              Manpreet Singh
            </h1>
            <p className="text-lg sm:text-xl font-medium text-foreground/90 tracking-tight">
              Full-stack engineer building tactile interfaces and deterministic platform systems.
            </p>
          </div>

          {/* Oil Tone Personal Narrative */}
          <div className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3 mb-7">
            <p>
              I care about software that feels honest and deliberate in the hand—from the natural weight of a micro-interaction to the silent predictability of a deployment pipeline.
            </p>
            <p>
              Working primarily across TypeScript, Next.js, and Docker, with a growing obsession for platform engineering, developer tooling, and distributed automation.
            </p>
          </div>

          {/* Quick Actions & NPX Chip */}
          <div className="flex flex-wrap items-center gap-3">
            {/* NPX Tactile Chip */}
            <button
              onClick={handleCopy}
              className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-border/70 bg-card/70 hover:bg-card hover:border-border transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
              title="Click to copy npx card command"
            >
              <Terminal className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <code className="font-mono text-xs text-foreground font-medium">npx hello-mannu</code>
              <div className="pl-2 border-l border-border/50 ml-0.5">
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-500 animate-in zoom-in" />
                ) : (
                  <Copy className="h-3 w-3 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
                )}
              </div>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5">
              <Link
                href="https://github.com/MannuVilasara"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card/90 border border-border/60 bg-card/40 transition-colors shadow-2xs"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com/dev_mannuu"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card/90 border border-border/60 bg-card/40 transition-colors shadow-2xs"
                title="Twitter / X"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.com/users/786926252811485186"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card/90 border border-border/60 bg-card/40 transition-colors shadow-2xs"
                title="Discord"
              >
                <FaDiscord className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com/dev_mannuu"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card/90 border border-border/60 bg-card/40 transition-colors shadow-2xs"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* REAL-TIME DYNAMIC TELEMETRY HUD */}
        <LiveTelemetryBar />

        {/* CRAFT WORKBENCH (Skills showcased by using them) */}
        <CraftWorkbench />

        {/* SELECTED WORK / PROJECTS */}
        <FeaturedProjects />

        {/* PACMAN CONTRIBUTIONS & ACTIVITY */}
        <Suspense fallback={<div className="h-40 animate-pulse bg-muted/30 rounded-2xl" />}>
          <Activities />
        </Suspense>

        {/* SOFT CONTACT SECTION */}
        <section className="mt-14 border-t border-border/50 pt-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Say Hello
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Have an interesting problem, a platform challenge, or just want to chat? Drop a note below.
            </p>
          </div>

          <Suspense fallback={<div className="h-32 animate-pulse bg-muted/30 rounded-2xl" />}>
            <DiscordMessageBox />
          </Suspense>
        </section>
      </div>
    </>
  );
}
