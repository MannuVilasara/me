'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import {
  Music,
  GitCommit,
  Clock,
  Sun,
  Moon,
  ArrowUpRight,
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LiveTelemetryBar() {
  // 1. Discord Status
  const { data: discordData } = useSWR('/api/get-discord-status', fetcher, {
    refreshInterval: 5000,
  });
  const discordStatus = discordData?.data?.discord_status || 'offline';
  const discordActivity =
    discordData?.data?.activities?.find((a: any) => a.type === 0)?.name ||
    discordData?.data?.activities?.find((a: any) => a.type === 2)?.name ||
    null;

  // 2. Now Playing
  const { data: nowPlayingData } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 5000,
  });
  const isPlaying = Boolean(nowPlayingData?.isPlaying);

  // 3. IST Clock & Atmosphere
  const [istTime, setIstTime] = useState<string>('');
  const [istHour, setIstHour] = useState<number>(12);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIstTime(timeStr);

      const hours = parseInt(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          hour12: false,
        }),
        10
      );
      setIstHour(hours);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDaytime = istHour >= 6 && istHour < 18;
  const atmosphereText =
    istHour >= 5 && istHour < 12
      ? 'Morning light'
      : istHour >= 12 && istHour < 17
        ? 'Afternoon focus'
        : istHour >= 17 && istHour < 21
          ? 'Quiet evening'
          : 'Late night code';

  // 4. Latest Commit
  const { data: commitData } = useSWR('/api/latest-commit', fetcher, {
    refreshInterval: 60000,
  });
  const commitSha = commitData?.sha ? commitData.sha.substring(0, 7) : 'latest';
  const commitMsg = commitData?.message?.split('\n')[0] || 'Exploring new ideas';

  const getDiscordStatusDot = () => {
    switch (discordStatus) {
      case 'online':
        return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
      case 'idle':
        return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
      case 'dnd':
        return 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]';
      default:
        return 'bg-zinc-400 dark:bg-zinc-600';
    }
  };

  const getDiscordStatusText = () => {
    switch (discordStatus) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Idle';
      case 'dnd':
        return 'Do Not Disturb';
      default:
        return 'Away';
    }
  };

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Live Telemetry
          </span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground/60 hidden sm:inline">
          Realtime status & activity
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Discord Presence */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-discord-modal'))}
          className="group relative flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card/90 hover:border-border transition-all duration-200 cursor-pointer backdrop-blur-xs min-h-[96px]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
              <FaDiscord className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
                Presence
              </span>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${getDiscordStatusDot()}`} />
              <span className="text-xs font-semibold text-foreground">
                {getDiscordStatusText()}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate">
              {discordActivity ? `In ${discordActivity}` : 'Available on Discord'}
            </p>
          </div>
        </motion.div>

        {/* Card 2: Spotify Now Playing */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-now-playing-modal'))}
          className="group relative flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card/90 hover:border-border transition-all duration-200 cursor-pointer backdrop-blur-xs min-h-[96px]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
              <Music className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
                Listening
              </span>
            </div>
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] bg-emerald-500 rounded-full animate-eq-1" />
                <span className="w-[2px] bg-emerald-500 rounded-full animate-eq-2" />
                <span className="w-[2px] bg-emerald-500 rounded-full animate-eq-3" />
              </div>
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            )}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-foreground truncate">
              {isPlaying ? nowPlayingData?.title : 'Offline playlist'}
            </div>
            <p className="text-[11px] text-muted-foreground truncate">
              {isPlaying
                ? nowPlayingData?.artist
                : 'Spotify / Last.fm'}
            </p>
          </div>
        </motion.div>

        {/* Card 3: India (IST) Live Clock */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          className="group relative flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card/90 hover:border-border transition-all duration-200 backdrop-blur-xs min-h-[96px]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
                Local Time
              </span>
            </div>
            {isDaytime ? (
              <Sun className="h-3.5 w-3.5 text-amber-500" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-indigo-400" />
            )}
          </div>

          <div className="space-y-1">
            <div className="font-mono text-xs font-semibold text-foreground">
              {istTime || 'Loading time...'}
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center justify-between">
              <span>IST (UTC+5:30)</span>
              <span className="text-[10px] text-muted-foreground/70">{atmosphereText}</span>
            </p>
          </div>
        </motion.div>

        {/* Card 4: Latest Commit Pulse */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.15 }}
          onClick={() => window.dispatchEvent(new CustomEvent('open-commit-modal'))}
          className="group relative flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card/90 hover:border-border transition-all duration-200 cursor-pointer backdrop-blur-xs min-h-[96px]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors">
              <GitCommit className="h-3.5 w-3.5" />
              <span className="font-mono text-[10px] uppercase tracking-wider font-medium">
                Latest Git
              </span>
            </div>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border/40">
              #{commitSha}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-foreground truncate" title={commitMsg}>
              {commitMsg}
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center justify-between">
              <span>main branch</span>
              <span className="text-[10px] text-muted-foreground/60 group-hover:text-foreground transition-colors">
                View diff →
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
