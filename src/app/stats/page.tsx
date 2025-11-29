'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Code2, Terminal, Calendar, Activity, Zap, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

type WakaTimeResult = {
  data?: {
    human_readable_total: string;
    human_readable_daily_average: string;
    best_day: {
      date: string;
      text: string;
    };
    languages?: any[];
    editors?: any[];
    operating_systems?: any[];
  };
};

// Helper for skeleton animation
const Skeleton = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={cn('animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800', className)}
    style={style}
  />
);

// Reusing the layout structure for perfect alignment
const BentoSkeleton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-zinc-50/50 p-6 dark:bg-zinc-900/20',
      className
    )}
  >
    {children}
  </div>
);

// --- Components ---

// 1. Base Card Component for Bento Grid
const BentoCard = ({ children, className, title, icon: Icon }: any) => (
  <div
    className={cn(
      'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/40 bg-zinc-50/50 p-6 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300',
      'backdrop-blur-sm',
      className
    )}
  >
    {title && (
      <div className="flex items-center gap-2 mb-4 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
        {Icon && <Icon size={14} />}
        <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
      </div>
    )}
    {children}
  </div>
);

// 2. Minimal Progress Bar
const ProgressBar = ({ label, percent, rightLabel }: any) => (
  <div className="group/bar">
    <div className="flex justify-between text-xs mb-1.5">
      <span className="font-medium text-foreground/80 group-hover/bar:text-foreground transition-colors">
        {label}
      </span>
      <span className="text-muted-foreground font-mono text-[10px]">
        {rightLabel || `${percent}%`}
      </span>
    </div>
    <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-zinc-800 dark:bg-zinc-200 rounded-full transition-all duration-1000 ease-out group-hover/bar:bg-black dark:group-hover/bar:bg-white"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default function StatsPage() {
  const [wakaData, setWakaData] = useState<WakaTimeResult | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wakaRes = await fetch('/api/wakatime');
        if (!wakaRes.ok) throw new Error('Failed to fetch WakaTime');
        const wakaJson = await wakaRes.json();
        setWakaData(wakaJson);

        const streakRes = await fetch('/api/github-contributions');
        if (!streakRes.ok) throw new Error('Failed to fetch GitHub contributions');
        const streakData = await streakRes.json();
        const contributions = streakData.contributions;
        const today = new Date().toISOString().split('T')[0];

        const relevantContributions = contributions
          .filter((c: any) => c.date <= today)
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

        let streakCount = 0;
        const expectedDate = new Date(today);

        for (const contrib of relevantContributions) {
          const contribDate = new Date(contrib.date);
          if (contribDate.getTime() === expectedDate.getTime() && contrib.intensity !== '0') {
            streakCount++;
            expectedDate.setDate(expectedDate.getDate() - 1);
          } else if (contribDate.getTime() < expectedDate.getTime()) {
            break;
          }
        }

        setStreak(streakCount);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setWakaData(null);
        setStreak(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="grow max-w-6xl mx-auto w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="container mx-auto p-4">
            <Skeleton className="h-10 w-64 mb-6" />
            <Skeleton className="h-5 w-96 mb-8" />
          </div>

          {/* Bento Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {/* Total Coding Time */}
            <BentoSkeleton className="lg:col-span-2 lg:row-span-1">
              <div className="flex flex-col justify-center h-full gap-2">
                <Skeleton className="h-16 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </BentoSkeleton>

            {/* Best Day */}
            <BentoSkeleton>
              <div className="flex flex-col justify-end h-full gap-1">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </BentoSkeleton>

            {/* Daily Average */}
            <BentoSkeleton>
              <div className="flex flex-col justify-end h-full gap-1">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            </BentoSkeleton>

            {/* Streak */}
            <BentoSkeleton>
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <Skeleton className="h-12 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </BentoSkeleton>

            {/* Languages */}
            <BentoSkeleton className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <div className="space-y-6 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </BentoSkeleton>

            {/* Editors */}
            <BentoSkeleton>
              <div className="space-y-4 mt-auto">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </BentoSkeleton>

            {/* OS */}
            <BentoSkeleton>
              <div className="space-y-4 mt-6">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </BentoSkeleton>
          </div>
        </main>
      </div>
    );
  }

  const statsData = wakaData?.data;
  if (!statsData) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="grow max-w-6xl mx-auto w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Development Stats</h1>
            <p className="text-muted-foreground mb-8">
              We're currently not able to connect to the WakaTime API. Please try again later.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const STATS_DATA = {
    total_coding_time: statsData.human_readable_total,
    daily_average: statsData.human_readable_daily_average,
    best_day: {
      date: new Date(statsData.best_day.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: statsData.best_day.text,
    },
    current_streak: `${streak || 0} Days`,
  };
  const LANG_DATA = statsData.languages || [];
  const EDITORS_DATA = statsData.editors || [];
  const OS_DATA = statsData.operating_systems || [];
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow max-w-6xl mx-auto w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-6">Development Stats</h1>
          <p className="text-muted-foreground mb-8">
            A real-time dashboard of my coding activity, tools, and languages. Powered by WakaTime.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          <BentoCard
            title="Last 7 Days Coding Time"
            icon={Clock}
            className="lg:col-span-2 lg:row-span-1 bg-zinc-100/50 dark:bg-zinc-900/30"
          >
            <div className="flex flex-col justify-center h-full gap-2">
              <div className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground">
                {typeof STATS_DATA.total_coding_time === 'string'
                  ? STATS_DATA.total_coding_time.split(' ')[0]
                  : STATS_DATA.total_coding_time}
                <span className="text-2xl sm:text-3xl text-muted-foreground font-light ml-2">
                  hrs
                </span>
              </div>
              <p className="text-sm text-muted-foreground/80">
                Last 7 days • That's about{' '}
                <span className="font-medium text-foreground">
                  {Math.round(
                    (parseFloat(STATS_DATA.total_coding_time?.split(' ')[0] || '0') / 7) * 10
                  ) / 10}{' '}
                  hrs/day
                </span>{' '}
                average.
              </p>
            </div>
          </BentoCard>

          {/* 2. Best Day */}
          <BentoCard title="Best Day" icon={Zap} className="lg:col-span-1">
            <div className="flex flex-col justify-end h-full gap-1">
              <div className="text-3xl font-bold tracking-tight">{STATS_DATA.best_day?.time}</div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {STATS_DATA.best_day?.date}
              </div>
            </div>
          </BentoCard>

          {/* 3. Daily Average */}
          <BentoCard title="Daily Avg" icon={Activity} className="lg:col-span-1">
            <div className="flex flex-col justify-end h-full gap-1">
              <div className="text-3xl font-bold tracking-tight">{STATS_DATA.daily_average}</div>
              <div className="text-xs text-muted-foreground">Consistent effort over time</div>
            </div>
          </BentoCard>

          {/* 4. Streak */}
          <BentoCard title="Current Streak" icon={Calendar} className="lg:col-span-1">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="text-5xl font-black tracking-tighter">
                {STATS_DATA.current_streak?.split(' ')[0]}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
                Days
              </div>
            </div>
          </BentoCard>

          {/* 6. Languages (Tall) */}
          <BentoCard
            title="Top Languages"
            icon={Code2}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <div className="space-y-6 mt-4">
              {LANG_DATA.slice(0, 5).map((lang) => (
                <ProgressBar
                  key={lang.name}
                  label={lang.name}
                  percent={Math.round(lang.percent || 0)}
                  rightLabel={
                    lang.time || lang.text || `${Math.round((lang.percent || 0) * 10) / 10}%`
                  }
                />
              ))}
            </div>
          </BentoCard>

          {/* 7. Editors */}
          <BentoCard title="Editors" icon={Terminal} className="sm:col-span-1 lg:col-span-1">
            <div className="space-y-4 mt-auto">
              {EDITORS_DATA.map((editor) => (
                <ProgressBar key={editor.name} label={editor.name} percent={editor.percent} />
              ))}
            </div>
          </BentoCard>

          {/* 8. OS */}
          <BentoCard
            title="System"
            icon={Cpu}
            className="sm:col-span-1 lg:col-span-1 justify-start"
          >
            <div className="space-y-4 mt-6">
              {OS_DATA.map((os) => (
                <ProgressBar key={os.name} label={os.name} percent={os.percent} />
              ))}
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}
