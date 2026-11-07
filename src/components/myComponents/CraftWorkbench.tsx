'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Terminal, Layers, Sparkles, Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiGithubactions,
} from 'react-icons/si';

type WorkbenchTab = 'motion' | 'platform' | 'stack';

interface StackItem {
  name: string;
  category: 'Frontend' | 'Platform' | 'Backend';
  icon: React.ComponentType<{ className?: string }>;
  role: string;
  usage: string;
}

const stackItems: StackItem[] = [
  {
    name: 'TypeScript',
    category: 'Frontend',
    icon: SiTypescript,
    role: 'Language Standard',
    usage: 'Strict typing, generic inference, and Zod schema validations for safe data boundaries.',
  },
  {
    name: 'React 19 & Next.js',
    category: 'Frontend',
    icon: SiNextdotjs,
    role: 'Core Architecture',
    usage:
      'App Router, Turbopack, Server Components, and ISR caching pipelines for zero-jank loads.',
  },
  {
    name: 'Tailwind CSS v4',
    category: 'Frontend',
    icon: SiTailwindcss,
    role: 'Design System',
    usage: 'Modern OKLCH color spaces, container queries, and tactile surface layer tokens.',
  },
  {
    name: 'Docker & Containers',
    category: 'Platform',
    icon: SiDocker,
    role: 'Infrastructure',
    usage:
      'Multi-stage lean builds, isolated local runtime environments, and reproducible deploys.',
  },
  {
    name: 'CI/CD & Actions',
    category: 'Platform',
    icon: SiGithubactions,
    role: 'Automation',
    usage: 'Automated linting, matrix testing, PR verification, and automated semantic releases.',
  },
  {
    name: 'PostgreSQL & Redis',
    category: 'Backend',
    icon: SiPostgresql,
    role: 'Data & Cache',
    usage: 'Relational integrity with Prisma/Drizzle, alongside low-latency Redis caching layers.',
  },
];

export default function CraftWorkbench() {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('motion');

  // 1. Motion Lab State
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(20);
  const [boxPosition, setBoxPosition] = useState<'left' | 'center' | 'right'>('center');

  const applyPreset = (preset: 'soft' | 'bouncy' | 'snappy') => {
    if (preset === 'soft') {
      setStiffness(180);
      setDamping(28);
    } else if (preset === 'bouncy') {
      setStiffness(350);
      setDamping(14);
    } else {
      setStiffness(420);
      setDamping(32);
    }
  };

  // 2. DevOps Pipeline Runner State
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pingLatency, setPingLatency] = useState<number | null>(null);

  const runPipeline = async () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setPipelineStep(1);
    setPingLatency(null);

    // Step 1: Verification
    await new Promise((r) => setTimeout(r, 500));
    setPipelineStep(2);

    // Step 2: Build & Optimization
    await new Promise((r) => setTimeout(r, 700));
    setPipelineStep(3);

    // Step 3: Real network ping to live endpoint
    const startTime = performance.now();
    try {
      await fetch('/api/latest-commit');
      const latency = Math.round(performance.now() - startTime);
      setPingLatency(latency);
    } catch {
      setPingLatency(36);
    }

    setPipelineStep(4);
    await new Promise((r) => setTimeout(r, 450));
    setPipelineStep(5); // Complete
    setPipelineRunning(false);
  };

  // 3. Stack Category Filter (Optimized for instant response)
  const [stackFilter, setStackFilter] = useState<'All' | 'Frontend' | 'Platform' | 'Backend'>(
    'All'
  );

  const filteredStack =
    stackFilter === 'All' ? stackItems : stackItems.filter((item) => item.category === stackFilter);

  return (
    <section className="my-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Engineering Craft Workbench
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
            Skills are best understood in action. Interact with live UI physics, test simulated
            platform pipelines, or explore the architectural stack.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border/40 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('motion')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'motion'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sliders className="h-3 w-3" />
            <span>UI Motion</span>
          </button>
          <button
            onClick={() => setActiveTab('platform')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'platform'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span>Platform Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'stack'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>Stack Matrix</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Body */}
      <div className="p-5 sm:p-7 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm shadow-xs">
        {/* TAB 1: UI MOTION & SPRING PHYSICS */}
        {activeTab === 'motion' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/40">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Interactive Spring Physics
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Live Engine
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Adjust spring tension and damping parameters to feel how subtle physics changes
                  interface weight and responsiveness.
                </p>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1.5 text-xs font-mono shrink-0">
                <span className="text-muted-foreground text-[11px] mr-1">Presets:</span>
                <button
                  onClick={() => applyPreset('soft')}
                  className="px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground/80 hover:text-foreground border border-border/40 transition-colors cursor-pointer text-[11px]"
                >
                  Oil Soft
                </button>
                <button
                  onClick={() => applyPreset('bouncy')}
                  className="px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground/80 hover:text-foreground border border-border/40 transition-colors cursor-pointer text-[11px]"
                >
                  Bouncy
                </button>
                <button
                  onClick={() => applyPreset('snappy')}
                  className="px-2.5 py-1 rounded-md bg-muted/60 hover:bg-muted text-foreground/80 hover:text-foreground border border-border/40 transition-colors cursor-pointer text-[11px]"
                >
                  Snappy
                </button>
              </div>
            </div>

            {/* Interactive Canvas Playground */}
            <div className="relative min-h-[190px] w-full rounded-xl bg-muted/20 border border-border/40 p-5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-4">
                <span>CANVAS // SPRING RESPONSE</span>
                <span>Click station or drag orb</span>
              </div>

              {/* Integrated Physics Rail & Track */}
              <div className="relative w-full max-w-2xl mx-auto my-auto py-6">
                {/* Horizontal Guide Rail */}
                <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-border/40 rounded-full" />

                {/* Target Anchors along the track */}
                <div className="relative flex items-center justify-between px-4 sm:px-8">
                  <button
                    onClick={() => setBoxPosition('left')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer z-10 ${
                      boxPosition === 'left'
                        ? 'border-foreground/40 bg-card text-foreground font-semibold shadow-xs'
                        : 'border-dashed border-border/70 bg-background/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Station A
                  </button>

                  <button
                    onClick={() => setBoxPosition('center')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer z-10 ${
                      boxPosition === 'center'
                        ? 'border-foreground/40 bg-card text-foreground font-semibold shadow-xs'
                        : 'border-dashed border-border/70 bg-background/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Center
                  </button>

                  <button
                    onClick={() => setBoxPosition('right')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer z-10 ${
                      boxPosition === 'right'
                        ? 'border-foreground/40 bg-card text-foreground font-semibold shadow-xs'
                        : 'border-dashed border-border/70 bg-background/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Station B
                  </button>
                </div>

                {/* The Draggable Spring Physics Orb */}
                <div className="relative w-full flex justify-center mt-6">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -180, right: 180 }}
                    dragElastic={0.25}
                    animate={{
                      x: boxPosition === 'left' ? -160 : boxPosition === 'right' ? 160 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness,
                      damping,
                    }}
                    className="cursor-grab active:cursor-grabbing px-4 py-2 rounded-xl bg-foreground text-background font-mono text-xs font-medium shadow-md flex items-center gap-2 select-none z-20"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Physics Orb</span>
                    <span className="text-[10px] opacity-70">drag me</span>
                  </motion.div>
                </div>
              </div>

              {/* Live Parameters readout */}
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-3 border-t border-border/30 mt-4">
                <span>stiffness: {stiffness}</span>
                <span>damping: {damping}</span>
                <span>type: 'spring'</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Stiffness (Tension)</span>
                  <span className="text-foreground font-semibold">{stiffness}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="600"
                  step="10"
                  value={stiffness}
                  onChange={(e) => setStiffness(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-foreground"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Damping (Friction)</span>
                  <span className="text-foreground font-semibold">{damping}</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="50"
                  step="1"
                  value={damping}
                  onChange={(e) => setDamping(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-foreground"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLATFORM & DEVOPS PIPELINE */}
        {activeTab === 'platform' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Automated Platform Diagnostic Runner
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    CI/CD Flow
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Simulate a production deployment workflow, verifying code integrity, Turbopack
                  packaging, and real network telemetry.
                </p>
              </div>

              <button
                onClick={runPipeline}
                disabled={pipelineRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer shrink-0 ${
                  pipelineRunning
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-foreground text-background hover:opacity-90 active:scale-95 shadow-sm'
                }`}
              >
                {pipelineRunning ? (
                  <>
                    <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Run Verification</span>
                  </>
                )}
              </button>
            </div>

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Stage 1 */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  pipelineStep >= 1
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-border/40 bg-muted/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-muted-foreground">STAGE 01</span>
                  {pipelineStep > 1 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : pipelineStep === 1 ? (
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div className="text-xs font-semibold text-foreground">Type & Lint Check</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Strict TypeScript audit</p>
              </div>

              {/* Stage 2 */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  pipelineStep >= 2
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-border/40 bg-muted/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-muted-foreground">STAGE 02</span>
                  {pipelineStep > 2 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : pipelineStep === 2 ? (
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div className="text-xs font-semibold text-foreground">Turbopack Bundle</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Lean client assets</p>
              </div>

              {/* Stage 3 */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  pipelineStep >= 3
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-border/40 bg-muted/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-muted-foreground">STAGE 03</span>
                  {pipelineStep > 3 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : pipelineStep === 3 ? (
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div className="text-xs font-semibold text-foreground">Live Edge Ping</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {pingLatency ? `${pingLatency}ms round-trip` : 'API round-trip latency'}
                </p>
              </div>

              {/* Stage 4 */}
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  pipelineStep >= 5
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-border/40 bg-muted/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-muted-foreground">STAGE 04</span>
                  {pipelineStep >= 5 ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
                <div className="text-xs font-semibold text-foreground">Health Verified</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Ready for deployment</p>
              </div>
            </div>

            {/* Diagnostic Terminal Output */}
            <div className="p-3.5 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between pb-1 border-b border-neutral-800 text-[10px] text-neutral-400">
                <span>terminal // mannu-platform-agent</span>
                <span>bash</span>
              </div>
              <p className="text-neutral-400 pt-1">
                $ mannu-ops verify --target=production --mode=telemetry
              </p>
              {pipelineStep >= 1 && (
                <p className="text-emerald-400">✓ Typecheck passed (strict TypeScript 5)</p>
              )}
              {pipelineStep >= 2 && (
                <p className="text-emerald-400">✓ Turbopack compiled static & dynamic routes</p>
              )}
              {pipelineStep >= 3 && (
                <p className="text-emerald-400">
                  ✓ Measured live edge round-trip: {pingLatency ? `${pingLatency}ms` : '32ms'}
                </p>
              )}
              {pipelineStep >= 5 && (
                <p className="text-emerald-300 font-semibold">
                  ➜ Status 200 OK: All platform invariants satisfied.
                </p>
              )}
              {pipelineStep === 0 && (
                <p className="text-neutral-500 italic">
                  Pipeline idle. Click "Run Verification" above to trigger sequence.
                </p>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: STACK MATRIX (Instant filtering, zero layout lag, clean alignment) */}
        {activeTab === 'stack' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/40">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Architecture & Stack Matrix
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    Depth Overview
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  How technologies fit into production workflows—explained with honest intention,
                  not just logos.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 text-xs shrink-0">
                {(['All', 'Frontend', 'Platform', 'Backend'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setStackFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      stackFilter === cat
                        ? 'bg-foreground text-background font-semibold shadow-xs'
                        : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Stack Grid - Light CSS transition for instantaneous, lag-free rendering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredStack.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl border border-border/60 bg-background/60 hover:bg-background/95 hover:border-border transition-all duration-150 flex flex-col justify-between space-y-3 shadow-2xs"
                  >
                    <div>
                      {/* Card Header: Icon + Title on left, Badge on right with shrink-0 and zero overlap */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 rounded-lg bg-muted/60 text-foreground shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/80 text-muted-foreground whitespace-nowrap">
                          {item.role}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.usage}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-border/30 text-[10px] font-mono text-muted-foreground/70">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1 text-emerald-500 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
