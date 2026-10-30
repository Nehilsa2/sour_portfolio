import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { to: "/", label: "Home" },
  { to: "/#about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isActive = (to: string) => {
    const [path, hash = ""] = to.split("#");
    return location.pathname === path && location.hash === (hash ? `#${hash}` : "");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-black/70 py-3 backdrop-blur-md" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="font-name text-2xl font-bold tracking-wide" aria-label="Home">
          S<span className="text-brand">N</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`font-body text-sm font-light uppercase tracking-[0.25em] transition-colors hover:text-brand ${
                isActive(l.to) ? "text-brand" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="rounded-full border border-brand px-6 py-2 font-body text-xs uppercase tracking-[0.25em] text-white transition-colors hover:bg-brand hover:text-black"
          >
            Let's Talk
          </Link>
        </div>

        <button
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`h-px w-7 bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100svh" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col items-start justify-center gap-6 overflow-hidden px-8 md:hidden"
          >
            {[...links, { to: "/#contact", label: "Contact" }].map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <Link to={l.to} className="font-display text-6xl font-extrabold uppercase hover:text-brand">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
