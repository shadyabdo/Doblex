import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import { CATEGORIES, CONTACT, LOGO_URL, SOCIALS } from "../data/projects";
import {
  CopyIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  SOCIAL_ICONS,
  WhatsAppIcon,
} from "./icons";
import { CountUp, Reveal, Spark } from "../lib/ui";

export default function Footer() {
  const { lang, t } = useLang();
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
      {/* ------------ CTA band ------------ */}
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
            <h2 className="font-display max-w-3xl text-4xl leading-[1.15] font-extrabold md:text-6xl">
              {t(T.ctaTitle)}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/75">
              {t(T.ctaSub)}
            </p>
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
                  copied
                    ? "bg-jade text-white"
                    : "text-paper/80 hover:bg-paper/10 hover:text-paper"
                }`}
              >
                <CopyIcon className="h-4 w-4" />
                {copied ? t(T.ctaCopied) : `${t(T.ctaCopy)} — ${CONTACT.email}`}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------ Footer body ------------ */}
      <div className="bg-ink text-paper">
        <div className="container-x grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <span className="block h-12 w-12 overflow-hidden rounded-xl border border-paper/15">
                <img src={LOGO_URL} alt="Duplex" className="h-full w-full object-cover" />
              </span>
              <span className="leading-none">
                <span className="font-display block text-2xl font-extrabold">
                  {t(T.brand)}
                </span>
                <span className="mt-1 block text-[10px] font-bold tracking-[0.3em] text-teal uppercase">
                  DUPLEX STUDIO
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-paper/65">
              {t(T.footerAbout)}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-all duration-200 hover:-translate-y-1 hover:border-flame hover:bg-flame hover:text-white"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
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
              {CATEGORIES.map((c) => (
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
                <Link
                  to="/blog"
                  className="group flex items-center gap-2.5 text-paper/75 transition-colors hover:text-flame"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-flame transition-transform duration-200 group-hover:scale-150" />
                  {lang === "ar" ? "المدونة" : "Blog"}
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
                <a
                  href={`mailto:${CONTACT.email}`}
                  dir="ltr"
                  className="flex items-center justify-end gap-2.5 transition-colors hover:text-teal"
                >
                  {CONTACT.email}
                  <MailIcon className="h-4 w-4 text-teal" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="flex items-center justify-end gap-2.5 transition-colors hover:text-teal"
                >
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
