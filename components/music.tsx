'use client'

import fetcher from "@/lib/utils";
import useSWR from "swr";

type NowPlayingSong = {
    isPlaying: boolean;
    name: string;
    artist: string;
    album: string;
    albumImage: string;
    songUrl: string;
};

export default function NowPlaying() {
    const { data } = useSWR<NowPlayingSong>("/api/spot/nowplaying", fetcher);
    if (!data) return null;

    return (
        <>
            {
                data?.songUrl ? (
                    <>
                        • Listening to
                        {" "}
                        <a
                            href={data.songUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {data.name}
                        </a>
                    </>


                ) : (
                    <p>Not Playing</p>
                )

            }
        </>
    );
}