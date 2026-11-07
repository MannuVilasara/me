import React from 'react';
import { projects } from '@/data/projects';
import ProjectSection from '@/components/myComponents/projects/ProjectSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Systems — Manpreet Singh',
  description:
    'A catalog of developer platforms, automation tools, and tactile web applications built with Next.js, Go, Docker, and TypeScript.',
  openGraph: {
    title: 'Projects & Systems — Manpreet Singh',
    description:
      'A catalog of developer platforms, automation tools, and tactile web applications built with Next.js, Go, Docker, and TypeScript.',
    url: 'https://mannu.tech/projects',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.tech/og?title=Projects%20%E2%80%94%20Manpreet%20Singh&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
        width: 1200,
        height: 630,
        alt: 'Manpreet Singh Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects & Systems — Manpreet Singh',
    description:
      'A catalog of developer platforms, automation tools, and tactile web applications built with Next.js, Go, Docker, and TypeScript.',
    images: [
      'https://mannu.tech/og?title=Projects%20%E2%80%94%20Manpreet%20Singh&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
    ],
  },
  alternates: {
    canonical: 'https://mannu.tech/projects',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects Showcase',
    description:
      'Portfolio of web applications, creative experiments, and open-source contributions built with modern technologies.',
    url: 'https://mannu.tech/projects',
    author: {
      '@type': 'Person',
      name: 'Manpreet Singh',
      url: 'https://mannu.tech',
    },
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.live || project.href || 'https://mannu.tech/projects',
      dateCreated: project.createdAt,
      keywords: project.badge.join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-4 sm:py-6 space-y-8">
        {/* PAGE HEADER (Oil UI Left-Aligned with Navbar) */}
        <header className="space-y-4">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-card/70 backdrop-blur-xs text-xs text-muted-foreground font-mono shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Artifacts & Production Deployments</span>
            </div>

            <div className="text-xs font-mono text-muted-foreground/70">
              <span>8 catalogued systems</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2.5">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Projects & Systems
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Software systems, developer platforms, and automation tools I&apos;ve designed and
              built. Each project represents an attempt to solve real friction—from simplifying
              CI/CD telemetry to crafting calm, tactile web interfaces.
            </p>
          </div>
        </header>

        {/* PROJECTS SECTION */}
        <ProjectSection />
      </div>
    </>
  );
}
