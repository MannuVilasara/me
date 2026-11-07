'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { BookOpen, Monitor, Zap, Cat, PenTool, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArcadeRenderer } from 'pacman-contribution-graph';

export default function Activities() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [graphSvg, setGraphSvg] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [onekoEnabled, setOnekoEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oneko-enabled');
      if (saved !== null) setOnekoEnabled(saved === 'true');
    }

    const handleOnekoToggle = (event: CustomEvent) => setOnekoEnabled(event.detail.enabled);
    window.addEventListener('oneko-toggle', handleOnekoToggle as EventListener);

    return () => {
      window.removeEventListener('oneko-toggle', handleOnekoToggle as EventListener);
    };
  }, []);

  const toggleOneko = () => {
    const newState = !onekoEnabled;
    setOnekoEnabled(newState);
    localStorage.setItem('oneko-enabled', newState.toString());
    window.dispatchEvent(new CustomEvent('oneko-toggle', { detail: { enabled: newState } }));
  };

  useEffect(() => {
    if (!mounted) return;

    try {
      const cacheKey = `pacman-svg-${resolvedTheme}`;
      const cacheTimeKey = `pacman-time-${resolvedTheme}`;
      const cachedSvg = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);

      const now = Date.now();
      if (cachedSvg && cachedTime && now - parseInt(cachedTime, 10) < 86400000) {
        setGraphSvg(cachedSvg);
        setError(false);
        return;
      }

      const renderer = new ArcadeRenderer({
        game: 'pacman',
        username: 'MannuVilasara',
        platform: 'github',
        gameTheme: resolvedTheme === 'dark' ? 'github-dark' : 'github',
        playerStyle: 'opportunistic',
        svgCallback: (svg: string) => {
          const responsiveSvg = svg.replace(
            /<svg\s+width="(\d+)"\s+height="(\d+)"/,
            '<svg viewBox="0 0 $1 $2" width="100%" height="100%"'
          );
          setGraphSvg(responsiveSvg);
          setError(false);

          try {
            localStorage.setItem(cacheKey, responsiveSvg);
            localStorage.setItem(cacheTimeKey, now.toString());
          } catch (e) {
            console.warn('Could not cache pacman SVG', e);
          }
        },
      });
      renderer.start();
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, [resolvedTheme, mounted]);

  return (
    <section className="my-14 space-y-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Activity & Atmosphere
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Current focuses, open-source commits, and subtle pleasures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Card 1: Reading */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-xs flex flex-col justify-between min-h-[92px]">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
              Reading
            </span>
          </div>
          <div
            className="text-xs font-medium text-foreground italic truncate"
            title="Lord of the Mysteries"
          >
            "Lord of the Mysteries"
          </div>
        </div>

        {/* Card 2: Watching / Exploring */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-xs flex flex-col justify-between min-h-[92px]">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
            <Monitor className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
              Exploring
            </span>
          </div>
          <div
            className="text-xs font-medium text-foreground italic truncate"
            title="Distributed Consensus"
          >
            "Distributed Consensus 👒"
          </div>
        </div>

        {/* Card 3: Status Focus */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-xs flex flex-col justify-between min-h-[92px]">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
              Focus
            </span>
          </div>
          <div
            className="text-xs font-medium text-foreground truncate"
            title="Platform Craft & Next.js"
          >
            Platform Craft & Next.js
          </div>
        </div>

        {/* Card 4: Oneko Companion Toggle */}
        <div className="p-4 rounded-xl border border-border/60 bg-card/40 backdrop-blur-xs flex items-center justify-between min-h-[92px]">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Cat className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
                Oneko
              </span>
            </div>
            <span className="text-xs font-medium text-foreground">Desktop Cat</span>
          </div>

          <button
            onClick={toggleOneko}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/80 hover:bg-muted border border-border/50 text-xs font-mono transition-all cursor-pointer shadow-2xs"
            title="Toggle desktop cat follower"
          >
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors',
                onekoEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'
              )}
            />
            <span className="text-[11px] font-medium text-foreground">
              {onekoEnabled ? 'Active' : 'Off'}
            </span>
          </button>
        </div>

        {/* GitHub Pacman Graph */}
        <div className="col-span-2 md:col-span-4 relative group">
          <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Github size={14} className="text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">
                  GitHub Contribution Activity
                </span>
                <span className="font-mono text-[10px] text-muted-foreground/60 hidden sm:inline">
                  (Pacman Arcade)
                </span>
              </div>
              <Link
                href="/guestbook"
                className="group flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors self-start sm:self-auto"
              >
                <PenTool className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
                <span>Sign guestbook →</span>
              </Link>
            </div>

            <div className="overflow-hidden flex justify-center py-2">
              {!mounted || !graphSvg ? (
                <div className="h-[100px] w-full animate-pulse rounded-lg bg-muted/40" />
              ) : error ? (
                <div className="h-[100px] w-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-1 bg-muted/10 rounded-lg border border-dashed border-border/30">
                  <Github className="h-5 w-5 opacity-30" />
                  <p className="text-[11px] font-mono">Graph unavailable</p>
                </div>
              ) : (
                <div
                  className="w-full h-auto rounded-lg [&_svg]:w-full [&_svg]:h-auto opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                  dangerouslySetInnerHTML={{ __html: graphSvg }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
