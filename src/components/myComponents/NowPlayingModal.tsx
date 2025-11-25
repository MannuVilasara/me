'use client';

import { X, Play, Pause, ExternalLink, Music, Radio } from 'lucide-react';

interface NowPlayingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl?: string;
    songUrl: string;
    source: string;
  } | null;
}

export function NowPlayingModal({ isOpen, onClose, data }: NowPlayingModalProps) {
  if (!isOpen || !data) return null;

  const isSpotify = data.source.toLowerCase() === 'spotify';

  return (
    // Added backdrop-blur and slightly darker overlay for better focus
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
          <div className="flex items-center gap-2">
            {/* MONOCHROME: Changed text-primary to text-foreground, kept pulse if playing */}
            <Radio
              size={18}
              className={data.isPlaying ? 'text-foreground animate-pulse' : 'text-muted-foreground'}
            />
            <h3 className="text-lg font-semibold">Now Playing</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
            title="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-6 mb-6">
            {/* Left: Album Art */}
            <div className="relative shrink-0">
              {/* MONOCHROME: Changed ring color to muted */}
              <div
                className={`w-32 h-32 rounded-lg shadow-lg overflow-hidden border border-border ${data.isPlaying ? 'ring-2 ring-muted-foreground/20' : ''}`}
              >
                {data.albumImageUrl ? (
                  <img
                    src={data.albumImageUrl}
                    alt={`${data.album} cover`}
                    // NO HOVER EFFECT: Removed transition-transform and hover:scale-110
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}

                {/* Fallback if image fails or doesn't exist */}
                <div
                  className={`w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground ${data.albumImageUrl ? 'hidden' : ''}`}
                >
                  <Music size={40} />
                </div>
              </div>

              {/* Status Icon Overlay */}
              <div className="absolute -bottom-3 -right-3 bg-background rounded-full p-1.5 shadow-md border border-border z-10">
                {/* MONOCHROME: Both states now use standard neutral colors instead of green */}
                {data.isPlaying ? (
                  <div className="bg-foreground text-background p-1 rounded-full">
                    <Play size={16} className="fill-current" />
                  </div>
                ) : (
                  <div className="bg-muted text-muted-foreground p-1 rounded-full">
                    <Pause size={16} className="fill-current" />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center h-32">
              {/* Source Badge */}
              <div className="mb-2">
                {/* MONOCHROME: Removed brandText, using standard muted colors */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground capitalize border border-border">
                  {data.source}
                </span>
              </div>

              {/* Song Info */}
              <div className="space-y-1">
                <h4
                  className="font-bold text-xl leading-tight text-foreground truncate"
                  title={data.title}
                >
                  {data.title}
                </h4>
                <p
                  className="text-base font-medium text-foreground/80 truncate"
                  title={data.artist}
                >
                  {data.artist}
                </p>
                <p className="text-sm text-muted-foreground truncate" title={data.album}>
                  {data.album}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-2">
            {/* MONOCHROME: Changed to standard primary button styles instead of brand colors */}
            <a
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium shadow-sm transition-all active:scale-[0.99]"
            >
              <ExternalLink size={18} />
              <span>Play on {isSpotify ? 'Spotify' : 'Last.fm'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
