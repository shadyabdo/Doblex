import { useEffect, useState, type ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import { CATEGORIES, CONTACT, LOGO_URL, SOCIALS } from "../data/projects";
import {
  ArrowIcon,
  BlogIcon,
  CloseIcon,
  CodeIcon,
  FilmIcon,
  HomeIcon,
  MailIcon,
  MegaphoneIcon,
  MenuIcon,
  PenIcon,
  SOCIAL_ICONS,
} from "./icons";

interface IconProps {
  className?: string;
}

const SHORT: Record<string, { ar: string; en: string }> = {
  websites: { ar: "المواقع", en: "Web" },
  graphic: { ar: "الجرافيك", en: "Design" },
  video: { ar: "الفيديو", en: "Film" },
  marketing: { ar: "التسويق", en: "Growth" },
};

const CATEGORY_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  websites: CodeIcon,
  graphic: PenIcon,
  video: FilmIcon,
  marketing: MegaphoneIcon,
};

/** هيدر عائم على شكل كبسولة منفصلة عن حافة الصفحة */
export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    {
      to: "/",
      num: "00",
      label: t(T.navHome),
      color: "#0B7C74",
      Icon: HomeIcon,
      end: true,
    },
    ...CATEGORIES.map((c) => ({
      to: `/work/${c.id}`,
      num: c.num,
      label: SHORT[c.id][lang],
      color: c.color,
      Icon: CATEGORY_ICONS[c.id],
      end: false,
    })),
    {
      to: "/blog",
      num: "05",
      label: lang === "ar" ? "المدونة" : "Blog",
      color: "#E8590C",
      Icon: BlogIcon,
      end: false,
    },
  ];

  const isActive = (to: string, end: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <>
      {/* ================= الشريط العائم ================= */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border bg-paper/90 px-2 py-1.5 backdrop-blur-md transition-all duration-300 sm:px-3 sm:py-2 ${
            scrolled
              ? "border-line shadow-[0_18px_50px_rgba(13,31,51,0.16)]"
              : "border-ink/10 shadow-[0_10px_34px_rgba(13,31,51,0.08)]"
          }`}
        >
          {/* اللوجو */}
          <Link to="/" className="group flex shrink-0 items-center gap-2.5 ps-1">
            <span className="relative block h-10 w-10 shrink-0">
              <img
                src={LOGO_URL}
                alt="Duplex logo"
                className="h-full w-full rounded-full border border-line object-cover shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-paper bg-flame" />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="font-display block text-base font-extrabold text-ink">
                {t(T.brand)}
              </span>
              <span className="mt-0.5 block text-[9px] font-black tracking-[0.32em] text-teal">
                DUPLEX®
              </span>
            </span>
          </Link>

          {/* الروابط — مرقمة وبأيقونات */}
          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
            {links.map((l) => {
              const active = isActive(l.to, l.end);
              const Ic = l.Icon;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  title={l.label}
                  className={`group relative flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[12.5px] font-bold whitespace-nowrap transition-all duration-200 xl:px-3 xl:text-[13px] ${
                    active
                      ? "bg-surface text-ink shadow-sm"
                      : "text-muted hover:bg-surface/70 hover:text-ink"
                  }`}
                >
                  <span
                    className="font-display text-[9px] font-black"
                    style={{ color: l.color }}
                    dir="ltr"
                  >
                    {l.num}
                  </span>
                  <Ic className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-[2.5px] origin-center rounded-full transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                    }`}
                    style={{ background: l.color }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* الكتلة اليمنى */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* مبدّل اللغة */}
            <div
              className="relative flex items-center rounded-full border border-line bg-surface p-0.5 text-[11px] font-extrabold"
              role="group"
              aria-label="Language"
            >
              <span
                className={`absolute top-0.5 bottom-0.5 w-[30px] rounded-full bg-teal transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  lang === "ar" ? "start-0.5" : "start-[calc(100%-32px)]"
                }`}
                aria-hidden
              />
              <button
                onClick={() => setLang("ar")}
                className={`relative z-10 w-[30px] py-1 text-center transition-colors duration-200 ${
                  lang === "ar" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                ع
              </button>
              <button
                onClick={() => setLang("en")}
                className={`relative z-10 w-[30px] py-1 text-center transition-colors duration-200 ${
                  lang === "en" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_22px_rgba(232,89,12,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep md:flex"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {t(T.navStart)}
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-teal hover:text-teal lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= قائمة الموبايل — شاشة كاملة ================= */}
      <div
        className={`fixed inset-0 z-[80] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="blueprint-dark absolute inset-0 bg-ink" />
        <div className="relative flex h-full flex-col px-6 pt-5 pb-8 text-paper">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="Duplex"
                className="h-9 w-9 rounded-full border border-paper/20 object-cover"
              />
              <span className="font-display text-lg font-extrabold">{t(T.brand)}</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t(T.close)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 transition-all duration-200 hover:rotate-90 hover:border-flame hover:bg-flame"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav key={String(open)} className="flex flex-1 flex-col justify-center" aria-label="Mobile">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="menu-in group flex items-center justify-between border-b border-paper/10 py-4"
                style={{ animationDelay: open ? `${140 + i * 60}ms` : "0ms" }}
              >
                <span className="flex items-center gap-4">
                  <span
                    className="font-display w-8 text-sm font-black"
                    style={{ color: l.color }}
                    dir="ltr"
                  >
                    {l.num}
                  </span>
                  <span className="font-display text-3xl font-extrabold transition-colors duration-200 group-hover:text-flame sm:text-4xl">
                    {l.label}
                  </span>
                </span>
                <ArrowIcon className="rtl-flip h-5 w-5 text-paper/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-flame" />
              </Link>
            ))}
          </nav>

          <div className="menu-in flex flex-wrap items-center justify-between gap-4" style={{ animationDelay: open ? "560ms" : "0ms" }}>
            <div className="flex flex-col gap-1.5 text-sm text-paper/70">
              <a href={`mailto:${CONTACT.email}`} dir="ltr" className="text-start transition-colors hover:text-teal">
                {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} dir="ltr" className="text-start transition-colors hover:text-teal">
                {CONTACT.phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-200 hover:border-flame hover:bg-flame hover:text-white"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
