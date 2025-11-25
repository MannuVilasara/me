'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github, Calendar, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
} from '@/components/ai-elements/web-preview';
import { Badge } from '@/components/ui/badge';

function ProjectsSection() {
  const [showMore, setShowMore] = useState(false);

  // Split projects: Show top 3 by default
  const FEATURED_COUNT = 3;
  const defaultProjects = projects.slice(0, FEATURED_COUNT);
  const additionalProjects = projects.slice(FEATURED_COUNT);

  const handleToggle = () => {
    if (showMore) {
      setShowMore(false);
      // Optional: scroll back up slightly to maintain context
      const anchor = document.getElementById('projects-anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setShowMore(true);
    }
  };

  const ProjectItem = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="relative pl-8 md:pl-12 py-6 first:pt-0"
      >
        {/* Timeline Line & Dot */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" aria-hidden="true">
          {/* Dot */}
          <div className="absolute top-8 -left-[5px] h-[11px] w-[11px] rounded-full border-2 border-background bg-muted-foreground/20 ring-4 ring-background transition-colors hover:bg-primary/50" />
        </div>

        {/* Date Indicator */}
        <div className="mb-3 flex items-center gap-2 text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
          <Calendar className="h-3 w-3" />
          {project.createdAt}
        </div>

        {/* Browser Card */}
        <div className="h-[400px] sm:h-[500px] w-full group">
          <WebPreview
            defaultUrl={project.live || project.href || '/'}
            className="h-full shadow-sm border border-border/50 transition-all duration-300 group-hover:border-border group-hover:shadow-md bg-background rounded-lg overflow-hidden"
          >
            <WebPreviewNavigation className="bg-muted/5 border-b border-border/40 px-3 h-10">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                {/* Traffic Lights */}
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-border/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-border/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-border/60" />
                </div>

                <div className="ml-2 w-px h-4 bg-border/50" />

                <span className="font-medium text-sm text-foreground/80 truncate px-1">
                  {project.title}
                </span>
              </div>

              {/* Fake URL Bar */}
              <div className="hidden sm:block flex-[1.5] px-4">
                <WebPreviewUrl className="bg-muted/10 text-muted-foreground/50 text-xs h-6 flex items-center justify-center rounded-sm" />
              </div>

              <div className="flex items-center justify-end flex-1 gap-1">
                {project.href && (
                  <WebPreviewNavigationButton
                    tooltip="Source Code"
                    onClick={() => window.open(project.href, '_blank')}
                    className="hover:bg-muted/20"
                  >
                    <Github className="size-3.5 opacity-60" />
                  </WebPreviewNavigationButton>
                )}

                {project.live && (
                  <WebPreviewNavigationButton
                    tooltip="Live Demo"
                    onClick={() => window.open(project.live, '_blank')}
                    className="hover:bg-muted/20"
                  >
                    <ExternalLink className="size-3.5 opacity-60" />
                  </WebPreviewNavigationButton>
                )}
              </div>
            </WebPreviewNavigation>

            {/* Content Body */}
            {project.live ? (
              <WebPreviewBody src={project.live} className="bg-white dark:bg-zinc-950" />
            ) : (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-background/30 backdrop-blur-[2px]">
                <div className="max-w-2xl mx-auto space-y-8">
                  {/* Description */}
                  <div>
                    <h4 className="text-base font-semibold tracking-tight mb-2 text-foreground">
                      Overview
                    </h4>
                    <p className="text-muted-foreground leading-7 text-sm sm:text-base font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Features List */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground flex items-center gap-2">
                        <Layers className="h-3 w-3" /> Key Features
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {project.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-sm text-foreground/80 flex items-start gap-2.5"
                          >
                            <span className="mt-2 h-1 w-1 rounded-full bg-foreground/30 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
                      Built With
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.badge.map((badge, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-background/50 text-muted-foreground font-mono text-[10px] sm:text-xs border-border/60"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-border/30 flex gap-4">
                    {project.live && (
                      <Button
                        size="sm"
                        className="gap-2 h-9 px-4 rounded-full"
                        onClick={() => window.open(project.live, '_blank')}
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Visit Site
                      </Button>
                    )}
                    {project.href && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 h-9 px-4 rounded-full bg-transparent"
                        onClick={() => window.open(project.href, '_blank')}
                      >
                        <Github className="h-3.5 w-3.5" /> Source
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </WebPreview>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects-anchor" className="max-w-5xl mx-auto px-4 py-16 sm:py-10">
      <div className="relative">
        {/* Featured Projects */}
        {defaultProjects.map((project, index) => (
          <ProjectItem key={project.id || index} project={project} index={index} />
        ))}

        {/* Additional Projects (Animated Reveal) */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {additionalProjects.map((project, index) => (
                <ProjectItem
                  key={project.id || index + FEATURED_COUNT}
                  project={project}
                  index={index + FEATURED_COUNT}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continuous Timeline Line behind the button */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 -z-10" />
      </div>

      {/* Show More / Timeline End Button */}
      <div className="pl-8 md:pl-12 mt-12 relative z-10">
        <div className="relative">
          {/* Horizontal Connector */}
          <div className="absolute top-1/2 -left-8 md:-left-12 w-8 md:w-12 h-px bg-border/50" />
          <div className="absolute top-1/2 -left-[33px] md:-left-[49px] -translate-y-1/2 h-[9px] w-[9px] rounded-full border border-muted-foreground/30 bg-background" />

          <Button
            variant="outline"
            onClick={handleToggle}
            className="group h-10 pl-4 pr-6 rounded-full border-border/60 hover:border-foreground/20 hover:bg-muted/30 transition-all"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              {showMore ? (
                <>
                  <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground">
                    Show Less
                  </span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-foreground">View Full Archive</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 text-[10px] bg-muted text-muted-foreground h-5 px-1.5"
                  >
                    {additionalProjects.length} more
                  </Badge>
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
