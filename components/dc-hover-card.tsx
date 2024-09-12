import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import fetcher from "@/lib/utils";
import { LanyardResponse } from "@/app/api/discord/route";
import useSWR from "swr";
import { CalendarDays } from "lucide-react";
import DcActivity from "./dc-activity";
import { Badge, BadgePropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export default function DcHoverCard() {
  const { data, isLoading, error } = useSWR<LanyardResponse>(
    "/api/discord",
    fetcher,
  );
  let color: OverridableStringUnion<
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "info"
    | "success"
    | "warning",
    BadgePropsColorOverrides
  > = "default";
  if (data?.data.discord_status) {
    switch (data.data.discord_status.toString()) {
      case "online":
        color = "success";
        break;
      case "idle":
        color = "warning";
        break;
      case "dnd":
        color = "error";
        break;
      default:
        color = "default";
    }
  }
  return (
    <>
      <div className="flex justify-between space-x-4">
        <Badge variant="dot" color={color} overlap="circular">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/117009138?s=400&u=7689c5d0450e6808a28847c6cb9eaef672ed7300&v=4" />
            
          </Avatar>
        </Badge>
        <div className="space-y-1">
          {data && (
            <>
              <h4 className="text-sm font-semibold">
                <b>! Mannu</b> (@dev_mannu)
              </h4>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <time className="text-xs text-muted-foreground">
                  December 11, 2020
                </time>
              </div>
            </>
          )}
        </div>
      </div>
      <DcActivity />
    </>
  );
}
