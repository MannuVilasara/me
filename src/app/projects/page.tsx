'use client';

import React from 'react';
import { projects } from '@/data/projects';
import ProjectsSection from '@/components/myComponents/ProjectSection';

export default function Page() {
  return (
    <section className="px-5 sm:px-6 lg:px-8 py-1">
      <h1 className="text-3xl font-bold text-center mb-8">Projects Showcase</h1>
      <main className="relative left-1/2 -ml-[50vw] w-screen max-w-none px-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ProjectsSection />
        </div>
      </main>
    </section>
  );
}
