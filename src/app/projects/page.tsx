import React from 'react';
import { projects } from '@/data/projects';
import ProjectsSection from '@/components/myComponents/ProjectSection';

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
      <section className="px-5 sm:px-6 lg:px-8 py-1">
        <h1 className="text-3xl font-bold text-center mb-8">Projects Showcase</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore my portfolio of web applications, creative experiments, and open-source
          contributions built with modern technologies.
        </p>
        <main className="relative left-1/2 -ml-[50vw] w-screen max-w-none px-0">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ProjectsSection />
          </div>
        </main>
      </section>
    </>
  );
}
