'use client';

import React from 'react';
import Image from 'next/image';
import NowPlayingInline from './NowPlayingInLine';
import DiscordStatusInline from './Discord';
import LocationTime from './LocationTime';
import LatestCommitActivity from './LatestCommitActivity';

export default function Activities() {
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
      <img
        src="https://raw.githubusercontent.com/MannuVilasara/MannuVilasara/output/github-contribution-grid-snake-dark.svg"
        alt="GitHub Contributions Snake Graph"
        className="max-w-full h-auto rounded-md shadow"
      />
    </section>
  );
}
