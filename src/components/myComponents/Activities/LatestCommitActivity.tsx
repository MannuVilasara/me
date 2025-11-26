'use client';

import useSWR from 'swr';
import { Loader2, AlertCircle } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LatestCommitActivity() {
  const { data, error, isLoading } = useSWR('/api/latest-commit', fetcher, {
    refreshInterval: 1000 * 60 * 5, // 5 mins refresh
  });

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500/80 text-sm h-full">
        <AlertCircle size={14} />
        <span>Failed to load commit</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground text-sm h-full">
        <Loader2 size={14} className="animate-spin" />
        <span>Syncing with GitHub...</span>
      </div>
    );
  }

  const shortSha = data?.sha?.substring(0, 7) || '???????';
  const message = data?.message?.split('\n')[0] || 'No commit message';
  const date = data?.commit?.author?.date
    ? new Date(data.commit.author.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className="flex flex-col gap-2 h-full justify-center">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] sm:text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-500/20">
            #{shortSha}
          </span>
          {date && <span className="text-[10px] text-muted-foreground/50 font-mono">{date}</span>}
        </div>
      </div>

      <p
        className="text-sm text-foreground/80 line-clamp-2 leading-relaxed font-medium"
        title={data?.message}
      >
        {message}
      </p>
    </div>
  );
}
