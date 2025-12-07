'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  Layers,
  Calendar,
  ArrowUpRight,
  // Tech Icons
  Code2,
  Terminal,
  Cpu,
  Database,
  Shield,
  Zap,
  Server,
  Box,
  Smartphone,
  Atom,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { cn } from '@/lib/utils';

// Helper to determine icon and color based on tech stack
const getProjectTheme = (badges: string[], title: string, description: string) => {
  const text = (badges.join(' ') + ' ' + title + ' ' + description).toLowerCase();

  if (text.includes('react') || text.includes('native'))
    return { Icon: Atom, gradient: 'from-blue-600 to-cyan-500' };
  if (text.includes('next') || text.includes('next.js'))
    return { Icon: Zap, gradient: 'from-zinc-700 to-black' };
  if (text.includes('python') || text.includes('ai') || text.includes('machine learning'))
    return { Icon: Cpu, gradient: 'from-yellow-500 to-orange-500' };
  if (text.includes('security') || text.includes('cyber'))
    return { Icon: Shield, gradient: 'from-red-600 to-rose-500' };
  if (text.includes('database') || text.includes('sql') || text.includes('mongo'))
    return { Icon: Database, gradient: 'from-emerald-500 to-teal-400' };
  if (text.includes('cli') || text.includes('tool') || text.includes('git'))
    return { Icon: Terminal, gradient: 'from-slate-700 to-slate-900' };
  if (text.includes('mobile') || text.includes('app'))
    return { Icon: Smartphone, gradient: 'from-purple-600 to-indigo-600' };
  if (text.includes('server') || text.includes('api') || text.includes('backend'))
    return { Icon: Server, gradient: 'from-blue-700 to-indigo-800' };
  if (text.includes('monorepo') || text.includes('turbo'))
    return { Icon: Box, gradient: 'from-pink-600 to-rose-600' };

  return { Icon: Code2, gradient: 'from-violet-600 to-purple-600' };
};

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export default function ProjectGrid() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = projects.find((p) => p.id === selectedId);

  useBodyScrollLock(!!selectedId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => {
          const { Icon, gradient } = getProjectTheme(
            project.badge,
            project.title,
            project.description
          );

          return (
            <motion.div
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative flex flex-col h-[400px] overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all active:scale-[0.99]"
            >
              {/* Image Area */}
              <div className="relative h-64 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <div className="h-full w-full">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    // Dynamic Fallback Background
                    <div
                      className={cn(
                        'h-full w-full flex items-center justify-center bg-gradient-to-br transition-transform duration-500 group-hover:scale-105',
                        gradient
                      )}
                    >
                      <Icon className="h-16 w-16 text-white/90 drop-shadow-md" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                  <ArrowUpRight className="h-5 w-5 text-white drop-shadow-sm" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 flex gap-2 overflow-hidden mask-linear-fade">
                  {project.badge.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 40,
                transition: { duration: 0.2, ease: 'easeIn' },
              }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-5xl h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col z-10 pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(null);
                }}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Hero Image Section */}
                <div className="relative h-[400px] w-full shrink-0 bg-zinc-900">
                  {(() => {
                    const { Icon, gradient } = getProjectTheme(
                      selectedProject.badge,
                      selectedProject.title,
                      selectedProject.description
                    );

                    return selectedProject.image ? (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="h-full w-full object-cover opacity-90"
                      />
                    ) : (
                      <div
                        className={cn(
                          'h-full w-full flex items-center justify-center bg-gradient-to-br',
                          gradient
                        )}
                      >
                        <Icon className="h-32 w-32 text-white/80 drop-shadow-xl" strokeWidth={1} />
                      </div>
                    );
                  })()}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
                        {selectedProject.title}
                      </h2>
                    </motion.div>
                    <div className="flex items-center gap-4 text-zinc-300 text-sm font-mono">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} /> {selectedProject.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                          <Layers size={16} /> Overview
                        </h4>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                          {selectedProject.description}
                        </p>
                      </div>

                      {selectedProject.features && (
                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-6">
                            Key Features
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedProject.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 text-sm"
                              >
                                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8 lg:border-l lg:border-zinc-100 lg:dark:border-zinc-800 lg:pl-12">
                      <div className="flex flex-col gap-3">
                        {selectedProject.live && (
                          <a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                          >
                            <ExternalLink size={18} /> Visit Live Site
                          </a>
                        )}
                        {selectedProject.href && (
                          <a
                            href={selectedProject.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors active:scale-[0.98]"
                          >
                            <Github size={18} /> Source Code
                          </a>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.badge.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs font-medium border border-zinc-200 dark:border-zinc-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
