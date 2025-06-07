'use client';

import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link';
import { ActivityItem } from './ActivityItem';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function LatestCommitActivity() {
  const { data, error, isLoading } = useSWR('/api/latest-commit', fetcher, {
    refreshInterval: 1000 * 60 * 5, // 5 mins refresh
  });

  if (error) return <ActivityItem icon="⚙️" label="Latest commit" value="Error loading" />;
  if (isLoading) return <ActivityItem icon="⚙️" label="Latest commit" value="Loading..." />;

  const shortSha = data.sha.substring(0, 7);

  return (
    <ActivityItem
      icon="[🐈]"
      label="Latest commit"
      value={
        <Link
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline font-mono"
        >
          {shortSha} - {data.message.split('\n')[0]}
        </Link>
      }
    />
  );
}
