import { useEffect, useState, type ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../i18n";
import { T, CONTACT, LOGO_URL, SOCIALS } from "../data";
import { useContent } from "../lib/content";
import { CountUp, Reveal } from "../lib/ui";
import {
  ArrowIcon,
  CloseIcon,
  CopyIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  SOCIAL_ICONS,
  Spark,
  WhatsAppIcon,
} from "./icons";

/* ============================ Navbar - Clean Minimal Design ============================ */
export function Navbar() {
  const { lang, setLang, t } = useLang();
  const { categories } = useContent();
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { to: "/", label: t(T.navHome), end: true },
    ...categories.map((c) => ({
      to: `/work/${c.id}`,
      label: t(c.name),
      end: false,
    })),
    {
      to: "/blog",
      label: t(T.navBlog),
      end: false,
    },
  ];

  const isActive = (to: string, end: boolean) =>
    end ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <>
      {/* هيدر بسيط ونظيف */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-paper transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* اللوجو */}
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span className="relative block h-10 w-10 shrink-0 lg:h-12 lg:w-12">
              <img
                src={LOGO_URL}
                alt="Duplex logo"
                className="h-full w-full rounded-xl border border-line object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </span>
            <span className="hidden leading-none sm:block">
              <span className="font-display block text-lg font-extrabold text-ink lg:text-xl">
                {t(T.brand)}
              </span>
              <span className="mt-0.5 block text-[10px] font-bold tracking-[0.3em] text-teal lg:text-xs" dir="ltr">
                DUPLEX® STUDIO
              </span>
            </span>
          </Link>

          {/* روابط التنقل - نصية بسيطة مع tooltip */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => {
              const active = isActive(l.to, l.end);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`group relative max-w-[120px] xl:max-w-[180px] rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-teal text-white shadow-sm"
                      : "text-ink-soft hover:bg-surface hover:text-ink"
                  }`}
                >
                  <span className="truncate block">{l.label}</span>
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-flame" />
                  )}
                  {/* Tooltip - يظهر تحت اللينك */}
                  <div className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:mt-3">
                    <div className="whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-paper shadow-xl lg:px-4 lg:py-2.5 lg:text-sm">
                      {l.label}
                      <div className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-ink"></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* الإجراءات */}
          <div className="flex items-center gap-3">
            {/* مبدّل اللغة */}
            <div
              className="relative flex rounded-lg border border-line bg-surface p-1 text-xs font-bold"
              role="group"
              aria-label="Language"
            >
              <span
                className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-md bg-teal shadow-sm transition-all duration-300 ${
                  lang === "ar" ? "start-1" : "start-[calc(50%+0.125rem)]"
                }`}
                aria-hidden
              />
              <button
                onClick={() => setLang("ar")}
                className={`relative z-10 w-8 rounded-md py-1.5 transition-colors duration-300 ${
                  lang === "ar" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                ع
              </button>
              <button
                onClick={() => setLang("en")}
                className={`relative z-10 w-8 rounded-md py-1.5 transition-colors duration-300 ${
                  lang === "en" ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            {/* زر CTA */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden items-center gap-2 rounded-lg bg-flame px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep hover:shadow-lg md:flex"
            >
              <MailIcon className="h-4 w-4" />
              <span className="hidden lg:inline">{t(T.navStart)}</span>
            </a>

            {/* زر القائمة للموبايل */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-line bg-surface p-2.5 text-ink transition-colors hover:border-teal hover:text-teal lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
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
                  <span className="font-display text-xl font-bold truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">{l.label}</span>
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
