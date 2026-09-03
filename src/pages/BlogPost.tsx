import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import { AUTHOR } from "../data/blog";
import { useContent } from "../lib/content";
import { Reveal, Spark } from "../lib/ui";
import BlogCard, { formatDate } from "../components/BlogCard";
import { ArrowIcon, CalendarIcon, ClockIcon, UserIcon } from "../components/icons";

export default function BlogPost() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const { posts, getBlogCategory, getBlogPost } = useContent();
  const post = getBlogPost(slug ?? "");

  useEffect(() => {
    if (post) document.title = `${t(post.title)} — ${lang === "ar" ? "مدونة دوبليكس" : "Duplex Blog"}`;
  }, [post, t, lang]);

  if (!post) return <Navigate to="/blog" replace />;

  const cat = getBlogCategory(post.categoryId);
  const body = post.body[lang];
  const related = posts
    .filter((p) => p.categoryId === post.categoryId && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{t(post.title)}</title>
        <meta name="description" content={t(post.excerpt)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t(post.title)} />
        <meta property="og:description" content={t(post.excerpt)} />
        <meta property="og:image" content={post.image} />
        <meta property="article:author" content={t(AUTHOR)} />
      </Helmet>

      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="blueprint absolute inset-0" aria-hidden />
        <div className="container-x relative py-12 md:py-16">
          <Reveal>
            <nav className="mb-7 flex flex-wrap items-center gap-2 text-xs font-bold text-muted" aria-label="Breadcrumb">
              <Link to="/" className="transition-colors hover:text-teal">{t(T.backHome)}</Link>
              <ArrowIcon className="rtl-flip h-3 w-3" />
              <Link to="/blog" className="transition-colors hover:text-teal">
                {lang === "ar" ? "المدونة" : "Blog"}
              </Link>
              <ArrowIcon className="rtl-flip h-3 w-3" />
              <span className="text-teal">{t(post.title)}</span>
            </nav>

            {cat && (
              <Link
                to={`/blog?cat=${cat.id}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold transition-transform duration-200 hover:scale-105"
                style={{ background: cat.tint, color: cat.color }}
              >
                <Spark className="h-3 w-3" />
                {t(cat.name)}
              </Link>
            )}

            <h1 className="font-display mt-5 max-w-4xl text-3xl leading-[1.2] font-black text-ink md:text-5xl">
              {t(post.title)}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-ink-soft">
              <span className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-white">
                  <UserIcon className="h-4 w-4" />
                </span>
                {t(AUTHOR)}
              </span>
              <span className="flex items-center gap-2 text-muted">
                <CalendarIcon className="h-4 w-4 text-teal" />
                {formatDate(post.date, lang)}
              </span>
              <span className="flex items-center gap-2 text-muted">
                <ClockIcon className="h-4 w-4 text-teal" />
                {post.readMinutes} {lang === "ar" ? "دقائق قراءة" : "min read"}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Hero image ---------- */}
      <section className="container-x -mb-6 pt-10">
        <Reveal>
          <div className="overflow-hidden rounded-xl border border-line shadow-[0_30px_70px_rgba(13,31,51,0.16)]">
            <img
              src={post.image}
              alt={t(post.title)}
              className="aspect-[21/9] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ---------- Body ---------- */}
      <section className="container-x max-w-3xl py-12 md:py-16">
        <Reveal>
          <p className="text-lg leading-loose font-semibold text-ink">
            {t(post.excerpt)}
          </p>
          <div className="mt-7 space-y-6">
            {body.map((para, i) => (
              <p key={i} className="text-lg leading-loose text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Tags */}
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-line pt-7">
            <span className="text-sm font-extrabold text-ink">
              {lang === "ar" ? "الوسوم:" : "Tags:"}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-bold text-ink-soft ring-1 ring-line"
                dir="ltr"
              >
                #{tag}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface/70">
          <div className="container-x py-14 md:py-16">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-2xl font-extrabold text-ink md:text-3xl">
                {lang === "ar" ? "مقالات ذات صلة" : "Related articles"}
              </h2>
              <Link
                to="/blog"
                className="flex items-center gap-2 text-sm font-extrabold text-teal transition-colors hover:text-flame"
              >
                {lang === "ar" ? "كل المقالات" : "All articles"}
                <ArrowIcon className="rtl-flip h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
