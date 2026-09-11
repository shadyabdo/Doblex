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
            <h1 className="font-display text-3xl leading-[1.1] font-black text-ink sm:text-4xl md:text-5xl lg:text-6xl">{t(T.blogPageTitle)}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">{t(T.blogPageSub)}</p>
            <p className="mt-4 text-xs font-bold text-ink-soft sm:mt-6 sm:text-sm">
              {t(T.by)} <span className="text-teal">{t(AUTHOR)}</span> · {posts.length}{" "}
              {lang === "ar" ? "مقالة" : "articles"}
            </p>
            <div className="mt-4 sm:mt-5">
              <ViewBadge viewKey="blog" label={t(T.pageViewsLabel)} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Category filter ---------- */}
      {blogCategories.length > 0 && (
        <section className="container-x pt-8 sm:pt-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setCat("")}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all duration-200 sm:px-5 sm:py-2 sm:text-sm ${
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
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200 sm:gap-2 sm:px-5 sm:py-2 sm:text-sm ${
                  activeCat === c.id ? "border-transparent text-white shadow-md" : "border-line bg-surface text-ink-soft hover:-translate-y-0.5"
                }`}
                style={activeCat === c.id ? { background: c.color } : undefined}
              >
                <span className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2" style={{ background: activeCat === c.id ? "#fff" : c.color }} />
                {t(c.name)}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Featured ---------- */}
      {featured && (
        <section className="container-x pt-8 sm:pt-10">
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(13,31,51,0.15)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-paper lg:aspect-auto">
                <img src={featured.image} alt={t(featured.title)} className="img-zoom h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10">
                {(() => {
                  const cat = getBlogCategory(featured.categoryId);
                  return cat ? (
                    <span className="mb-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-extrabold sm:mb-4 sm:px-3.5 sm:py-1.5 sm:text-[11px]" style={{ background: cat.tint, color: cat.color }}>
                      {t(cat.name)}
                    </span>
                  ) : null;
                })()}
                <h2 className="font-display text-xl leading-snug font-extrabold text-ink transition-colors duration-200 group-hover:text-teal sm:text-2xl md:text-3xl">
                  {t(featured.title)}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">{t(featured.excerpt)}</p>
                <div className="mt-4 flex items-center justify-between sm:mt-6">
                  <span className="text-[10px] font-bold text-muted sm:text-xs">
                    {formatDate(featured.date, lang)} · {featured.readMinutes} {t(T.readMin)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-teal sm:gap-2 sm:text-sm">
                    {lang === "ar" ? "اقرأ المقال" : "Read article"}
                    <ArrowIcon className="rtl-flip h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 sm:h-4 sm:w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ---------- Grid ---------- */}
      <section className="container-x py-10 sm:py-12 md:py-14 lg:py-16">
        {rest.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-surface px-4 py-12 text-center text-base font-bold text-muted sm:px-6 sm:py-16 sm:text-lg">
            {t(T.noPosts)} {activeName ? `— ${t(activeName.name)}` : ""}
          </p>
        ) : (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
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
