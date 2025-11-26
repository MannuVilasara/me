'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  Music,
  MessageSquare,
  MapPin,
  BookOpen,
  Monitor,
  Zap,
  Cat,
  GitCommit,
  PenTool,
  ArrowUpRight,
  Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import NowPlayingInline from './NowPlayingInLine';
import DiscordStatusInline from './Discord';
import LocationTime from './LocationTime';
import LatestCommitActivity from './LatestCommitActivity';

// Reusable Card Component
const ActivityCard = ({
  className,
  onClick,
  href,
  icon: Icon,
  label,
  children,
  actionIcon = true,
}: {
  className?: string;
  onClick?: () => void;
  href?: string;
  icon: any;
  label: string;
  children: React.ReactNode;
  actionIcon?: boolean;
}) => {
  const content = (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          <Icon size={13} className="shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-widest">{label}</span>
        </div>
        {actionIcon && (
          <ArrowUpRight
            size={14}
            className="text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        )}
      </div>
      <div className="font-medium text-xs sm:text-sm text-foreground/90 leading-relaxed break-words">
        {children}
      </div>
    </>
  );

  const baseStyles = cn(
    'group relative flex flex-col p-3 sm:p-4 rounded-xl border border-border/40 bg-zinc-900/30 hover:bg-zinc-900/60 dark:bg-zinc-900/30 dark:hover:bg-zinc-800/50 transition-all duration-300 overflow-hidden backdrop-blur-sm',
    (onClick || href) &&
      'cursor-pointer hover:border-border/80 hover:shadow-sm active:scale-[0.98]',
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={baseStyles}>
      {content}
    </div>
  );
};

export default function Activities() {
  const { theme } = useTheme();
  const light_url = '/github-contributions-light.svg';
  const dark_url = '/github-contributions-dark.svg';

  const [graphUrl, setGraphUrl] = useState<string>(theme === 'light' ? light_url : dark_url);
  const [imageError, setImageError] = useState<boolean>(true);
  const [onekoEnabled, setOnekoEnabled] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oneko-enabled');
      if (saved !== null) setOnekoEnabled(saved === 'true');
    }

    const handleOnekoToggle = (event: CustomEvent) => setOnekoEnabled(event.detail.enabled);
    window.addEventListener('oneko-toggle', handleOnekoToggle as EventListener);

    return () => {
      window.removeEventListener('resize', checkDesktop);
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
    setImageError(true);
    const img = new Image();
    img.src = theme === 'dark' ? dark_url : light_url;
    img.onload = () => {
      setGraphUrl(img.src);
      setImageError(false);
    };
    img.onerror = () => setImageError(true);
  }, [theme]);

  return (
    <section className="mt-24 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground/90">Activity Feed</h2>
        <div className="h-px bg-border/40 flex-1" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Row 1: Music & Discord */}
        <ActivityCard
          className="col-span-2 min-h-[90px] justify-between"
          icon={Music}
          label="Now Playing"
          onClick={() => window.dispatchEvent(new CustomEvent('open-now-playing-modal'))}
        >
          <div className="line-clamp-1" title="Click to view details">
            <NowPlayingInline />
          </div>
        </ActivityCard>

        <ActivityCard
          className="col-span-2 min-h-[90px] justify-between"
          icon={MessageSquare}
          label="Discord Status"
          onClick={() => window.dispatchEvent(new CustomEvent('open-discord-modal'))}
        >
          <div className="truncate">
            <DiscordStatusInline />
          </div>
        </ActivityCard>

        {/* Row 2: Location, Reading, Watching, Status */}
        <ActivityCard icon={MapPin} label="Location" actionIcon={false} className="min-h-[110px]">
          <div className="leading-tight">
            <LocationTime />
          </div>
        </ActivityCard>

        <ActivityCard icon={BookOpen} label="Reading" actionIcon={false} className="min-h-[110px]">
          <span className="italic block mt-1 truncate" title="LOTM >.<">
            "LOTM {'>.<'}"
          </span>
        </ActivityCard>

        <ActivityCard icon={Monitor} label="Watching" actionIcon={false} className="min-h-[110px]">
          <span className="italic block mt-1 truncate" title="Open-Source 👒">
            "Open-Source 👒"
          </span>
        </ActivityCard>

        <ActivityCard icon={Zap} label="Status" actionIcon={false} className="min-h-[110px]">
          <div className="line-clamp-3" title="Building my personal site 🚀">
            Building my personal site 🚀
          </div>
        </ActivityCard>

        {/* Row 3: Git, Guestbook, Cat (Desktop) */}
        <ActivityCard
          className="col-span-2 min-h-[90px]"
          icon={GitCommit}
          label="Latest Commit"
          onClick={() => window.dispatchEvent(new CustomEvent('open-commit-modal'))}
        >
          <LatestCommitActivity />
        </ActivityCard>

        <ActivityCard
          href="/guestbook"
          icon={PenTool}
          label="Guestbook"
          className="col-span-1 min-h-[90px] justify-between"
        >
          <div className="line-clamp-2">Sign my guestbook ✨</div>
        </ActivityCard>

        {isDesktop && (
          <ActivityCard
            icon={Cat}
            label="Oneko"
            onClick={toggleOneko}
            className="col-span-1 min-h-[90px] justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full ring-2 ring-background',
                  onekoEnabled ? 'bg-green-500' : 'bg-zinc-600'
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium',
                  onekoEnabled ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {onekoEnabled ? 'On' : 'Off'}
              </span>
            </div>
          </ActivityCard>
        )}

        {/* Row 4: Contribution Graph */}
        <div className="col-span-2 lg:col-span-4 relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 pointer-events-none" />
          <div className="p-1 rounded-2xl border border-border/40 bg-zinc-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 mb-2">
              <Github size={13} className="text-muted-foreground/60" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                Contributions
              </span>
            </div>

            <div className="p-2 overflow-hidden">
              {!imageError ? (
                <img
                  src={graphUrl}
                  className="w-full h-auto rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500 saturate-0 group-hover:saturate-100"
                  loading="lazy"
                  alt="GitHub Contributions"
                />
              ) : (
                <div className="h-[120px] flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 bg-muted/5 rounded-lg border border-dashed border-border/30">
                  <Github className="h-6 w-6 opacity-20" />
                  <p className="text-[10px] font-mono">Graph unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
