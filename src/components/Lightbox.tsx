import { useEffect } from "react";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import type { GalleryItem } from "../data/types";
import { ArrowIcon, CloseIcon } from "./icons";

/** عرض الصورة بإطار حسب نوعها: متصفح كامل، قصّة، تفاصيل، أو موبايل */
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
            <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
            </svg>
            <span className="truncate">{url ?? "duplex.studio/preview"}</span>
          </span>
        </div>
        <img src={item.src} alt={alt} className="aspect-[16/10] w-full bg-paper object-cover object-top" />
      </div>
    );
  }

  if (item.type === "crop-top") {
    return (
      <img
        src={item.src}
        alt={alt}
        className="aspect-[21/9] w-full rounded-xl bg-paper object-cover object-top shadow-2xl"
      />
    );
  }

  if (item.type === "crop-detail") {
    return (
      <img
        src={item.src}
        alt={alt}
        className="aspect-[4/3] w-full rounded-xl bg-paper object-cover object-[50%_62%] shadow-2xl"
      />
    );
  }

  /* phone */
  return (
    <div className="mx-auto w-52 overflow-hidden rounded-[2.4rem] border-[7px] border-ink shadow-2xl md:w-60">
      <img src={item.src} alt={alt} className="aspect-[9/18] w-full bg-paper object-cover object-top" />
    </div>
  );
}

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  url?: string;
}

export default function Lightbox({ items, index, onClose, onIndex, url }: LightboxProps) {
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
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-4 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
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

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous"
          className="absolute start-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-paper transition-all duration-200 hover:border-flame hover:bg-flame md:start-6"
        >
          <ArrowIcon className="rtl-flip h-5 w-5 rotate-180" />
        </button>

        <div
          key={index}
          className="pop-in w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <FrameImage item={item} url={url} />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next"
          className="absolute end-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-paper transition-all duration-200 hover:border-flame hover:bg-flame md:end-6"
        >
          <ArrowIcon className="rtl-flip h-5 w-5" />
        </button>
      </div>

      {/* Caption + thumbnails */}
      <div
        className="px-5 pt-4 pb-6 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4 text-center text-sm font-semibold text-paper/80">
          {t(item.caption)}
        </p>
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => onIndex(i)}
              aria-label={`Image ${i + 1}`}
              className={`h-12 w-[72px] shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 ${
                i === index
                  ? "border-flame opacity-100"
                  : "border-transparent opacity-50 hover:opacity-90"
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
