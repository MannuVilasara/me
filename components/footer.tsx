import NowPlaying from "./music";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <p className="mb-8 text-sm text-muted-foreground text-center">
        &copy; MannuVilasara •{year} <NowPlaying />
      </p>
    </>
  );
}
