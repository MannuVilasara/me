// API Response Interfaces

// Spotify API interfaces
export interface SpotifyAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyAlbum {
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

export interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyNowPlayingResponse {
  is_playing: boolean;
  item: SpotifyTrack;
}

// Last.fm API interfaces
export interface LastFmImage {
  '#text': string;
  size: string;
}

export interface LastFmArtist {
  '#text': string;
}

export interface LastFmAlbum {
  '#text': string;
}

export interface LastFmTrack {
  name: string;
  artist: LastFmArtist;
  album: LastFmAlbum;
  image?: LastFmImage[];
  url: string;
  '@attr'?: {
    nowplaying: string;
  };
}

export interface LastFmRecentTracksResponse {
  recenttracks: {
    track: LastFmTrack[];
  };
}

// Common API response interfaces
export interface NowPlayingResponse {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string | null;
  songUrl?: string;
  source?: string;
}

// GitHub API interfaces
export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  files?: GitHubFile[];
}

export interface GitHubFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
}

export interface CommitDiffResponse {
  sha: string;
  message: string;
  author: string;
  date: string;
  diff: string;
  files: {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
  }[];
}

// WakaTime API interfaces
export interface WakaTimeLanguage {
  name: string;
  percent: number;
  time?: string;
  text?: string;
}

export interface WakaTimeEditor {
  name: string;
  percent: number;
}

export interface WakaTimeOS {
  name: string;
  percent: number;
}

export interface WakaTimeData {
  human_readable_total: string;
  human_readable_daily_average: string;
  best_day: {
    date: string;
    text: string;
  };
  languages?: WakaTimeLanguage[];
  editors?: WakaTimeEditor[];
  operating_systems?: WakaTimeOS[];
}

export type WakaTimeResult = {
  data?: WakaTimeData;
};

// GitHub contributions interface
export interface GitHubContribution {
  date: string;
  intensity: string;
}

export interface GitHubContributionsResponse {
  contributions: GitHubContribution[];
}

// Discord API interfaces
export interface DiscordEmoji {
  id: string | null;
  name: string;
}

export interface DiscordActivity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: DiscordEmoji;
}

export interface DiscordUser {
  id: string;
  username: string;
  global_name?: string;
  discriminator?: string;
  avatar?: string;
  bot?: boolean;
}

export interface DiscordData {
  discord_user: DiscordUser;
  activities: DiscordActivity[];
  discord_status: string;
}

// Component Prop Interfaces

// Blog interfaces
export interface BlogPost {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
  slug: string;
  content: string;
}

export interface BlogPageParams {
  slug: string;
}

export interface BlogPageProps {
  params: Promise<BlogPageParams>;
}

// Stats page component interfaces
export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ComponentType<{ size?: number }>;
}

export interface ProgressBarProps {
  label: string;
  percent: number;
  rightLabel?: string;
}

// Discord modal interfaces
export interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    data: DiscordData;
  };
}

// Guestbook interfaces
export type GuestbookEntry = {
  id: string;
  author: string;
  username?: string;
  avatar?: string;
  message: string;
  timestamp: string;
  verified?: boolean;
  pinned?: boolean;
};

// Form types (derived from Zod schemas)
export type MessageForm = {
  message: string;
};

// Other component interfaces
export interface ActivityItemProps {
  // Add specific props if needed
}

export interface CommitDiffModalProps {
  // Add specific props if needed
}

export interface NowPlayingModalProps {
  // Add specific props if needed
}

export interface CommandMenuProps {
  // Add specific props if needed
}

export interface OnekoCatProps {
  // Add specific props if needed
}

export interface GlobalModalProviderProps {
  // Add specific props if needed
}

export interface CommandMenuProviderProps {
  // Add specific props if needed
}

// UI Component interfaces
export interface TableProps {
  // Add specific props if needed
}

export interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add specific props if needed
}

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  // Add specific props if needed
}

export interface CommandDialogProps {
  // Add specific props if needed
}

// Form field context (from shadcn/ui)
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

// Import types that are used across the app
import type { FieldValues, FieldPath } from 'react-hook-form';
