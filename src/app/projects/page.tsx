import React from 'react';
import { projects } from '@/data/projects';
import { ProjectSection } from '@/components/myComponents/stats';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Manpreet Singh',
  description:
    'Explore my portfolio of web applications, creative experiments, and open-source contributions built with modern technologies.',
  openGraph: {
    title: 'Projects — Manpreet Singh',
    description:
      'Explore my portfolio of web applications, creative experiments, and open-source contributions.',
    url: 'https://mannu.live/projects',
    siteName: 'Manpreet Singh Portfolio',
    images: [
      {
        url: 'https://mannu.live/og?title=Projects%20%E2%80%94%20Manpreet%20Singh&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
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
    title: 'Projects — Manpreet Singh',
    description: 'Explore my portfolio of web applications and open-source contributions.',
    images: [
      'https://mannu.live/og?title=Projects%20%E2%80%94%20Manpreet%20Singh&description=Explore%20my%20portfolio%20of%20web%20applications%20and%20open-source%20contributions',
    ],
  },
  alternates: {
    canonical: 'https://mannu.live/projects',
  },
};

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects Showcase',
    description:
      'Portfolio of web applications, creative experiments, and open-source contributions built with modern technologies.',
    url: 'https://mannu.live/projects',
    author: {
      '@type': 'Person',
      name: 'Manpreet Singh',
      url: 'https://mannu.live',
    },
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.live || project.href || 'https://mannu.live/projects',
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
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-lg">
            A collection of things I&apos;ve built. Click to expand and learn more.
          </p>
        </div>

        {/* Projects List */}
        <ProjectSection />
      </div>
    </>
  );
}
