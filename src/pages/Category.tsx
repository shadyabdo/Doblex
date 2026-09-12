import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T } from "../data";
import { useContent } from "../lib/content";
import { Reveal } from "../lib/ui";
import { ArrowIcon } from "../components/icons";
import { ProjectCard, VideoPlayer } from "../components/project";
import { useTrackView, ViewBadge } from "../lib/views";

export default function Category() {
  const { categoryId } = useParams();
  const { t } = useLang();
  const { categories, getCategory, projectsByCategory } = useContent();
  const cat = getCategory(categoryId ?? "");

  useTrackView(cat ? `work_${cat.id}` : null);

  if (!cat) return <Navigate to="/" replace />;

  const projects = projectsByCategory(cat.id);
  const years = projects.map((p) => p.year);
  const yearRange = years.length
    ? Math.min(...years) === Math.max(...years)
      ? `${Math.min(...years)}`
      : `${Math.min(...years)} – ${Math.max(...years)}`
    : "—";
  const others = categories.filter((c) => c.id !== cat.id);

  return (
    <>
      <Helmet>
        <title>{`${t(cat.name)} — ${t(T.brand)}`}</title>
        <meta name="description" content={t(cat.blurb)} />
      </Helmet>

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="blueprint absolute inset-0" aria-hidden />
        <p
          className="font-display pointer-events-none absolute -bottom-6 end-0 hidden translate-y-4 text-[9rem] leading-none font-black select-none md:block lg:text-[12rem]"
          style={{ color: "transparent", WebkitTextStroke: `1.5px ${cat.color}33` }}
          aria-hidden
        >
          {cat.latin || cat.id}
        </p>
        <div className="absolute -top-20 start-[-6%] h-72 w-72 rounded-full blur-3xl" style={{ background: `${cat.color}1a` }} aria-hidden />

        <div className="container-x relative py-14 md:py-20">
          <Reveal>
            <nav className="mb-8 flex items-center gap-2 text-xs font-bold text-muted" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-teal">
                {t(T.backHome)}
              </Link>
              <ArrowIcon className="rtl-flip h-3 w-3" />
              <span style={{ color: cat.color }}>{t(cat.name)}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold" style={{ background: cat.tint, color: cat.color }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
              {cat.num} — {t(T.department)}
            </span>

            <h1 className="font-display mt-4 text-3xl leading-[1.1] font-black text-ink sm:text-4xl md:text-5xl lg:text-6xl">{t(cat.name)}</h1>
            {cat.latin && (
              <p className="mt-1.5 text-base font-bold tracking-wide text-muted sm:mt-2 sm:text-lg" dir="ltr">
                {cat.latin}
              </p>
            )}

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">{t(cat.blurb)}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-extrabold">
              <ViewBadge viewKey={`work_${cat.id}`} label={t(T.pageViewsLabel)} />
              <span className="rounded-full px-4 py-2" style={{ background: cat.tint, color: cat.color }}>
                {projects.length} {t(T.catCount)}
              </span>
              {projects.length > 0 && (
                <span className="rounded-full border border-line bg-surface px-4 py-2 text-ink-soft" dir="ltr">
                  {yearRange}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Videos ---------- */}
      {(() => {
        const videoProjects = projects.filter((p) => p.videoUrl);
        if (videoProjects.length === 0) return null;
        return (
          <section className="border-b border-line bg-ink text-paper">
            <div className="container-x py-16 md:py-20">
              <Reveal>
                <p className="mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase" style={{ color: cat.color }}>
                  <span className="h-px w-10 bg-flame" />
                  {t(T.videosKicker)}
                </p>
                <h2 className="font-display text-3xl font-extrabold md:text-4xl">{t(T.videosTitle)}</h2>
              </Reveal>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                {videoProjects.map((p, i) => (
                  <Reveal key={p.id} delay={i * 120}>
                    <div>
                      <VideoPlayer src={p.videoUrl!} poster={p.image} title={t(p.title)} />
                      <div className="mt-4">
                        <h3 className="font-display text-lg font-extrabold">{t(p.title)}</h3>
                        <p className="mt-1 text-sm text-paper/60">{t(p.tagline)}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ---------- Projects ---------- */}
      <section className="container-x py-10 sm:py-12 md:py-16 lg:py-20">
        {projects.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-surface px-4 py-12 text-center text-base font-bold text-muted sm:px-6 sm:py-16 sm:text-lg">
            {t(T.workEmpty)}
          </p>
        ) : (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 110}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Other departments ---------- */}
      {others.length > 0 && (
        <section className="border-t border-line bg-surface/70">
          <div className="container-x py-10 sm:py-12 md:py-14">
            <p className="mb-4 text-xs font-bold tracking-[0.22em] text-muted uppercase sm:mb-6">{t(T.otherCats)}</p>
            <div className="grid gap-3 sm:gap-4">
              {others.map((c, i) => (
                <Reveal key={c.id} delay={i * 90}>
                  <Link
                    to={`/work/${c.id}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:gap-4 sm:p-5"
                    style={{ ["--hov" as string]: c.color }}
                  >
                    <span className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black sm:h-11 sm:w-11 sm:text-sm" style={{ background: c.tint, color: c.color }}>
                        {c.num}
                      </span>
                      <span className="min-w-0">
                        <span className="font-display block truncate text-sm font-extrabold text-ink transition-colors group-hover:text-[var(--hov)] sm:text-base">
                          {t(c.name)}
                        </span>
                        <span className="block text-[10px] font-bold text-muted sm:text-xs">
                          {projectsByCategory(c.id).length} {t(T.depsProjects)}
                        </span>
                      </span>
                    </span>
                    <ArrowIcon className="rtl-flip h-3.5 w-3.5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--hov)] sm:h-4 sm:w-4" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
