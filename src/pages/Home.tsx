import { useEffect, useState } from "react";
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

/** عبارات تتبدل في العنوان الرئيسي حسب القسم النشط */
const CRAFT_PHRASES: { ar: string; en: string }[] = [
  { ar: "مواقع تبهر عملاءك", en: "websites that wow" },
  { ar: "هويات لا تُنسى", en: "identities that stick" },
  { ar: "فيديوهات تخطف الأنظار", en: "films that captivate" },
  { ar: "حملات تنمّي أعمالك", en: "campaigns that grow" },
];

/** تمرير ناعم لعنصر داخل الصفحة — متوافق مع HashRouter */
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================ Craft-Switcher Hero ============================ */
function CraftHero() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CATEGORIES.length;
  const phrase = CRAFT_PHRASES[active][lang];
  const cat = CATEGORIES[active];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 4500);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <section className="relative overflow-hidden">
      <div className="blueprint absolute inset-0" aria-hidden />
      <div
        className="absolute -top-24 end-[-8%] h-[420px] w-[420px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute top-72 start-[-10%] h-[360px] w-[360px] rounded-full bg-flame/10 blur-3xl"
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-14 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        {/* ------------- Copy ------------- */}
        <div className="lg:col-span-6">
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

          <h1 className="font-display mt-7 text-[2.7rem] leading-[1.08] font-black text-ink sm:text-6xl xl:text-[4.5rem]">
            <span className="mask-line" style={{ "--line-delay": "80ms" } as React.CSSProperties}>
              <span>{t(T.heroL1)}</span>
            </span>
            <span className="mask-line" style={{ "--line-delay": "210ms" } as React.CSSProperties}>
              <span key={active} className="inline-flex items-end gap-3">
                <span className="relative inline-block" style={{ color: cat.color }}>
                  {phrase}
                  <svg
                    className="absolute -bottom-2.5 start-0 h-3 w-full opacity-80"
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

        {/* ------------- Showcase ------------- */}
        <div
          className="lg:col-span-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal delay={150}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-ink shadow-[0_44px_90px_rgba(13,31,51,0.3)] sm:aspect-[16/11]">
                {CATEGORIES.map((c, i) => (
                  <img
                    key={c.id}
                    src={c.image}
                    alt={t(c.name)}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      i === active ? "kenburns opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/10" />

                {/* Overlay label */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-7">
                  <div key={active} className="pop-in">
                    <p
                      className="text-[10px] font-black tracking-[0.3em] uppercase"
                      style={{ color: cat.color }}
                      dir="ltr"
                    >
                      {cat.latin}
                    </p>
                    <p className="font-display mt-1 text-2xl font-extrabold text-paper md:text-3xl">
                      {t(cat.name)}
                    </p>
                    <p className="mt-1 max-w-xs text-sm text-paper/70">{t(cat.blurb)}</p>
                  </div>
                  <Link
                    to={`/work/${cat.id}`}
                    className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-all duration-300 hover:bg-flame hover:text-white"
                    aria-label={t(T.exploreCat)}
                  >
                    <ArrowIcon className="rtl-flip h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {CATEGORIES.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(i)}
                    className={`group relative overflow-hidden rounded-lg border px-3 py-2.5 text-start transition-all duration-200 ${
                      i === active
                        ? "border-transparent text-white shadow-md"
                        : "border-line bg-surface text-ink-soft hover:-translate-y-0.5"
                    }`}
                    style={i === active ? { background: c.color } : undefined}
                    onMouseEnter={(e) => {
                      if (i !== active) e.currentTarget.style.borderColor = c.color;
                    }}
                    onMouseLeave={(e) => {
                      if (i !== active) e.currentTarget.style.borderColor = "";
                    }}
                    aria-pressed={i === active}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="font-display text-xs font-black"
                        style={{ color: i === active ? "#fff" : c.color }}
                        dir="ltr"
                      >
                        {c.num}
                      </span>
                      <span className="truncate text-xs font-extrabold">{t(c.name)}</span>
                    </span>
                    {i === active && (
                      <span
                        key={`bar-${active}-${paused ? "p" : "r"}`}
                        className="absolute bottom-0 start-0 h-0.5 bg-white/70"
                        style={
                          paused
                            ? { width: "100%" }
                            : { animation: "tab-progress 4.5s linear forwards" }
                        }
                      />
                    )}
                  </button>
                ))}
              </div>

              <RotatingBadge
                text="DUPLEX STUDIO • WEB • DESIGN • FILM • GROWTH •"
                className="absolute -top-8 -start-5 hidden h-28 w-28 drop-shadow-2xl md:block lg:-start-9"
              />
            </div>
          </Reveal>
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
