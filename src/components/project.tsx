import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { T, AUTHOR, type Project, type BlogPost, type GalleryItem } from "../data";
import { useContent } from "../lib/content";
import {
  ArrowIcon,
  CalendarIcon,
  ClockIcon,
  CloseIcon,
  ExternalIcon,
  LockIcon,
  PlayIcon,
  RefreshIcon,
  UserIcon,
} from "./icons";

/* ------------------------- تنسيق التاريخ ------------------------- */
export function formatDate(iso: string, lang: "ar" | "en"): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

/* ============================ ProjectCard ============================ */
export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang();
  const { getCategory } = useContent();
  const cat = getCategory(project.category);

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(13,31,51,0.13)]"
      style={{ ["--card-accent" as string]: cat?.color ?? "#0B7C74" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <img src={project.image} alt={t(project.title)} loading="lazy" className="img-zoom h-full w-full object-cover" />
        {cat && (
          <span
            className="absolute top-3.5 start-3.5 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide"
            style={{ background: cat.tint, color: cat.color }}
          >
            {t(cat.name)}
          </span>
        )}
        {project.videoUrl && (
          <span className="absolute top-3.5 end-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <PlayIcon className="h-3.5 w-3.5" />
          </span>
        )}
        <span
          className="origin-inline-start absolute inset-x-0 bottom-0 h-1 scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: cat?.color ?? "#0B7C74" }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-extrabold text-ink transition-colors duration-200 group-hover:text-[var(--card-accent)]">
            {t(project.title)}
            <span className="mx-2 text-sm font-bold text-muted/60" dir="ltr">{project.year}</span>
          </h3>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-transparent group-hover:bg-[var(--card-accent)] group-hover:text-white">
            <ArrowIcon className="rtl-flip h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{t(project.tagline)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-soft/70">
          {project.client.ar && <span className="rounded-full bg-paper px-2.5 py-1">{t(project.client)}</span>}
          {project.duration.ar && <span className="rounded-full bg-paper px-2.5 py-1">{t(project.duration)}</span>}
        </div>
      </div>
    </Link>
  );
}

/* ============================ BlogCard ============================ */
export function BlogCard({ post }: { post: BlogPost }) {
  const { lang, t } = useLang();
  const { getBlogCategory } = useContent();
  const cat = getBlogCategory(post.categoryId);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(13,31,51,0.13)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-paper">
        <img src={post.image} alt={t(post.title)} loading="lazy" className="img-zoom h-full w-full object-cover" />
        {cat && (
          <span
            className="absolute top-3.5 start-3.5 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide"
            style={{ background: cat.tint, color: cat.color }}
          >
            {t(cat.name)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-extrabold text-ink transition-colors duration-200 group-hover:text-teal">
          {t(post.title)}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{t(post.excerpt)}</p>
        <div className="mt-4 flex items-center gap-3 text-[11px] font-bold text-muted">
          <span className="flex items-center gap-1.5">
            <UserIcon className="h-3.5 w-3.5 text-teal" />
            {t(AUTHOR)}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5 text-teal" />
            {formatDate(post.date, lang)}
          </span>
          <span className="ms-auto flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 text-flame" />
            {post.readMinutes} {t(T.readMin)}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ============================ FrameImage ============================ */
export function FrameImage({ item, url }: { item: GalleryItem; url?: string }) {
  const alt = item.caption.en;

  if (item.type === "full") {
    return (
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5" dir="ltr">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="mx-auto flex min-w-0 max-w-[70%] items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1 text-[11px] font-semibold text-muted">
            <LockIcon className="h-3 w-3 shrink-0 text-jade" />
            <span className="truncate">{url ?? "duplex.studio/preview"}</span>
          </span>
        </div>
        <img src={item.src} alt={alt} className="aspect-[16/10] w-full bg-paper object-cover object-top" />
      </div>
    );
  }

  if (item.type === "crop-top") {
    return (
      <img src={item.src} alt={alt} className="aspect-[21/9] w-full rounded-xl bg-paper object-cover object-top shadow-2xl" />
    );
  }

  if (item.type === "crop-detail") {
    return (
      <img src={item.src} alt={alt} className="aspect-[4/3] w-full rounded-xl bg-paper object-cover object-[50%_62%] shadow-2xl" />
    );
  }

  return (
    <div className="mx-auto w-52 overflow-hidden rounded-[2.4rem] border-[7px] border-ink shadow-2xl md:w-60">
      <img src={item.src} alt={alt} className="aspect-[9/18] w-full bg-paper object-cover object-top" />
    </div>
  );
}

/* ============================ Lightbox ============================ */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
  url,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  url?: string;
}) {
  const { t } = useLang();
  const len = items.length;
  const next = () => onIndex((index + 1) % len);
  const prev = () => onIndex((index - 1 + len) % len);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") (rtl ? prev : next)();
      if (e.key === "ArrowLeft") (rtl ? next : prev)();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, len]);

  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-bold text-paper/70 tabular-nums" dir="ltr">
          {index + 1} / {len}
        </p>
        <button
          onClick={onClose}
          aria-label={t(T.close)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-all duration-200 hover:rotate-90 hover:border-flame hover:bg-flame"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
          className="absolute start-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-paper transition-all duration-200 hover:border-flame hover:bg-flame md:start-6"
        >
          <ArrowIcon className="rtl-flip h-5 w-5 rotate-180" />
        </button>

        <div key={index} className="pop-in w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
          <FrameImage item={item} url={url} />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
          className="absolute end-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-paper transition-all duration-200 hover:border-flame hover:bg-flame md:end-6"
        >
          <ArrowIcon className="rtl-flip h-5 w-5" />
        </button>
      </div>

      <div className="px-5 pt-4 pb-6 md:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="mb-4 text-center text-sm font-semibold text-paper/80">{t(item.caption)}</p>
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => onIndex(i)}
              aria-label={`Image ${i + 1}`}
              className={`h-12 w-[72px] shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 ${
                i === index ? "border-flame opacity-100" : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <img src={it.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ DemoViewer ============================ */
export interface DemoPage {
  label: string;
  item: GalleryItem;
}

export function DemoViewer({ pages, address, onClose }: { pages: DemoPage[]; address: string; onClose: () => void }) {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const len = pages.length;

  const reload = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setRefreshKey((k) => k + 1);
    }, 650);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const page = pages[idx];

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Site demo preview"
      onClick={onClose}
    >
      <div
        className="pop-in flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3" dir="ltr">
          <span className="hidden gap-1.5 sm:flex">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink-soft">
            <LockIcon className="h-3.5 w-3.5 shrink-0 text-jade" />
            <span className="truncate">{address}</span>
            <a
              href={address}
              target="_blank"
              rel="noreferrer"
              aria-label={t(T.openExternal)}
              className="ms-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-teal-tint hover:text-teal"
            >
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          </span>
          <button
            onClick={reload}
            aria-label={t(T.reload)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-teal hover:text-teal"
          >
            <RefreshIcon className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={onClose}
            aria-label={t(T.close)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-all hover:border-flame hover:bg-flame hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-line bg-surface px-3 py-2">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                i === idx ? "bg-teal text-white shadow" : "text-muted hover:bg-paper hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="blueprint min-h-[280px] flex-1 overflow-y-auto bg-paper p-4 md:p-8">
          {loading ? (
            <div className="flex h-72 flex-col gap-3">
              <div className="h-8 w-2/5 animate-pulse rounded-lg bg-line" />
              <div className="flex-1 animate-pulse rounded-xl bg-line/70" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-line" />
            </div>
          ) : (
            <div key={`${idx}-${refreshKey}`} className="pop-in">
              <FrameImage item={page.item} url={address} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIdx((idx - 1 + len) % len)}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-teal hover:text-teal"
            >
              <ArrowIcon className="rtl-flip h-4 w-4 rotate-180" />
            </button>
            <span className="text-xs font-bold text-muted tabular-nums" dir="ltr">
              {idx + 1} / {len}
            </span>
            <button
              onClick={() => setIdx((idx + 1) % len)}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-teal hover:text-teal"
            >
              <ArrowIcon className="rtl-flip h-4 w-4" />
            </button>
          </div>

          <p className="hidden text-[11px] font-semibold text-muted lg:block">{t(T.demoNote)}</p>

          <a
            href={address}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal"
          >
            <ExternalIcon className="h-3.5 w-3.5" />
            {t(T.openExternal)}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================ VideoPlayer ============================ */

/**
 * يحلل رابط الفيديو ويعيد نوعه ورابط التشغيل المناسب
 * يدعم: YouTube, Vimeo, Google Drive, روابط مباشرة (mp4, webm, etc)
 */
function parseVideoUrl(url: string): { type: "youtube" | "vimeo" | "direct" | "other"; embedUrl: string; videoId?: string } {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^&?\/\s]+)/);
  if (youtubeMatch) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`,
      videoId: youtubeMatch[1],
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`,
      videoId: vimeoMatch[1],
    };
  }

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)\/view/);
  if (driveMatch) {
    return {
      type: "other",
      embedUrl: `https://drive.google.com/file/d/${driveMatch[1]}/preview`,
      videoId: driveMatch[1],
    };
  }

  // روابط مباشرة (mp4, webm, ogg, mov)
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)) {
    return { type: "direct", embedUrl: url };
  }

  // أي رابط آخر (افتراضي: embed)
  return { type: "other", embedUrl: url };
}

export function VideoPlayer({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const videoInfo = parseVideoUrl(src);

  return (
    <div className="group/player relative overflow-hidden rounded-xl border border-line bg-ink shadow-[0_30px_60px_rgba(13,31,51,0.25)]">
      {playing ? (
        <>
          {videoInfo.type === "direct" ? (
            <video src={src} poster={poster} controls autoPlay playsInline className="aspect-video w-full bg-ink" />
          ) : (
            <iframe
              src={videoInfo.embedUrl}
              className="aspect-video w-full bg-ink"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={title}
            />
          )}
        </>
      ) : (
        <button onClick={() => setPlaying(true)} className="relative block w-full cursor-pointer text-start" aria-label={`Play: ${title}`}>
          <img
            src={poster}
            alt={title}
            className="aspect-video w-full object-cover opacity-90 transition-all duration-700 group-hover/player:scale-[1.03] group-hover/player:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-flame/35 motion-reduce:hidden" />
              <span className="relative flex h-full w-full items-center justify-center rounded-full bg-flame text-white shadow-[0_12px_40px_rgba(232,89,12,0.5)] transition-transform duration-300 group-hover/player:scale-110">
                <PlayIcon className="h-8 w-8 translate-x-0.5" />
              </span>
            </span>
          </span>
          <span className="absolute bottom-4 start-4 flex items-center gap-2">
            <span className="rounded-full bg-ink/75 px-3.5 py-1.5 text-xs font-bold text-paper backdrop-blur-sm">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
