import { useEffect, useState, type ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { T, CONTACT, LOGO_URL, SOCIALS } from "../data";
import { useContent } from "../lib/content";
import { CountUp, Reveal } from "../lib/ui";
import {
  ArrowIcon,
  BlogIcon,
  CloseIcon,
  CodeIcon,
  CopyIcon,
  FilmIcon,
  HomeIcon,
  MailIcon,
  MegaphoneIcon,
  MenuIcon,
  PenIcon,
  PhoneIcon,
  PinIcon,
  SOCIAL_ICONS,
  Spark,
  WhatsAppIcon,
} from "./icons";

interface IconProps {
  className?: string;
}

/** أيقونات تُوزع على الأقسام بالتناوب لأن معرّفاتها ديناميكية من الداشبورد */
const CATEGORY_ICONS: ((p: IconProps) => ReactElement)[] = [
  CodeIcon,
  PenIcon,
  FilmIcon,
  MegaphoneIcon,
];

/* ============================ Navbar ============================ */
export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { categories } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
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
    { to: "/", num: "00", label: t(T.navHome), color: "#0B7C74", Icon: HomeIcon, end: true },
    ...categories.map((c, i) => ({
      to: `/work/${c.id}`,
      num: c.num,
      label: t(c.name),
      color: c.color,
      Icon: CATEGORY_ICONS[i % CATEGORY_ICONS.length],
      end: false,
    })),
    {
      to: "/blog",
      num: String(categories.length + 1).padStart(2, "0"),
      label: t(T.navBlog),
      color: "#E8590C",
      Icon: BlogIcon,
      end: false,
    },
  ];

  const isActive = (to: string, end: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <>
      {/* شريط عائم على شكل كبسولة */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-2 rounded-full border bg-paper/90 px-2 py-1.5 backdrop-blur-md transition-all duration-300 sm:px-3 sm:py-2 ${
            scrolled
              ? "border-line shadow-[0_18px_50px_rgba(13,31,51,0.16)]"
              : "border-ink/10 shadow-[0_10px_34px_rgba(13,31,51,0.08)]"
          }`}
        >
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
              <span className="mt-0.5 block text-[9px] font-black tracking-[0.32em] text-teal" dir="ltr">
                DUPLEX®
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
            {links.map((l) => {
              const active = isActive(l.to, l.end);
              const Ic = l.Icon;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  title={l.label}
                  className={`group flex items-center gap-1 rounded-full px-2 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-all duration-200 sm:px-2.5 sm:py-2 sm:text-xs sm:gap-1.5 xl:px-3 ${
                    active ? "bg-ink text-paper shadow-md" : "text-ink-soft hover:bg-surface hover:text-ink"
                  }`}
                >
                  <Ic
                    className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-4 sm:w-4 ${
                      active ? "text-flame" : ""
                    }`}
                  />
                  <span className="hidden xl:inline">{l.label}</span>
                  <span
                    className="text-[8px] font-semibold tracking-wider tabular-nums sm:text-[9px]"
                    style={{ color: active ? l.color : undefined }}
                  >
                    {l.num}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* مبدّل اللغة بمؤشر منزلق */}
            <div
              className="relative flex rounded-full border border-line bg-surface p-0.5 text-[11px] font-semibold sm:p-1 sm:text-xs"
              role="group"
              aria-label="Language"
            >
              <span
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-0.15rem)] rounded-full bg-teal shadow transition-all duration-300 ease-out sm:top-1 sm:bottom-1 sm:w-[calc(50%-0.25rem)] ${
                  lang === "ar" ? "start-0.5 sm:start-1" : "start-[calc(50%+0.05rem)]"
                }`}
                aria-hidden
              />
              <button
                onClick={() => setLang("ar")}
                className={`relative z-10 w-7 rounded-full py-1 transition-colors duration-300 sm:w-9 sm:py-1.5 ${
                  lang === "ar" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                ع
              </button>
              <button
                onClick={() => setLang("en")}
                className={`relative z-10 w-7 rounded-full py-1 transition-colors duration-300 sm:w-9 sm:py-1.5 ${
                  lang === "en" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden items-center gap-1.5 rounded-full bg-flame px-3 py-2 text-[11px] font-semibold text-white shadow-[0_6px_20px_rgba(232,89,12,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep md:flex md:px-4 md:py-2.5 md:text-xs"
            >
              <MailIcon className="h-3.5 w-3.5" />
              {t(T.navStart)}
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-line bg-surface p-2 text-ink transition-colors hover:border-teal hover:text-teal sm:p-2.5 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <CloseIcon className="h-4 w-4 sm:h-5 sm:w-5" /> : <MenuIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الموبايل — شاشة كاملة */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-ink text-paper lg:hidden">
          <div className="blueprint-dark pointer-events-none absolute inset-0" aria-hidden />
          <nav className="container-x relative mt-28 flex flex-1 flex-col gap-1 overflow-y-auto pb-8" aria-label="Mobile">
            {links.map((l, i) => {
              const Ic = l.Icon;
              const active = isActive(l.to, l.end);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`menu-in group flex items-center gap-4 rounded-xl px-4 py-4 transition-colors ${
                    active ? "bg-paper/10" : "hover:bg-paper/5"
                  }`}
                  style={{ animationDelay: `${80 + i * 55}ms` }}
                >
                  <span className="text-xs font-black tracking-widest tabular-nums" style={{ color: l.color }}>
                    {l.num}
                  </span>
                  <Ic className="h-5 w-5 text-paper/60 transition-colors group-hover:text-flame" />
                  <span className="font-display text-2xl font-extrabold">{l.label}</span>
                  <ArrowIcon className="rtl-flip ms-auto h-5 w-5 text-paper/25 transition-all group-hover:translate-x-1 group-hover:text-flame" />
                </Link>
              );
            })}

            <div className="menu-in mt-auto space-y-4 border-t border-paper/10 pt-6" style={{ animationDelay: "500ms" }}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center justify-center gap-2.5 rounded-full bg-flame px-6 py-3.5 text-sm font-bold text-white"
              >
                <MailIcon className="h-4 w-4" />
                {t(T.navStart)}
              </a>
              <div className="flex items-center justify-between text-paper/60">
                <span dir="ltr" className="text-xs font-semibold">{CONTACT.email}</span>
                <span className="flex gap-2.5">
                  {SOCIALS.map((s) => {
                    const Ic = SOCIAL_ICONS[s.id];
                    return (
                      <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-flame">
                        {Ic && <Ic className="h-4 w-4" />}
                      </a>
                    );
                  })}
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/* ============================ Footer ============================ */
export function Footer() {
  const { lang, t } = useLang();
  const { categories } = useContent();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <footer>
      {/* CTA */}
      <section className="relative overflow-hidden bg-teal-deep text-paper">
        <div className="blueprint-dark absolute inset-0" aria-hidden />
        <div
          className="font-display pointer-events-none absolute -bottom-8 start-0 select-none text-[22vw] leading-none font-black whitespace-nowrap opacity-[0.06]"
          aria-hidden
        >
          DUPLEX
        </div>
        <div className="container-x relative py-20 md:py-28">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-teal-tint/80 uppercase">
              <Spark className="h-4 w-4 text-flame" />
              {t(T.navStart)}
            </p>
            <h2 className="font-display max-w-3xl text-2xl leading-[1.15] font-extrabold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {t(T.ctaTitle)}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/75 sm:mt-5 sm:text-base md:text-lg">{t(T.ctaSub)}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-2.5 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep"
              >
                <MailIcon className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-6" />
                {t(T.ctaMail)}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-full border border-paper/30 px-7 py-3.5 text-sm font-bold text-paper transition-all duration-200 hover:border-paper hover:bg-paper/10"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t(T.ctaWa)}
              </a>
              <button
                onClick={copyEmail}
                className={`flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition-all duration-200 ${
                  copied ? "bg-jade text-white" : "text-paper/80 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <CopyIcon className="h-4 w-4" />
                {copied ? t(T.ctaCopied) : `${t(T.ctaCopy)} — ${CONTACT.email}`}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* الجسم */}
      <div className="bg-ink text-paper">
        <div className="container-x grid gap-10 py-12 sm:gap-12 sm:py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <span className="block h-11 w-11 overflow-hidden rounded-xl border border-paper/15 sm:h-12 sm:w-12">
                <img src={LOGO_URL} alt="Duplex" className="h-full w-full object-cover" />
              </span>
              <span className="leading-none">
                <span className="font-display block text-xl font-extrabold sm:text-2xl">{t(T.brand)}</span>
                <span className="mt-1 block text-[9px] font-bold tracking-[0.3em] text-teal uppercase sm:text-[10px]" dir="ltr">
                  DUPLEX® STUDIO
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/65 sm:mt-5 sm:text-base">{t(T.footerAbout)}</p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Ic = SOCIAL_ICONS[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-200 hover:-translate-y-1 hover:border-flame hover:bg-flame hover:text-white"
                  >
                    {Ic && <Ic className="h-4 w-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-display mb-5 text-sm font-extrabold tracking-[0.18em] text-paper/50 uppercase">
              {t(T.footerDeps)}
            </h3>
            <ul className="space-y-3">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/work/${c.id}`}
                    className="group flex items-center gap-2.5 text-paper/75 transition-colors hover:text-flame"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-transform duration-200 group-hover:scale-150"
                      style={{ background: c.color }}
                    />
                    {t(c.name)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="group flex items-center gap-2.5 text-paper/75 transition-colors hover:text-flame">
                  <span className="h-1.5 w-1.5 rounded-full bg-flame transition-transform duration-200 group-hover:scale-150" />
                  {t(T.navBlog)}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-display mb-5 text-sm font-extrabold tracking-[0.18em] text-paper/50 uppercase">
              {t(T.footerContact)}
            </h3>
            <ul className="space-y-3.5 text-paper/75">
              <li>
                <a href={`mailto:${CONTACT.email}`} dir="ltr" className="flex items-center justify-end gap-2.5 transition-colors hover:text-teal">
                  {CONTACT.email}
                  <MailIcon className="h-4 w-4 text-teal" />
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} dir="ltr" className="flex items-center justify-end gap-2.5 transition-colors hover:text-teal">
                  {CONTACT.phone}
                  <PhoneIcon className="h-4 w-4 text-teal" />
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <PinIcon className="h-4 w-4 text-teal" />
                {t(CONTACT.address)}
              </li>
              <li className="pt-1 text-sm text-paper/45">{t(T.footerHours)}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/10">
          <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-paper/45 md:flex-row">
            <p dir="ltr" className="flex items-center gap-2">
              © 2026 Duplex Studio. {t(T.footerRights)}
            </p>
            <p className="flex items-center gap-2">
              <Spark className="h-3.5 w-3.5 text-flame" />
              {t(T.footerMade)}
              <span className="rounded-full bg-paper/10 px-2.5 py-0.5 text-xs font-bold text-teal">
                <CountUp value={48} suffix="+" duration={1000} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
