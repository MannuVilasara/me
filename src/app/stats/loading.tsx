import { cn } from '@/lib/utils';

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

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 w-full space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-6 pl-4 md:pl-12">
          <Skeleton className="h-12 w-3/4 max-w-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-2/3 max-w-lg" />
          </div>
        </div>

        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* 1. Total Coding Time */}
          <BentoSkeleton className="lg:col-span-2 lg:row-span-1">
            <div className="flex flex-col justify-center h-full gap-4">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-16 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </BentoSkeleton>

          {/* 2. Best Day */}
          <BentoSkeleton className="lg:col-span-1">
            <div className="flex flex-col justify-end h-full gap-2">
              <Skeleton className="h-3 w-20 mb-auto" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </BentoSkeleton>

          {/* 3. Daily Average */}
          <BentoSkeleton className="lg:col-span-1">
            <div className="flex flex-col justify-end h-full gap-2">
              <Skeleton className="h-3 w-20 mb-auto" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </BentoSkeleton>

          {/* 4. Activity Graph */}
          <BentoSkeleton className="sm:col-span-2 lg:col-span-3 min-h-[200px]">
            <div className="flex flex-col h-full justify-between">
              <Skeleton className="h-3 w-32 mb-4" />
              <Skeleton className="h-4 w-64 mb-8" />
              {/* Graph shape approximation */}
              <div className="flex items-end justify-between gap-1 h-32 w-full mt-auto">
                {[...Array(12)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full rounded-t-sm"
                    style={{ height: `${Math.random() * 60 + 20}%` }}
                  />
                ))}
              </div>
            </div>
          </BentoSkeleton>

          {/* 5. Streak */}
          <BentoSkeleton className="lg:col-span-1">
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-12 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </BentoSkeleton>

          {/* 6. Languages */}
          <BentoSkeleton className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </BentoSkeleton>

          {/* 7. Editors */}
          <BentoSkeleton className="sm:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-auto">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="space-y-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </BentoSkeleton>

          {/* 8. OS */}
          <BentoSkeleton className="sm:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-auto">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="space-y-4 mt-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </BentoSkeleton>
        </div>
      </main>
    </div>
  );
}
