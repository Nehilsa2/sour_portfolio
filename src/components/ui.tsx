import type { ReactNode } from "react";
import { motion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Huge grainy red headline used at the top of each page / section */
export function BigTitle({
  children,
  kicker,
  className = "",
}: {
  children: string;
  kicker?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && (
        <Reveal y={20}>
          <p className="mb-3 font-body text-xs font-light uppercase tracking-[0.5em] text-white/60 md:text-sm">
            {kicker}
          </p>
        </Reveal>
      )}
      <h2 className="overflow-hidden font-display text-[18vw] leading-[0.85] font-extrabold uppercase md:text-[11vw]">
        <motion.span
          className="text-grain-flat inline-block"
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          {children}
        </motion.span>
      </h2>
    </div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}
