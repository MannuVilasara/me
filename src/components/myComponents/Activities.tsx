'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import NowPlayingInline from './NowPlayingInLine';
import DiscordStatusInline from './Discord';
import LocationTime from './LocationTime';
import LatestCommitActivity from './LatestCommitActivity';

export default function Activities() {
  const { theme } = useTheme();
  const light_url = '/github-contributions-light.svg';
  const dark_url = '/github-contributions-dark.svg';

  const [graphUrl, setGraphUrl] = useState<string>(theme === 'light' ? light_url : dark_url);
  const [imageError, setImageError] = useState<boolean>(false);

  // Update graph URL when theme changes
  useEffect(() => {
    setImageError(false); // Reset error state on theme change
    setGraphUrl(theme === 'dark' ? dark_url : light_url);
  }, [theme]);

  // Handle image load error (429 rate limit or network issues)
  const handleImageError = () => {
    setImageError(true);
    console.warn('GitHub contribution graph failed to load (rate limit or network issue)');
  };

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
        <div>[📚] Reading: "LOTM {'>.<'}"</div>
        <div>[🎬] Watching: "Open-Source 👒"</div>
        <div>[⚙️] Status: Building my personal site 🚀</div>
        <LatestCommitActivity />
      </div>
      <h2 className="mono text-muted-foreground font-semibold mt-8">
        Pacman Eating My Contributions
      </h2>
      {!imageError ? (
        <img
          src={graphUrl}
          alt="GitHub Contributions Graph - Animated Pacman eating contributions showing yearly activity"
          className="max-w-full h-auto rounded-md shadow"
          loading="lazy"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/10">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-mono">📊 Contribution graph temporarily unavailable</p>
            <p className="text-xs mt-2">
              (GitHub rate limit - check{' '}
              <a
                href="https://github.com/MannuVilasara"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                GitHub profile
              </a>
              )
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
