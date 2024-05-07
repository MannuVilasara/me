import { NextResponse } from "next/server";

enum status {
  online,
  idle,
  dnd,
  //   offline,
}

export type LanyardResponse = {
  data: {
    discord_user: {
      id: string;
      username: string;
      discriminator: string;
      avatar: string;
    };
    discord_status: status;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
    activities: {
      flags: number;
      id: string;
      name: string;
      type: number;
      state: string;
      details: string;
      timestamps: {
        end: number;
      };
      assets: {
        large_image: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
      };
      emoji: {
        name: string;
      };
      created_at: number;
    }[];
    success: boolean;
  };
};

export const dynamic = "force-dynamic";

export const GET = async () => {
  const res = await fetch(
    "https://api.lanyard.rest/v1/users/786926252811485186",
    {
      headers: {
        "Content-Type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    },
  );

  return NextResponse.json<LanyardResponse>(await res.json());
};
