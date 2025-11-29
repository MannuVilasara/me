import { NextResponse } from 'next/server';
import { LastFmImage, LastFmRecentTracksResponse } from '@/types/types';

const API_KEY = process.env.LASTFM_API_KEY!;
const USERNAME = process.env.LASTFM_USERNAME!;

const RECENT_TRACKS_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

export async function GET() {
  try {
    const response = await fetch(RECENT_TRACKS_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Last.fm API returned ${response.status}`);
    }

    const data: LastFmRecentTracksResponse = await response.json();

    if (!data.recenttracks?.track?.length) {
      return NextResponse.json({ isPlaying: false });
    }

    const track = data.recenttracks.track[0];

    // Check if currently playing (has @attr.nowplaying)
    const isPlaying = track['@attr']?.nowplaying === 'true';

    if (!isPlaying) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: true,
      title: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'] || 'Unknown Album',
      albumImageUrl:
        track.image?.find((img: LastFmImage) => img.size === 'large')?.['#text'] ||
        track.image?.find((img: LastFmImage) => img.size === 'medium')?.['#text'] ||
        track.image?.find((img: LastFmImage) => img.size === 'small')?.['#text'] ||
        null,
      songUrl: track.url,
      source: 'lastfm',
    });
  } catch (error) {
    console.error(
      'Error fetching Last.fm now playing:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ isPlaying: false });
  }
}
