/**
 * عداد مشاهدات الصفحات — مربوط بـ Firestore.
 *
 * يُخزَّن في مستند منفصل `dashboards/dublex-views` (نفس مجموعة المحتوى لكن
 * مستند مستقل) حتى لا يتعارض مع كتابة الداشبورد للمحتوى في `dublex-main`.
 *
 * الهيكل:
 *   { total: number, pages: { [pageKey]: number } }
 *
 * - القراءة: عبر SDK (onSnapshot) مع بديل REST لو SDK اتحجب.
 * - الكتابة: عبر `updateDoc` + `increment()` (ذري وآمن مع كتابات متزامنة).
 * - أي فشل (قواعد أمان/شبكة) يتم ابتلاعه بصمت — العداد يعرض صفر والموقع يعمل.
 */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { CONTENT_COLLECTION, PROJECT_ID, db, ensureAuth } from "./firebase";
import { EyeIcon } from "../components/icons";
import { CountUp } from "./ui";

const VIEWS_DOC = "dublex-views";

/** يحوّل مفتاح الصفحة لاسم حقل صالح في Firestore (بدون / أو نقاط) */
export function safeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9_]/g, "_");
}

/** يزيد مشاهدة صفحة واحدة + الإجمالي (ذريًا) */
export async function trackView(rawKey: string): Promise<void> {
  const key = safeKey(rawKey);
  if (!db) return;
  await ensureAuth();
  const ref = doc(db, CONTENT_COLLECTION, VIEWS_DOC);
  try {
    await updateDoc(ref, {
      [`pages.${key}`]: increment(1),
      total: increment(1),
    });
  } catch {
    // المستند غير موجود بعد — أنشئه ثم أعد المحاولة
    try {
      await setDoc(ref, { total: 1, pages: { [key]: 1 } }, { merge: true });
    } catch {
      /* ignore */
    }
  }
}

/* ------------------------- قراءة بديلة REST ------------------------- */
interface RawViews {
  fields?: {
    total?: { integerValue?: string | number; doubleValue?: number };
    pages?: {
      mapValue?: { fields?: Record<string, { integerValue?: string | number; doubleValue?: number }> };
    };
  };
}

async function fetchViewsViaRest(): Promise<{ total: number; pages: Record<string, number> } | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${CONTENT_COLLECTION}/${VIEWS_DOC}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = (await res.json()) as RawViews;
  const num = (v?: { integerValue?: string | number; doubleValue?: number }) =>
    v?.integerValue !== undefined ? Number(v.integerValue) : v?.doubleValue ?? 0;
  const pages: Record<string, number> = {};
  for (const [k, v] of Object.entries(json.fields?.pages?.mapValue?.fields ?? {})) {
    pages[k] = num(v);
  }
  return { total: num(json.fields?.total), pages };
}

/* ----------------------------- المزوّد ----------------------------- */
interface ViewsValue {
  views: Record<string, number>;
  total: number;
}

const ViewsContext = createContext<ViewsValue>({ views: {}, total: 0 });

export function ViewsProvider({ children }: { children: ReactNode }) {
  const [views, setViews] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const gotData = useRef(false);

  useEffect(() => {
    let unsub: Unsubscribe | null = null;
    let cancelled = false;

    const apply = (v: Record<string, number>, t: number) => {
      if (cancelled) return;
      gotData.current = true;
      setViews(v);
      setTotal(t);
    };

    const restAttempt = async () => {
      try {
        const r = await fetchViewsViaRest();
        if (r) apply(r.pages, r.total);
      } catch {
        /* ignore */
      }
    };

    const fs = db;
    if (fs) {
      ensureAuth().finally(() => {
        if (cancelled) return;
        try {
          unsub = onSnapshot(
            doc(fs, CONTENT_COLLECTION, VIEWS_DOC),
            (snap) => {
              if (snap.exists()) {
                const d = snap.data() as { total?: number; pages?: Record<string, number> };
                apply(d.pages ?? {}, d.total ?? 0);
              } else {
                apply({}, 0);
                gotData.current = true;
              }
            },
            () => {
              if (!gotData.current) void restAttempt();
            }
          );
        } catch {
          void restAttempt();
        }
      });
      // تأمين: لو SDK صامت جرّب REST
      const t1 = setTimeout(() => {
        if (!gotData.current) void restAttempt();
      }, 3500);
      return () => {
        cancelled = true;
        clearTimeout(t1);
        if (unsub) unsub();
      };
    }

    void restAttempt();
    return () => {
      cancelled = true;
    };
  }, []);

  return <ViewsContext.Provider value={{ views, total }}>{children}</ViewsContext.Provider>;
}

export function useViews(): ViewsValue {
  return useContext(ViewsContext);
}

/** يسجّل مشاهدة واحدة لكل mount للمفتاح المعطى (يحترم StrictMode) */
export function useTrackView(rawKey: string | null): void {
  const tracked = useRef(false);
  useEffect(() => {
    if (!rawKey || tracked.current) return;
    tracked.current = true;
    void trackView(rawKey);
  }, [rawKey]);
}

/* ----------------------------- العرض ----------------------------- */
function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

/** شارة عداد مشاهدة لصفحة معينة (أيقونة عين + رقم) */
export function ViewBadge({
  viewKey,
  label,
  tone = "light",
  className = "",
}: {
  viewKey: string;
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const { views } = useViews();
  const count = views[safeKey(viewKey)] ?? 0;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold tabular-nums ${
        tone === "dark"
          ? "border-paper/20 bg-paper/10 text-paper/85"
          : "border-line bg-surface text-ink-soft shadow-sm"
      } ${className}`}
      title={label}
    >
      <EyeIcon className={`h-4 w-4 ${tone === "dark" ? "text-flame" : "text-teal"}`} />
      <CountUp value={count} duration={900} />
      {label && <span className={tone === "dark" ? "text-paper/60" : "text-muted"}>{label}</span>}
    </span>
  );
}

/** شارة إجمالي المشاهدات (توضع في أعلى الصفحة/الهيدر) */
export function TotalViewBadge({
  label,
  tone = "light",
  className = "",
}: {
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const { total } = useViews();

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold tabular-nums ${
        tone === "dark"
          ? "border-paper/20 bg-paper/10 text-paper/85"
          : "border-line bg-surface text-ink-soft shadow-sm"
      } ${className}`}
      title={label}
    >
      <EyeIcon className={`h-4 w-4 ${tone === "dark" ? "text-flame" : "text-teal"}`} />
      <span className="font-extrabold">{formatCount(total)}</span>
      {label && <span className={tone === "dark" ? "text-paper/60" : "text-muted"}>{label}</span>}
    </span>
  );
}
