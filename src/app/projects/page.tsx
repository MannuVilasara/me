'use client';

import React from 'react';
import { ProjectLink } from '@/components/myComponents/ProjectLinks';
import { projects } from '@/data/projects';

export default function Page() {
  return (
    <section className="px-5 sm:px-6 lg:px-8 py-1">
      <h1 className="text-3xl font-bold text-center mb-8">Projects Showcase</h1>
      <main className="relative left-1/2 -ml-[50vw] w-screen max-w-none px-0">
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectLink key={i} {...project} />
          ))}
        </div>
      </main>
    </section>
  );
}
