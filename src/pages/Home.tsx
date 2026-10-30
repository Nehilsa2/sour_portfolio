import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { profile, stats } from "../data";
import { BigTitle, Reveal, Sparkle, ease } from "../components/ui";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const letter = (l: string, i: number) => (
    <motion.span
      key={i}
      className="text-grain inline-block"
      initial={{ y: "35%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 + i * 0.07, duration: 1, ease }}
    >
      {l}
    </motion.span>
  );

  return (
    <section ref={ref} id="home" className="bg-stage relative flex min-h-svh items-center overflow-hidden">
      <div className="relative mx-auto w-full max-w-[1600px] px-4 pt-28 pb-16 md:px-10 md:pt-24">
        <motion.h1
          style={{ y: titleY, opacity: fade }}
          aria-label={`Portfolio ${profile.year}`}
          className="flex items-start justify-center font-display text-[24vw] leading-[0.8] font-extrabold uppercase select-none 2xl:text-[380px]"
        >
          {"PORTFOL".split("").map(letter)}
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mx-[0.4vw] mt-[0.6vw] flex flex-col font-body text-[2.4vw] leading-[1.05] font-extralight text-white/80 2xl:text-[38px]"
          >
            {profile.year.split("").map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </motion.span>
          {"IO".split("").map((l, i) => letter(l, i + 7))}
        </motion.h1>

        <div className="relative z-10 mt-8 flex flex-col gap-10 md:-mt-[12vw] md:flex-row md:items-start md:justify-between 2xl:-mt-[190px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease }}
            className="md:pl-[2vw]"
          >
            <p className="-mb-2 font-script text-5xl text-white md:text-[5.2vw] md:leading-none 2xl:text-[80px]">
              Hello, I'm
            </p>
            <p className="font-name text-6xl leading-[0.95] font-bold uppercase md:text-[5.6vw] 2xl:text-[88px]">
              {profile.firstName}
              <br />
              {profile.lastName}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1, ease }}
            className="flex items-center gap-5 md:mt-[4vw] md:mr-[5vw]"
          >
            <span className="relative grid size-16 shrink-0 place-items-center rounded-full border border-white/80 md:size-[4.8vw] 2xl:size-[72px]">
              <Sparkle className="size-4 text-white md:size-[1.2vw] 2xl:size-5" />
              <span className="animate-spin-slow absolute inset-[-6px] rounded-full border border-dashed border-brand/40" />
            </span>
            <p className="font-body text-base leading-snug font-extralight text-white/85 md:text-[1.35vw] 2xl:text-xl">
              {profile.tagline[0]}
              <br />
              {profile.tagline[1]}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-body text-[10px] uppercase tracking-[0.4em] text-white/50 md:flex"
      >
        Scroll
        <span className="h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            className="block h-1/2 w-full bg-brand"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function About() {
  return (
    <section id="about" className="bg-stage-alt relative overflow-hidden py-24 md:min-h-svh md:py-0">
      {/* Decorative sphere + ring from the About slide */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className="pointer-events-none absolute -top-[22vw] -left-[18vw] size-[90vw] md:-top-[6vw] md:-left-[6vw] md:size-[50vw]"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_65%_35%,#5a1f1f_0%,#2a0d0d_40%,#120606_70%)] opacity-90" />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <img
            src="/sourabh.webp"
            alt={`${profile.firstName} ${profile.lastName}`}
            className="size-full object-cover object-[60%_30%]"
          />
          <div className="absolute inset-0 bg-brand-950/35 mix-blend-multiply" />
          {/* Darken the lower part so the stats stay readable over the photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85" />
        </div>
        <div className="absolute inset-0 rounded-full bg-(image:--noise) opacity-30 mix-blend-overlay" />
        <div className="absolute inset-[-1.5vw] translate-x-[-1.5vw] rounded-full border-2 border-brand-600/90" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-5 md:min-h-svh md:grid-cols-2 md:items-end md:px-10 md:pb-[8vh]">
        <div className="order-2 mt-[40vw] md:order-1 md:mt-0 md:pl-[6vw]">
          {stats.map((s, i) => (
            <Reveal key={s.label.join(" ")} delay={i * 0.12}>
              <div
                className={`flex items-center gap-10 py-3 ${
                  i < stats.length - 1 ? "border-b border-white/30" : ""
                } max-w-md`}
              >
                <span className="text-grain-flat w-40 font-display text-7xl leading-none font-bold md:text-[5.5vw] 2xl:text-[88px]">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="font-body text-lg leading-tight font-light tracking-[0.12em] text-white/85">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="order-1 md:order-2 md:self-center md:pt-[12vh]">
          <BigTitle>About Me</BigTitle>
          <Reveal delay={0.2}>
            <h3 className="mt-6 font-body text-xl font-medium uppercase md:text-2xl">{profile.role}</h3>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 max-w-2xl text-justify font-body text-base leading-relaxed font-extralight text-white/85 md:text-lg">
              {profile.about}
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/portfolio"
                className="rounded-full bg-brand px-8 py-3 font-body text-xs font-medium uppercase tracking-[0.25em] text-black transition hover:bg-white"
              >
                View Work
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-white/40 px-8 py-3 font-body text-xs uppercase tracking-[0.25em] transition hover:border-brand hover:text-brand"
              >
                Services
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No backend: open the visitor's mail client with the message prefilled
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full border-b border-white/25 bg-transparent py-4 font-body font-light text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand";

  return (
    <section id="contact" className="bg-stage relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:grid-cols-2 md:px-10">
        <div>
          <BigTitle kicker="Got a project?">Let's Talk</BigTitle>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md font-body text-lg font-extralight text-white/80">
              Commercials, films, OTT or social — send the footage, I'll bring the impact.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-12 space-y-6">
              {[
                { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
                { k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
                { k: "Based in", v: profile.location },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="font-body text-xs uppercase tracking-[0.35em] text-brand">{item.k}</dt>
                  <dd className="mt-1 font-name text-2xl md:text-3xl">
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-brand">
                        {item.v}
                      </a>
                    ) : (
                      item.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="md:pt-[6vw]">
          <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur md:p-10">
            <input
              required
              maxLength={80}
              placeholder="Your name"
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              maxLength={120}
              placeholder="Your email"
              className={field}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              required
              rows={5}
              maxLength={2000}
              placeholder="Tell me about your project"
              className={`${field} resize-none`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button
              type="submit"
              className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-brand py-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-black transition hover:bg-white"
            >
              Send Message
              <Sparkle className="size-3 transition-transform duration-500 group-hover:rotate-180" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Contact />
    </main>
  );
}
