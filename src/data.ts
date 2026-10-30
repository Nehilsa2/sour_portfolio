// Edit this file to update all site content.

export const profile = {
  firstName: "Sourabh",
  lastName: "Nirmalkar",
  role: "Video Editor & Motion Designer",
  tagline: ["From raw footage to", "real impact."],
  year: "2027",
  about:
    "with 4+ years of experience creating high-impact visual content across commercials, films, OTT platforms, and digital media. Skilled in cinematic storytelling, camera operation, and post-production, delivering compelling visuals that align with creative vision while consistently meeting tight deadlines and managing large-scale productions.",
  email: "sourabhnir81@gmail.com",
  phone: "+91 6268918008",
  location: "India",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Behance", href: "https://behance.net/" },
  ],
};

export const stats = [
  { value: 4, suffix: "+", label: ["Year", "Experience"] },
  { value: 100, suffix: "+", label: ["Projects", "Completed"] },
  { value: 50, suffix: "+", label: ["Happy", "Clients"] },
];

export const categories = ["All", "Commercial", "Film", "OTT", "Digital", "Motion"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;

export type Project = {
  title: string;
  client: string;
  category: Category;
  year: string;
  /** YouTube video ID, e.g. "dQw4w9WgXcQ" — enables thumbnail + play-in-lightbox */
  youtubeId?: string;
  /** Optional custom thumbnail placed in /public */
  thumbnail?: string;
};

export const projects: Project[] = [
  { title: "Brand Launch Film", client: "Client Name", category: "Commercial", year: "2026" },
  { title: "Short Film — Edit & Grade", client: "Independent", category: "Film", year: "2026" },
  { title: "Web Series Episode", client: "OTT Platform", category: "OTT", year: "2025" },
  { title: "Product Reel", client: "Client Name", category: "Digital", year: "2025" },
  { title: "Logo Animation Pack", client: "Client Name", category: "Motion", year: "2025" },
  { title: "TV Commercial 30s", client: "Client Name", category: "Commercial", year: "2024" },
  { title: "Music Video", client: "Artist Name", category: "Film", year: "2024" },
  { title: "Explainer Animation", client: "Client Name", category: "Motion", year: "2024" },
  { title: "Instagram Campaign", client: "Client Name", category: "Digital", year: "2023" },
];

/** `light: true` = dark-coloured logo that needs a light tile to be visible */
export const brands: { name: string; logo: string; light?: boolean }[] = [
  { name: "Kuku TV", logo: "/kukuTv.webp" },
  { name: "Wow TV", logo: "/WowTV.webp" },
  { name: "Tarwani Soap Industries", logo: "/TarwaniSoap.webp" },
  { name: "D'LXRY", logo: "/D_lxry.webp", light: true },
  { name: "Hotel Meeravill", logo: "/hotelMeeravill.webp" },
  { name: "Vaikunth Village Resort", logo: "/VaikunthVillage.webp" },
  { name: "Trueyes Opticals", logo: "/TrueEyes.webp" },
  { name: "BlueFox", logo: "/BlueFox.webp" },
  { name: "BenchMark", logo: "/BrandingCreatively.webp" },
  { name: "Digitalum", logo: "/digitalum.webp" },
  { name: "Baradia's Home Pride", logo: "/BaradiaRaipur.webp", light: true },
  { name: "Time & Style Frame", logo: "/TimeStyleframe.webp" },
];

export const services = [
  {
    title: "Video Editing",
    description:
      "Story-first cutting for commercials, films, OTT episodes and social content — pacing, rhythm and structure that hold attention.",
    tags: ["Commercials", "Long-form", "Reels & Shorts"],
  },
  {
    title: "Color Grading",
    description:
      "Cinematic looks and shot matching in DaVinci Resolve, from log footage to broadcast and OTT-ready masters.",
    tags: ["Look Development", "Shot Matching", "HDR / SDR"],
  },
  {
    title: "Motion Graphics",
    description:
      "Titles, logo animations, lower thirds, kinetic typography and explainer animations that elevate the brand.",
    tags: ["2D Animation", "Typography", "Brand Kits"],
  },
  {
    title: "VFX & Compositing",
    description:
      "Clean-ups, screen replacements, tracking, keying and compositing that blend seamlessly into the footage.",
    tags: ["Rotoscoping", "Green Screen", "Tracking"],
  },
  {
    title: "Sound Design & Mixing",
    description:
      "Dialogue clean-up, music editing, SFX and final mix so the audio hits as hard as the visuals.",
    tags: ["SFX", "Dialogue", "Final Mix"],
  },
  {
    title: "Deliverables & Mastering",
    description:
      "Subtitles, multiple aspect ratios and platform-specific exports meeting OTT, broadcast and social specs.",
    tags: ["Subtitles", "Aspect Ratios", "QC"],
  },
];

export const process = [
  { title: "Brief", text: "Understand the goal, audience, references and deadline." },
  { title: "Rough Cut", text: "Build the story structure and pacing from raw footage." },
  { title: "Refine", text: "Grade, motion, VFX and sound — polished with your feedback." },
  { title: "Deliver", text: "Final masters exported to every platform you need." },
];

export const tools = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Final Cut Pro",
  "Photoshop",
  "Audition",
  "Cinema 4D",
];
