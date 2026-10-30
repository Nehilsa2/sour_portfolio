import { Link } from "react-router-dom";
import { credit, profile } from "../data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <Link to="/" className="font-name text-xl font-bold uppercase tracking-wide">
          {profile.firstName} <span className="text-brand">{profile.lastName}</span>
        </Link>
        <ul className="flex flex-wrap gap-6">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-brand"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-body text-xs font-light text-white/40">
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.
        </p>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-[1600px] px-5 py-4 text-center font-body text-[11px] font-light uppercase tracking-[0.3em] text-white/35 md:px-10">
          Designed &amp; Developed by{" "}
          <a
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white/70 transition-colors hover:text-brand"
          >
            {credit.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
