import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { AUTHOR, getBlogCategory, type BlogPost } from "../data/blog";
import { ArrowIcon, CalendarIcon, ClockIcon, UserIcon } from "./icons";

export function formatDate(iso: string, lang: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const { lang, t } = useLang();
  const cat = getBlogCategory(post.categoryId);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(13,31,51,0.13)]"
      style={{ ["--card-accent" as string]: cat?.color ?? "#0B7C74" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <img
          src={post.image}
          alt={t(post.title)}
          loading="lazy"
          className="img-zoom h-full w-full object-cover"
        />
        {cat && (
          <Link
            to={`/blog?cat=${cat.id}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3.5 start-3.5 rounded-full px-3 py-1 text-[11px] font-extrabold transition-transform duration-200 hover:scale-105"
            style={{ background: cat.tint, color: cat.color }}
          >
            {t(cat.name)}
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-[11px] font-bold text-muted">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            {formatDate(post.date, lang)}
          </span>
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {post.readMinutes} {lang === "ar" ? "دقائق" : "min"}
          </span>
        </div>

        <h3 className="font-display mt-3 text-lg leading-snug font-extrabold text-ink transition-colors duration-200 group-hover:text-[var(--card-accent)]">
          {t(post.title)}
        </h3>
        <p className="mt-2 mb-5 line-clamp-3 text-sm leading-relaxed text-muted">
          {t(post.excerpt)}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="flex items-center gap-2 text-xs font-bold text-ink-soft">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-tint text-teal">
              <UserIcon className="h-3.5 w-3.5" />
            </span>
            {t(AUTHOR)}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-extrabold text-teal opacity-0 transition-all duration-300 group-hover:opacity-100">
            {lang === "ar" ? "اقرأ" : "Read"}
            <ArrowIcon className="rtl-flip h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
