import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T, MARQUEE, PROCESS, STATS, STATS_LABELS } from "../data";
import { useContent } from "../lib/content";
import { CountUp, Marquee, Reveal, SectionHead } from "../lib/ui";
import { ArrowIcon, Spark } from "../components/icons";
import { ProjectCard, BlogCard } from "../components/project";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================ Duplex Split Hero ============================ */
function CraftHero() {
  const { lang, t } = useLang();
  const { categories, projectsByCategory } = useContent();

  return (
    <section className="relative grid overflow-hidden lg:grid-cols-12">
      {/* ---------- البيان (فاتح) ---------- */}
      <div className="relative lg:col-span-7">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div className="absolute -top-24 end-[-10%] h-[380px] w-[380px] rounded-full bg-teal/10 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 start-[-8%] h-[300px] w-[300px] rounded-full bg-flame/10 blur-3xl" aria-hidden />

        <div className="container-x relative flex h-full flex-col justify-center py-20 lg:py-28">
          <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft shadow-sm">
            <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
            {t(T.heroAvailable)}
          </span>

          <p className="mt-7 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal uppercase">
            <span className="h-px w-10 bg-flame" />
            {t(T.heroKicker)}
          </p>

          <h1 className="font-display mt-6 text-[2.9rem] leading-[1.06] font-black text-ink sm:text-6xl xl:text-[5rem]">
            <span className="mask-line" style={{ "--line-delay": "60ms" } as React.CSSProperties}>
              <span>{t(T.heroS1)}</span>
            </span>
            <span className="mask-line" style={{ "--line-delay": "200ms" } as React.CSSProperties}>
              <span className="flex items-center gap-3">
                <span className="relative inline-block text-teal">
                  {t(T.heroS2)}
                  <svg className="absolute -bottom-2.5 start-0 h-3 w-full text-flame" viewBox="0 0 220 12" preserveAspectRatio="none" aria-hidden>
                    <path d="M3 9c42-6 82-6.5 110-3.5 30 3.2 68 2.5 104-3.5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
                <Spark className="mb-2 inline h-8 w-8 shrink-0 text-flame" />
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{t(T.depsSub)}</p>

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

          <p className="mt-10 flex items-center gap-2 text-xs font-semibold text-muted/80">
            <Spark className="h-3.5 w-3.5 text-flame" />
            {t(T.heroSwitchHint)}
          </p>
        </div>
      </div>

      {/* ---------- فهرس الأقسام (داكن) ---------- */}
      <div className="relative bg-ink text-paper lg:col-span-5">
        <div className="blueprint-dark absolute inset-0" aria-hidden />
        <div className="absolute -top-16 -end-16 h-56 w-56 rounded-full bg-flame/20 blur-3xl" aria-hidden />

        <div className="relative flex h-full flex-col justify-center px-6 py-14 sm:px-10 lg:py-20">
          <p className="mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-paper/60 uppercase">
            <span className="h-px w-8 bg-flame" />
            {t(T.heroDeptsTitle)}
          </p>

          <nav className="flex flex-col" aria-label={t(T.heroDeptsTitle)}>
            {categories.map((c, i) => {
              const count = projectsByCategory(c.id).length;
              return (
                <Link
                  key={c.id}
                  to={`/work/${c.id}`}
                  className="group relative flex items-center gap-4 border-b border-paper/10 py-5 transition-all duration-300 first:border-t hover:bg-paper/[0.05] hover:ps-2"
                >
                  <span className="font-display w-9 shrink-0 text-sm font-black tabular-nums" style={{ color: c.color }} dir="ltr">
                    {c.num}
                  </span>
                  <span className="block h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-paper/15">
                    <img src={c.image} alt={t(c.name)} loading={i > 1 ? "lazy" : "eager"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-display block truncate text-lg font-extrabold text-paper transition-colors duration-200 group-hover:text-flame">
                      {t(c.name)}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-black tracking-[0.2em] text-paper/40" dir="ltr">
                      {c.latin || c.id.toUpperCase()}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="whitespace-nowrap text-[11px] font-bold text-paper/55">
                      {count} {t(T.depsProjects)}
                    </span>
                    <ArrowIcon className="rtl-flip h-4 w-4 text-paper/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-flame" />
                  </span>
                  <span className="absolute inset-y-0 start-0 w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" style={{ background: c.color }} />
                </Link>
              );
            })}
          </nav>

          <p className="mt-6 text-[11px] font-semibold text-paper/45">{t(T.heroSplitHint)}</p>
        </div>
      </div>
    </section>
  );
}

/* ============================ Home Page ============================ */
export default function Home() {
  const { lang, t } = useLang();
  const { categories, projectsByCategory, featuredProjects, posts } = useContent();
  const featured = featuredProjects();
  const latestPosts = posts.slice(0, 4);

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
