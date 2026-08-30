import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { MARQUEE, PROCESS, STATS_LABELS, T } from "../data/translations";
import {
  CATEGORIES,
  PROJECTS,
  STATS,
  featuredProjects,
  projectsByCategory,
} from "../data/projects";
import { CountUp, Marquee, Reveal, RotatingBadge, SectionHead, Spark } from "../lib/ui";
import { ArrowIcon } from "../components/icons";
import ProjectCard from "../components/ProjectCard";

const CHARS = "DUPLEX#/<>*+";

/** تمرير ناعم لعنصر داخل الصفحة — متوافق مع HashRouter */
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** شريط مقياس متحرك داخل كونسول الهيرو */
function Meter({ value, color, delay }: { value: number; color: string; delay: number }) {
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-paper/15">
      <span
        className="block h-full rounded-full"
        style={{
          width: `${value}%`,
          background: color,
          animation: `meter-grow 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
        }}
      />
    </span>
  );
}

const METERS = [92, 88, 84, 90];

/** تأثير فكّ التشفير للعنوان اللاتيني */
function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let frame = 0;
    let raf = 0;
    const total = 44;
    const tick = () => {
      frame += 1;
      const revealed = Math.floor((frame / total) * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          s += " ";
          continue;
        }
        s += i < revealed ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <span className={className} dir="ltr">
      {out}
    </span>
  );
}

export default function Home() {
  const { lang, t } = useLang();
  const featured = featuredProjects();

  useEffect(() => {
    document.title =
      lang === "ar"
        ? "دوبليكس | Duplex — استوديو تقني متكامل"
        : "Duplex — Full-stack Tech Studio";
  }, [lang]);

  return (
    <>
      {/* ============================ Opening ============================ */}
      <section className="relative flex overflow-hidden">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="absolute -top-24 end-[-8%] h-[420px] w-[420px] rounded-full bg-teal/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute top-72 start-[-10%] h-[360px] w-[360px] rounded-full bg-flame/10 blur-3xl"
          aria-hidden
        />
        <p
          className="font-display pointer-events-none absolute -bottom-10 start-0 translate-y-6 text-[24vw] leading-none font-black text-ghost select-none lg:text-[17rem]"
          aria-hidden
        >
          DUPLEX
        </p>

        <div className="container-x relative grid flex-1 items-center gap-16 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
          {/* ------------- Copy ------------- */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft shadow-sm">
                <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
                {t(T.heroAvailable)}
              </span>
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal uppercase">
                <span className="h-px w-10 bg-flame" />
                {t(T.heroKicker)}
              </p>
            </div>

            <h1 className="font-display mt-7 text-[2.7rem] leading-[1.08] font-black text-ink sm:text-6xl xl:text-[4.7rem]">
              <span className="mask-line" style={{ "--line-delay": "80ms" } as React.CSSProperties}>
                <span>{t(T.heroL1)}</span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "210ms" } as React.CSSProperties}>
                <span className="text-teal">{t(T.heroL2)}</span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "340ms" } as React.CSSProperties}>
                <span className="flex items-end gap-3">
                  <span className="relative inline-block">
                    {t(T.heroL3)}
                    <svg
                      className="absolute -bottom-2.5 start-0 h-3 w-full text-flame"
                      viewBox="0 0 220 12"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M3 9c42-6 82-6.5 110-3.5 30 3.2 68 2.5 104-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <Spark className="mb-2 inline h-7 w-7 shrink-0 text-flame sm:h-9 sm:w-9" />
                </span>
              </span>
            </h1>

            <p className="mt-5 overflow-hidden">
              <ScrambleText
                text="DUPLEX® DIGITAL STUDIO"
                className="font-display inline-block text-lg font-black tracking-[0.3em] text-ink/25 md:text-xl"
              />
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {t(T.heroP)}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToId("work")}
                className="group flex items-center gap-2.5 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(232,89,12,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep"
              >
                {t(T.heroCta1)}
                <ArrowIcon className="rtl-flip h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToId("departments")}
                className="rounded-full border-2 border-ink/15 px-7 py-3.5 text-sm font-bold text-ink transition-all duration-200 hover:border-teal hover:text-teal"
              >
                {t(T.heroCta2)}
              </button>
            </div>

            {/* Typographic stats */}
            <div className="mt-12 flex flex-wrap items-stretch">
              {STATS.slice(0, 3).map((v, i) => (
                <div
                  key={i}
                  className={`py-1 pe-7 md:pe-9 ${i > 0 ? "border-s-2 border-line ps-7 md:ps-9" : ""}`}
                >
                  <p className="font-display text-4xl font-black text-ink md:text-5xl">
                    <CountUp value={v} suffix={i === 0 ? "+" : ""} />
                  </p>
                  <p className="mt-1.5 text-xs font-bold text-muted">
                    {STATS_LABELS[lang][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ------------- Studio console ------------- */}
          <div className="relative lg:col-span-5">
            <Reveal delay={150}>
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl border border-ink/25 bg-ink text-paper shadow-[0_44px_90px_rgba(13,31,51,0.4)]">
                  <div className="blueprint-dark absolute inset-0" aria-hidden />
                  <div
                    className="absolute -top-16 -end-16 h-48 w-48 rounded-full bg-teal/25 blur-3xl"
                    aria-hidden
                  />

                  <div className="relative p-6 md:p-7">
                    {/* Console header */}
                    <div className="flex items-center justify-between border-b border-paper/10 pb-4">
                      <p
                        className="font-display text-xs font-black tracking-[0.32em] text-paper/85"
                        dir="ltr"
                      >
                        DUPLEX<span className="text-flame">®</span> CONSOLE
                      </p>
                      <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-jade">
                        <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
                        LIVE
                      </p>
                    </div>

                    {/* Channels */}
                    <div className="py-2">
                      {CATEGORIES.map((c, i) => {
                        const count = projectsByCategory(c.id).length;
                        return (
                          <Link
                            key={c.id}
                            to={`/work/${c.id}`}
                            className="group grid grid-cols-[28px_64px_1fr_auto] items-center gap-3 border-b border-paper/10 py-4 transition-all duration-300 last:border-b-0 hover:bg-paper/[0.06] md:gap-4"
                          >
                            <span
                              className="font-display text-sm font-black"
                              style={{ color: c.color }}
                              dir="ltr"
                            >
                              {c.num}
                            </span>
                            <span className="block h-12 w-16 overflow-hidden rounded-lg border border-paper/15">
                              <img
                                src={c.image}
                                alt={t(c.name)}
                                loading={i > 1 ? "lazy" : "eager"}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-baseline gap-2">
                                <span className="font-display truncate text-base font-extrabold text-paper md:text-lg">
                                  {t(c.name)}
                                </span>
                                <span
                                  className="hidden text-[9px] font-black tracking-[0.25em] text-paper/35 sm:block"
                                  dir="ltr"
                                >
                                  {c.latin}
                                </span>
                              </span>
                              <span className="mt-2.5 block max-w-[150px]">
                                <Meter
                                  value={METERS[i]}
                                  color={c.color}
                                  delay={400 + i * 170}
                                />
                              </span>
                            </span>
                            <span className="flex items-center gap-3">
                              <span className="whitespace-nowrap text-[11px] font-bold text-paper/55">
                                {count} {t(T.depsProjects)}
                              </span>
                              <ArrowIcon className="rtl-flip h-4 w-4 text-paper/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-flame" />
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Console footer */}
                    <div className="flex items-center justify-between border-t border-paper/10 pt-4 text-[11px] font-bold text-paper/60">
                      <span>
                        {PROJECTS.length} {t(T.catCount)} — 2019+
                      </span>
                      <button
                        onClick={() => scrollToId("work")}
                        className="group/f flex items-center gap-1.5 font-extrabold text-flame transition-colors hover:text-paper"
                      >
                        {t(T.heroCta1)}
                        <ArrowIcon className="rtl-flip h-3.5 w-3.5 transition-transform duration-200 group-hover/f:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>

                <RotatingBadge
                  text="DUPLEX STUDIO • WEB • DESIGN • FILM • GROWTH •"
                  className="absolute -bottom-9 -start-5 h-28 w-28 drop-shadow-2xl md:-start-9"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ Marquee ============================ */}
      <Marquee items={lang === "ar" ? MARQUEE.ar : MARQUEE.en} />

      {/* ============================ Departments ============================ */}
      <section id="departments" className="container-x scroll-mt-24 py-20 md:py-28">
        <SectionHead
          kicker={t(T.depsKicker)}
          title={t(T.depsTitle)}
          sub={t(T.depsSub)}
        />

        <div className="border-t border-line">
          {CATEGORIES.map((c, i) => {
            const count = projectsByCategory(c.id).length;
            return (
              <Reveal key={c.id} delay={i * 80}>
                <Link
                  to={`/work/${c.id}`}
                  className="group relative grid grid-cols-[44px_1fr_auto] items-center gap-4 overflow-hidden border-b border-line px-2 py-7 transition-all duration-300 hover:bg-surface md:grid-cols-[64px_1fr_auto_auto] md:px-5 md:py-8"
                >
                  <span
                    className="font-display text-sm font-black tracking-widest"
                    style={{ color: c.color }}
                  >
                    {c.num}
                  </span>

                  <span className="min-w-0">
                    <span
                      className="font-display block text-2xl font-extrabold text-ink transition-colors duration-300 md:text-4xl"
                      style={{ ["--hov" as string]: c.color }}
                    >
                      <span className="group-hover:text-[var(--hov)]">{t(c.name)}</span>
                    </span>
                    <span className="mt-1 hidden max-w-xl text-sm leading-relaxed text-muted md:block">
                      {t(c.blurb)}
                    </span>
                  </span>

                  <span
                    className="hidden rounded-full px-3.5 py-1.5 text-xs font-extrabold md:block"
                    style={{ background: c.tint, color: c.color }}
                  >
                    {count} {t(T.depsProjects)}
                  </span>

                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-line text-ink transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:text-white"
                    style={{ ["--hov" as string]: c.color }}
                  >
                    <ArrowIcon className="rtl-flip -rotate-45 h-5 w-5 transition-transform duration-300 group-hover:rotate-0" />
                  </span>

                  {/* Hover floating preview */}
                  <img
                    src={c.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="pointer-events-none absolute end-44 top-1/2 hidden h-24 w-40 -translate-y-1/2 rotate-3 scale-90 rounded-lg object-cover opacity-0 shadow-2xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-100 group-hover:opacity-100 xl:block"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================ Featured work ============================ */}
      <section id="work" className="scroll-mt-24 border-y border-line bg-surface/60">
        <div className="container-x py-20 md:py-28">
          <SectionHead
            kicker={t(T.workKicker)}
            title={t(T.workTitle)}
            end={
              <Reveal delay={150}>
                <div className="flex flex-wrap gap-2.5">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      to={`/work/${c.id}`}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-white"
                      style={{ ["--hov" as string]: c.color }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = c.color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      {t(c.name)} · {projectsByCategory(c.id).length}
                    </Link>
                  ))}
                </div>
              </Reveal>
            }
          />

          <div className="grid gap-8 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 130} className={i % 2 === 1 ? "md:mt-14" : ""}>
                <ProjectCard project={p} big />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Stats band ============================ */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="blueprint-dark absolute inset-0" aria-hidden />
        <div className="container-x relative py-16 md:py-20">
          <Reveal>
            <p className="mb-10 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal-tint/70 uppercase">
              <Spark className="h-4 w-4 text-flame" />
              {t(T.statsKicker)}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((v, i) => (
              <Reveal key={i} delay={i * 110}>
                <div className="border-s-2 border-flame/70 ps-5">
                  <p className="font-display text-5xl font-black md:text-6xl">
                    <CountUp value={v} suffix={i === 0 ? "+" : ""} />
                  </p>
                  <p className="mt-2 text-sm font-semibold text-paper/60">
                    {(lang === "ar" ? STATS_LABELS.ar : STATS_LABELS.en)[i]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Process ============================ */}
      <section className="container-x py-20 md:py-28">
        <SectionHead kicker={t(T.processKicker)} title={t(T.processTitle)} />
        <div className="border-t border-line">
          {(lang === "ar" ? PROCESS.ar : PROCESS.en).map((step, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="group flex flex-col gap-4 border-b border-line py-8 transition-all duration-300 hover:bg-surface hover:ps-4 md:flex-row md:items-start md:gap-10 md:py-9">
                <span className="font-display ghost-num text-5xl leading-none font-black md:w-28 md:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display flex items-center gap-3 text-xl font-extrabold text-ink md:text-2xl">
                    <span className="h-2 w-2 rounded-full bg-flame transition-transform duration-300 group-hover:scale-150" />
                    {step.t}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{step.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
