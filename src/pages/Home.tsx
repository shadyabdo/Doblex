import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { HERO_FLIP, MARQUEE, PROCESS, STATS_LABELS, T } from "../data/translations";
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

/** شريحة داكنة تنقلب كلماتها رأسيًا — كل كلمة بلون قسمها */
function FlipWord({ words, active }: { words: string[]; active: number }) {
  const n = words.length;
  return (
    <span
      className="relative inline-block overflow-hidden rounded-[12px] bg-ink px-[0.4em] shadow-[0_14px_34px_rgba(13,31,51,0.28)]"
      style={{ height: "1.24em" }}
    >
      <span
        className="block transition-transform duration-[620ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{ transform: `translateY(-${active * (100 / n)}%)` }}
      >
        {words.map((w, i) => (
          <span
            key={w}
            className="flex items-center gap-[0.35em] leading-[1.24]"
            style={{ height: "1.24em" }}
          >
            <span
              className="inline-block h-[0.32em] w-[0.32em] shrink-0 rounded-full"
              style={{ background: CATEGORIES[i % CATEGORIES.length].color }}
            />
            <span style={{ color: CATEGORIES[i % CATEGORIES.length].color }}>{w}</span>
          </span>
        ))}
      </span>
    </span>
  );
}

/* ============================ Statement Hero ============================ */
function CraftHero() {
  const { lang, t } = useLang();
  const flipWords = HERO_FLIP[lang];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CATEGORIES.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % total), 3800);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <section className="relative overflow-hidden">
      {/* ---------- Duplex split hero ---------- */}
      <div className="grid lg:grid-cols-12">
        {/* ===== الناحية الفاتحة ===== */}
        <div className="relative lg:col-span-7">
          <div className="blueprint absolute inset-0" aria-hidden />
          <div
            className="absolute -top-24 start-[-10%] h-[380px] w-[380px] rounded-full bg-teal/10 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute bottom-0 end-[-6%] h-[300px] w-[300px] rounded-full bg-flame/10 blur-3xl"
            aria-hidden
          />

          <div className="relative flex min-h-full items-center px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:pe-4">
            <div className="w-full max-w-2xl lg:ms-auto lg:me-12">
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

              <h1 className="font-display mt-8 text-ink">
                <span
                  className="mask-line text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[1.15] font-black"
                  style={{ "--line-delay": "60ms" } as React.CSSProperties}
                >
                  <span>{t(T.heroA1)}</span>
                </span>
                <span
                  className="mask-line text-[clamp(2.5rem,6.2vw,4.6rem)] leading-[1.14] font-black"
                  style={{ "--line-delay": "180ms" } as React.CSSProperties}
                >
                  <span className="flex items-center gap-3 md:gap-4">
                    <FlipWord words={flipWords} active={active} />
                    <Spark className="h-7 w-7 shrink-0 text-flame md:h-10 md:w-10" />
                  </span>
                </span>
                <span
                  className="mask-line text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[1.15] font-black"
                  style={{ "--line-delay": "300ms" } as React.CSSProperties}
                >
                  <span className="relative inline-block">
                    {t(T.heroA3)}
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

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
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

              <div className="mt-9 flex flex-wrap items-stretch border-t-2 border-ink/10 pt-6">
                {STATS.slice(0, 3).map((v, i) => (
                  <div
                    key={i}
                    className={`py-1 pe-7 md:pe-8 ${i > 0 ? "border-s-2 border-line ps-7 md:ps-8" : ""}`}
                  >
                    <p className="font-display text-3xl font-black text-ink md:text-4xl">
                      <CountUp value={v} suffix={i === 0 ? "+" : ""} />
                    </p>
                    <p className="mt-1 text-[11px] font-bold text-muted">
                      {STATS_LABELS[lang][i]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== الناحية الداكنة — لوحة أقسام حية ===== */}
        <div
          className="relative overflow-hidden bg-ink lg:col-span-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="blueprint-dark absolute inset-0" aria-hidden />
          {CATEGORIES.map((c, i) => (
            <div
              key={c.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={c.image}
                alt={t(c.name)}
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover ${i === active ? "kenburns" : ""}`}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />

          <span
            key={`num-${active}`}
            className="font-display pop-in pointer-events-none absolute top-3 end-4 select-none text-[6.5rem] leading-none font-black text-ghost-light md:text-[8.5rem]"
            dir="ltr"
            aria-hidden
          >
            {CATEGORIES[active].num}
          </span>

          <RotatingBadge
            text="DUPLEX STUDIO • WEB • DESIGN • FILM • GROWTH •"
            className="absolute top-6 -start-9 z-20 hidden h-24 w-24 drop-shadow-2xl lg:block"
          />

          <div className="relative flex h-full min-h-[430px] flex-col justify-end p-6 md:p-9 lg:min-h-[560px]">
            <div key={`info-${active}`} className="pop-in">
              <p
                className="text-[10px] font-black tracking-[0.32em] uppercase md:text-[11px]"
                style={{ color: CATEGORIES[active].color }}
                dir="ltr"
              >
                {CATEGORIES[active].latin}
              </p>
              <h3 className="font-display mt-2 text-3xl font-extrabold text-paper md:text-4xl">
                {t(CATEGORIES[active].name)}
              </h3>
              <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-paper/70 md:text-[15px]">
                {t(CATEGORIES[active].blurb)}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-paper/15 pt-5">
              <Link
                to={`/work/${CATEGORIES[active].id}`}
                className="group inline-flex items-center gap-2 text-sm font-extrabold text-flame transition-colors hover:text-paper"
              >
                {t(T.exploreCat)}
                <ArrowIcon className="rtl-flip h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <span className="text-xs font-bold text-paper/50">
                {projectsByCategory(CATEGORIES[active].id).length} {t(T.depsProjects)}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  aria-label={t(c.name)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-9" : "w-2.5 bg-paper/30 hover:bg-paper/60"
                  }`}
                  style={i === active ? { background: c.color } : undefined}
                />
              ))}
              <span
                className="ms-auto text-[11px] font-bold text-paper/40 tabular-nums"
                dir="ltr"
              >
                0{active + 1} / 0{total}
              </span>
            </div>
          </div>
        </div>
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
