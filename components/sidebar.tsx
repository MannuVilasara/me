"use client";

import React from 'react';
import { aboutYou } from "@/lib/data";
import { Separator } from "./ui/separator";
import { SiDiscord } from "react-icons/si";
import SkillOutline from "./skill-outline";
import { LanyardResponse } from "@/app/api/discord/route";
import fetcher from "@/lib/utils";
import useSWR from "swr";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import DcHoverCard from "./dc-hover-card";

function getStatusColor(status: string | undefined): string {
  if (!status) return "text-gray-400";
  if (status === "online") return "text-green-500";
  if (status === "idle") return "text-yellow-500";
  if (status === "dnd") return "text-red-500";
  return "text-gray-400"
}

export default function Sidebar() {
  const { data, isLoading, error } = useSWR<LanyardResponse>(
    "/api/discord",
    fetcher
  );

  return (
    <React.Fragment>
      <div className="flex flex-col space-y-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          {/* Title/Name */}
          <p className="font-semibold">{aboutYou.name}</p>
          {/* Description */}
          <p className="text-sm text-muted-foreground">{aboutYou.description}
            {" "}
            Here is my
            {" "}
            <a href="http://github.com/MannuVilasara" target="_blank">Github.</a>
          </p>
        </div>
        <Separator />
        <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
          <p className="font-semibold">My Status</p>
          <br />
          <HoverCard>
            <HoverCardTrigger>
              <a className={getStatusColor(data?.data.discord_status.toString())} href="http://discord.com/users/786926252811485186" target="_blank">
                <SkillOutline Icon={SiDiscord} text={error || isLoading ? "offline" : data?.data.discord_status + ""} />
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <DcHoverCard />
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </React.Fragment>
  );
}
