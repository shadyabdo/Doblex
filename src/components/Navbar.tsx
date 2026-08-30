import { useEffect, useState, type ReactElement } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import { CATEGORIES, CONTACT, LOGO_URL, SOCIALS } from "../data/projects";
import type { CategoryId } from "../data/types";
import {
  BlogIcon,
  CloseIcon,
  CodeIcon,
  FilmIcon,
  HomeIcon,
  MailIcon,
  MegaphoneIcon,
  MenuIcon,
  PenIcon,
  PhoneIcon,
  SOCIAL_ICONS,
} from "./icons";
import { Spark } from "../lib/ui";

/** أيقونة + اسم مختصر لكل رابط — يمنع تكدّس الكلام */
const NAV_META: Record<string, { icon: (p: { className?: string }) => ReactElement; short: { ar: string; en: string } }> = {
  home: { icon: HomeIcon, short: { ar: "الرئيسية", en: "Home" } },
  websites: { icon: CodeIcon, short: { ar: "المواقع", en: "Web" } },
  graphic: { icon: PenIcon, short: { ar: "الجرافيك", en: "Design" } },
  video: { icon: FilmIcon, short: { ar: "الفيديو", en: "Video" } },
  marketing: { icon: MegaphoneIcon, short: { ar: "التسويق", en: "Marketing" } },
  blog: { icon: BlogIcon, short: { ar: "المدونة", en: "Blog" } },
};

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const links = [
    { key: "home", to: "/", full: t(T.navHome) },
    ...CATEGORIES.map((c) => ({
      key: c.id as string,
      to: `/work/${c.id}`,
      full: t(c.name),
      color: c.color,
      tint: c.tint,
    })),
    { key: "blog", to: "/blog", full: lang === "ar" ? "المدونة" : "Blog" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header>
      {/* ---------- شريط التواصل العلوي ---------- */}
      <div className="hidden border-b border-paper/10 bg-ink text-paper/75 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[11px] font-semibold">
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${CONTACT.email}`}
              dir="ltr"
              className="flex items-center gap-1.5 transition-colors hover:text-flame"
            >
              <MailIcon className="h-3 w-3 text-teal" />
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              dir="ltr"
              className="flex items-center gap-1.5 transition-colors hover:text-flame"
            >
              <PhoneIcon className="h-3 w-3 text-teal" />
              {CONTACT.phone}
            </a>
            <span className="hidden items-center gap-1.5 text-paper/50 lg:flex">
              <Spark className="h-3 w-3 text-flame" />
              {t(T.footerHours)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.id];
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame hover:text-white"
                >
                  {Icon && <Icon className="h-3 w-3" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------- الشريط الرئيسي (لاصق) ---------- */}
      <div
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-paper/92 shadow-[0_8px_30px_rgba(13,31,51,0.08)] backdrop-blur-md"
            : "border-line/60 bg-paper/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-[70px] items-center justify-between gap-3">
          {/* اللوجو */}
          <Link to="/" className="group flex min-w-0 items-center gap-2.5">
            <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <img src={LOGO_URL} alt="Duplex logo" className="h-full w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-teal to-flame" />
            </span>
            <span className="hidden min-w-0 leading-none sm:block">
              <span className="font-display block truncate text-lg font-extrabold text-ink">
                {t(T.brand)}
              </span>
              <span className="mt-1 block text-[9px] font-bold tracking-[0.28em] text-teal uppercase">
                {lang === "ar" ? "DUPLEX STUDIO" : "استوديو دوبليكس"}
              </span>
            </span>
          </Link>

          {/* روابط التنقل — أيقونة + اسم مختصر بلا التفاف */}
          <nav
            className="hidden items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 shadow-sm lg:flex"
            aria-label="Main"
          >
            {links.map((l) => {
              const meta = NAV_META[l.key];
              const Icon = meta.icon;
              const active = isActive(l.to);
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  title={l.full}
                  className={`relative flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-bold whitespace-nowrap transition-all duration-200 xl:px-3 ${
                    active
                      ? "bg-teal text-white shadow-[0_4px_14px_rgba(11,124,116,0.35)]"
                      : "text-ink-soft hover:bg-teal-tint hover:text-teal-deep"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-flame" : ""}`} />
                  <span>{meta.short[lang]}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* الإجراءات */}
          <div className="flex items-center gap-2.5">
            {/* مبدّل اللغة */}
            <div
              className="relative flex items-center rounded-full border border-line bg-surface p-1 text-xs font-bold"
              role="group"
              aria-label="Language"
            >
              <span
                className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-teal transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  lang === "ar" ? "start-1 translate-x-0" : "start-1 -translate-x-full rtl:translate-x-full"
                }`}
                aria-hidden
              />
              <button
                onClick={() => setLang("ar")}
                className={`relative z-10 w-9 rounded-full py-1.5 transition-colors duration-300 ${
                  lang === "ar" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                ع
              </button>
              <button
                onClick={() => setLang("en")}
                className={`relative z-10 w-9 rounded-full py-1.5 transition-colors duration-300 ${
                  lang === "en" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-xs font-bold whitespace-nowrap text-white shadow-[0_6px_20px_rgba(232,89,12,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep md:flex"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {t(T.navStart)}
            </a>

            {/* زر الموبايل */}
            <button
              onClick={() => setOpen((v) => !v)}
              className={`rounded-full border p-2.5 transition-all duration-200 lg:hidden ${
                open
                  ? "border-teal bg-teal text-white"
                  : "border-line bg-surface text-ink hover:border-teal hover:text-teal"
              }`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* قائمة الموبايل */}
        <div
          className={`overflow-hidden border-line bg-paper transition-all duration-300 lg:hidden ${
            open ? "max-h-[480px] border-t" : "max-h-0"
          }`}
        >
          <nav className="container-x grid grid-cols-2 gap-2 py-4" aria-label="Mobile">
            {links.map((l) => {
              const meta = NAV_META[l.key];
              const Icon = meta.icon;
              const active = isActive(l.to);
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm font-bold transition-all duration-200 ${
                    active
                      ? "border-teal bg-teal-tint text-teal-deep"
                      : "border-line bg-surface text-ink-soft hover:border-teal/50 hover:text-ink"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "text-flame" : "text-teal"}`} />
                  <span className="truncate">{meta.short[lang]}</span>
                </NavLink>
              );
            })}
            <a
              href={`mailto:${CONTACT.email}`}
              className="col-span-2 mt-1 flex items-center justify-center gap-2 rounded-xl bg-flame px-5 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(232,89,12,0.3)]"
            >
              <MailIcon className="h-4 w-4" />
              {t(T.navStart)}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
