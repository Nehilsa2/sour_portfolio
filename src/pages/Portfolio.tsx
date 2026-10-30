import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { brands, categories, projects, showreelUrl, type Project } from "../data";
import { BigTitle, Reveal, ease } from "../components/ui";

const canHover = () => window.matchMedia("(hover: hover)").matches;

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const near = useInView(videoRef, { once: true, margin: "300px" });
  const inView = useInView(videoRef, { amount: 0.6 });
  const [playing, setPlaying] = useState(false);
  const wide = project.orientation === "horizontal";

  const play = () => {
    videoRef.current?.play().then(() => setPlaying(!videoRef.current?.paused)).catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v || v.paused) return;
    // load() rewinds and shows the poster again instead of a black first frame
    v.load();
    setPlaying(false);
  };

  // Touch devices have no hover, so autoplay while the card is on screen
  useEffect(() => {
    if (canHover()) return;
    if (inView) play();
    else stop();
  }, [inView]);

  return (
    <motion.a
      layout
      href={project.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — watch on Instagram`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease }}
      onMouseEnter={() => canHover() && play()}
      onMouseLeave={() => canHover() && stop()}
      onFocus={play}
      onBlur={stop}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-black outline-none focus-visible:border-brand ${
        wide ? "col-span-full aspect-video md:aspect-[21/9]" : "aspect-[9/16]"
      }`}
    >
      <video
        ref={videoRef}
        src={`/previews/${project.video}.mp4`}
        poster={`/previews/${project.video}.webp`}
        preload={near ? "auto" : "none"}
        muted
        loop
        playsInline
        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <span
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 transition-opacity duration-500 ${
          playing ? "opacity-60" : "opacity-100"
        }`}
      />

      <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-body text-[10px] uppercase tracking-[0.3em] backdrop-blur">
        {project.category}
      </span>
      <span className="absolute top-4 right-4 flex translate-y-[-6px] items-center gap-2 rounded-full bg-brand px-3 py-1.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-black opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <InstagramIcon className="size-3.5" />
        View ↗
      </span>

      {!playing && (
        <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-white" aria-hidden>
            <path d="M6 4l14 8-14 8z" />
          </svg>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <span className="block font-name text-xl leading-tight font-semibold uppercase transition-colors group-hover:text-brand md:text-2xl">
          {project.title}
        </span>
        <span className="mt-1 block font-body text-sm font-light text-white/60">{project.client}</span>
      </span>
    </motion.a>
  );
}

function Brands() {
  const row = [...brands, ...brands];
  return (
    <section className="bg-stage-alt relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <BigTitle kicker="Trusted by">Brands</BigTitle>
      </div>

      <div className="relative mt-16 border-y border-white/10 py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-16 hover:[animation-play-state:paused]">
          {row.map((b, i) => (
            <span key={i} className="flex items-center gap-16" aria-hidden={i >= brands.length}>
              <span className={`block h-20 w-44 rounded-xl p-2 md:h-24 md:w-56 ${b.light ? "bg-white/90 px-4" : ""}`}>
                <img src={b.logo} alt={b.name} loading="lazy" className="size-full object-contain" />
              </span>
              <span className="text-brand">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1600px] grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:grid-cols-4 md:px-10">
        {brands.map((b, i) => (
          <Reveal key={b.name} delay={(i % 4) * 0.08}>
            <div
              className={`group aspect-[3/2] rounded-2xl border p-[12%] transition-all duration-500 hover:-translate-y-1 ${
                b.light
                  ? "border-white/20 bg-white/90 hover:border-brand"
                  : "border-white/10 bg-black/40 hover:border-brand/60 hover:bg-brand-950/40"
              }`}
            >
              <img
                src={b.logo}
                alt={b.name}
                loading="lazy"
                className="size-full object-contain opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main>
      <section className="bg-stage relative min-h-svh overflow-hidden pt-36 pb-28 md:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <BigTitle kicker="Selected Work">Portfolio</BigTitle>
            <Reveal delay={0.2} className="flex flex-col gap-6 md:mb-6 md:items-end">
              <p className="max-w-sm font-body text-base font-extralight text-white/70 md:text-right">
                Commercials, films, OTT and digital content — edited, graded and finished for real impact.
              </p>
              <a
                href={showreelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-4 rounded-full border border-white/20 bg-black/40 py-2 pr-6 pl-2 backdrop-blur transition hover:border-brand"
              >
                <span className="relative grid size-11 place-items-center rounded-full bg-brand transition-transform duration-500 group-hover:scale-110">
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" />
                  <svg viewBox="0 0 24 24" className="relative ml-0.5 size-4 fill-black" aria-hidden>
                    <path d="M6 4l14 8-14 8z" />
                  </svg>
                </span>
                <span className="font-body text-xs font-medium uppercase tracking-[0.3em] transition-colors group-hover:text-brand">
                  Watch Showreel ↗
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap gap-3" role="tablist">
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-5 py-2 font-body text-xs uppercase tracking-[0.25em] transition ${
                    filter === c
                      ? "border-brand bg-brand text-black"
                      : "border-white/20 text-white/70 hover:border-brand hover:text-brand"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <ProjectCard key={p.video} project={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Brands />
    </main>
  );
}
