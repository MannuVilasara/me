import React from "react";
import fetcher from "@/lib/utils";
import { LanyardResponse } from "@/app/api/discord/route";
import useSWR from "swr";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

type NowPlayingSong = {
  isPlaying: boolean;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  songUrl: string;
};

export default function DcActivity() {
  const { data, isLoading, error } = useSWR<LanyardResponse>(
    "/api/discord",
    fetcher,
  );
  const spt = useSWR<NowPlayingSong>("/api/spot/nowplaying", fetcher);

  if (isLoading || error || !data?.data.activities[0]) {
    return null; // Or loading/error UI
  }

  const flag = data.data.activities[1].flags;
  let rawLargeImg = data.data.activities[1].assets.large_image;
  const httpsIndex = rawLargeImg.indexOf("/https/");
  let type;
  let image;
  let details;

  if (flag === 1) {
    type = "Playing";
    if (httpsIndex !== -1) {
      const httpsSubstring = rawLargeImg.substring(httpsIndex + 1);
      const nextSlashIndex = httpsSubstring.indexOf("/");
      image = "https://" + httpsSubstring.substring(nextSlashIndex + 1);
      details = data.data.activities[0].details.slice(
        data.data.activities[1].details.indexOf("-") + 1,
      );
    }
  } else {
    type = "Listening to";
    image = spt.data?.albumImage;
    details = data.data.activities[1].details.slice(0, 15);
  }

  return (
    <React.Fragment>
      <br />
      <Separator />
      <br />
      <div className="rounded-xl border bg-card text-card-foreground shadow p-4">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage
              className="rounded-lg"
              src={image}
              height="60px"
              width="60px"
            />
          </Avatar>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground font-serif">
              {type + " " + data.data.activities[1].name}
            </span>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground font-sans font-light">
                {details}
              </span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
