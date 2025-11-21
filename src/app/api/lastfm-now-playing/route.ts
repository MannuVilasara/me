import { NextResponse } from 'next/server';

const API_KEY = process.env.LASTFM_API_KEY!;
const USERNAME = process.env.LASTFM_USERNAME!;

const RECENT_TRACKS_ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

export async function GET() {
    try {
        const response = await fetch(RECENT_TRACKS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Last.fm API returned ${response.status}`);
        }

        const data = await response.json();

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
            albumImageUrl: track.image?.find((img: any) => img.size === 'large')?.['#text'] ||
                track.image?.find((img: any) => img.size === 'medium')?.['#text'] ||
                track.image?.find((img: any) => img.size === 'small')?.['#text'] ||
                null,
            songUrl: track.url,
            source: 'lastfm',
        });
    } catch (error: any) {
        console.error('Error fetching Last.fm now playing:', error.message);
        return NextResponse.json({ isPlaying: false });
    }
}