import React from 'react';
import { Metadata } from 'next';
import {
  Clock,
  Code2,
  Laptop,
  Terminal,
  Calendar,
  Activity,
  Zap,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Stats — Manpreet Singh',
  description: 'A deep dive into my coding habits, tools, and development statistics.',
};

// --- Data ---
const STATS = {
  total_coding_time: '2,450 hrs',
  daily_average: '6 hrs 32 mins',
  best_day: { date: 'Nov 24, 2024', time: '14 hrs 12 mins' },
  current_streak: '14 Days',
};

const LANGUAGES = [
  { name: 'TypeScript', percent: 65, time: '1,592 hrs' },
  { name: 'Rust', percent: 15, time: '367 hrs' },
  { name: 'Python', percent: 10, time: '245 hrs' },
  { name: 'HTML/CSS', percent: 8, time: '196 hrs' },
  { name: 'Go', percent: 2, time: '49 hrs' },
];

const EDITORS = [
  { name: 'VS Code', percent: 80 },
  { name: 'Neovim', percent: 15 },
  { name: 'Zed', percent: 5 },
];

const OS = [
  { name: 'Mac', percent: 60 },
  { name: 'Linux (Arch)', percent: 30 },
  { name: 'Windows', percent: 10 },
];

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

// 3. Custom SVG Area Chart (Monochrome Activity)
const ActivityChart = () => {
  // Mock data points for a smooth curve
  const points = [
    10, 25, 15, 35, 20, 45, 30, 55, 40, 60, 35, 50, 65, 45, 70, 55, 80, 40, 60, 50, 75, 55, 85, 60,
    70, 50, 65, 40, 30, 20,
  ];
  const max = Math.max(...points);
  const width = 100;
  const height = 40;

  // Create SVG path string
  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / max) * height;
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative w-full h-24 sm:h-32 mt-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <path
          d={`${pathData} L ${width},${height} L 0,${height} Z`}
          fill="url(#chartGradient)"
          className="text-zinc-500 dark:text-zinc-400"
        />

        {/* Stroke Line */}
        <path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-zinc-800 dark:text-zinc-200 vector-effect-non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default function StatsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-6xl mx-auto w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-6">Development Stats</h1>
          <p className="text-muted-foreground mb-8">
            A real-time dashboard of my coding activity, tools, and languages. Powered by WakaTime.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* 1. Total Coding Time (Hero) */}
          <BentoCard
            title="Total Time Coding"
            icon={Clock}
            className="lg:col-span-2 lg:row-span-1 bg-zinc-100/50 dark:bg-zinc-900/30"
          >
            <div className="flex flex-col justify-center h-full gap-2">
              <div className="text-5xl sm:text-6xl font-black tracking-tighter text-foreground">
                {STATS.total_coding_time.split(' ')[0]}
                <span className="text-2xl sm:text-3xl text-muted-foreground font-light ml-2">
                  hrs
                </span>
              </div>
              <p className="text-sm text-muted-foreground/80">
                Since Jan 1, 2023 • That's about{' '}
                <span className="font-medium text-foreground">102 days</span> of pure coding.
              </p>
            </div>
          </BentoCard>

          {/* 2. Best Day */}
          <BentoCard title="Best Day" icon={Zap} className="lg:col-span-1">
            <div className="flex flex-col justify-end h-full gap-1">
              <div className="text-3xl font-bold tracking-tight">{STATS.best_day.time}</div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {STATS.best_day.date}
              </div>
            </div>
          </BentoCard>

          {/* 3. Daily Average */}
          <BentoCard title="Daily Avg" icon={Activity} className="lg:col-span-1">
            <div className="flex flex-col justify-end h-full gap-1">
              <div className="text-3xl font-bold tracking-tight">{STATS.daily_average}</div>
              <div className="text-xs text-muted-foreground">Consistent effort over time</div>
            </div>
          </BentoCard>

          {/* 4. Activity Graph (Wide) */}
          <BentoCard
            title="Coding Activity (30 Days)"
            icon={TrendingUp}
            className="sm:col-span-2 lg:col-span-3 min-h-[200px]"
          >
            <div className="flex flex-col h-full justify-between">
              <div className="text-sm text-muted-foreground mb-4 max-w-sm">
                Activity levels based on commit volume and coding hours recorded.
              </div>
              <ActivityChart />
            </div>
          </BentoCard>

          {/* 5. Streak */}
          <BentoCard title="Current Streak" icon={Calendar} className="lg:col-span-1">
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <div className="text-5xl font-black tracking-tighter">
                {STATS.current_streak.split(' ')[0]}
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
            <div className="space-y-4 mt-auto">
              {LANGUAGES.map((lang) => (
                <ProgressBar
                  key={lang.name}
                  label={lang.name}
                  percent={lang.percent}
                  rightLabel={lang.time}
                />
              ))}
            </div>
          </BentoCard>

          {/* 7. Editors */}
          <BentoCard title="Editors" icon={Terminal} className="sm:col-span-1 lg:col-span-1">
            <div className="space-y-4 mt-auto">
              {EDITORS.map((editor) => (
                <ProgressBar key={editor.name} label={editor.name} percent={editor.percent} />
              ))}
            </div>
          </BentoCard>

          {/* 8. OS */}
          <BentoCard title="System" icon={Cpu} className="sm:col-span-1 lg:col-span-1">
            <div className="space-y-4 mt-auto">
              {OS.map((os) => (
                <ProgressBar key={os.name} label={os.name} percent={os.percent} />
              ))}
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}
