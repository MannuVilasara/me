'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import NowPlayingInline from './NowPlayingInLine';
import DiscordStatusInline from './Discord';
import LocationTime from './LocationTime';
import LatestCommitActivity from './LatestCommitActivity';

export default function Activities() {
  const [graphUrl, setGraphUrl] = useState<string | undefined>();
  const { theme } = useTheme();

  const light_url =
    'https://github.com/MannuVilasara/MannuVilasara/blob/output/github-contribution-grid-snake.svg?raw=true';
  const dark_url =
    'https://github.com/MannuVilasara/MannuVilasara/blob/output/github-contribution-grid-snake-dark.svg?raw=true';

  // Update graph URL when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      setGraphUrl(dark_url);
    } else {
      setGraphUrl(light_url);
    }
  }, [theme]);

  return (
    <section className="mt-16 border-t pt-8">
      <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
      <div className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
        <div>
          [🎵] Now Playing: <NowPlayingInline />
        </div>
        <div>
          [💬] Discord: <DiscordStatusInline />
        </div>
        <div>
          [🌍] Location: <LocationTime />
        </div>
        <div>[📚] Reading: "Documentation {'>.<'}"</div>
        <div>[🎬] Watching: "One Piece 👒"</div>
        <div>[⚙️] Status: Building my personal site 🚀</div>
        <LatestCommitActivity />
      </div>
      <h2 className="mono text-muted-foreground font-semibold mt-8">
        Snake Eating my Contributions
      </h2>
      <Image
        width={800}
        height={400}
        src={graphUrl || dark_url}
        alt="GitHub Contributions Snake Graph"
        className="max-w-full h-auto rounded-md shadow"
        loading="lazy"
      />
    </section>
  );
}
