import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brands, categories, projects, type Project } from "../data";
import { BigTitle, Reveal, ease } from "../components/ui";

function ProjectCard({ project, index, onPlay }: { project: Project; index: number; onPlay: () => void }) {
  const thumb =
    project.thumbnail ?? (project.youtubeId ? `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg` : undefined);
  const playable = Boolean(project.youtubeId);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease }}
      className="group"
    >
      <button
        type="button"
        onClick={playable ? onPlay : undefined}
        disabled={!playable}
        aria-label={playable ? `Play ${project.title}` : project.title}
        className="relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,#3f0000_0%,#120606_55%,#000_100%)] text-left enabled:cursor-pointer"
      >
        {thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <span className="text-grain-flat absolute right-4 bottom-0 font-display text-[7rem] leading-[0.8] font-extrabold opacity-40 transition duration-700 group-hover:opacity-80">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-body text-[10px] uppercase tracking-[0.3em] backdrop-blur">
          {project.category}
        </span>
        {playable && (
          <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-brand opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-black" aria-hidden>
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        )}
      </button>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-name text-xl font-medium uppercase transition-colors group-hover:text-brand md:text-2xl">
            {project.title}
          </h3>
          <p className="font-body text-sm font-light text-white/50">{project.client}</p>
        </div>
        <span className="font-body text-sm font-extralight text-white/50">{project.year}</span>
      </div>
    </motion.article>
  );
}

function Lightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <button onClick={onClose} className="absolute top-6 right-6 font-body text-sm uppercase tracking-[0.3em] hover:text-brand">
        Close ✕
      </button>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ ease }}
        onClick={(e) => e.stopPropagation()}
        className="aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10"
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
          title="Project video"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="size-full"
        />
      </motion.div>
    </motion.div>
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
  const [video, setVideo] = useState<string | null>(null);
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main>
      <section className="bg-stage relative min-h-svh overflow-hidden pt-36 pb-28 md:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <BigTitle kicker="Selected Work">Portfolio</BigTitle>
            <Reveal delay={0.2}>
              <p className="max-w-sm font-body text-base font-extralight text-white/70 md:mb-6 md:text-right">
                Commercials, films, OTT and digital content — edited, graded and finished for real impact.
              </p>
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

          <motion.div layout className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} onPlay={() => setVideo(p.youtubeId!)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Brands />

      <AnimatePresence>{video && <Lightbox videoId={video} onClose={() => setVideo(null)} />}</AnimatePresence>
    </main>
  );
}
