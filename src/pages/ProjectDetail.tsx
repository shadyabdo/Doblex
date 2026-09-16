import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T, CONTACT } from "../data";
import { useContent } from "../lib/content";
import { CountUp, Reveal } from "../lib/ui";
import { ArrowIcon, ExternalIcon, PlayIcon, detectUrlIcon, TargetIcon, TrophyIcon } from "../components/icons";
import { Lightbox, DemoViewer, VideoPlayer, type DemoPage } from "../components/project";
import { extractProjectKeywords, generateMetaDescription } from "../lib/seo";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const { getCategory, getProject, nextInCategory } = useContent();
  const project = getProject(slug ?? "");

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    setLightboxIndex(null);
    setDemoOpen(false);
    if (project) document.title = `${t(project.title)} — ${t(T.brand)}`;
  }, [slug, project, t]);

  if (!project) return <Navigate to="/" replace />;

  const cat =
    getCategory(project.category) ??
    ({
      id: project.category,
      num: "",
      name: { ar: "", en: "" },
      latin: "",
      blurb: { ar: "", en: "" },
      image: "",
      color: "#0B7C74",
      tint: "#E1F0EE",
    } as const);
  const next = nextInCategory(project);
  const address = project.demoUrl ?? `duplex.studio/demo/${project.slug}`;
  const g = project.gallery;

  const demoPages: DemoPage[] = [
    { label: t(T.pageHome), item: g[0] },
    { label: t(T.pageServices), item: g[1] ?? g[0] },
    { label: t(T.pageGallery), item: g[2] ?? g[0] },
    { label: t(T.pageContact), item: g[3] ?? g[0] },
  ];

  const openGallery = () => setLightboxIndex(0);

  const actionButtons = () => {
    const style = { background: cat.color };
    const buttons = [];
    
    // أزرار روابط المشروع - يظهر كل رابط كزر منفصل مع الأيقونة المناسبة
    if (project.demoLinks && project.demoLinks.length > 0) {
      project.demoLinks.forEach((link, i) => {
        const IconComponent = detectUrlIcon(link.url);
        buttons.push(
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:py-4 lg:text-base"
            style={style}
          >
            <IconComponent className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" />
            <span className="truncate max-w-[calc(100%-2rem)]">{t(link.label)}</span>
            {/* Tooltip */}
            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:mb-3">
              <div className="whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-paper shadow-xl lg:px-4 lg:py-2.5 lg:text-sm">
                {link.url}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-ink"></div>
              </div>
            </div>
          </a>
        );
      });
    } else if (project.category === "video" && project.videoUrl) {
      // زر الفيديو - يظهر فقط إذا كان فيديو بدون demoLinks
      buttons.push(
        <button
          key="video"
          onClick={() => document.getElementById("film")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl lg:py-4 lg:text-base"
          style={style}
        >
          <PlayIcon className="h-4 w-4 lg:h-5 lg:w-5" />
          {t(T.watchFilm)}
        </button>
      );
    }
    
    return buttons;
  };

  const body = project.description[lang].length ? project.description[lang] : project.description.ar;

  // Extract keywords automatically
  const keywords = extractProjectKeywords(project);
  const metaDescription = generateMetaDescription(body.join(" "), 160);
  const projectUrl = `https://duplex.studio/#/project/${project.slug}`;

  // Structured data for CreativeWork
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": t(project.title),
    "description": t(project.tagline),
    "image": project.image,
    "url": projectUrl,
    "dateCreated": String(project.year),
    "creator": {
      "@type": "Organization",
      "name": "Duplex Studio"
    },
    "category": t(cat.name),
    "keywords": keywords[lang].join(", ")
  };

  return (
    <>
      <Helmet>
        <title>{`${t(project.title)} — ${t(T.brand)}`}</title>
        <meta name="description" content={metaDescription || t(project.tagline)} />
        <meta name="keywords" content={keywords[lang].join(", ")} />
        <meta name="author" content="Duplex Studio" />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t(project.title)} />
        <meta property="og:description" content={metaDescription || t(project.tagline)} />
        <meta property="og:image" content={project.image} />
        <meta property="og:url" content={projectUrl} />
        <meta property="article:published_time" content={new Date(project.year, 0, 1).toISOString()} />
        <meta property="article:author" content="Duplex Studio" />
        <meta property="article:section" content={t(cat.name)} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t(project.title)} />
        <meta name="twitter:description" content={metaDescription || t(project.tagline)} />
        <meta name="twitter:image" content={project.image} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={projectUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      </Helmet>

      {/* ================= Header ================= */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div className="absolute -top-16 start-[-6%] h-64 w-64 rounded-full blur-3xl" style={{ background: `${cat.color}1a` }} aria-hidden />

        <div className="container-x relative py-12 md:py-16">
          <Reveal>
            <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-muted" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-teal">{t(T.backHome)}</Link>
              <ArrowIcon className="rtl-flip h-3 w-3" />
              {cat.name.ar && (
                <>
                  <Link to={`/work/${cat.id}`} className="transition-colors hover:text-teal" style={{ color: cat.color }}>
                    {t(cat.name)}
                  </Link>
                  <ArrowIcon className="rtl-flip h-3 w-3" />
                </>
              )}
              <span className="text-ink-soft">{t(project.title)}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold" style={{ background: cat.tint, color: cat.color }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
              {t(cat.name)} · {project.year}
            </span>

            <h1 className="font-display mt-3 text-2xl leading-[1.1] font-black text-ink sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">{t(project.title)}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">{t(project.tagline)}</p>
          </Reveal>
        </div>
      </section>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-12">
        {/* ================= Main column ================= */}
        <div className="space-y-14 lg:col-span-8">
          {/* Overview */}
          <section>
            <Reveal>
              <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-5 sm:gap-3 sm:text-2xl">
                <span className="h-5 w-1.5 rounded-full sm:h-6" style={{ background: cat.color }} />
                {t(T.overview)}
              </h2>
            </Reveal>
            <div className="space-y-4 sm:space-y-5">
              {body.map((para, i) => (
                <Reveal key={i} delay={Math.min(i * 60, 240)}>
                  <p className="text-sm leading-[1.9] text-ink-soft sm:text-base md:text-lg">{para}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Implementation Details */}
          {project.details && (project.details.ar.length > 0 || project.details.en.length > 0) && (
            <section>
              <Reveal>
                <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-5 sm:gap-3 sm:text-2xl">
                  <span className="h-5 w-1.5 rounded-full sm:h-6" style={{ background: cat.color }} />
                  {lang === "ar" ? "تفاصيل التنفيذ" : "Implementation Details"}
                </h2>
              </Reveal>
              <div className="space-y-4 sm:space-y-5">
                {(project.details[lang].length > 0 ? project.details[lang] : project.details.ar).map((para, i) => (
                  <Reveal key={i} delay={Math.min(i * 60, 240)}>
                    <p className="text-sm leading-[1.9] text-ink-soft sm:text-base md:text-lg">{para}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Goals */}
          {project.goals && project.goals.length > 0 && (
            <section>
              <Reveal>
                <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-5 sm:gap-3 sm:text-2xl">
                  <TargetIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span style={{ color: cat.color }}>{lang === "ar" ? "الأهداف" : "Goals"}</span>
                </h2>
              </Reveal>
              <div className="space-y-3">
                {project.goals.map((goal, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-9 sm:w-9 sm:text-sm"
                        style={{ background: cat.tint, color: cat.color }}
                      >
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{t(goal)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {project.achievements && project.achievements.length > 0 && (
            <section>
              <Reveal>
                <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-5 sm:gap-3 sm:text-2xl">
                  <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span style={{ color: cat.color }}>{lang === "ar" ? "الإنجازات" : "Achievements"}</span>
                </h2>
              </Reveal>
              <div className="space-y-3">
                {project.achievements.map((achievement, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-9 sm:w-9 sm:text-sm"
                        style={{ background: cat.tint, color: cat.color }}
                      >
                        ✓
                      </span>
                      <p className="text-sm leading-relaxed text-ink-soft sm:text-base">{t(achievement)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {project.videoUrl && (
            <section id="film" className="scroll-mt-28">
              <Reveal>
                <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-5 sm:gap-3 sm:text-2xl">
                  <span className="h-5 w-1.5 rounded-full sm:h-6" style={{ background: cat.color }} />
                  {t(T.filmTitle)}
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <VideoPlayer src={project.videoUrl} poster={project.image} title={t(project.title)} />
                <p className="mt-3 text-xs text-muted sm:mt-4 sm:text-sm">{t(T.filmNote)}</p>
              </Reveal>
            </section>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section>
              <Reveal>
                <h2 className="font-display mb-4 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-5 sm:gap-3 sm:text-2xl">
                  <span className="h-5 w-1.5 rounded-full sm:h-6" style={{ background: cat.color }} />
                  {t(T.resultsTitle)}
                </h2>
              </Reveal>
              <div className="grid gap-3 sm:gap-5 sm:grid-cols-3">
                {project.results.map((r, i) => (
                  <Reveal key={i} delay={i * 90}>
                    <div className="rounded-xl border border-line bg-surface p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5 md:p-6">
                      <p className="font-display text-3xl font-black sm:text-4xl" style={{ color: cat.color }}>
                        <CountUp value={r.value} decimals={r.decimals ?? 0} suffix={r.suffix} />
                      </p>
                      <p className="mt-1.5 text-xs font-semibold text-muted sm:mt-2 sm:text-sm">{t(r.label)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          <section>
            <Reveal>
              <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5 sm:gap-4">
                <h2 className="font-display flex items-center gap-2 text-xl font-extrabold text-ink sm:gap-3 sm:text-2xl">
                  <span className="h-5 w-1.5 rounded-full sm:h-6" style={{ background: cat.color }} />
                  {t(T.galleryTitle)}
                </h2>
                <p className="text-[10px] font-semibold text-muted sm:text-xs">{t(T.galleryHint)}</p>
              </div>
            </Reveal>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {g.map((item, i) => (
                <Reveal key={i} delay={(i % 2) * 90} className={i === 0 ? "sm:col-span-2" : ""}>
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface text-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i === 0 ? "lg:h-full" : ""}`}
                  >
                    <img
                      src={item.src}
                      alt={t(item.caption)}
                      loading="lazy"
                      className={`img-zoom w-full object-cover ${i === 0 ? "aspect-[16/8]" : "aspect-[16/10]"}`}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-2 start-2 translate-y-2 rounded-full bg-paper/90 px-2 py-1 text-[10px] font-bold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-3 sm:start-3 sm:px-3 sm:py-1.5 sm:text-xs">
                      {t(item.caption)}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
        </div>

        {/* ================= Sidebar ================= */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <Reveal>
              <div className="overflow-hidden rounded-xl border border-line bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden bg-paper">
                  <img src={project.image} alt={t(project.title)} className="img-zoom h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-6">
                  {actionButtons()}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-xl border border-line bg-surface p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-bold tracking-[0.18em] text-muted uppercase">{t(T.client)}</dt>
                    <dd className="mt-1 font-bold text-ink">{t(project.client)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold tracking-[0.18em] text-muted uppercase">{t(T.year)}</dt>
                    <dd className="mt-1 font-bold text-ink" dir="ltr">{project.year}</dd>
                  </div>
                  {project.duration.ar && (
                    <div>
                      <dt className="text-xs font-bold tracking-[0.18em] text-muted uppercase">{t(T.duration)}</dt>
                      <dd className="mt-1 font-bold text-ink">{t(project.duration)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </Reveal>

            {project.services.length > 0 && (
              <Reveal delay={180}>
                <div className="rounded-xl border border-line bg-surface p-6">
                  <p className="mb-4 text-xs font-bold tracking-[0.18em] text-muted uppercase">{t(T.services)}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s, i) => (
                      <span key={i} className="rounded-full px-3.5 py-1.5 text-xs font-bold" style={{ background: cat.tint, color: cat.color }}>
                        {t(s)}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </aside>
      </div>

      {/* ================= Next project ================= */}
      {next && (
        <section className="border-t border-line">
          <Link to={`/project/${next.slug}`} className="group block bg-surface transition-colors duration-300 hover:bg-paper">
            <div className="container-x flex items-center justify-between gap-6 py-12 md:py-16">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-bold tracking-[0.22em] text-muted uppercase">
                  {t(T.nextProject)} — <span style={{ color: cat.color }}>{t(cat.name)}</span>
                </p>
                <h2 className="font-display truncate text-2xl font-extrabold text-ink transition-colors duration-300 md:text-4xl">
                  <span className="group-hover:text-[var(--hov)]" style={{ ["--hov" as string]: cat.color }}>
                    {t(next.title)}
                  </span>
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <img
                  src={next.image}
                  alt={t(next.title)}
                  loading="lazy"
                  className="hidden h-20 w-32 rotate-2 rounded-lg border border-line object-cover shadow-md transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105 sm:block"
                />
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ background: cat.color }}
                >
                  <ArrowIcon className="rtl-flip h-6 w-6" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ================= Overlays ================= */}
      {lightboxIndex !== null && (
        <Lightbox items={g} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onIndex={setLightboxIndex} url={address} />
      )}
      {demoOpen && <DemoViewer pages={demoPages} address={address} onClose={() => setDemoOpen(false)} />}
    </>
  );
}
