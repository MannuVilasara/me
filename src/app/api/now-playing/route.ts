import { NextResponse } from 'next/server';
import {
  SpotifyAccessTokenResponse,
  SpotifyArtist,
  SpotifyNowPlayingResponse,
  LastFmImage,
  LastFmRecentTracksResponse,
  NowPlayingResponse,
} from '@/types/types';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

async function getAccessToken(): Promise<SpotifyAccessTokenResponse> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
}

async function getSpotifyNowPlaying(): Promise<NowPlayingResponse | null> {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // If no song is currently playing
    if (response.status === 204 || response.status > 400) {
      return null;
    }

    const song: SpotifyNowPlayingResponse = await response.json();

    if (!song.is_playing) {
      return null;
    }

    return {
      isPlaying: true,
      title: song.item.name,
      artist: song.item.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
      source: 'spotify',
    };
  } catch (error) {
    console.error(
      'Error fetching Spotify now playing:',
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

async function getLastfmNowPlaying(): Promise<NowPlayingResponse | null> {
  try {
    const API_KEY = process.env.LASTFM_API_KEY!;
    const USERNAME = process.env.LASTFM_USERNAME!;

    const RECENT_TRACKS_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

    const response = await fetch(RECENT_TRACKS_ENDPOINT);

    if (!response.ok) {
      throw new Error(`Last.fm API returned ${response.status}`);
    }

    const data: LastFmRecentTracksResponse = await response.json();

    if (!data.recenttracks?.track?.length) {
      return null;
    }

    const track = data.recenttracks.track[0];

    // Check if currently playing (has @attr.nowplaying)
    const isPlaying = track['@attr']?.nowplaying === 'true';

    if (!isPlaying) {
      return null;
    }

    return {
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
    };
  } catch (error) {
    console.error(
      'Error fetching Last.fm now playing:',
      error instanceof Error ? error.message : String(error)
    );
    return null;
  }
}

export async function GET() {
  try {
    // Try Spotify first
    const spotifyData = await getSpotifyNowPlaying();
    if (spotifyData) {
      return NextResponse.json(spotifyData);
    }

    // Fallback to Last.fm
    const lastfmData = await getLastfmNowPlaying();
    if (lastfmData) {
      return NextResponse.json(lastfmData);
    }

    // Neither service is playing
    return NextResponse.json({ isPlaying: false });
  } catch (error) {
    console.error(
      'Error fetching now playing:',
      error instanceof Error ? error.message : String(error)
    );
    return NextResponse.json({ isPlaying: false });
  }
}
