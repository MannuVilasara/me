import { cn } from '@/lib/utils';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800', className)} />
);

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Skeleton */}
      <div className="mb-12 space-y-2">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>

      {/* Projects List Skeleton */}
      <div className="divide-y divide-border/40">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="py-5 flex items-center justify-between gap-4 px-2 -mx-2">
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Skeleton className="hidden md:block h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
