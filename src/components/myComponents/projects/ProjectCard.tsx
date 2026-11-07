'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  X,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  Layers,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ProjectPreviewArt from './ProjectPreviewArt';
import { Project } from '@/data/projects';

export interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalBodyOverflow;
      };
    }
  }, [modalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(delay * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setModalOpen(true)}
        className="group relative flex flex-col h-full rounded-2xl border border-border/70 bg-card/75 hover:bg-card hover:border-border transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden p-4 sm:p-5"
      >
        {/* Top Preview Canvas */}
        <div className="relative mb-4">
          <ProjectPreviewArt
            title={project.title}
            image={project.image}
            category={project.category}
          />

          {/* Quick Hover Inspect Pill */}
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/70 text-[10px] font-mono text-foreground font-medium shadow-xs">
              <Maximize2 className="w-2.5 h-2.5" />
              Inspect
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col grow">
          {/* Category & Date strip */}
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-2">
            <span className="px-2 py-0.5 rounded-md bg-muted/60 border border-border/40 text-[10px] text-foreground/80 font-medium">
              {project.category}
            </span>
            <span className="text-[11px] text-muted-foreground/70 flex items-center gap-1">
              <Calendar className="w-3 h-3 opacity-60" />
              {project.createdAt}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2 flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </h3>

          {/* Tagline / Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 grow">
            {project.tagline || project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40 mb-4">
            {project.badge.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/40 border border-border/50 text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.badge.length > 4 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                +{project.badge.length - 4}
              </span>
            )}
          </div>

          {/* Actions Bar */}
          <div
            className="flex items-center gap-2 pt-2 text-xs font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border/70 hover:bg-muted/70 text-foreground transition-colors"
              >
                <FaGithub className="w-3 h-3" />
                <span>Source</span>
              </a>
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="ml-auto inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors py-1 px-1.5"
            >
              <span>Details</span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Detail Inspection Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-muted/60 hover:bg-muted border border-border/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                    {project.category}
                  </span>
                  <span>•</span>
                  <span>{project.createdAt}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {project.title}
                </h2>
                {project.tagline && (
                  <p className="text-sm sm:text-base font-medium text-foreground/80">
                    {project.tagline}
                  </p>
                )}
              </div>

              {/* Preview Artwork */}
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <ProjectPreviewArt
                  title={project.title}
                  image={project.image}
                  category={project.category}
                  className="aspect-[16/9]"
                />
              </div>

              {/* Description */}
              <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>{project.longDescription || project.description}</p>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-3 p-4 rounded-2xl bg-muted/20 border border-border/50">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Key Capabilities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture Highlights */}
              {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                <div className="space-y-3 p-4 rounded-2xl bg-muted/20 border border-border/50">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" /> Architecture & Implementation
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {project.architectureHighlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary font-mono text-[10px] mt-0.5">0{i + 1}</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technology Stack Tags */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground block">
                  Technologies & Frameworks
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.badge.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted/50 border border-border/60 text-foreground/90 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60 font-mono text-xs">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xs"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 bg-card border border-border/80 hover:bg-muted/70 text-foreground font-semibold rounded-xl transition-colors shadow-2xs"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
