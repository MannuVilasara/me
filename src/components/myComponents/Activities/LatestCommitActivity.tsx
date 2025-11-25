'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { ActivityItem } from './ActivityItem';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LatestCommitActivity() {
  const { data, error, isLoading } = useSWR('/api/latest-commit', fetcher, {
    refreshInterval: 1000 * 60 * 5, // 5 mins refresh
  });

  const handleClick = () => {
    // Dispatch global event to open commit modal
    window.dispatchEvent(new CustomEvent('open-commit-modal'));
  };

  if (error) return <ActivityItem icon="⚙️" label="Latest commit" value="Error loading" />;
  if (isLoading) return <ActivityItem icon="⚙️" label="Latest commit" value="Loading..." />;

  const shortSha = data.sha.substring(0, 7);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:bg-muted/50 rounded transition-colors group"
      title="Click to view commit diff"
    >
      <ActivityItem
        icon="[🐈]"
        label="Latest commit"
        value={
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm">
              <span className="text-blue-700 dark:text-blue-400">{shortSha}</span> -{' '}
              <span className="text-foreground/80">{data.message.split('\n')[0]}</span>
            </span>
            <Link
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600"
              onClick={(e) => e.stopPropagation()}
              title="View on GitHub"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          </div>
        }
      />
    </div>
  );
}
