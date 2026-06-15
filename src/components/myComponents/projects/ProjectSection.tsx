'use client';

import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          longDescription={project.description}
          image={
            project.image ||
            'https://img.magnific.com/free-psd/3d-rendered-purple-notebook-icon-with-bookmark_84443-56810.jpg'
          }
          tags={project.badge}
          link={project.live}
          github={project.href}
          createdAt={project.createdAt}
          features={project.features}
          delay={index}
        />
      ))}
    </div>
  );
}
