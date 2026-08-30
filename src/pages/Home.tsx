import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { MARQUEE, PROCESS, STATS_LABELS, T } from "../data/translations";
import { CATEGORIES, STATS, featuredProjects, projectsByCategory } from "../data/projects";
import { CountUp, Marquee, Reveal, RotatingBadge, SectionHead, Spark } from "../lib/ui";
import { ArrowIcon } from "../components/icons";
import ProjectCard from "../components/ProjectCard";

const CHARS = "DUPLEX#/<>*+";

/** تمرير ناعم لعنصر داخل الصفحة — متوافق مع HashRouter */
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
      <section className="relative overflow-hidden">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="absolute -top-24 end-[-8%] h-[420px] w-[420px] rounded-full bg-teal/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute top-64 start-[-10%] h-[360px] w-[360px] rounded-full bg-flame/10 blur-3xl"
          aria-hidden
        />

        <div className="container-x relative grid items-center gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft shadow-sm">
              <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
              {t(T.heroAvailable)}
            </span>

            <p className="mt-7 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal uppercase">
              <span className="h-px w-10 bg-flame" />
              {t(T.heroKicker)}
            </p>

            <h1 className="font-display mt-4 text-[2.6rem] leading-[1.1] font-black text-ink sm:text-6xl xl:text-[4.6rem]">
              <span className="mask-line" style={{ "--line-delay": "80ms" } as React.CSSProperties}>
                <span>{t(T.heroL1)}</span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "200ms" } as React.CSSProperties}>
                <span className="text-teal">{t(T.heroL2)}</span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "320ms" } as React.CSSProperties}>
                <span>
                  {t(T.heroL3)}{" "}
                  <Spark className="mb-2 inline h-7 w-7 text-flame sm:h-9 sm:w-9" />
                </span>
              </span>
            </h1>

            <p className="mt-3 overflow-hidden">
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

            <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-bold text-ink-soft">
              {[T.heroMeta1, T.heroMeta2, T.heroMeta3].map((m, i) => (
                <span key={i} className="flex items-center gap-2.5">
                  <Spark className="h-3.5 w-3.5 text-teal" />
                  {t(m)}
                </span>
              ))}
            </div>
          </div>

          {/* Postcard collage */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto h-[430px] max-w-md sm:h-[500px]">
              <Reveal delay={150}>
                <div className="group absolute top-2 end-0 w-[76%] rotate-3 rounded-xl border border-line bg-surface p-2 pb-4 shadow-[0_24px_50px_rgba(13,31,51,0.14)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]">
                  <img
                    src={CATEGORIES[0].image}
                    alt={t(CATEGORIES[0].name)}
                    className="aspect-[16/11] w-full rounded-lg object-cover"
                    loading="eager"
                  />
                  <p className="mt-2.5 px-1 text-[10px] font-extrabold tracking-[0.22em] text-teal uppercase">
                    {CATEGORIES[0].latin}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="float-y group absolute bottom-10 start-0 z-10 w-[60%] -rotate-6 rounded-xl border border-line bg-surface p-2 pb-4 shadow-[0_24px_50px_rgba(13,31,51,0.16)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]">
                  <img
                    src={CATEGORIES[1].image}
                    alt={t(CATEGORIES[1].name)}
                    className="aspect-[16/12] w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                  <p className="mt-2.5 px-1 text-[10px] font-extrabold tracking-[0.22em] text-flame uppercase">
                    {CATEGORIES[1].latin}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={450}>
                <div className="group absolute top-[41%] start-[16%] z-20 w-[52%] rotate-2 rounded-xl border border-line bg-surface p-2 pb-4 shadow-[0_28px_56px_rgba(13,31,51,0.2)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.05]">
                  <img
                    src={CATEGORIES[2].image}
                    alt={t(CATEGORIES[2].name)}
                    className="aspect-[16/11] w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                  <p className="mt-2.5 px-1 text-[10px] font-extrabold tracking-[0.22em] text-cobalt uppercase">
                    {CATEGORIES[2].latin}
                  </p>
                </div>
              </Reveal>

              <RotatingBadge
                text="DUPLEX STUDIO • WEB • DESIGN • FILM • GROWTH •"
                className="absolute -top-7 start-4 z-30 h-28 w-28 drop-shadow-xl"
              />

              <div className="absolute -bottom-3 end-2 z-30 rounded-xl bg-ink px-5 py-4 text-paper shadow-[0_20px_44px_rgba(13,31,51,0.35)]">
                <p className="font-display text-3xl font-black text-flame">
                  <CountUp value={38} suffix="%" />
                </p>
                <p className="mt-1 text-[11px] font-bold text-paper/70">
                  {t(T.heroStatTitle)}
                </p>
              </div>
            </div>
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
