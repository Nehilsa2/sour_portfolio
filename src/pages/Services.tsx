import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { process, services, tools } from "../data";
import { BigTitle, Reveal, Sparkle, ease } from "../components/ui";

export default function Services() {
  return (
    <main>
      <section className="bg-stage relative overflow-hidden pt-36 pb-24 md:pt-44">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <BigTitle kicker="Post Production">Services</BigTitle>
            <Reveal delay={0.2}>
              <p className="max-w-sm font-body text-base font-extralight text-white/70 md:mb-6 md:text-right">
                Everything after the shoot — from the first cut to the final master.
              </p>
            </Reveal>
          </div>

          <ul className="mt-20 border-t border-white/15">
            {services.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease }}
                className="group relative border-b border-white/15"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-brand-950 via-brand-950/60 to-transparent transition-transform duration-500 group-hover:scale-y-100" />
                <div className="relative grid gap-4 py-10 md:grid-cols-[120px_1fr_1.2fr] md:items-center md:gap-10 md:px-4">
                  <span className="text-grain-flat font-display text-6xl leading-none font-extrabold md:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-name text-3xl font-semibold uppercase transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                    {s.title}
                  </h3>
                  <div>
                    <p className="font-body text-base leading-relaxed font-extralight text-white/75">{s.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-white/15 px-3 py-1 font-body text-[11px] uppercase tracking-[0.2em] text-white/60"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-stage-alt relative overflow-hidden py-28 md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <BigTitle kicker="How I work">Process</BigTitle>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-brand/50">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs uppercase tracking-[0.35em] text-brand">Step {i + 1}</span>
                    <Sparkle className="size-4 text-white/50" />
                  </div>
                  <h3 className="mt-10 font-display text-5xl font-bold uppercase">{p.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed font-extralight text-white/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-20">
              <p className="font-body text-xs uppercase tracking-[0.5em] text-white/60">Toolkit</p>
              <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                {tools.map((t) => (
                  <li key={t} className="font-name text-2xl uppercase text-white/40 transition-colors hover:text-brand md:text-4xl">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-stage relative overflow-hidden py-28 text-center md:py-40">
        <Reveal>
          <p className="font-script text-5xl md:text-7xl">Ready to start?</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            to="/#contact"
            className="text-grain-flat mt-4 inline-block font-display text-[16vw] leading-[0.85] font-extrabold uppercase transition-opacity hover:opacity-80 md:text-[10vw]"
          >
            Let's Create
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
