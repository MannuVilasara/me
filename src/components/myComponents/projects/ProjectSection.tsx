'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectPreviewArt from './ProjectPreviewArt';

type CategoryFilter = 'All' | 'Platform & Infra' | 'Web Apps' | 'CLI & Tooling';

const categories: CategoryFilter[] = ['All', 'Platform & Infra', 'Web Apps', 'CLI & Tooling'];

export default function ProjectSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredModalProject, setFeaturedModalProject] = useState<Project | null>(null);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery =
        project.title.toLowerCase().includes(query) ||
        (project.tagline && project.tagline.toLowerCase().includes(query)) ||
        project.description.toLowerCase().includes(query) ||
        project.badge.some((b) => b.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Counts for each tab
  const categoryCounts = useMemo(() => {
    return {
      All: projects.length,
      'Platform & Infra': projects.filter((p) => p.category === 'Platform & Infra').length,
      'Web Apps': projects.filter((p) => p.category === 'Web Apps').length,
      'CLI & Tooling': projects.filter((p) => p.category === 'CLI & Tooling').length,
    };
  }, []);

  // Top flagship project to highlight when on "All" and no search query
  const flagshipProject = projects[0]; // GitHub Actions Visualizer
  const showFlagshipHero = selectedCategory === 'All' && !searchQuery.trim();

  // The remaining projects for the grid
  const gridProjects = showFlagshipHero
    ? filteredProjects.filter((p) => p.id !== flagshipProject.id)
    : filteredProjects;

  return (
    <div className="space-y-8">
      {/* FILTER & SEARCH BAR (Oil UI Tactile Controls) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 sm:p-2.5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/70 shadow-2xs">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-tab-pill"
                    className="absolute inset-0 rounded-xl bg-muted/90 border border-border/80 shadow-2xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-primary/15 text-primary font-bold'
                      : 'bg-muted/60 text-muted-foreground'
                  }`}
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[220px] sm:min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by tech or keyword..."
            className="w-full pl-8 pr-8 py-1.5 text-xs font-mono bg-background/80 border border-border/60 rounded-xl placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring focus:border-border transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* FLAGSHIP HERO SPOTLIGHT (Oil UI Protagonist) */}
      {showFlagshipHero && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card/90 via-card/60 to-muted/30 backdrop-blur-sm p-6 sm:p-8 shadow-xs"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Narrative & Architecture */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-semibold text-[11px]">
                  <Sparkles className="w-3 h-3" />
                  Flagship Platform
                </span>
                <span className="text-muted-foreground/70">•</span>
                <span className="text-muted-foreground font-medium">
                  {flagshipProject.createdAt}
                </span>
                <span className="text-muted-foreground/70">•</span>
                <span className="text-muted-foreground">{flagshipProject.category}</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-2">
                  {flagshipProject.title}
                </h2>
                <p className="text-sm sm:text-base font-medium text-foreground/80 leading-snug">
                  {flagshipProject.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {flagshipProject.description}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                {flagshipProject.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {flagshipProject.badge.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 border border-border/50 text-foreground/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
                {flagshipProject.live && (
                  <a
                    href={flagshipProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity shadow-xs"
                  >
                    <span>Launch Visualizer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {flagshipProject.href && (
                  <a
                    href={flagshipProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-border/80 hover:bg-muted/70 text-foreground font-semibold transition-colors shadow-2xs"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  onClick={() => setFeaturedModalProject(flagshipProject)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Column: Visualizer Preview Art */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-border/70 shadow-sm bg-card">
                <ProjectPreviewArt
                  title={flagshipProject.title}
                  image={flagshipProject.image}
                  category={flagshipProject.category}
                  className="aspect-[16/10]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* SYSTEMS DIRECTORY GRID */}
      <div className="space-y-4">
        {showFlagshipHero && (
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span>All Engineering Systems</span>
              <span>({filteredProjects.length})</span>
            </h3>
            <span className="text-[11px] font-mono text-muted-foreground/60">
              Click any card to inspect implementation details
            </span>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          /* Empty State (Oil Tone) */
          <div className="p-12 rounded-3xl border border-dashed border-border/80 text-center space-y-3 bg-card/30">
            <p className="text-sm font-medium text-foreground">
              No systems match &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try searching for different terms like Next.js, Docker, Go, or reset the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-muted border border-border text-xs font-mono text-foreground hover:bg-muted/80 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {gridProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} delay={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Featured Architecture Modal */}
      {featuredModalProject && <ProjectCard project={featuredModalProject} delay={0} />}
    </div>
  );
}
