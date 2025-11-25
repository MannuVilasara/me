'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { NowPlayingModal, DiscordModal, CommitDiffModal } from '../modals';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface GlobalModalProviderProps {
  children: React.ReactNode;
}

export function GlobalModalProvider({ children }: GlobalModalProviderProps) {
  // Modal states
  const [nowPlayingModalOpen, setNowPlayingModalOpen] = useState(false);
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const [commitModalOpen, setCommitModalOpen] = useState(false);

  // Commit modal data
  const [commitDiff, setCommitDiff] = useState<string | null>(null);
  const [commitFiles, setCommitFiles] = useState<Array<{
    filename: string;
    status: string;
    additions: number;
    deletions: number;
  }> | null>(null);
  const [diffLoading, setDiffLoading] = useState(false);
  const [diffError, setDiffError] = useState<string | null>(null);

  // Fetch data for modals
  const { data: nowPlayingData } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 5000,
  });
  const { data: discordData } = useSWR('/api/get-discord-status', fetcher, {
    refreshInterval: 5000,
  });
  const { data: commitData } = useSWR('/api/latest-commit', fetcher, {
    refreshInterval: 1000 * 60 * 5, // 5 mins refresh
  });

  // Event listeners for command menu modal triggers
  useEffect(() => {
    const handleOpenDiscordModal = () => setDiscordModalOpen(true);
    const handleOpenNowPlayingModal = () => setNowPlayingModalOpen(true);
    const handleOpenCommitModal = async () => {
      setCommitModalOpen(true);

      // If we don't have the diff data yet, fetch it
      if (!commitDiff && !diffLoading && commitData?.sha) {
        setDiffLoading(true);
        setDiffError(null);

        try {
          const response = await fetch(`/api/commit-diff?sha=${commitData.sha}`);
          if (response.ok) {
            const diffData = await response.json();
            setCommitDiff(diffData.diff);
            setCommitFiles(diffData.files || []);
          } else if (response.status === 429) {
            const errorData = await response.json();
            setDiffError(
              `Rate limit exceeded. ${errorData.resetTime ? `Resets at ${new Date(errorData.resetTime).toLocaleTimeString()}` : 'Try again later.'}`
            );
          } else {
            setDiffError('Failed to load diff');
          }
        } catch (err) {
          setDiffError('Network error');
        } finally {
          setDiffLoading(false);
        }
      }
    };

    window.addEventListener('open-discord-modal', handleOpenDiscordModal);
    window.addEventListener('open-now-playing-modal', handleOpenNowPlayingModal);
    window.addEventListener('open-commit-modal', handleOpenCommitModal);

    return () => {
      window.removeEventListener('open-discord-modal', handleOpenDiscordModal);
      window.removeEventListener('open-now-playing-modal', handleOpenNowPlayingModal);
      window.removeEventListener('open-commit-modal', handleOpenCommitModal);
    };
  }, [commitDiff, diffLoading, commitData?.sha]);

  // Keyboard event listeners for closing modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close modals on Escape or 'q' key
      if (event.key === 'Escape' || event.key === 'q') {
        const anyModalOpen = nowPlayingModalOpen || discordModalOpen || commitModalOpen;
        if (anyModalOpen) {
          event.preventDefault();
          setNowPlayingModalOpen(false);
          setDiscordModalOpen(false);
          handleCloseCommitModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nowPlayingModalOpen, discordModalOpen, commitModalOpen]);

  const handleCloseCommitModal = () => {
    setCommitModalOpen(false);
    setCommitDiff(null);
    setCommitFiles(null);
    setDiffError(null);
  };

  return (
    <>
      {children}

      {/* Global Modals */}
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
      <CommitDiffModal
        isOpen={commitModalOpen}
        onClose={handleCloseCommitModal}
        diff={commitDiff}
        loading={diffLoading}
        error={diffError}
        commitSha={commitData?.sha || ''}
        commitMessage={commitData?.message || ''}
        files={commitFiles || []}
        commitUrl={commitData?.html_url}
      />
    </>
  );
}
