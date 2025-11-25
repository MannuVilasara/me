'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import useSWR from 'swr';
import NowPlayingInline from './NowPlayingInLine';
import DiscordStatusInline from './Discord';
import LocationTime from './LocationTime';
import LatestCommitActivity from './LatestCommitActivity';
import { NowPlayingModal } from './NowPlayingModal';
import { DiscordModal } from './DiscordModal';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Activities() {
  const { theme } = useTheme();
  const light_url = '/github-contributions-light.svg';
  const dark_url = '/github-contributions-dark.svg';

  const [graphUrl, setGraphUrl] = useState<string>(theme === 'light' ? light_url : dark_url);
  const [imageError, setImageError] = useState<boolean>(true); // Start with error to show fallback

  // Modal states
  const [nowPlayingModalOpen, setNowPlayingModalOpen] = useState(false);
  const [discordModalOpen, setDiscordModalOpen] = useState(false);

  // Oneko toggle state
  const [onekoEnabled, setOnekoEnabled] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // Fetch data for modals
  const { data: nowPlayingData } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 5000,
  });
  const { data: discordData } = useSWR('/api/get-discord-status', fetcher, {
    refreshInterval: 5000,
  });

  // Check if desktop and load Oneko preference
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // Load saved Oneko preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oneko-enabled');
      if (saved !== null) {
        setOnekoEnabled(saved === 'true');
      }
    }

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Toggle Oneko
  const toggleOneko = () => {
    const newState = !onekoEnabled;
    setOnekoEnabled(newState);
    localStorage.setItem('oneko-enabled', newState.toString());
    // Dispatch custom event to notify Oneko component
    window.dispatchEvent(new CustomEvent('oneko-toggle', { detail: { enabled: newState } }));
  };

  // Update graph URL when theme changes and check if image exists
  useEffect(() => {
    setImageError(true); // Assume error until proven otherwise
    const img = new Image();
    img.src = theme === 'dark' ? dark_url : light_url;
    img.onload = () => {
      setGraphUrl(img.src);
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
    };
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
        <div
          onClick={() => setNowPlayingModalOpen(true)}
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Click to view music player"
        >
          [🎵] Now Playing: <NowPlayingInline />
        </div>
        <div
          onClick={() => setDiscordModalOpen(true)}
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Click to view Discord profile"
        >
          [💬] Discord: <DiscordStatusInline />
        </div>
        <div
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Location and time"
        >
          [🌍] Location: <LocationTime />
        </div>
        <div
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Currently reading"
        >
          [📚] Reading: "LOTM {'>.<'}"
        </div>
        <div
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Currently watching"
        >
          [🎬] Watching: "Open-Source 👒"
        </div>
        <div
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Current status"
        >
          [⚙️] Status: Building my personal site 🚀
        </div>
        {isDesktop && (
          <div
            onClick={toggleOneko}
            className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
            title="Toggle desktop cat companion"
          >
            [🐱] Cat: {onekoEnabled ? 'Enabled' : 'Disabled'}
          </div>
        )}
        <div
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Latest commit"
        >
          <LatestCommitActivity />
        </div>
        <Link
          href="/guestbook"
          className="cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors"
          title="Visit my guestbook"
        >
          [📝] Guestbook: Sign my guestbook ✨
        </Link>
      </div>

      {/* Modals */}
      <NowPlayingModal
        isOpen={nowPlayingModalOpen}
        onClose={() => setNowPlayingModalOpen(false)}
        data={nowPlayingData}
      />
      <DiscordModal
        isOpen={discordModalOpen}
        onClose={() => setDiscordModalOpen(false)}
        data={discordData}
      />

      <h2 className="mono text-muted-foreground font-semibold mt-8">
        Pacman Eating My Contributions
      </h2>
      {!imageError ? (
        <img
          src={graphUrl}
          className="max-w-full h-auto rounded-md shadow"
          loading="lazy"
          onError={handleImageError}
          alt="Image of Pacman Eating github contributions"
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
