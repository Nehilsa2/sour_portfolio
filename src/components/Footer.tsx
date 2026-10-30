import { Link } from "react-router-dom";
import { profile } from "../data";

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
    </footer>
  );
}
