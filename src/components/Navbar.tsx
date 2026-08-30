import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import { CATEGORIES, CONTACT, LOGO_URL } from "../data/projects";
import { CloseIcon, MailIcon, MenuIcon } from "./icons";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { to: "/", label: t(T.navHome), end: true },
    ...CATEGORIES.map((c) => ({ to: `/work/${c.id}`, label: t(c.name), end: false })),
  ];

  const isActive = (to: string, end: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-paper/90 shadow-[0_8px_30px_rgba(13,31,51,0.07)] backdrop-blur-md"
          : "border-transparent bg-paper/60 backdrop-blur-sm"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <span className="block h-11 w-11 overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <img src={LOGO_URL} alt="Duplex logo" className="h-full w-full object-cover" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-xl font-extrabold text-ink">
              {t(T.brand)}
            </span>
            <span className="mt-1 block text-[10px] font-bold tracking-[0.28em] text-teal uppercase">
              {lang === "ar" ? "DUPLEX STUDIO" : "استوديو دوبليكس"}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                isActive(l.to, l.end)
                  ? "text-teal"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full bg-flame transition-transform duration-300 ${
                  isActive(l.to, l.end) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div
            className="flex items-center rounded-full border border-line bg-surface p-1 text-xs font-bold"
            role="group"
            aria-label="Language"
          >
            <button
              onClick={() => setLang("ar")}
              className={`rounded-full px-2.5 py-1 transition-all duration-200 ${
                lang === "ar" ? "bg-teal text-white shadow" : "text-muted hover:text-ink"
              }`}
            >
              ع
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 transition-all duration-200 ${
                lang === "en" ? "bg-teal text-white shadow" : "text-muted hover:text-ink"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={`mailto:${CONTACT.email}`}
            className="hidden items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(232,89,12,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep md:flex"
          >
            <MailIcon className="h-4 w-4" />
            {t(T.navStart)}
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-line bg-surface p-2 text-ink transition-colors hover:border-teal hover:text-teal lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-line bg-paper transition-all duration-300 lg:hidden ${
          open ? "max-h-[420px] border-t" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={{ transitionDelay: `${i * 30}ms` }}
              className={`rounded-lg px-4 py-3 text-base font-bold transition-colors ${
                isActive(l.to, l.end)
                  ? "bg-teal-tint text-teal-deep"
                  : "text-ink-soft hover:bg-surface"
              }`}
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-flame px-5 py-3 text-sm font-bold text-white"
          >
            <MailIcon className="h-4 w-4" />
            {t(T.navStart)}
          </a>
        </nav>
      </div>
    </header>
  );
}
