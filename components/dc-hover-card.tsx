import React from 'react'
import { Avatar, AvatarImage } from "./ui/avatar";
import fetcher from '@/lib/utils';
import { LanyardResponse } from '@/app/api/discord/route';
import useSWR from 'swr';
import { CalendarDays } from "lucide-react"
import DcActivity from './dc-activity';

export default function DcHoverCard() {
    const { data, isLoading, error } = useSWR<LanyardResponse>(
        "/api/discord",
        fetcher
    );
    return (
        <>
            <div className="flex justify-between space-x-4">
                <Avatar>
                    <AvatarImage src='https://cdn.discordapp.com/avatars/786926252811485186/e33462707910e441f37eee8abce6af32.webp' />
                </Avatar>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold"><b>! Mannu</b>{" "}(@dev_mannu)</h4>
                    <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            December 11, 2020
                        </span>
                    </div>
                </div>
            </div>
            <DcActivity />
        </>
    )
}
