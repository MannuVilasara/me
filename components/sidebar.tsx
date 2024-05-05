import { aboutYou } from "@/lib/data";
// import NowPlaying from "./music";

export default function Sidebar() {
  return (
    <>
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
      </div>
    </>
  );
}
