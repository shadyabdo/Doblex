import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import { CONTACT, getCategory, getProject, nextInCategory } from "../data/projects";
import { CountUp, Reveal } from "../lib/ui";
import { ArrowIcon, ExternalIcon, PlayIcon } from "../components/icons";
import { FrameImage } from "../components/Lightbox";
import Lightbox from "../components/Lightbox";
import DemoViewer, { type DemoPage } from "../components/DemoViewer";
import VideoPlayer from "../components/VideoPlayer";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const project = getProject(slug ?? "");

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    setLightboxIndex(null);
    setDemoOpen(false);
    if (project) document.title = `${t(project.title)} — ${t(T.brand)}`;
  }, [slug, project, t]);

  if (!project) return <Navigate to="/" replace />;

  const cat = getCategory(project.category)!;
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
    if (project.category === "websites") {
      return (
        <button
          onClick={() => setDemoOpen(true)}
          className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          style={style}
        >
          <ExternalIcon className="h-4 w-4" />
          {t(T.viewDemo)}
        </button>
      );
    }
    if (project.category === "video") {
      return (
        <button
          onClick={() =>
            document.getElementById("film")?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          style={style}
        >
          <PlayIcon className="h-4 w-4" />
          {t(T.watchFilm)}
        </button>
      );
    }
    return (
      <button
        onClick={openGallery}
        className="flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
        style={style}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="5" width="17" height="14" rx="2" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M4.5 17l4.5-4 3.5 3 3-2.5 4 3.5" />
        </svg>
        {t(project.category === "graphic" ? T.viewDesigns : T.viewCreatives)}
      </button>
    );
  };

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
        <div
          className="absolute -top-24 end-[-6%] h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${cat.color}14` }}
          aria-hidden
        />

        <div className="container-x relative pt-10 pb-12 md:pt-14 md:pb-16">
          <Reveal>
            <Link
              to={`/work/${cat.id}`}
              className="group inline-flex items-center gap-2 text-sm font-bold text-muted transition-colors hover:text-teal"
            >
              <ArrowIcon className="rtl-flip h-4 w-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
              {t(T.backTo)} — <span style={{ color: cat.color }}>{t(cat.name)}</span>
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <span
                  className="inline-flex rounded-full px-4 py-1.5 text-xs font-extrabold"
                  style={{ background: cat.tint, color: cat.color }}
                >
                  {cat.num} — {t(cat.name)}
                </span>
                <h1 className="font-display mt-4 text-4xl leading-[1.12] font-black text-ink md:text-6xl">
                  {t(project.title)}
                </h1>
                <p className="mt-2 text-base font-bold tracking-wide text-muted/80" dir="ltr">
                  {project.title.en}
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  {t(project.tagline)}
                </p>
              </Reveal>
            </div>

            {/* Meta card */}
            <div className="lg:col-span-4">
              <Reveal delay={160}>
                <aside className="rounded-xl border border-line bg-surface p-6 shadow-[0_18px_44px_rgba(13,31,51,0.08)]">
                  <dl className="space-y-4">
                    {[
                      { label: t(T.client), value: t(project.client) },
                      { label: t(T.year), value: String(project.year), ltr: true },
                      { label: t(T.duration), value: t(project.duration) },
                      { label: t(T.department), value: t(cat.name), color: cat.color },
                    ].map((row, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-3.5">
                        <dt className="text-xs font-bold text-muted">{row.label}</dt>
                        <dd
                          className="text-sm font-extrabold text-ink"
                          style={row.color ? { color: row.color } : undefined}
                          dir={row.ltr ? "ltr" : undefined}
                        >
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 mb-2.5 text-xs font-bold text-muted">{t(T.services)}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s, i) => (
                      <span
                        key={i}
                        className="rounded-full px-3 py-1.5 text-[11px] font-bold"
                        style={{ background: cat.tint, color: cat.color }}
                      >
                        {t(s)}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    {actionButton()}
                    {project.demoUrl && project.category === "websites" && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-line py-3 text-sm font-bold text-ink-soft transition-all duration-200 hover:border-teal hover:text-teal"
                      >
                        <ExternalIcon className="h-4 w-4" />
                        {t(T.openExternal)}
                      </a>
                    )}
                  </div>
                </aside>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Hero visual ================= */}
      <section className="container-x mt-10 md:mt-14">
        <Reveal>
          {project.videoUrl ? (
            <div id="film" className="scroll-mt-28">
              <VideoPlayer
                src={project.videoUrl}
                poster={project.image}
                title={t(project.title)}
              />
              <p className="mt-3 text-xs font-semibold text-muted">※ {t(T.filmNote)}</p>
            </div>
          ) : (
            <button
              onClick={openGallery}
              className="group relative block w-full cursor-zoom-in text-start"
              aria-label={t(T.galleryTitle)}
            >
              <FrameImage item={g[0]} url={address} />
              <span
                className="absolute top-4 end-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 md:top-14"
                style={{ background: cat.color }}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M20 20l-4-4M11 8.5v5M8.5 11h5" />
                </svg>
                {t(T.galleryTitle)}
              </span>
            </button>
          )}
        </Reveal>
      </section>

      {/* ================= Overview + side ================= */}
      <section className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display flex items-center gap-3 text-2xl font-extrabold text-ink md:text-3xl">
              <span className="h-8 w-1.5 rounded-full" style={{ background: cat.color }} />
              {t(T.overview)}
            </h2>
          </Reveal>
          {(lang === "ar" ? project.description.ar : project.description.en).map(
            (para, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="mt-6 text-[17px] leading-[1.9] text-ink-soft">{para}</p>
              </Reveal>
            )
          )}

          {project.results && (
            <Reveal delay={120}>
              <div className="mt-12">
                <h3 className="font-display mb-5 text-xl font-extrabold text-ink">
                  {t(T.resultsTitle)}
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {project.results.map((r, i) => (
                    <div
                      key={i}
                      className="group rounded-xl border border-line bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <p className="font-display text-4xl font-black transition-colors" style={{ color: cat.color }}>
                        <CountUp
                          value={r.value}
                          suffix={r.suffix}
                          decimals={r.decimals ?? 0}
                        />
                      </p>
                      <p className="mt-2 text-xs font-bold leading-relaxed text-muted">
                        {t(r.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Sticky side CTA */}
        <div className="lg:col-span-4">
          <Reveal delay={150}>
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-xl bg-teal-deep text-paper">
                <div className="blueprint-dark p-6">
                  <h3 className="font-display text-xl leading-snug font-extrabold">
                    {t(T.ctaTitle)}
                  </h3>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-flame py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-flame-deep"
                  >
                    {t(T.navStart)}
                    <ArrowIcon className="rtl-flip h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="text-xs font-bold text-muted">{t(T.allProjectsIn)}</p>
                <Link
                  to={`/work/${cat.id}`}
                  className="font-display group mt-2 flex items-center justify-between text-lg font-extrabold text-ink transition-colors hover:text-teal"
                >
                  {t(cat.name)}
                  <ArrowIcon className="rtl-flip h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {t(cat.blurb)}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Gallery grid ================= */}
      <section className="border-t border-line bg-surface/60">
        <div className="container-x py-16 md:py-20">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display flex items-center gap-3 text-2xl font-extrabold text-ink md:text-3xl">
                <span className="h-8 w-1.5 rounded-full" style={{ background: cat.color }} />
                {t(T.galleryTitle)}
              </h2>
              <p className="text-xs font-bold text-muted">◈ {t(T.galleryHint)}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 items-start gap-5 lg:grid-cols-4">
            {g.map((item, i) => (
              <Reveal
                key={i}
                delay={(i % 4) * 90}
                className={i === 0 ? "col-span-2 lg:row-span-2" : ""}
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface text-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    i === 0 ? "lg:h-full" : ""
                  }`}
                >
                  <img
                    src={item.src}
                    alt={t(item.caption)}
                    loading="lazy"
                    className={`img-zoom w-full bg-paper object-cover ${
                      i === 0 ? "aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[4/3] object-top"
                    }`}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 start-3 end-3 translate-y-2 text-xs font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {t(item.caption)}
                  </span>
                  <span
                    className="absolute top-3 end-3 flex h-8 w-8 scale-75 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                    style={{ background: cat.color }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Next project ================= */}
      <section className="border-t border-line">
        <Link
          to={`/project/${next.slug}`}
          className="group block bg-surface transition-colors duration-300 hover:bg-paper"
        >
          <div className="container-x flex items-center justify-between gap-6 py-12 md:py-16">
            <div className="min-w-0">
              <p className="mb-2 text-xs font-bold tracking-[0.22em] text-muted uppercase">
                {t(T.nextProject)} — <span style={{ color: cat.color }}>{t(cat.name)}</span>
              </p>
              <h2
                className="font-display truncate text-2xl font-extrabold text-ink transition-colors duration-300 md:text-4xl"
                style={{ ["--hov" as string]: cat.color }}
              >
                <span className="group-hover:text-[var(--hov)]">{t(next.title)}</span>
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

      {/* ================= Modals ================= */}
      {lightboxIndex !== null && (
        <Lightbox
          items={g}
          index={lightboxIndex}
          onIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          url={address}
        />
      )}
      {demoOpen && (
        <DemoViewer pages={demoPages} address={address} onClose={() => setDemoOpen(false)} />
      )}
    </>
  );
}
