'use client';

import useSWR from 'swr';
import { FaSpotify } from 'react-icons/fa';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NowPlaying() {
  const { data } = useSWR('/api/now-playing', fetcher, { refreshInterval: 5000 });

  return (
    <div className="flex items-center gap-3">
      {data?.isPlaying ? (
        <>
          <Image
            src={data.albumImageUrl}
            alt={`${data.album} album cover`}
            width={48}
            height={48}
            className="rounded"
          />
          <div className="flex flex-col">
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {data.title}
            </a>
            <span className="text-sm text-muted-foreground">{data.artist}</span>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 text-muted-foreground">
          <FaSpotify className="text-2xl text-green-500" />
          <span>Not Playing</span>
        </div>
      )}
    </div>
  );
}
