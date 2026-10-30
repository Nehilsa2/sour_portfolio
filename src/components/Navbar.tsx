import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { profile } from "../data";
import { ease } from "./ui";

const links = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
];

/** Text that rolls up to a duplicate on hover */
function RollText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function useIndiaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(
      new Date(),
    );
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function MagneticButton({ to, children }: { to: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset}>
      <Link
        ref={ref}
        to={to}
        className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-brand px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.25em] text-black"
      >
        <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
        <RollText className="relative">{children}</RollText>
        <span className="relative transition-transform duration-500 group-hover:rotate-45">↗</span>
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const time = useIndiaTime();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  // Hide while scrolling down, reveal on any upward scroll
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 200);
  });

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (to: string) => {
    const [path, hash = ""] = to.split("#");
    return location.pathname === path && location.hash === (hash ? `#${hash}` : "");
  };
  const highlighted = hovered ?? links.find((l) => isActive(l.to))?.label ?? null;

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-[58] px-4 pt-4 md:px-8 md:pt-5"
      >
        <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          {/* Left: logo + live clock */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label="Home"
              className="group grid size-12 place-items-center rounded-2xl border border-white/10 bg-black/40 font-name text-lg font-bold backdrop-blur-xl transition-colors hover:border-brand/60"
            >
              <RollText>
                S<span className="text-brand">N</span>
              </RollText>
            </Link>
            <div
              className={`hidden flex-col font-body text-[10px] leading-tight uppercase tracking-[0.25em] text-white/50 transition-opacity duration-500 lg:flex ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            >
              <span>{profile.location}</span>
              <span className="text-white/80 tabular-nums">{time} IST</span>
            </div>
          </div>

          {/* Center: glass pill with sliding highlight */}
          <div
            onMouseLeave={() => setHovered(null)}
            className="relative hidden items-center gap-1 overflow-hidden rounded-full border border-white/10 bg-black/40 p-1.5 shadow-[0_10px_40px_-10px_rgba(255,49,49,0.25)] backdrop-blur-xl md:flex"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onMouseEnter={() => setHovered(l.label)}
                className={`group relative rounded-full px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
                  highlighted === l.label ? "text-black" : "text-white/75"
                }`}
              >
                {highlighted === l.label && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-brand"
                  />
                )}
                <RollText className="relative">{l.label}</RollText>
              </Link>
            ))}
            <motion.span
              aria-hidden
              style={{ scaleX: progress }}
              className="absolute inset-x-6 bottom-0 h-px origin-left bg-brand/70"
            />
          </div>

          {/* Right: CTA */}
          <div className="hidden items-center justify-end gap-5 md:flex">
            <MagneticButton to="/#contact">Let's Talk</MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-10 grid size-12 place-items-center rounded-full border border-white/10 bg-black/40 backdrop-blur-xl md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-white transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px bg-white transition-all duration-500 ${
                  open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"
                }`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu with circular reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease }}
            className="bg-stage fixed inset-0 z-[57] flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            <ul className="space-y-2">
              {[...links, { to: "/#contact", label: "Contact" }].map((l, i) => (
                <li key={l.label} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease }}
                  >
                    <Link to={l.to} className="group flex items-baseline gap-4">
                      <span className="font-body text-xs text-brand">0{i + 1}</span>
                      <span
                        className={`font-display text-6xl leading-[1.05] font-extrabold uppercase transition-colors ${
                          isActive(l.to) ? "text-grain-flat" : "text-white group-active:text-brand"
                        }`}
                      >
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-5 border-t border-white/10 pt-6"
            >
              <a href={`mailto:${profile.email}`} className="block font-name text-xl">
                {profile.email}
              </a>
              <div className="flex flex-wrap gap-5">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[10px] uppercase tracking-[0.3em] text-white/60"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="font-body text-[10px] uppercase tracking-[0.3em] text-white/40 tabular-nums">
                {profile.location} · {time} IST
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
