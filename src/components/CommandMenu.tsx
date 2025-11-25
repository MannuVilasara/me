'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useTheme } from 'next-themes';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleCat?: () => void;
  catEnabled?: boolean;
  onOpenDiscordModal?: () => void;
  onOpenNowPlayingModal?: () => void;
  onOpenCommitDiffModal?: () => void;
}

export function CommandMenu({
  open,
  onOpenChange,
  onToggleCat,
  catEnabled = true,
  onOpenDiscordModal,
  onOpenNowPlayingModal,
  onOpenCommitDiffModal,
}: CommandMenuProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
            <span className="font-mono text-muted-foreground mr-2">[🏠]</span>
            <span className="font-mono">Home</span>
            <CommandShortcut>⌘H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/about'))}>
            <span className="font-mono text-muted-foreground mr-2">[👤]</span>
            <span className="font-mono">About</span>
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/blog'))}>
            <span className="font-mono text-muted-foreground mr-2">[📝]</span>
            <span className="font-mono">Blog</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/projects'))}>
            <span className="font-mono text-muted-foreground mr-2">[💼]</span>
            <span className="font-mono">Projects</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/guestbook'))}>
            <span className="font-mono text-muted-foreground mr-2">[📖]</span>
            <span className="font-mono">Guestbook</span>
            <CommandShortcut>⌘G</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Modals */}
        <CommandGroup heading="Modals">
          <CommandItem onSelect={() => runCommand(() => onOpenDiscordModal?.())}>
            <span className="font-mono text-muted-foreground mr-2">[💬]</span>
            <span className="font-mono">Discord Status</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onOpenNowPlayingModal?.())}>
            <span className="font-mono text-muted-foreground mr-2">[🎵]</span>
            <span className="font-mono">Now Playing</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => onOpenCommitDiffModal?.())}>
            <span className="font-mono text-muted-foreground mr-2">[🔧]</span>
            <span className="font-mono">Latest Commit</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Features */}
        <CommandGroup heading="Features">
          <CommandItem onSelect={() => runCommand(() => onToggleCat?.())}>
            <span className="font-mono text-muted-foreground mr-2">[🐱]</span>
            <span className="font-mono">{catEnabled ? 'Disable' : 'Enable'} Cat</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <span className="font-mono text-muted-foreground mr-2">[☀️]</span>
            <span className="font-mono">Light Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <span className="font-mono text-muted-foreground mr-2">[🌙]</span>
            <span className="font-mono">Dark Theme</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
            <span className="font-mono text-muted-foreground mr-2">[⚙️]</span>
            <span className="font-mono">System Theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* External Links */}
        <CommandGroup heading="Links">
          <CommandItem
            onSelect={() =>
              runCommand(() => window.open('https://github.com/MannuVilasara', '_blank'))
            }
          >
            <span className="font-mono text-muted-foreground mr-2">[🐙]</span>
            <span className="font-mono">GitHub Profile</span>
            <CommandShortcut>⌘⇧G</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() =>
                window.open('https://discord.com/users/743850255332188200', '_blank')
              )
            }
          >
            <span className="font-mono text-muted-foreground mr-2">[💬]</span>
            <span className="font-mono">Discord Profile</span>
            <CommandShortcut>⌘⇧D</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open('https://mannu.live', '_blank'))}
          >
            <span className="font-mono text-muted-foreground mr-2">[🌐]</span>
            <span className="font-mono">Portfolio</span>
            <CommandShortcut>⌘⇧P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
