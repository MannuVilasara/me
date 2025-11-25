'use client';

import {
  X,
  ExternalLink,
  Clock,
  Gamepad2,
  Monitor,
  Headphones,
  Tv,
  Zap,
  Trophy,
  Code2,
  Sparkles,
  BadgeCheck,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function DiscordModal({ isOpen, onClose, data }: DiscordModalProps) {
  if (!isOpen || !data?.data) return null;

  const user = data.data.discord_user;
  const activities = data.data.activities || [];
  const discordStatus = data.data.discord_status;

  // console.log('Discord activities data:', activities);
  // console.log('First activity:', activities[0]);
  // console.log('First activity assets:', activities[0]?.assets);

  // --- Helpers ---

  // NOTE: Status colors (Green/Red/Yellow) are kept for functional meaning,
  // but borders are set to background to keep it clean.
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'idle':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      default:
        return 'bg-zinc-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'idle':
        return 'Idle';
      case 'dnd':
        return 'Do Not Disturb';
      default:
        return 'Offline';
    }
  };

  const getActivityIcon = (type: number) => {
    switch (type) {
      case 0:
        return <Gamepad2 size={14} />;
      case 1:
        return <Monitor size={14} />;
      case 2:
        return <Headphones size={14} />;
      case 3:
        return <Tv size={14} />;
      default:
        return <Gamepad2 size={14} />;
    }
  };

  const getActivityTypeLabel = (type: number) => {
    switch (type) {
      case 0:
        return 'Playing';
      case 1:
        return 'Streaming';
      case 2:
        return 'Listening to';
      case 3:
        return 'Watching';
      default:
        return 'Activity';
    }
  };

  const getImageUrl = (assetUrl: string) => {
    if (assetUrl?.startsWith('mp:external/')) {
      // Handle mp:external format like:
      // mp:external/gSyzI_yG7kG8NH4jj5t-4JxVmOIHeM6bkwsNAx3oAxY/%3Fv%3D20/https/raw.githubusercontent.com/vyfor/icons/master/icons/default/dark/dashboard.png

      // Extract the URL part after the hash
      const urlMatch = assetUrl.match(/mp:external\/[^\/]+\/(.+)/);
      if (urlMatch) {
        const encodedPart = urlMatch[1];

        // Decode the URL-encoded part
        const decodedPart = decodeURIComponent(encodedPart);

        // The decoded part should be something like: ?v=20/https/raw.githubusercontent.com/...
        // We need to extract the actual HTTPS URL and add the query param
        const httpsMatch = decodedPart.match(/https\/(.+)/);
        if (httpsMatch) {
          let finalUrl = 'https://' + httpsMatch[1];
          // Add the v=20 parameter if it exists
          const queryMatch = decodedPart.match(/\?v=(\d+)/);
          if (queryMatch) {
            finalUrl += '?v=' + queryMatch[1];
          }
          return finalUrl;
        }

        // Fallback: if no https match, try to construct URL from the decoded part
        if (decodedPart.includes('https://')) {
          const httpsIndex = decodedPart.indexOf('https://');
          const finalUrl = decodedPart.substring(httpsIndex);
          return finalUrl;
        }
      }
      return null;
    }

    // Handle regular Discord CDN URLs
    if (assetUrl?.startsWith('https://')) {
      return assetUrl;
    }

    return assetUrl;
  };

  const getAvatarUrl = () => {
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    }
    const defaultAvatarIndex = (user.discriminator || '0000') % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
  };

  // --- Badge Logic (Monochrome) ---
  const renderBadges = () => {
    // MONOCHROME: removed colorful text classes, used text-foreground/muted-foreground
    const badgeStyle =
      'p-1 rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all cursor-help';

    return (
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={badgeStyle}>
              <Trophy size={16} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>HypeSquad Brilliance</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className={badgeStyle}>
              <Zap size={16} className="fill-current/10" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Nitro Subscriber</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className={badgeStyle}>
              <Code2 size={16} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Active Developer</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className={badgeStyle}>
              <Sparkles size={16} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Early Supporter</p>
          </TooltipContent>
        </Tooltip>

        {/* Verified Bot (Monochrome) */}
        {user.bot && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-foreground text-background px-1.5 rounded-lg flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wide h-[22px]">
                <BadgeCheck size={12} className="fill-background text-foreground" />
                <span>Bot</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Verified Bot</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-background border border-border rounded-xl shadow-2xl max-w-md w-full overflow-hidden relative flex flex-col">
        {/* Top Banner - MONOCHROME */}
        {/* Changed from Blue Gradient to solid Muted background */}
        <div className="h-28 bg-muted border-b border-border w-full relative pattern-grid-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-background/50 hover:bg-background text-foreground rounded-full transition-colors z-10 border border-border/50"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Header Content */}
        <div className="px-6 pb-6 relative">
          {/* Avatar & Status */}
          <div className="flex justify-between items-end -mt-14 mb-3">
            <div className="relative">
              <img
                src={getAvatarUrl()}
                alt={user.username}
                className="w-28 h-28 rounded-full border-[6px] border-background bg-background object-cover shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const defaultIndex = (user.discriminator || '0000') % 5;
                  target.src = `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
                }}
              />
              {/* Status Indicator - Kept semantic colors (green/red) for utility, but with background-colored border */}
              <div
                className={`absolute bottom-1 right-1 w-7 h-7 rounded-full border-[5px] border-background ${getStatusColor(discordStatus)}`}
                title={getStatusLabel(discordStatus)}
              />
            </div>
          </div>

          {/* User Info & Badges */}
          <div className="mb-6 bg-muted/30 p-4 rounded-xl border border-border">
            <h4 className="font-bold text-2xl text-foreground leading-tight truncate flex items-center gap-2">
              {user.global_name || user.username}
            </h4>
            <p className="text-base text-muted-foreground font-medium">@{user.username}</p>

            {renderBadges()}
          </div>

          {/* Divider */}
          {activities.length > 0 && <div className="h-px bg-border mb-5" />}

          {/* Activities Section */}
          {activities.length > 0 && (
            <div className="space-y-4 mb-6">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                Current Activity
              </h5>

              {activities.map((activity: any, index: number) => (
                <div key={index} className="relative group">
                  <div className="flex gap-4 p-3 rounded-xl bg-card border border-border shadow-sm">
                    {/* Large Asset */}
                    <div className="relative shrink-0">
                      {activity.assets?.large_image ? (
                        <div className="relative">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img
                                src={getImageUrl(activity.assets.large_image)!}
                                alt="Activity Asset"
                                className="w-20 h-20 rounded-xl object-cover grayscale-[0.2] cursor-help"
                                onError={(e) => {
                                  // Large image failed to load - could add fallback here
                                }}
                              />
                            </TooltipTrigger>
                            {activity.assets?.large_text && (
                              <TooltipContent>
                                <p>{activity.assets.large_text}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                          {activity.assets?.small_image && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <img
                                  src={getImageUrl(activity.assets.small_image)!}
                                  alt="Small Asset"
                                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-[3px] border-card bg-card object-cover cursor-help"
                                  onError={(e) => {
                                    // Small image failed to load - could add fallback here
                                  }}
                                />
                              </TooltipTrigger>
                              {activity.assets?.small_text && (
                                <TooltipContent>
                                  <p>{activity.assets.small_text}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          )}
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center border border-border">
                          <Gamepad2 size={32} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                      <div className="font-bold text-base text-foreground leading-tight truncate">
                        {activity.name}
                      </div>

                      {activity.type !== undefined && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          {getActivityIcon(activity.type)}
                          <span>{getActivityTypeLabel(activity.type)}</span>
                        </div>
                      )}

                      {activity.details && (
                        <p className="text-sm text-foreground/90 truncate font-medium">
                          {activity.details}
                        </p>
                      )}

                      {activity.state && (
                        <p className="text-sm text-muted-foreground truncate">{activity.state}</p>
                      )}

                      {activity.timestamps?.start && (
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground/80 bg-muted px-2 py-1 rounded-md border border-border/50 w-fit">
                          <Clock size={10} />
                          <span>
                            {(() => {
                              const start = new Date(activity.timestamps.start);
                              const now = new Date();
                              const diffMs = now.getTime() - start.getTime();
                              const diffMins = Math.floor(diffMs / 60000);
                              const diffHrs = Math.floor(diffMins / 60);

                              if (diffHrs > 0) return `${diffHrs}h ${diffMins % 60}m elapsed`;
                              return `${diffMins}m elapsed`;
                            })()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Button - MONOCHROME */}
          {/* Replaced specific Blue #5865F2 with Primary/Primary-Foreground */}
          <a
            href={`https://discord.com/users/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-sm font-medium active:scale-[0.98]"
          >
            <ExternalLink size={18} />
            View Full Profile
          </a>
        </div>
      </div>
    </div>
  );
}
