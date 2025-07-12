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
import { motion, AnimatePresence } from 'framer-motion';

function ProjectsSection() {
  const [showMore, setShowMore] = useState(false);
  const [openItem, setOpenItem] = useState('project-1');
  const [isHovered, setIsHovered] = useState(false);
  const defaultProjects = projects.slice(0, 4);
  const additionalProjects = projects.slice(4);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleShowLess = () => {
    setShowMore(false);
    // Smooth scroll to maintain user context
    setTimeout(() => {
      const buttonElement = document.getElementById('show-more-button');
      if (buttonElement) {
        buttonElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 200); // Small delay to allow exit animation to start
  };
  return (
    <section className="full-line-bottom relative">
      <div className="">
        {/* Default projects - always visible, no animation */}
        {defaultProjects.map((project, index) => (
          <div key={project.id}>
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
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
          </div>
        ))}

        {/* Additional projects - animated show/hide */}
        {additionalProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{
              height: 0,
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            animate={{
              height: showMore ? 'auto' : 0,
              opacity: showMore ? 1 : 0,
              y: showMore ? 0 : -20,
              scale: showMore ? 1 : 0.95,
            }}
            transition={{
              duration: 0.5,
              delay: showMore ? index * 0.1 : (additionalProjects.length - 1 - index) * 0.05,
              ease: [0.23, 1, 0.32, 1], // More dramatic easing
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 },
            }}
            style={{
              overflow: 'hidden',
              transformOrigin: 'top center',
            }}
          >
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
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
                </AccordionContent>{' '}
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))}
      </div>

      <div id="show-more-button" className="flex items-center py-2 justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {showMore ? (
            <Button
              size={'sm'}
              onClick={handleShowLess}
              className="rounded-2xl flex items-center gap-2 relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Show Less</span>
              <motion.span
                animate={{
                  y: isHovered ? -6 : 0,
                  rotate: isHovered ? -10 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  rotate: { duration: 0.2 },
                }}
                style={{ display: 'inline-block' }}
                className="relative z-10"
              >
                <ChevronUp />
              </motion.span>
            </Button>
          ) : (
            <Button
              size={'sm'}
              onClick={handleShowMore}
              className="rounded-2xl flex items-center gap-2 relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <span className="relative z-10">Show More</span>
              <motion.span
                animate={{
                  y: isHovered ? 6 : 0,
                  rotate: isHovered ? 10 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  rotate: { duration: 0.2 },
                }}
                style={{ display: 'inline-block' }}
                className="relative z-10"
              >
                <ChevronDown />
              </motion.span>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsSection;
