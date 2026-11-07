'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Terminal, GitPullRequest, Monitor, Activity, ShieldCheck, Layers } from 'lucide-react';

interface ProjectPreviewArtProps {
  title: string;
  image?: string;
  category?: string;
  className?: string;
}

export default function ProjectPreviewArt({
  title,
  image,
  category,
  className = '',
}: ProjectPreviewArtProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // If valid image exists and hasn't errored
  if (image && !imageError) {
    return (
      <div
        className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-card border border-border/50 group/img ${className}`}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted/40 animate-pulse flex items-center justify-center">
            <Layers className="w-5 h-5 text-muted-foreground/30 animate-spin" />
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {/* Soft subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </div>
    );
  }

  // Bespoke Procedural Blueprint Visuals for non-image or CLI/Tooling projects
  const lowerTitle = title.toLowerCase();

  // 1. git-auto procedural terminal
  if (lowerTitle.includes('git-auto')) {
    return (
      <div
        className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card/90 border border-border/60 p-4 font-mono text-[11px] leading-relaxed flex flex-col justify-between shadow-2xs group-hover:border-border transition-colors ${className}`}
      >
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-muted-foreground flex items-center gap-1">
              <Terminal className="w-3 h-3 text-muted-foreground" />
              git-auto cli
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/60">v1.2.0</span>
        </div>

        <div className="space-y-1.5 py-2 text-muted-foreground">
          <div className="text-foreground flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">$</span>
            <span>git-auto commit --push</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-emerald-500">✔</span>
            <span>scope:</span>
            <span className="text-foreground">feat(pipeline): tactile spring runner</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/80 pl-4 border-l border-border/50">
            <span>[main 9d2a1b]</span>
            <span className="text-foreground/80">3 files changed (+48, -12)</span>
          </div>
          <div className="text-emerald-500/90 flex items-center gap-1 text-[10px]">
            <span>↑</span>
            <span>Synchronized with origin/main [up to date]</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground/60">
          <span>Conventional Commits Engine</span>
          <span className="text-emerald-500 font-medium">EXIT 0</span>
        </div>
      </div>
    );
  }

  // 2. Auto-Labeler procedural PR visualizer
  if (lowerTitle.includes('labeler') || lowerTitle.includes('action')) {
    return (
      <div
        className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card/90 border border-border/60 p-4 font-mono text-[11px] leading-relaxed flex flex-col justify-between shadow-2xs group-hover:border-border transition-colors ${className}`}
      >
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="flex items-center gap-1.5">
            <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-foreground font-medium">PR #84 triage</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
            Automated
          </span>
        </div>

        <div className="space-y-2 py-2">
          <div className="text-[11px] text-foreground font-sans font-medium line-clamp-1">
            feat(infra): update runner node matrix and cache layer
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="text-emerald-500">+86</span>
            <span className="text-rose-500">-14</span>
            <span>files: .github/workflows/*.yml</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px]">
              platform: actions
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px]">
              area: infra
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px]">
              needs-review
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground/60">
          <span>Action Trigger: pull_request.opened</span>
          <span className="text-purple-400">Match: 100%</span>
        </div>
      </div>
    );
  }

  // 3. Campus Kiosk procedural map & terminal
  if (lowerTitle.includes('kiosk') || lowerTitle.includes('campus')) {
    return (
      <div
        className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card/90 border border-border/60 p-4 font-mono text-[11px] leading-relaxed flex flex-col justify-between shadow-2xs group-hover:border-border transition-colors ${className}`}
      >
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs text-foreground font-medium">Campus Kiosk Terminal</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/20 font-medium">
            Electron Kiosk
          </span>
        </div>

        <div className="space-y-1.5 py-2">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Location: Engineering Block B</span>
            <span className="text-emerald-500">Offline Cache: Ready</span>
          </div>
          {/* Schematic Blueprint Grid */}
          <div className="h-14 rounded-lg border border-border/60 bg-muted/20 p-2 flex items-center justify-around text-center">
            <div className="space-y-0.5">
              <span className="block text-[9px] text-muted-foreground">FLOOR 1</span>
              <span className="block text-[11px] font-sans font-bold text-foreground">Faculty</span>
            </div>
            <div className="w-px h-6 bg-border/60" />
            <div className="space-y-0.5">
              <span className="block text-[9px] text-muted-foreground">FLOOR 2</span>
              <span className="block text-[11px] font-sans font-bold text-foreground">
                Labs 201-208
              </span>
            </div>
            <div className="w-px h-6 bg-border/60" />
            <div className="space-y-0.5">
              <span className="block text-[9px] text-muted-foreground">TOUR</span>
              <span className="block text-[11px] font-sans font-bold text-amber-500">
                360° Pano
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground/60">
          <span>Auto-Updater: Synchronized</span>
          <span className="text-foreground/70">100% Uptime</span>
        </div>
      </div>
    );
  }

  // 4. Fit-Ai procedural ML diagnosis radar
  if (lowerTitle.includes('fit') || lowerTitle.includes('ai') || lowerTitle.includes('disease')) {
    return (
      <div
        className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card/90 border border-border/60 p-4 font-mono text-[11px] leading-relaxed flex flex-col justify-between shadow-2xs group-hover:border-border transition-colors ${className}`}
      >
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs text-foreground font-medium">Fit-Ai Diagnostic Engine</span>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-teal-500/10 text-teal-400 border border-teal-500/20 font-medium">
            Gemini LLM
          </span>
        </div>

        <div className="space-y-2 py-2">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Input Symptom Cluster:</span>
            <span className="text-foreground">Fatigue, Migraine</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Confidence Metric</span>
              <span className="text-teal-400">92.4%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
              <div className="h-full bg-teal-400 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground/80 line-clamp-1">
            Recommendation: Hydration protocol & clinical consultation
          </div>
        </div>

        <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground/60">
          <span>Streamlit + Google GenAI</span>
          <span className="text-teal-400">Reactive Matrix</span>
        </div>
      </div>
    );
  }

  // Default Blueprint
  return (
    <div
      className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-card/90 border border-border/60 p-4 font-mono text-[11px] leading-relaxed flex flex-col justify-between shadow-2xs group-hover:border-border transition-colors ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-foreground font-medium">{title}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">{category || 'System'}</span>
      </div>

      <div className="py-4 text-center text-muted-foreground text-xs font-sans">
        Engineering Artifact & Production System
      </div>

      <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground/60">
        <span>Architectural Node</span>
        <span className="text-primary font-medium">Deployed</span>
      </div>
    </div>
  );
}
