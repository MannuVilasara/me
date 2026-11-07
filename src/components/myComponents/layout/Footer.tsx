'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

export default function Footer() {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-20 border-t border-border/50 pt-8 pb-12 text-xs text-muted-foreground font-mono">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-foreground/80 font-sans text-sm font-medium">
            <span>Manpreet Singh</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-xs font-mono text-muted-foreground">Punjab, India</span>
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Crafted with restraint. Powered by Next.js, Framer Motion, and curiosity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {istTime && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/40 border border-border/40 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{istTime} IST</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-muted-foreground">
            <Link
              href="https://github.com/MannuVilasara"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://twitter.com/dev_mannuu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              title="Twitter / X"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://discord.com/users/786926252811485186"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              title="Discord"
            >
              <FaDiscord className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
