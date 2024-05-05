import React from 'react'
import fetcher from '@/lib/utils';
import { LanyardResponse } from '@/app/api/discord/route';
import useSWR from 'swr';
import { Separator } from './ui/separator';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { NowPlayingSong } from './music';

export default function DcActivity() {
    const { data, isLoading, error } = useSWR<LanyardResponse>(
        "/api/discord",
        fetcher
    );
    const spt = useSWR<NowPlayingSong>("/api/spot/nowplaying", fetcher);
    if (!data?.data.activities[0]) return <></>;
    if (isLoading) return <></>;
    if (error) return <></>;
    const flag = data?.data.activities[0].flags;
    const rawLargeImg = data?.data.activities[0].assets.large_image;
    const httpsIndex = rawLargeImg.indexOf("/https/");
    let type;
    let image;
    let details
    if (flag == 1) {
        type = "Playing"
        if (httpsIndex !== -1) {
            const httpsSubstring = rawLargeImg.substring(httpsIndex + 1);
            const nextSlashIndex = httpsSubstring.indexOf("/");
            image = "https://" + httpsSubstring.substring(nextSlashIndex + 1);
            details = data.data.activities[0].details.slice(data.data.activities[0].details.indexOf("-") + 1)

        }
    }
    else {
        type = "Listening to"
        image = spt.data?.albumImage
        details = data.data.activities[0].details.slice(0, 15)
    };

    return (
        <>
            <br />
            <Separator />
            <br />
            <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={image} height="60px" width="60px" />
                    </Avatar>
                    <div className="space-y-1">
                        <span className="text-xs text-muted-foreground font-serif">{type + " " + data.data.activities[0].name}</span>
                        <div className="flex items-center pt-2">
                            <span className="text-xs text-muted-foreground font-sans font-light">
                                {details}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
