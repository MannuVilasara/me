'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Box2LineIcon,
} from '@/components/ui/accordion';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import { projects } from '@/data/projects';

function ProjectsSection() {
  const [showMore, setShowMore] = useState(false);
  const [openItem, setOpenItem] = useState('project-1');
  const filteredProjects = showMore ? projects : projects.slice(0, 4);
  return (
    <section className="full-line-bottom relative">
      <div className="">
        {filteredProjects.map((project, index) => (
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            key={index}
          >
            <AccordionItem value={`project-${project.id}`}>
              <AccordionTrigger aria-label={project.createdAt}>
                <div className="flex items-center justify-between p-4 h-full w-fit ">
                  <div className="  size-6 shrink-0">
                    <Box2LineIcon />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center py-4 pl-4 border-l mono gap-1 h-full">
                  <h3 className="text-balance font-medium text-base leading-snug flex gap-2 items-center justify-center ">
                    {project.title}
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight className="size-4 text-muted-foreground hover:text-primary" />
                    </a>
                  </h3>
                  <span className="text-muted-foreground text-xs  ">{project.createdAt}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-b">
                <div className="prose prose-sm max-w-none mono text-foreground prose-zinc dark:prose-invert prose-headings:font-sans prose-headings:font-semibold prose-headings:text-balance prose-h2:border-b prose-h2:border-edge prose-h2:pb-2 prose-h2:text-2xl prose-lead:text-base prose-a:font-medium prose-a:break-words prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-edge">
                  <p>{project.description}</p>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.badge.map((badge, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-lg border bg-zinc-50 px-1.5 py-0.5 mono text-xs text-muted-foreground dark:bg-zinc-900"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="mt-0 flex items-center gap-4 justify-start">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        className="mt-4 flex  hover:text-primary gap-2 items-center justify-center "
                      >
                        Github Repository{' '}
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        className="mt-4 flex  hover:text-primary gap-2  items-center justify-center "
                      >
                        Live demo{' '}
                      </a>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <div className="flex items-center py-2 justify-center">
        {showMore ? (
          <Button
            size={'sm'}
            onClick={() => setShowMore(false)}
            className="rounded-2xl flex items-center gap-2"
          >
            Show Less <ChevronUp />
          </Button>
        ) : (
          <Button
            size={'sm'}
            onClick={() => setShowMore(true)}
            className="rounded-2xl flex items-center gap-2"
          >
            Show More <ChevronDown />
          </Button>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
