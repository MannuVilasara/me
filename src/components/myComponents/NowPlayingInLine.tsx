'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NowPlayingInline() {
  const { data } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 5000,
  });

  if (!data?.isPlaying) return <>Not playing</>;

  return (
    <>
      {data.title} — {data.artist}
    </>
  );
}
