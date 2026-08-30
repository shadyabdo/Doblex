import { useEffect } from "react";
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
  RotatingBadge,
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

/* ============================ Poster Hero ============================ */
function CraftHero() {
  const { lang, t } = useLang();
  const clipImg = CATEGORIES[2].image;

  return (
    <section className="relative -mt-20 overflow-hidden md:-mt-24">
      {/* ---------- Poster opener ---------- */}
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute -top-28 end-[-8%] h-[420px] w-[420px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute top-80 start-[-10%] h-[340px] w-[340px] rounded-full bg-flame/10 blur-3xl"
        aria-hidden
      />

      {/* كلمة شبحية تنحرف ببطء */}
      <p
        className="font-display drift-slow pointer-events-none absolute -top-8 end-0 hidden leading-none font-black text-ghost select-none lg:block"
        style={{ fontSize: "clamp(8rem,16vw,15rem)" }}
        dir="ltr"
        aria-hidden
      >
        DUPLEX
      </p>

      {/* علامات زوايا البوستر */}
      <div className="pointer-events-none absolute inset-4 z-10 hidden sm:block md:inset-6" aria-hidden>
        <span className="absolute top-0 start-0 h-5 w-5 border-t-2 border-s-2 border-ink/25" />
        <span className="absolute top-0 end-0 h-5 w-5 border-t-2 border-e-2 border-ink/25" />
        <span className="absolute bottom-0 start-0 h-5 w-5 border-b-2 border-s-2 border-ink/25" />
        <span className="absolute bottom-0 end-0 h-5 w-5 border-b-2 border-e-2 border-ink/25" />
      </div>

      {/* نص جانبي عمودي */}
      <p
        className="absolute top-1/2 end-7 z-10 hidden -translate-y-1/2 rotate-90 text-[10px] font-black tracking-[0.42em] whitespace-nowrap text-muted/70 uppercase xl:block"
        dir="ltr"
      >
        Est. 2019 — Cairo, Egypt
      </p>

      <div className="relative px-5 pt-32 pb-16 sm:px-8 md:px-12 md:pt-40 md:pb-20 lg:px-16">
        {/* سطر الميتا */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-teal uppercase">
            <span className="h-px w-10 bg-flame" />
            {t(T.heroKicker)}
          </p>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink-soft shadow-sm">
            <span className="pulse-dot h-2 w-2 rounded-full bg-jade" />
            {t(T.heroAvailable)}
          </span>
        </div>

        {/* الووردمارك */}
        <h1 className="font-display mt-10 text-ink md:mt-14">
          <span
            className="mask-line block text-[clamp(3.4rem,13vw,10.5rem)] leading-[0.98] font-black"
            style={{ "--line-delay": "80ms" } as React.CSSProperties}
          >
            <span>
              {t(T.brand)}
              <span className="text-flame">.</span>
            </span>
          </span>
        </h1>
        <p className="mask-line -mt-1 md:-mt-3">
          <span
            className="text-img-clip font-display block w-fit text-[clamp(2rem,8vw,6.6rem)] leading-[1.04] font-black"
            style={
              {
                "--line-delay": "220ms",
                backgroundImage: `url(${clipImg})`,
              } as React.CSSProperties
            }
            dir="ltr"
          >
            DUPLEX® STUDIO
          </span>
        </p>

        {/* السطر السفلي: وصف + أزرار | أرقام */}
        <div className="mt-12 grid items-end gap-10 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t(T.heroP)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
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
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-5 border-t-2 border-ink/10 pt-6 md:gap-6">
              {STATS.slice(0, 3).map((v, i) => (
                <div key={i}>
                  <p className="font-display text-3xl font-black text-ink md:text-5xl">
                    <CountUp value={v} suffix={i === 0 ? "+" : ""} />
                  </p>
                  <p className="mt-1.5 text-[11px] leading-snug font-bold text-muted">
                    {STATS_LABELS[lang][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر السكرول */}
      <div
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
        aria-hidden
      >
        <span className="text-[9px] font-black tracking-[0.4em] text-muted uppercase" dir="ltr">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
          <span className="scrolldot absolute top-0 left-0 block h-3 w-px bg-flame" />
        </span>
      </div>

      {/* ------------- Departments strip ------------- */}
      <div className="relative mt-14 md:mt-20">
        <div className="container-x mb-5 flex items-end justify-between gap-4">
          <p className="font-display text-lg font-extrabold text-ink md:text-xl">
            {t(T.heroDepartments)}
            <span className="ms-3 align-middle text-[10px] font-black tracking-[0.3em] text-muted" dir="ltr">
              01 — 04
            </span>
          </p>
          <p className="hidden items-center gap-2 text-xs font-bold text-muted sm:flex">
            <Spark className="h-3.5 w-3.5 text-flame" />
            {t(T.heroPanelsHint)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px border-y border-line bg-line md:flex md:h-[360px] md:gap-0 md:bg-transparent lg:h-[400px]">
          {CATEGORIES.map((c, i) => {
            const count = projectsByCategory(c.id).length;
            return (
              <Link
                key={c.id}
                to={`/work/${c.id}`}
                className="group relative flex h-48 items-end overflow-hidden bg-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-full md:min-w-0 md:flex-1 md:hover:flex-[2.3]"
                style={{ "--acc": c.color } as React.CSSProperties}
              >
                <img
                  src={c.image}
                  alt={t(c.name)}
                  loading={i > 1 ? "lazy" : "eager"}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-[1.07] md:opacity-65 md:group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/5" />
                <span className="origin-inline-start absolute inset-x-0 top-0 h-1 scale-x-0 bg-[var(--acc)] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="font-display absolute top-4 end-4 text-sm font-black text-paper/70" dir="ltr">
                  {c.num}
                </span>

                <div className="relative w-full p-4 md:p-6">
                  <p
                    className="text-[9px] font-black tracking-[0.28em] uppercase md:text-[10px]"
                    style={{ color: c.color }}
                    dir="ltr"
                  >
                    {c.latin}
                  </p>
                  <p className="font-display mt-1 text-lg font-extrabold text-paper md:text-2xl">
                    {t(c.name)}
                  </p>

                  <div className="grid transition-all duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="pt-2 text-xs leading-relaxed text-paper/75 md:text-sm">
                        {t(c.blurb)}
                      </p>
                      <p className="flex items-center gap-2 pt-2.5 text-xs font-extrabold text-flame">
                        {t(T.exploreCat)}
                        <ArrowIcon className="rtl-flip h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </p>
                    </div>
                  </div>

                  <p className="mt-1.5 text-[10px] font-bold text-paper/50 md:mt-2 md:text-[11px]">
                    {count} {t(T.depsProjects)}
                  </p>
                </div>
              </Link>
            );
          })}
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
