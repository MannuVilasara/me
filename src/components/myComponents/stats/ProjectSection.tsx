'use client';
import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLinkIcon, GithubIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
} from '@/components/ai-elements/web-preview';

function ProjectsSection() {
  const [showMore, setShowMore] = useState(false);
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
  const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
        style={{ height: '500px' }}
      >
        <WebPreview
          defaultUrl={project.live || project.href || '/'}
          onUrlChange={(url) => console.log('URL changed to:', url)}
          className="h-full"
        >
          <WebPreviewNavigation>
            <div className="flex items-center gap-2 flex-1">
              <h3 className="text-base font-semibold truncate">{project.title}</h3>
              <span className="text-xs text-muted-foreground">{project.createdAt}</span>
            </div>

            <WebPreviewUrl />

            {project.href && (
              <WebPreviewNavigationButton
                tooltip="View on GitHub"
                onClick={() => window.open(project.href, '_blank')}
              >
                <GithubIcon className="size-4" />
              </WebPreviewNavigationButton>
            )}

            {project.live && (
              <WebPreviewNavigationButton
                tooltip="Open live demo"
                onClick={() => window.open(project.live, '_blank')}
              >
                <ExternalLinkIcon className="size-4" />
              </WebPreviewNavigationButton>
            )}
          </WebPreviewNavigation>

          {project.live ? (
            <WebPreviewBody src={project.live} />
          ) : (
            <div className="flex-1 overflow-y-auto p-6 bg-background">
              <div className="prose prose-sm max-w-none mono text-foreground prose-zinc dark:prose-invert">
                <p className="text-base leading-relaxed">{project.description}</p>

                <h4 className="text-sm font-semibold mt-6 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>

                <h4 className="text-sm font-semibold mt-6 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.badge.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-lg border bg-zinc-50 px-2.5 py-1 text-xs text-muted-foreground dark:bg-zinc-900"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary underline underline-offset-4"
                    >
                      <GithubIcon className="size-4" />
                      View Repository
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary underline underline-offset-4"
                    >
                      <ExternalLinkIcon className="size-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </WebPreview>
      </motion.div>
    );
  };

  return (
    <section className="full-line-bottom relative">
      <div className="">
        {/* Default projects - always visible */}
        {defaultProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* Additional projects - animated show/hide */}
        {showMore &&
          additionalProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
            >
              <ProjectCard project={project} />
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
