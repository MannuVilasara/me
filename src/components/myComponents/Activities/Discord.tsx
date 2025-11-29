'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DiscordStatusInline() {
  const { data } = useSWR(`/api/get-discord-status`, fetcher, {
    refreshInterval: 5000,
  });

  const discordStatus = data?.data?.discord_status;

  if (!discordStatus) return <>Unknown</>;

  if (discordStatus === 'online') {
    return <span className="text-green-500 font-medium">Online</span>;
  } else if (discordStatus === 'idle') {
    return <span className="text-yellow-500 font-medium">Idle</span>;
  } else if (discordStatus === 'dnd') {
    return <span className="text-red-500 font-medium">DND</span>;
  } else {
    return <span className="text-zinc-600 font-medium">Offline</span>;
  }
}
