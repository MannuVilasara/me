'use client';

import React from 'react';
import { ProjectLink } from '@/components/myComponents/ProjectLinks';
import { projects } from '@/data/projects';

const ProjectsShowcase = () => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8 min-h-screen">
      <div className="mx-auto max-w-5xl flex flex-col gap-6">
        {projects.map(({ title, description, imgSrc, href, target }, i) => (
          <ProjectLink
            key={i}
            heading={title}
            subheading={description}
            imgSrc={imgSrc}
            href={href}
            target={target}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
