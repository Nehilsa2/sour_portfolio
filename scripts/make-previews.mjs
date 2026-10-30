// Generates lightweight hover previews + posters from the original videos.
// Usage: put originals in /media, then run `npm run previews`.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const SRC = "media";
const OUT = "public/previews";
const PREVIEW_SECONDS = "8";
const scale = "scale='if(gt(iw,ih),960,540)':-2";
// Videos used as full-screen backgrounds also get a full-length, higher-res `-bg.mp4`
const BACKGROUNDS = ["INTROVIDEO"];

mkdirSync(OUT, { recursive: true });

const isFresh = (out, src) => existsSync(out) && statSync(out).mtimeMs > statSync(src).mtimeMs;

for (const file of readdirSync(SRC).filter((f) => /\.(mp4|mov|m4v|webm)$/i.test(f))) {
  const src = path.join(SRC, file);
  const name = path.parse(file).name;
  const video = path.join(OUT, `${name}.mp4`);
  const poster = path.join(OUT, `${name}.webp`);

  if (!isFresh(video, src)) {
    console.log(`preview  ${file}`);
    execFileSync(ffmpeg, [
      "-y", "-loglevel", "error", "-i", src, "-t", PREVIEW_SECONDS,
      "-vf", `${scale},fps=30`, "-an",
      "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", video,
    ]);
  }

  if (!isFresh(poster, src)) {
    console.log(`poster   ${file}`);
    execFileSync(ffmpeg, [
      "-y", "-loglevel", "error", "-ss", "1", "-i", src, "-frames:v", "1",
      "-vf", scale, "-c:v", "libwebp", "-quality", "75", poster,
    ]);
  }

  const bg = path.join(OUT, `${name}-bg.mp4`);
  if (BACKGROUNDS.includes(name) && !isFresh(bg, src)) {
    console.log(`bg       ${file}`);
    execFileSync(ffmpeg, [
      "-y", "-loglevel", "error", "-i", src,
      "-vf", "scale=1280:-2,fps=30", "-an",
      "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", bg,
    ]);
  }
}

console.log("done");
