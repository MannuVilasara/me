'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="my-14">
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Selected Work
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Systems, developer platforms, and practical web applications.
          </p>
        </div>

        <Link
          href="/projects"
          className="group flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>All projects</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative p-5 rounded-2xl border border-border/60 bg-card/40 hover:bg-card/90 hover:border-border transition-all duration-300 backdrop-blur-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-muted-foreground/60">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border/30">
              {project.badge.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-muted/50 text-muted-foreground border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
