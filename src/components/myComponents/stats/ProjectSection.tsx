'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Github, Calendar } from 'lucide-react';
import { projects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';

function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="divide-y divide-border/40">
        {projects.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              {/* Collapsed Header - Always Visible */}
              <div className="py-5 flex items-center justify-between gap-4 text-left hover:bg-muted/5 transition-colors px-2 -mx-2 rounded-md">
                <button
                  type="button"
                  onClick={() => toggleExpand(project.id)}
                  className="flex-1 min-w-0 text-left cursor-pointer"
                  {...(isExpanded && { 'aria-expanded': 'true' })}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-foreground truncate">{project.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.badge.slice(0, 4).map((badge, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-muted-foreground/70 bg-muted/40 px-1.5 py-0.5 rounded"
                      >
                        {badge}
                      </span>
                    ))}
                    {project.badge.length > 4 && (
                      <span className="text-[10px] font-mono text-muted-foreground/50 px-1">
                        +{project.badge.length - 4}
                      </span>
                    )}
                  </div>
                </button>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Quick Links - visible on hover */}
                  <div className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                        aria-label={`View ${project.title} source code`}
                      >
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-muted rounded transition-colors"
                        aria-label={`Visit ${project.title} live site`}
                      >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    )}
                  </div>

                  <span className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground/60 font-mono">
                    <Calendar className="h-3 w-3" />
                    {project.createdAt}
                  </span>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    aria-label={isExpanded ? 'Collapse project details' : 'Expand project details'}
                  >
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    id={`project-content-${project.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2 px-2 space-y-6">
                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                            Features
                          </h4>
                          <ul className="grid gap-2">
                            {project.features.map((feature, i) => (
                              <li
                                key={i}
                                className="text-sm text-foreground/80 flex items-start gap-2"
                              >
                                <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                          Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.badge.map((badge, i) => (
                            <span
                              key={i}
                              className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-2">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Visit Site
                          </a>
                        )}
                        {project.href && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsSection;
