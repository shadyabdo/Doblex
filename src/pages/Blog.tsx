import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import {
  AUTHOR,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  getBlogCategory,
} from "../data/blog";
import { Reveal, Spark } from "../lib/ui";
import BlogCard, { formatDate } from "../components/BlogCard";
import { ArrowIcon } from "../components/icons";

export default function Blog() {
  const { lang, t } = useLang();
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("cat") ?? "";

  useEffect(() => {
    document.title =
      lang === "ar"
        ? `مدونة دوبليكس — مقالات ورؤى رقمية`
        : `Duplex Blog — Digital articles & insights`;
  }, [lang]);

  const filtered = activeCat
    ? BLOG_POSTS.filter((p) => p.categoryId === activeCat)
    : BLOG_POSTS;

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
        <title>
          {lang === "ar" ? "مدونة دوبليكس — مقالات ورؤى" : "Duplex Blog — Articles & Insights"}
        </title>
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
        <p
          className="font-display pointer-events-none absolute -bottom-6 end-0 hidden translate-y-4 text-[8rem] leading-none font-black select-none md:block lg:text-[11rem]"
          style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(11,124,116,0.18)" }}
          aria-hidden
        >
          BLOG
        </p>
        <div className="absolute -top-20 start-[-6%] h-72 w-72 rounded-full bg-teal/10 blur-3xl" aria-hidden />

        <div className="container-x relative py-14 md:py-20">
          <Reveal>
            <nav className="mb-8 flex items-center gap-2 text-xs font-bold text-muted" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-teal">
                {t(T.backHome)}
              </Link>
              <ArrowIcon className="rtl-flip h-3 w-3" />
              <span className="text-teal">{lang === "ar" ? "المدونة" : "Blog"}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full bg-teal-tint px-4 py-1.5 text-xs font-extrabold text-teal">
              <Spark className="h-3.5 w-3.5 text-flame" />
              {lang === "ar" ? "أفكار، قصص، وخبرة" : "Ideas, stories & expertise"}
            </span>

            <h1 className="font-display mt-5 text-4xl leading-[1.1] font-black text-ink md:text-6xl">
              {lang === "ar" ? "مدونة دوبليكس" : "The Duplex Blog"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {lang === "ar"
                ? "كل ما تعلمناه من عشرات المشاريع: رؤى عن التصميم والتطوير والفيديو والتسويق، مكتوبة ببساطة لفريقك ولمشروعك."
                : "Everything we've learned from dozens of projects: insights on design, development, video and marketing — written simply for your team and your business."}
            </p>

            <p className="mt-6 text-sm font-bold text-ink-soft">
              {lang === "ar" ? "بقلم" : "Written by"}{" "}
              <span className="text-teal">{t(AUTHOR)}</span> · {BLOG_POSTS.length}{" "}
              {lang === "ar" ? "مقالة" : "articles"}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Category filter ---------- */}
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
            {lang === "ar" ? "الكل" : "All"}
          </button>
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(activeCat === c.id ? "" : c.id)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-bold transition-all duration-200 ${
                activeCat === c.id
                  ? "border-transparent text-white shadow-md"
                  : "border-line bg-surface text-ink-soft hover:-translate-y-0.5"
              }`}
              style={
                activeCat === c.id
                  ? { background: c.color }
                  : { ["--h" as string]: c.color }
              }
              onMouseEnter={(e) => {
                if (activeCat !== c.id) {
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.color = c.color;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCat !== c.id) {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "";
                }
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: activeCat === c.id ? "#fff" : c.color }}
              />
              {t(c.name)}
            </button>
          ))}
        </div>

        {activeName && (
          <p className="mt-5 text-sm font-bold text-muted">
            {lang === "ar" ? "تصنيف" : "Category"}:{" "}
            <span style={{ color: activeName.color }}>{t(activeName.name)}</span> ·{" "}
            {filtered.length} {lang === "ar" ? "مقالة" : "articles"}
          </p>
        )}
      </section>

      {/* ---------- Featured post ---------- */}
      {featured && (
        <section className="container-x pt-10">
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:shadow-[0_30px_60px_rgba(13,31,51,0.14)] lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
                <img
                  src={featured.image}
                  alt={t(featured.title)}
                  className="img-zoom h-full w-full object-cover"
                />
                <span className="absolute top-4 start-4 rounded-full bg-flame px-3.5 py-1.5 text-[11px] font-extrabold text-white">
                  {lang === "ar" ? "الأحدث" : "Latest"}
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                {(() => {
                  const cat = getBlogCategory(featured.categoryId);
                  return cat ? (
                    <span
                      className="w-fit rounded-full px-3 py-1 text-[11px] font-extrabold"
                      style={{ background: cat.tint, color: cat.color }}
                    >
                      {t(cat.name)}
                    </span>
                  ) : null;
                })()}
                <h2 className="font-display mt-4 text-2xl leading-snug font-extrabold text-ink transition-colors duration-200 group-hover:text-teal md:text-3xl">
                  {t(featured.title)}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  {t(featured.excerpt)}
                </p>
                <p className="mt-5 text-xs font-bold text-ink-soft">
                  {t(AUTHOR)} · {formatDate(featured.date, lang)} ·{" "}
                  {featured.readMinutes} {lang === "ar" ? "دقائق قراءة" : "min read"}
                </p>
                <span className="mt-6 flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-paper transition-all duration-200 group-hover:bg-teal">
                  {lang === "ar" ? "اقرأ المقالة" : "Read article"}
                  <ArrowIcon className="rtl-flip h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ---------- Grid ---------- */}
      <section className="container-x py-14 md:py-16">
        {rest.length === 0 ? (
          <p className="py-16 text-center text-lg font-bold text-muted">
            {lang === "ar" ? "لا توجد مقالات في هذا التصنيف بعد." : "No articles in this category yet."}
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
