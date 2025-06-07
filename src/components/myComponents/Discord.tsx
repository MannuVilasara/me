'use client';
import useSWR from 'swr';

const DISCORD_USER_ID = '786926252811485186';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DiscordStatusInline() {
  const { data } = useSWR(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, fetcher, {
    refreshInterval: 5000,
  });

  const discordStatus = data?.data?.discord_status;

  if (!discordStatus) return <>Unknown</>;

  return <>{discordStatus}</>;
}
