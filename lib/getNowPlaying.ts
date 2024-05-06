import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REFRESH_TOKEN } from "@/env"

const CLIENT_ID = SPOTIFY_CLIENT_ID as string
const CLIENT_SECRET = SPOTIFY_CLIENT_SECRET as string
const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const NOW_PLAYING_ENDPOINT =
    'https://api.spotify.com/v1/me/player/currently-playing'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

type Song = {
    is_playing: boolean
    progress_ms: number
    item: {
        name: string
        duration_ms: number
        artists: {
            name: string
        }[]
        album: {
            name: string
            images: {
                url: string
            }[]
        }
        external_urls: {
            spotify: string
        }
    }
}

type AccessToken = {
    access_token: string
}

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${BASIC}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
        }),
    })

    return (await response.json()) as AccessToken
}

const getNowPlaying = async () => {
    const { access_token } = await getAccessToken()

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: {
            revalidate: 60,
        },
    })

    if (response.status === 204) {
        return {
            status: response.status,
        }
    }

    try {
        const song = (await response.json()) as Song

        return {
            status: response.status,
            data: song,
        }
    } catch {
        return {
            status: response.status,
        }
    }
}

export default getNowPlaying