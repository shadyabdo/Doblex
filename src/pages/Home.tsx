import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T, MARQUEE, PROCESS, STATS, STATS_LABELS } from "../data";
import { useContent } from "../lib/content";
import { useTrackView } from "../lib/views";
import { CountUp, Marquee, Reveal, SectionHead } from "../lib/ui";
import { ArrowIcon, Spark } from "../components/icons";
import { ProjectCard, BlogCard } from "../components/project";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================ Cinematic Cover Hero ============================ */
function CraftHero() {
  const { lang, t } = useLang();
  const { categories, projects, projectsByCategory, getCategory } = useContent();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const feats = projects.filter((p) => p.featured);
  const showcase = (feats.length ? feats : projects).slice(0, 5);
  const current = showcase[active % Math.max(showcase.length, 1)];
  const currentCat = current ? getCategory(current.category) : undefined;

  useEffect(() => {
    if (paused || showcase.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % showcase.length), 6000);
    return () => clearInterval(id);
  }, [paused, showcase.length]);

  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden bg-ink text-paper lg:min-h-[92vh]">
        {/* ---------- خلفية الأعمال ---------- */}
        {showcase.map((p, i) => (
          <img
            key={p.id}
            src={p.image}
            alt=""
            aria-hidden
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${
              i === active % Math.max(showcase.length, 1) ? "kenburns opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {showcase.length === 0 && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 75% 20%, rgba(11,124,116,0.5), transparent 70%), radial-gradient(50% 70% at 15% 85%, rgba(232,89,12,0.35), transparent 70%), linear-gradient(160deg, #0d1f33 0%, #07564f 130%)",
            }}
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/35" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-transparent" aria-hidden />
        <div className="blueprint-dark absolute inset-0 opacity-50" aria-hidden />

        {/* ---------- المحتوى ---------- */}
        <div className="container-x relative grid gap-12 pt-36 pb-14 lg:min-h-[92vh] lg:grid-cols-12 lg:items-end lg:pt-44 lg:pb-20">
          {/* البيان */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-paper/25 bg-ink/55 px-4 py-2 text-xs font-bold text-paper backdrop-blur-sm">
                <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
                {t(T.heroAvailable)}
              </span>
              <p className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal-tint/85 uppercase">
                <span className="h-px w-10 bg-flame" />
                {t(T.heroKicker)}
              </p>
            </div>

            <h1 className="font-display mt-7 text-[2.9rem] leading-[1.06] font-black sm:text-6xl xl:text-[5.2rem]">
              <span className="mask-line" style={{ "--line-delay": "80ms" } as React.CSSProperties}>
                <span>{t(T.heroS1)}</span>
              </span>
              <span className="mask-line" style={{ "--line-delay": "230ms" } as React.CSSProperties}>
                <span className="flex items-center gap-3">
                  <span className="relative inline-block text-paper">
                    {t(T.heroS2)}
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
                  <Spark className="mb-2 inline h-8 w-8 shrink-0 text-flame sm:h-10 sm:w-10" />
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/80">{t(T.depsSub)}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToId("work")}
                className="group flex items-center gap-2.5 rounded-full bg-flame px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_40px_rgba(232,89,12,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep"
              >
                {t(T.heroCta1)}
                <ArrowIcon className="rtl-flip h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToId("departments")}
                className="rounded-full border-2 border-paper/35 px-7 py-3.5 text-sm font-bold text-paper transition-all duration-200 hover:border-paper hover:bg-paper/10"
              >
                {t(T.heroCta2)}
              </button>
            </div>

            <p className="mt-9 flex items-center gap-2 text-xs font-semibold text-paper/55">
              <Spark className="h-3.5 w-3.5 text-flame" />
              {t(T.heroSwitchHint)}
            </p>
          </div>

          {/* بطاقة المشروع المميز */}
          <div className="lg:col-span-5">
            {current ? (
              <div
                key={current.id}
                className="pop-in relative overflow-hidden rounded-xl border border-paper/15 bg-ink/80 p-6 shadow-[0_40px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-7"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: currentCat?.color ?? "#E8590C" }}
                  aria-hidden
                />
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold"
                    style={{
                      background: currentCat ? currentCat.tint : "#FDEADD",
                      color: currentCat?.color ?? "#E8590C",
                    }}
                  >
                    <Spark className="h-3 w-3" />
                    {t(T.heroFeatured)}
                  </span>
                  <span className="text-[11px] font-black tracking-widest text-paper/45 tabular-nums" dir="ltr">
                    {String(active + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="font-display mt-4 text-2xl leading-snug font-extrabold text-paper md:text-[1.7rem]">
                  {t(current.title)}
                </h2>
                <p className="mt-1.5 text-sm font-bold text-paper/60">
                  {t(current.client)} · <span dir="ltr">{current.year}</span>
                  {currentCat ? ` · ${t(currentCat.name)}` : ""}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-paper/70">{t(current.tagline)}</p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <Link
                    to={`/project/${current.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep"
                  >
                    {t(T.heroViewCase)}
                    <ArrowIcon className="rtl-flip h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  {showcase.length > 1 && (
                    <div className="flex items-center gap-1.5">
                      {showcase.map((p, i) => (
                        <button
                          key={p.id}
                          onClick={() => setActive(i)}
                          aria-label={t(p.title)}
                          className={`h-10 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 ${
                            i === active
                              ? "scale-105 border-flame opacity-100"
                              : "border-transparent opacity-45 hover:opacity-85"
                          }`}
                        >
                          <img src={p.image} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-paper/25 bg-ink/60 p-7 text-center backdrop-blur-sm">
                <Spark className="mx-auto h-7 w-7 text-flame" />
                <p className="mt-3 text-sm font-bold text-paper/75">{t(T.heroNoWork)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- شريط الأقسام ---------- */}
      {categories.length > 0 && (
        <div className="border-b border-line bg-surface">
          <div className="container-x flex items-center gap-3 overflow-x-auto py-4">
            <span className="hidden shrink-0 text-xs font-black tracking-[0.22em] text-muted uppercase md:block">
              {t(T.heroDeptsTitle)}
            </span>
            {categories.map((c) => {
              const count = projectsByCategory(c.id).length;
              return (
                <Link
                  key={c.id}
                  to={`/work/${c.id}`}
                  className="group flex shrink-0 items-center gap-3 rounded-full border border-line bg-paper px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg"
                  style={{ ["--hov" as string]: c.color, ["--tint" as string]: c.tint }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = c.tint;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                  }}
                >
                  <span className="h-2 w-2 rounded-full transition-transform duration-200 group-hover:scale-125" style={{ background: c.color }} />
                  <span className="text-sm font-extrabold whitespace-nowrap text-ink transition-colors duration-200 group-hover:text-[var(--hov)]">
                    {t(c.name)}
                  </span>
                  <span className="text-[11px] font-black text-muted tabular-nums" dir="ltr">
                    {count}
                  </span>
                  <ArrowIcon className="rtl-flip h-3.5 w-3.5 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--hov)]" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================ Home Page ============================ */
export default function Home() {
  const { lang, t } = useLang();
  const { categories, projectsByCategory, featuredProjects, posts } = useContent();
  const featured = featuredProjects();
  const latestPosts = posts.slice(0, 4);

  useTrackView("home");

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar" ? "دوبليكس | Duplex — استوديو تقني متكامل" : "Duplex — Full-stack Tech Studio"}
        </title>
        <meta
          name="description"
          content={
            lang === "ar"
              ? "دوبليكس استوديو تقني متكامل: تطوير مواقع، جرافيك ديزاين، فيديو إديتينج، وديجيتال ماركتينج تحت سقف واحد."
              : "Duplex is a full-stack tech studio: web development, graphic design, video editing and digital marketing under one roof."
          }
        />
      </Helmet>

      <CraftHero />

      <Marquee items={lang === "ar" ? MARQUEE.ar : MARQUEE.en} />

      {/* ============================ Departments ============================ */}
      <section id="departments" className="container-x scroll-mt-24 py-20 md:py-28">
        <SectionHead kicker={t(T.depsKicker)} title={t(T.depsTitle)} sub={t(T.depsSub)} />
        <div className="border-t border-line">
          {categories.map((c, i) => {
            const count = projectsByCategory(c.id).length;
            return (
              <Reveal key={c.id} delay={i * 80}>
                <Link
                  to={`/work/${c.id}`}
                  className="group relative grid grid-cols-[44px_1fr_auto] items-center gap-4 overflow-hidden border-b border-line px-2 py-7 transition-all duration-300 hover:bg-surface md:grid-cols-[64px_1fr_auto_auto] md:px-5 md:py-8"
                >
                  <span className="font-display text-sm font-black tracking-widest" style={{ color: c.color }}>{c.num}</span>
                  <span className="min-w-0">
                    <span className="font-display block truncate text-xl font-extrabold text-ink transition-colors duration-200 group-hover:text-[var(--hov)] md:text-2xl" style={{ ["--hov" as string]: c.color }}>
                      {t(c.name)}
                    </span>
                    <span className="mt-1 hidden truncate text-sm text-muted sm:block">{t(c.blurb)}</span>
                  </span>
                  <span className="hidden whitespace-nowrap text-xs font-bold text-muted md:block">
                    {count} {t(T.depsProjects)}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-transparent group-hover:text-white" style={{ ["--hov" as string]: c.color }}>
                    <ArrowIcon className="rtl-flip h-4 w-4" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-inline-start scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: c.color }} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================ Selected work ============================ */}
      {featured.length > 0 && (
        <section id="work" className="scroll-mt-24 border-y border-line bg-surface/70">
          <div className="container-x py-20 md:py-28">
            <SectionHead
              kicker={t(T.workKicker)}
              title={t(T.workTitle)}
              end={
                categories.length > 0 ? (
                  <Reveal delay={150}>
                    <div className="flex flex-wrap gap-2.5">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/work/${c.id}`}
                          className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:text-white"
                          onMouseEnter={(e) => (e.currentTarget.style.background = c.color)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                        >
                          {t(c.name)} · {projectsByCategory(c.id).length}
                        </Link>
                      ))}
                    </div>
                  </Reveal>
                ) : undefined
              }
            />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 110}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================ Stats ============================ */}
      <section className="relative overflow-hidden bg-teal-deep text-paper">
        <div className="blueprint-dark absolute inset-0" aria-hidden />
        <div className="container-x relative py-16 md:py-20">
          <p className="mb-10 text-center text-xs font-bold tracking-[0.24em] text-teal-tint/70 uppercase">{t(T.statsKicker)}</p>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {STATS.map((v, i) => (
              <Reveal key={i} delay={i * 90} className="text-center">
                <p className="font-display text-5xl font-black text-paper md:text-6xl">
                  <CountUp value={v} suffix={i === 0 ? "+" : ""} />
                </p>
                <p className="mt-2 text-sm font-semibold text-paper/65">{STATS_LABELS[lang][i]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ Process ============================ */}
      <section className="container-x py-20 md:py-28">
        <SectionHead kicker={t(T.processKicker)} title={t(T.processTitle)} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS[lang].map((step, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative h-full rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(13,31,51,0.12)]">
                <span className="font-display ghost-num text-5xl leading-none font-black transition-colors duration-300 group-hover:text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-lg font-extrabold text-ink">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
                <span className="absolute top-6 end-6 h-2 w-2 rounded-full bg-flame opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ Blog ============================ */}
      {latestPosts.length > 0 && (
        <section className="border-t border-line bg-surface/70">
          <div className="container-x py-20 md:py-28">
            <SectionHead
              kicker={t(T.blogKicker)}
              title={t(T.blogPageTitle)}
              end={
                <Reveal delay={150}>
                  <Link
                    to="/blog"
                    className="group flex items-center gap-2.5 rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-bold text-ink transition-all duration-200 hover:border-flame hover:bg-flame hover:text-white"
                  >
                    {t(T.blogMore)}
                    <ArrowIcon className="rtl-flip h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              }
            />
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {latestPosts.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 90}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
