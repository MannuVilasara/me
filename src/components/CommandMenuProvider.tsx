'use client';

import { useEffect, useState } from 'react';
import { CommandMenu } from '@/components/CommandMenu';

interface CommandMenuProviderProps {
  children: React.ReactNode;
}

export function CommandMenuProvider({ children }: CommandMenuProviderProps) {
  const [open, setOpen] = useState(false);
  const [catEnabled, setCatEnabled] = useState(true);

  // Load initial cat state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('oneko-enabled');
      const enabled = saved !== null ? saved === 'true' : true;
      setCatEnabled(enabled);
    }
  }, []);

  // Toggle command menu with Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const toggleCat = () => {
    const newEnabled = !catEnabled;
    setCatEnabled(newEnabled);
    localStorage.setItem('oneko-enabled', newEnabled.toString());

    // Update global state for immediate effect
    if (typeof window !== 'undefined') {
      window.onekoEnabled = newEnabled;
      // Trigger a custom event to notify Oneko component
      window.dispatchEvent(new CustomEvent('oneko-toggle', { detail: { enabled: newEnabled } }));
    }
  };

  const openDiscordModal = () => {
    // Emit custom event to open Discord modal
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-discord-modal'));
    }
  };

  const openNowPlayingModal = () => {
    // Emit custom event to open Now Playing modal
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-now-playing-modal'));
    }
  };

  const openCommitDiffModal = () => {
    // Emit custom event to open Commit Diff modal
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-commit-modal'));
    }
  };

  return (
    <>
      {children}
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        onToggleCat={toggleCat}
        catEnabled={catEnabled}
        onOpenDiscordModal={openDiscordModal}
        onOpenNowPlayingModal={openNowPlayingModal}
        onOpenCommitDiffModal={openCommitDiffModal}
      />
    </>
  );
}
