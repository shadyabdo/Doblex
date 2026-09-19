import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";
import { AUTHOR, T } from "../data";
import { useContent } from "../lib/content";
import { Reveal } from "../lib/ui";
import { ArrowIcon, CalendarIcon, ClockIcon, UserIcon } from "../components/icons";
import { BlogCard, formatDate } from "../components/project";
import { extractPostKeywords, generateMetaDescription } from "../lib/seo";
import { FAQAccordion } from "../components/FAQAccordion";
import { parseContent, DataTable, ComparisonTable, type ContentBlock } from "../components/ContentParser";

export default function BlogPost() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const { posts, getBlogPost, getBlogCategory } = useContent();
  const post = getBlogPost(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  const cat = getBlogCategory(post.categoryId);
  const body = post.body[lang].length ? post.body[lang] : post.body.ar;
  const related = posts.filter((p) => p.categoryId === post.categoryId && p.id !== post.id).slice(0, 3);

  // Parse content into blocks - بس النصوص العادية والأسطر المميزة
  const contentBlocks = parseContent(body);
  
  // FAQs و Comparisons من Firestore
  const faqs = post.faqs || [];
  const comparisons = post.comparisons || [];

  // Extract keywords automatically
  const keywords = extractPostKeywords(post);
  const metaDescription = generateMetaDescription(body.join(" "), 160);
  const postUrl = `https://duplex.studio/#/blog/${post.slug}`;

  // نعالج التاريخ بشكل آمن
  let safeDate = post.date;
  try {
    const dateObj = new Date(post.date);
    if (isNaN(dateObj.getTime())) {
      safeDate = new Date().toISOString();
    } else {
      safeDate = dateObj.toISOString();
    }
  } catch {
    safeDate = new Date().toISOString();
  }

  // Structured data for BlogPosting
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t(post.title),
    "description": metaDescription || t(post.excerpt),
    "image": post.image,
    "url": postUrl,
    "datePublished": safeDate,
    "dateModified": safeDate,
    "author": {
      "@type": "Organization",
      "name": "Duplex Studio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Duplex Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.image2url.com/r2/default/images/1788096124951-89c2faca-7359-4beb-9d53-d81a0ffc007b.jfif"
      }
    },
    "keywords": keywords[lang].join(", "),
    "articleBody": body.join(" ")
  };

  return (
    <>
      <Helmet>
        <title>{`${t(post.title)} — ${t(T.navBlog)}`}</title>
        <meta name="description" content={metaDescription || t(post.excerpt)} />
        <meta name="keywords" content={keywords[lang].join(", ")} />
        <meta name="author" content="Duplex Studio" />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t(post.title)} />
        <meta property="og:description" content={metaDescription || t(post.excerpt)} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={postUrl} />
        <meta property="article:published_time" content={safeDate} />
        <meta property="article:author" content="Duplex Studio" />
        {cat && <meta property="article:section" content={t(cat.name)} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t(post.title)} />
        <meta name="twitter:description" content={metaDescription || t(post.excerpt)} />
        <meta name="twitter:image" content={post.image} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={postUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      {/* ---------- Header ---------- */}
      <section className="container-x pt-10 md:pt-14">
        <Reveal>
          <Link to="/blog" className="group mb-8 inline-flex items-center gap-2.5 text-sm font-bold text-muted transition-colors hover:text-teal">
            <ArrowIcon className="rtl-flip h-4 w-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
            {t(T.backBlog)}
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted">
            {cat && (
              <Link
                to={`/blog?cat=${cat.id}`}
                className="rounded-full px-3.5 py-1.5 font-extrabold transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: cat.tint, color: cat.color }}
              >
                {t(cat.name)}
              </Link>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4 text-teal" />
              {formatDate(post.date, lang)}
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4 text-teal" />
              {post.readMinutes} {t(T.readMin)}
            </span>
            <span className="flex items-center gap-1.5">
              <UserIcon className="h-4 w-4 text-teal" />
              {t(AUTHOR)}
            </span>
          </div>

          <h1 className="font-display mt-4 max-w-4xl text-2xl leading-[1.15] font-black text-ink sm:text-3xl md:text-4xl lg:text-5xl">
            {t(post.title)}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed font-medium text-ink-soft sm:mt-5 sm:text-base md:text-lg">{t(post.excerpt)}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-9 overflow-hidden rounded-xl border border-line shadow-[0_30px_60px_rgba(13,31,51,0.12)]">
            <img src={post.image} alt={t(post.title)} className="aspect-[21/9] w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* ---------- Body ---------- */}
      <section className="container-x py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-5 sm:space-y-6">
          {contentBlocks.map((block, i) => {
            const delay = Math.min(i * 60, 240);
            
            return (
              <Reveal key={i} delay={delay}>
                {block.type === "text" && (
                  <p
                    className={`text-sm leading-[1.9] text-ink-soft sm:text-base md:text-lg ${
                      i === 0 ? "border-s-4 ps-4 text-lg font-semibold text-ink sm:ps-5 sm:text-xl md:text-2xl" : ""
                    }`}
                    style={i === 0 ? { borderColor: cat?.color ?? "#0B7C74" } : undefined}
                  >
                    {block.content}
                  </p>
                )}
                
                {block.type === "highlight" && (
                  <div
                    className="relative overflow-hidden rounded-2xl border-2 p-5 sm:p-6 md:p-8"
                    style={{
                      borderColor: cat?.color ?? "#0B7C74",
                      background: `linear-gradient(135deg, ${cat?.tint ?? "#E1F0EE"} 0%, ${cat?.color ?? "#0B7C74"}15 100%)`,
                    }}
                  >
                    <div className="relative z-10 text-center">
                      <p
                        className="font-display text-xl leading-[1.6] font-bold text-ink sm:text-2xl md:text-3xl"
                        style={{ color: cat?.color ?? "#0B7C74" }}
                      >
                        {block.content}
                      </p>
                    </div>
                    <div
                      className="absolute -end-8 -top-8 h-32 w-32 rounded-full opacity-10"
                      style={{ background: cat?.color ?? "#0B7C74" }}
                    />
                    <div
                      className="absolute -bottom-6 -start-6 h-24 w-24 rounded-full opacity-10"
                      style={{ background: cat?.color ?? "#0B7C74" }}
                    />
                  </div>
                )}
                
                {block.type === "callout" && (
                  <div
                    className="relative border-r-4 p-4 sm:p-5 md:p-6"
                    style={{
                      borderColor: cat?.color ?? "#0B7C74",
                      backgroundColor: cat?.tint ?? "#E1F0EE",
                    }}
                  >
                    <p
                      className="text-base leading-[1.8] font-semibold text-ink sm:text-lg"
                      style={{ color: cat?.color ?? "#0B7C74" }}
                    >
                      {block.content}
                    </p>
                  </div>
                )}
                
                {block.type === "faq" && (
                  <FAQAccordion 
                    items={[{ question: block.question, answer: block.answer }]} 
                    color={cat?.color ?? "#0B7C74"} 
                  />
                )}
                
                {block.type === "table" && (
                  <DataTable 
                    headers={block.headers} 
                    rows={block.rows} 
                    color={cat?.color ?? "#0B7C74"} 
                  />
                )}
                
                {block.type === "comparison" && (
                  <ComparisonTable 
                    title={block.title} 
                    items={block.items} 
                    color={cat?.color ?? "#0B7C74"} 
                  />
                )}
              </Reveal>
            );
          })}
          
          {/* FAQs من Firestore */}
          {faqs.length > 0 && (
            <Reveal delay={200}>
              <div className="mt-8 sm:mt-10">
                <h2 className="font-display mb-5 flex items-center gap-2 text-xl font-extrabold text-ink sm:mb-6 sm:text-2xl">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    style={{ color: cat?.color ?? "#0B7C74" }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  {lang === "ar" ? "أسئلة شائعة" : "FAQ"}
                </h2>
                <FAQAccordion items={faqs} color={cat?.color ?? "#0B7C74"} />
              </div>
            </Reveal>
          )}
          
          {/* Comparisons من Firestore */}
          {comparisons.length > 0 && (
            <div className="mt-8 space-y-6 sm:mt-10">
              {comparisons.map((comp, i) => (
                <Reveal key={i} delay={200 + i * 100}>
                  <ComparisonTable 
                    title={comp.title} 
                    items={comp.items} 
                    color={cat?.color ?? "#0B7C74"} 
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {post.tags.length > 0 && (
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-2.5 border-t border-line pt-8">
            {post.tags.map((tag, i) => (
              <span key={i} className="rounded-full bg-teal-tint px-4 py-1.5 text-xs font-bold text-teal-deep">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section className="border-t border-line bg-surface/70">
          <div className="container-x py-10 sm:py-12 md:py-16">
            <h2 className="font-display mb-6 text-xl font-extrabold text-ink sm:mb-8 sm:text-2xl md:text-3xl">{t(T.relatedPosts)}</h2>
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
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
