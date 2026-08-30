import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import { T } from "../data/translations";
import type { GalleryItem } from "../data/types";
import { FrameImage } from "./Lightbox";
import { ArrowIcon, CloseIcon, ExternalIcon, LockIcon, RefreshIcon } from "./icons";

export interface DemoPage {
  label: string;
  item: GalleryItem;
}

interface DemoViewerProps {
  pages: DemoPage[];
  address: string;
  onClose: () => void;
}

/** معاينة الموقع داخل إطار متصفح تفاعلي — مع تبويبات صفحات ورابط ديمو خارجي */
export default function DemoViewer({ pages, address, onClose }: DemoViewerProps) {
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
        {/* Browser top bar */}
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

        {/* Page tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-line bg-surface px-3 py-2">
          {pages.map((p, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                i === idx
                  ? "bg-teal text-white shadow"
                  : "text-muted hover:bg-paper hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Page content */}
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

        {/* Bottom bar */}
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

          <p className="hidden text-[11px] font-semibold text-muted lg:block">
            {t(T.demoNote)}
          </p>

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
