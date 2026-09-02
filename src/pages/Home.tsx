import { useEffect, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { MARQUEE, PROCESS, STATS_LABELS, T } from "../data/translations";
import {
  CATEGORIES,
  STATS,
  featuredProjects,
  projectsByCategory,
} from "../data/projects";
import { BLOG_POSTS } from "../data/blog";
import {
  CountUp,
  Marquee,
  Reveal,
  SectionHead,
  Spark,
} from "../lib/ui";
import { ArrowIcon } from "../components/icons";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";

/** تمرير ناعم لعنصر داخل الصفحة — متوافق مع HashRouter */
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================ Duplex Split Hero ============================ */
function CraftHero() {
  const { lang, t } = useLang();

  return (
    <section className="relative grid overflow-hidden lg:grid-cols-12">
      {/* ===== الناحية الفاتحة — البيان ===== */}
      <div className="relative lg:col-span-7">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div
          className="absolute -top-24 end-[-10%] h-[380px] w-[380px] rounded-full bg-teal/10 blur-3xl"
          aria-hidden
        />

        <div className="relative px-5 pt-16 pb-14 sm:px-8 md:px-12 md:pt-24 md:pb-16 lg:pt-28 lg:ps-16">
          <div className="flex flex-wrap items-center gap-4">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal uppercase">
              <span className="h-px w-10 bg-flame" />
              {t(T.heroKicker)}
            </p>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft shadow-sm">
              <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
              {t(T.heroAvailable)}
            </span>
          </div>

          <h1 className="font-display mt-9 text-ink">
            <span className="block text-[clamp(2.7rem,6.2vw,5rem)] leading-[1.06] font-black">
              {t(T.heroS1)}
            </span>
            <span className="block text-[clamp(2.7rem,6.2vw,5rem)] leading-[1.06] font-black text-teal">
              <span className="relative inline-block">
                {t(T.heroS2)}
                <svg
                  className="absolute -bottom-2 start-0 h-3 w-full text-flame"
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
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
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

          <p className="mt-10 flex items-center gap-2.5 text-xs font-bold text-muted">
            <Spark className="h-3.5 w-3.5 shrink-0 text-flame" />
            {t(T.heroLangNote)}
          </p>
        </div>
      </div>

      {/* ===== الناحية الداكنة — فهرس الأقسام ===== */}
      <div className="relative overflow-hidden bg-ink lg:col-span-5">
        <div className="blueprint-dark absolute inset-0" aria-hidden />
        <div className="relative flex h-full flex-col p-6 md:p-9 lg:p-10">
          <div className="flex items-center justify-between border-b border-paper/15 pb-5">
            <p className="font-display text-lg font-extrabold text-paper md:text-xl">
              {t(T.heroDeptsTitle)}
            </p>
            <span
              className="rounded-full border border-paper/20 px-3 py-1 text-[10px] font-black tracking-[0.25em] text-paper/50"
              dir="ltr"
            >
              04 DEPTS
            </span>
          </div>

          <nav className="flex-1" aria-label={t(T.heroDeptsTitle)}>
            {CATEGORIES.map((c) => {
              const count = projectsByCategory(c.id).length;
              return (
                <Link
                  key={c.id}
                  to={`/work/${c.id}`}
                  className="group flex items-center gap-4 border-b border-paper/10 py-4 transition-colors duration-200 hover:bg-paper/[0.06] md:gap-5 md:py-5"
                >
                  <span
                    className="font-display w-8 shrink-0 text-base font-black"
                    style={{ color: c.color }}
                    dir="ltr"
                  >
                    {c.num}
                  </span>
                  <span className="hidden h-11 w-14 shrink-0 overflow-hidden rounded-md border border-paper/15 sm:block">
                    <img
                      src={c.image}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className="font-display block truncate text-lg font-extrabold text-paper transition-colors duration-200 group-hover:text-[var(--hov)]"
                      style={{ "--hov": c.color } as CSSProperties}
                    >
                      {t(c.name)}
                    </span>
                    <span
                      className="mt-0.5 block text-[10px] font-black tracking-[0.24em] text-paper/35 uppercase"
                      dir="ltr"
                    >
                      {c.latin}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-paper/10 px-3 py-1 text-[11px] font-bold text-paper/70">
                    {count} {t(T.depsProjects)}
                  </span>
                  <ArrowIcon className="rtl-flip h-4 w-4 shrink-0 text-paper/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-flame" />
                </Link>
              );
            })}
          </nav>

          <div className="grid grid-cols-3 gap-4 pt-6">
            {STATS.slice(0, 3).map((v, i) => (
              <div key={i}>
                <p className="font-display text-3xl font-black text-paper md:text-4xl">
                  <CountUp value={v} suffix={i === 0 ? "+" : ""} />
                </p>
                <p className="mt-1 text-[11px] leading-snug font-bold text-paper/50">
                  {STATS_LABELS[lang][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ Home Page ============================ */
export default function Home() {
  const { lang, t } = useLang();
  const featured = featuredProjects();
  const latestPosts = BLOG_POSTS.slice(0, 4);

  useEffect(() => {
    document.title =
      lang === "ar"
        ? "دوبليكس | Duplex — استوديو تقني متكامل"
        : "Duplex — Full-stack Tech Studio";
  }, [lang]);

  return (
    <>
      <Helmet>
        <title>
          {lang === "ar"
            ? "دوبليكس | Duplex — استوديو تقني متكامل"
            : "Duplex — Full-stack Tech Studio"}
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
                      onMouseEnter={(e) => (e.currentTarget.style.background = c.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
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

      {/* ============================ Blog ============================ */}
      <section id="blog" className="scroll-mt-24 border-t border-line bg-surface/60">
        <div className="container-x py-20 md:py-28">
          <SectionHead
            kicker={lang === "ar" ? "04 — من المدونة" : "04 — From the blog"}
            title={lang === "ar" ? "آخر ما كتبناه" : "Latest from our blog"}
            sub={
              lang === "ar"
                ? "رؤى وقصص وخبرة فريق دوبليكس في التصميم والتطوير والفيديو والتسويق."
                : "Insights, stories and expertise from the Duplex team on design, development, video and marketing."
            }
            end={
              <Reveal delay={150}>
                <Link
                  to="/blog"
                  className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal"
                >
                  {lang === "ar" ? "عرض المزيد" : "View more"}
                  <ArrowIcon className="rtl-flip h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            }
          />

          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
            {latestPosts.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 90}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
