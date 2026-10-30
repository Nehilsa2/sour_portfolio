import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";

export default function CornerLoader() {
  const progress = useMotionValue(0);
  const loadRing = useTransform(progress, (v) => v / 100);
  const { scrollYProgress } = useScroll();
  const scrollRing = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const unsub = progress.on("change", (v) => setPct(Math.round(v)));
    // Crawl towards 85% until the page and fonts have actually finished loading
    const crawl = animate(progress, 85, { duration: 2.2, ease: "easeOut" });
    const pageLoaded = new Promise<void>((resolve) =>
      document.readyState === "complete" ? resolve() : window.addEventListener("load", () => resolve(), { once: true }),
    );

    Promise.all([pageLoaded, document.fonts.ready]).then(() => {
      if (cancelled) return;
      crawl.stop();
      animate(progress, 100, {
        duration: 0.6,
        ease: "easeInOut",
        onComplete: () => setTimeout(() => !cancelled && setDone(true), 500),
      });
    });

    return () => {
      cancelled = true;
      crawl.stop();
      unsub();
    };
  }, [progress]);

  return (
    <motion.button
      type="button"
      disabled={!done}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={done ? "Back to top" : `Loading ${pct}%`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="group fixed bottom-5 left-5 z-[55] flex items-center gap-3 md:bottom-8 md:left-8"
    >
      <span className="relative block size-12 md:size-14">
        <span className="animate-spin-slow absolute -inset-1.5 rounded-full border border-dashed border-white/20 transition-colors group-hover:border-brand/60" />
        <svg viewBox="0 0 60 60" className="size-full -rotate-90">
          <circle cx="30" cy="30" r="26" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
          <motion.circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="#ff3131"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength: done ? scrollRing : loadRing }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.svg
                key="arrow"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="size-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </motion.svg>
            ) : (
              <motion.span
                key="pct"
                exit={{ opacity: 0, y: -6 }}
                className="font-display text-base font-bold tabular-nums text-white md:text-lg"
              >
                {pct}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </span>

      <AnimatePresence>
        {!done && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="font-body text-[10px] font-light uppercase tracking-[0.35em] text-white/60"
          >
            Loading
            <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.2 }} className="text-brand">
              ●
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
