import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { AUTHOR, T } from "../data";
import { useContent } from "../lib/content";
import { Reveal } from "../lib/ui";
import { ArrowIcon } from "../components/icons";
import { BlogCard, formatDate } from "../components/project";
import { useTrackView, ViewBadge } from "../lib/views";

export default function Blog() {
  const { lang, t } = useLang();
  const { posts, blogCategories, getBlogCategory } = useContent();
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("cat") ?? "";

  useTrackView("blog");

  const filtered = activeCat ? posts.filter((p) => p.categoryId === activeCat) : posts;
  const featured = !activeCat ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  const setCat = (id: string) => {
    if (id) setParams({ cat: id });
    else setParams({});
  };

  const activeName = activeCat ? getBlogCategory(activeCat) : null;

  return (
    <>
      <Helmet>
        <title>{lang === "ar" ? "مدونة دوبليكس — مقالات ورؤى" : "Duplex Blog — Articles & Insights"}</title>
        <meta
          name="description"
          content={
            lang === "ar"
              ? "مقالات فريق دوبليكس حول تطوير المواقع، التصميم، الفيديو، والتسويق الرقمي."
              : "Articles from the Duplex team on web development, design, video and digital marketing."
          }
        />
      </Helmet>

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div className="absolute -top-20 start-[-6%] h-72 w-72 rounded-full bg-teal/10 blur-3xl" aria-hidden />
        <div className="container-x relative py-14 md:py-20">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-teal uppercase">
              <span className="h-px w-10 bg-flame" />
              {t(T.blogKicker)}
            </p>
            <h1 className="font-display text-4xl leading-[1.1] font-black text-ink md:text-6xl">{t(T.blogPageTitle)}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{t(T.blogPageSub)}</p>
            <p className="mt-6 text-sm font-bold text-ink-soft">
              {t(T.by)} <span className="text-teal">{t(AUTHOR)}</span> · {posts.length}{" "}
              {lang === "ar" ? "مقالة" : "articles"}
            </p>
            <div className="mt-5">
              <ViewBadge viewKey="blog" label={t(T.pageViewsLabel)} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Category filter ---------- */}
      {blogCategories.length > 0 && (
        <section className="container-x pt-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCat("")}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition-all duration-200 ${
                !activeCat
                  ? "border-ink bg-ink text-paper shadow-md"
                  : "border-line bg-surface text-ink-soft hover:border-teal hover:text-teal"
              }`}
            >
              {t(T.all)}
            </button>
            {blogCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(activeCat === c.id ? "" : c.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold transition-all duration-200 ${
                  activeCat === c.id ? "border-transparent text-white shadow-md" : "border-line bg-surface text-ink-soft hover:-translate-y-0.5"
                }`}
                style={activeCat === c.id ? { background: c.color } : undefined}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: activeCat === c.id ? "#fff" : c.color }} />
                {t(c.name)}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Featured ---------- */}
      {featured && (
        <section className="container-x pt-10">
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(13,31,51,0.15)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-paper lg:aspect-auto">
                <img src={featured.image} alt={t(featured.title)} className="img-zoom h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                {(() => {
                  const cat = getBlogCategory(featured.categoryId);
                  return cat ? (
                    <span className="mb-4 inline-flex w-fit rounded-full px-3.5 py-1.5 text-[11px] font-extrabold" style={{ background: cat.tint, color: cat.color }}>
                      {t(cat.name)}
                    </span>
                  ) : null;
                })()}
                <h2 className="font-display text-2xl leading-snug font-extrabold text-ink transition-colors duration-200 group-hover:text-teal md:text-3xl">
                  {t(featured.title)}
                </h2>
                <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{t(featured.excerpt)}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-muted">
                    {formatDate(featured.date, lang)} · {featured.readMinutes} {t(T.readMin)}
                  </span>
                  <span className="flex items-center gap-2 text-sm font-bold text-teal">
                    {lang === "ar" ? "اقرأ المقال" : "Read article"}
                    <ArrowIcon className="rtl-flip h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ---------- Grid ---------- */}
      <section className="container-x py-14 md:py-16">
        {rest.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center text-lg font-bold text-muted">
            {t(T.noPosts)} {activeName ? `— ${t(activeName.name)}` : ""}
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 100}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
