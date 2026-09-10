import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T, CONTACT } from "../data";
import { useContent } from "../lib/content";
import { CountUp, Reveal } from "../lib/ui";
import { ArrowIcon, ExternalIcon, PlayIcon } from "../components/icons";
import { Lightbox, DemoViewer, VideoPlayer, type DemoPage } from "../components/project";

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

  const actionButton = () => {
    const style = { background: cat.color };
    if (project.category === "video") {
      return (
        <button
          onClick={() => document.getElementById("film")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          style={style}
        >
          <PlayIcon className="h-4 w-4" />
          {t(T.watchFilm)}
        </button>
      );
    }
    return (
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
        style={style}
      >
        <ExternalIcon className="h-4 w-4" />
        {project.category === "graphic" ? t(T.viewDesigns) : t(T.viewDemo)}
      </a>
    );
  };

  const body = project.description[lang].length ? project.description[lang] : project.description.ar;

  return (
    <>
      <Helmet>
        <title>{`${t(project.title)} — ${t(T.brand)}`}</title>
        <meta name="description" content={t(project.tagline)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t(project.title)} />
        <meta property="og:description" content={t(project.tagline)} />
        <meta property="og:image" content={project.image} />
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

            <h1 className="font-display mt-4 text-4xl leading-[1.08] font-black text-ink md:text-6xl">{t(project.title)}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t(project.tagline)}</p>
          </Reveal>
        </div>
      </section>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-12">
        {/* ================= Main column ================= */}
        <div className="space-y-14 lg:col-span-8">
          {/* Overview */}
          <section>
            <Reveal>
              <h2 className="font-display mb-5 flex items-center gap-3 text-2xl font-extrabold text-ink">
                <span className="h-6 w-1.5 rounded-full" style={{ background: cat.color }} />
                {t(T.overview)}
              </h2>
            </Reveal>
            <div className="space-y-5">
              {body.map((para, i) => (
                <Reveal key={i} delay={Math.min(i * 60, 240)}>
                  <p className="leading-[2] text-ink-soft md:text-lg">{para}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Video */}
          {project.videoUrl && (
            <section id="film" className="scroll-mt-28">
              <Reveal>
                <h2 className="font-display mb-5 flex items-center gap-3 text-2xl font-extrabold text-ink">
                  <span className="h-6 w-1.5 rounded-full" style={{ background: cat.color }} />
                  {t(T.filmTitle)}
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <VideoPlayer src={project.videoUrl} poster={project.image} title={t(project.title)} />
                <p className="mt-4 text-sm text-muted">{t(T.filmNote)}</p>
              </Reveal>
            </section>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section>
              <Reveal>
                <h2 className="font-display mb-5 flex items-center gap-3 text-2xl font-extrabold text-ink">
                  <span className="h-6 w-1.5 rounded-full" style={{ background: cat.color }} />
                  {t(T.resultsTitle)}
                </h2>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-3">
                {project.results.map((r, i) => (
                  <Reveal key={i} delay={i * 90}>
                    <div className="rounded-xl border border-line bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <p className="font-display text-4xl font-black" style={{ color: cat.color }}>
                        <CountUp value={r.value} decimals={r.decimals ?? 0} suffix={r.suffix} />
                      </p>
                      <p className="mt-2 text-sm font-semibold text-muted">{t(r.label)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          <section>
            <Reveal>
              <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="font-display flex items-center gap-3 text-2xl font-extrabold text-ink">
                  <span className="h-6 w-1.5 rounded-full" style={{ background: cat.color }} />
                  {t(T.galleryTitle)}
                </h2>
                <p className="text-xs font-semibold text-muted">{t(T.galleryHint)}</p>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
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
                    <span className="absolute bottom-3 start-3 translate-y-2 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-bold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
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
                <div className="p-6">
                  {project.demoUrl && actionButton()}
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
