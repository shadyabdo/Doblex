import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {
  db,
  ensureAuth,
  PROJECT_ID,
  CONTENT_COLLECTION,
  CONTENT_DOC,
} from "./firebase";
import { needsEn, translateTexts } from "./translator";
import type {
  Category,
  GalleryItem,
  LText,
  Project,
  ResultStat,
  BlogCategory,
  BlogPost,
} from "../data";

/* ------------------------------------------------------------------ */
/*  لوحات ألوان وصور احتياطية                                           */
/* ------------------------------------------------------------------ */
const PALETTE = [
  { color: "#0B7C74", tint: "#E1F0EE" },
  { color: "#E8590C", tint: "#FDEADD" },
  { color: "#1C64D9", tint: "#E4EDFB" },
  { color: "#0C8A5C", tint: "#E0F2EA" },
  { color: "#C2410C", tint: "#FDEADD" },
  { color: "#7C3AED", tint: "#EFE9FD" },
];

const u = (id: string, w = 1280, h = 832) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
const FALLBACK_IMGS = [
  u("photo-1497366216548-37526070297c"),
  u("photo-1461749280684-dccba630e2f6"),
  u("photo-1561070791-2526d30994b5"),
  u("photo-1492691527719-9d1e07e534b4"),
  u("photo-1460925895917-afdab827c52f"),
  u("photo-1522071820081-009f0129c71c"),
];

/* ------------------------------------------------------------------ */
/*  أدوات تطبيع مرنة — تتعامل مع أي شكل حقول قادم من الداشبورد           */
/* ------------------------------------------------------------------ */
const str = (v: unknown): string =>
  v == null ? "" : typeof v === "string" ? v : String(v);

function toLText(v: unknown): LText {
  if (v == null) return { ar: "", en: "" };
  if (typeof v === "string") return { ar: v, en: v };
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const ar = str(o.ar ?? o.arabic ?? o.title_ar ?? o.name_ar ?? o.text_ar);
    const en = str(o.en ?? o.english ?? o.title_en ?? o.name_en ?? o.text_en);
    if (ar || en) return { ar: ar || en, en: en || ar };
  }
  return { ar: str(v), en: str(v) };
}

function toParagraphs(v: unknown): { ar: string[]; en: string[] } {
  const split = (s: string) =>
    s.split(/\n+/).map((x) => x.trim()).filter(Boolean);
  if (v == null) return { ar: [], en: [] };
  if (typeof v === "string") {
    const p = split(v);
    return { ar: p, en: p };
  }
  if (Array.isArray(v)) {
    const p = v.map((x) => str(x)).filter(Boolean);
    return { ar: p, en: p };
  }
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    const norm = (x: unknown) =>
      Array.isArray(x) ? x.map((y) => str(y)).filter(Boolean) : split(str(x));
    const ar = norm(o.ar ?? o.arabic);
    const en = norm(o.en ?? o.english);
    return { ar: ar.length ? ar : en, en: en.length ? en : ar };
  }
  return { ar: [], en: [] };
}

function toLTextList(v: unknown): LText[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => toLText(x)).filter((x) => x.ar || x.en);
}

function toGallery(v: unknown, fallback: string): GalleryItem[] {
  const make = (src: string, i: number): GalleryItem => ({
    src,
    type: i === 0 ? "full" : i % 3 === 1 ? "crop-top" : i % 3 === 2 ? "crop-detail" : "phone",
    caption: { ar: `لقطة ${i + 1}`, en: `Shot ${i + 1}` },
  });
  if (Array.isArray(v) && v.length) {
    return v
      .map((x) =>
        typeof x === "string"
          ? x
          : str(
              (x as Record<string, unknown>)?.src ??
                (x as Record<string, unknown>)?.url ??
                (x as Record<string, unknown>)?.image
            )
      )
      .filter(Boolean)
      .map(make);
  }
  return fallback ? [make(fallback, 0)] : [];
}

function toResults(v: unknown): ResultStat[] | undefined {
  if (!Array.isArray(v) || !v.length) return undefined;
  const out: ResultStat[] = [];
  for (const x of v) {
    if (typeof x !== "object" || x == null) continue;
    const o = x as Record<string, unknown>;
    const value = Number(o.value ?? o.number ?? o.count);
    if (Number.isNaN(value)) continue;
    out.push({
      value,
      decimals: typeof o.decimals === "number" ? o.decimals : undefined,
      suffix: str(o.suffix ?? "%"),
      label: toLText(o.label ?? o.title ?? o.name),
    });
  }
  return out.length ? out : undefined;
}

/* ----------------------------- التصنيفات ----------------------------- */
function normalizeCategory(raw: Record<string, unknown>, i: number): Category {
  const pal = PALETTE[i % PALETTE.length];
  const name = toLText(raw.name ?? raw.title);
  return {
    id: str(raw.id ?? raw.slug ?? raw.key ?? `cat-${i}`),
    num: str(raw.num ?? raw.number ?? String(i + 1).padStart(2, "0")),
    name,
    latin: str(raw.latin ?? raw.en_name ?? raw.english ?? name.en ?? "").toUpperCase(),
    blurb: toLText(raw.blurb ?? raw.description ?? raw.desc ?? raw.about),
    image: str(raw.image ?? raw.img ?? raw.cover ?? raw.photo) || FALLBACK_IMGS[i % FALLBACK_IMGS.length],
    color: str(raw.color) || pal.color,
    tint: str(raw.tint) || pal.tint,
  };
}

function resolveCategoryId(ref: unknown, categories: Category[]): string {
  if (categories.length === 0) return str(ref);
  const s = str(ref).trim().toLowerCase();
  const byIndex = Number(ref);
  if (!Number.isNaN(byIndex) && categories[byIndex]) return categories[byIndex].id;
  const hit = categories.find(
    (c) =>
      c.id.toLowerCase() === s ||
      c.latin.toLowerCase() === s ||
      c.name.ar === str(ref) ||
      c.name.en.toLowerCase() === s
  );
  return hit ? hit.id : categories[0].id;
}

function normalizeProject(raw: Record<string, unknown>, i: number, categories: Category[]): Project {
  const title = toLText(raw.title ?? raw.name);
  const image =
    str(raw.image ?? raw.cover ?? raw.thumb ?? raw.img) || FALLBACK_IMGS[i % FALLBACK_IMGS.length];
  return {
    id: str(raw.id ?? `p-${i}`),
    slug: str(raw.slug ?? raw.id ?? `project-${i}`),
    category: resolveCategoryId(raw.category ?? raw.cat ?? raw.categoryId ?? raw.domain ?? raw.field, categories),
    year: Number(raw.year) || new Date().getFullYear(),
    duration: toLText(raw.duration ?? raw.time ?? raw.timeline),
    client: toLText(raw.client ?? raw.customer ?? raw.brand),
    title,
    tagline: toLText(raw.tagline ?? raw.subtitle ?? raw.summary ?? raw.excerpt ?? raw.short),
    description: toParagraphs(raw.description ?? raw.desc ?? raw.details ?? raw.content ?? raw.about),
    services: toLTextList(raw.services ?? raw.tags ?? raw.scope),
    image,
    gallery: toGallery(raw.gallery ?? raw.images ?? raw.screenshots ?? raw.photos, image),
    demoUrl: str(raw.demoUrl ?? raw.demo ?? raw.url ?? raw.link ?? raw.website) || undefined,
    videoUrl: str(raw.videoUrl ?? raw.video) || undefined,
    results: toResults(raw.results ?? raw.stats ?? raw.metrics),
    featured: Boolean(raw.featured),
  };
}

/* ------------------------------- المقالات ------------------------------- */
function normalizePost(raw: Record<string, unknown>, i: number): BlogPost {
  const title = toLText(raw.title ?? raw.name);
  const body = toParagraphs(raw.body ?? raw.content ?? raw.text ?? raw.description);
  return {
    id: str(raw.id ?? `b-${i}`),
    slug: str(raw.slug ?? raw.id ?? `post-${i}`),
    title,
    excerpt: toLText(raw.excerpt ?? raw.summary ?? raw.short ?? raw.tagline),
    body,
    categoryId: str(raw.categoryId ?? raw.category ?? raw.cat ?? raw.tag ?? ""),
    image: str(raw.image ?? raw.cover ?? raw.thumb) || FALLBACK_IMGS[i % FALLBACK_IMGS.length],
    date: str(raw.date ?? raw.publishedAt ?? raw.createdAt) || new Date().toISOString().slice(0, 10),
    readMinutes:
      Number(raw.readMinutes ?? raw.readTime ?? raw.minutes) ||
      Math.max(2, Math.round(body.ar.join(" ").split(/\s+/).length / 180)),
    tags: Array.isArray(raw.tags) ? raw.tags.map((x) => str(x)).filter(Boolean) : [],
  };
}

function normalizeBlogCategory(raw: Record<string, unknown>, i: number): BlogCategory {
  const pal = PALETTE[i % PALETTE.length];
  return {
    id: str(raw.id ?? raw.slug ?? raw.key ?? `bc-${i}`),
    name: toLText(raw.name ?? raw.title),
    color: str(raw.color) || pal.color,
    tint: str(raw.tint) || pal.tint,
  };
}

function deriveBlogCategories(posts: BlogPost[]): BlogCategory[] {
  const seen = new Map<string, BlogCategory>();
  posts.forEach((p) => {
    if (!p.categoryId || seen.has(p.categoryId)) return;
    const pal = PALETTE[seen.size % PALETTE.length];
    seen.set(p.categoryId, {
      id: p.categoryId,
      name: { ar: p.categoryId, en: p.categoryId },
      color: pal.color,
      tint: pal.tint,
    });
  });
  return [...seen.values()];
}

/* ------------------------------------------------------------------ */
/*  استخراج المصفوفات من المستند                                        */
/* ------------------------------------------------------------------ */
const KEY_SETS = {
  categories: ["categories", "domains", "fields", "areas", "departments", "sections", "اقسام", "أقسام", "مجالات", "المجالات"],
  projects: ["projects", "works", "portfolio", "cases", "مشاريع", "المشاريع", "اعمال", "أعمال", "الأعمال"],
  posts: ["posts", "articles", "blog", "blogs", "مقالات", "المقالات", "مدونة", "المدونة"],
  blogCategories: ["blogcategories", "postcategories", "articlecategories", "تصنيفات", "التصنيفات"],
};

const normKey = (k: string) => k.trim().toLowerCase().replace(/[\s_-]/g, "");

function collectArrays(data: Record<string, unknown>): { key: string; value: unknown[] }[] {
  const out: { key: string; value: unknown[] }[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (Array.isArray(v)) out.push({ key: k, value: v });
    else if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const [k2, v2] of Object.entries(v as Record<string, unknown>)) {
        if (Array.isArray(v2)) out.push({ key: `${k}.${k2}`, value: v2 });
      }
    }
  }
  return out;
}

function pickByKey(arrays: { key: string; value: unknown[] }[], keys: string[]): unknown[] | null {
  const set = new Set(keys.map(normKey));
  for (const a of arrays) {
    const leaf = normKey(a.key.split(".").pop() ?? a.key);
    if (set.has(leaf) && a.value.length) return a.value;
  }
  return null;
}

const isObjArr = (v: unknown): v is Record<string, unknown>[] =>
  Array.isArray(v) &&
  v.length > 0 &&
  v.every((x) => x && typeof x === "object" && !Array.isArray(x));

const guessCategories = (v: unknown) =>
  isObjArr(v) && v.some((x) => x.name != null || x.title != null || x.blurb != null || x.description != null);
const guessProjects = (v: unknown) =>
  isObjArr(v) && v.some((x) => x.demoUrl != null || x.demo != null || x.gallery != null || x.client != null || x.services != null);
const guessPosts = (v: unknown) =>
  isObjArr(v) && v.some((x) => x.date != null || x.body != null || x.content != null || x.publishedAt != null || x.excerpt != null);

export function normalizeContent(raw: Record<string, unknown>): {
  categories: Category[];
  projects: Project[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
} {
  const data: Record<string, unknown> = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const arrays = collectArrays(data);

  let catsArr = pickByKey(arrays, KEY_SETS.categories);
  let projectsArr = pickByKey(arrays, KEY_SETS.projects);
  let postsArr = pickByKey(arrays, KEY_SETS.posts);
  const blogCatsArr = pickByKey(arrays, KEY_SETS.blogCategories);

  const taken = new Set<unknown[]>(
    [catsArr, projectsArr, postsArr, blogCatsArr].filter((x): x is unknown[] => !!x)
  );

  for (const a of arrays) {
    if (taken.has(a.value)) continue;
    if (!catsArr && guessCategories(a.value)) {
      catsArr = a.value;
      taken.add(a.value);
    } else if (!projectsArr && guessProjects(a.value)) {
      projectsArr = a.value;
      taken.add(a.value);
    } else if (!postsArr && guessPosts(a.value)) {
      postsArr = a.value;
      taken.add(a.value);
    }
  }

  const categories = (catsArr ?? []).map((x, i) => normalizeCategory(x as Record<string, unknown>, i));
  const projects = (projectsArr ?? []).map((x, i) => normalizeProject(x as Record<string, unknown>, i, categories));
  const posts = (postsArr ?? []).map((x, i) => normalizePost(x as Record<string, unknown>, i));
  const blogCategories = blogCatsArr
    ? blogCatsArr.map((x, i) => normalizeBlogCategory(x as Record<string, unknown>, i))
    : deriveBlogCategories(posts);

  return { categories, projects, posts, blogCategories };
}

/* ------------------------------------------------------------------ */
/*  الترجمة التلقائية عربي → إنجليزي للمحتوى القادم من الداشبورد          */
/* ------------------------------------------------------------------ */
function collectTranslatables(d: {
  categories: Category[];
  projects: Project[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
}): string[] {
  const set = new Set<string>();
  const add = (ar: string, en: string) => {
    if (needsEn(ar, en)) set.add(ar);
  };
  for (const c of d.categories) {
    add(c.name.ar, c.name.en);
    add(c.blurb.ar, c.blurb.en);
  }
  for (const p of d.projects) {
    add(p.title.ar, p.title.en);
    add(p.tagline.ar, p.tagline.en);
    add(p.client.ar, p.client.en);
    add(p.duration.ar, p.duration.en);
    p.services.forEach((s) => add(s.ar, s.en));
    p.description.ar.forEach((par, i) => add(par, p.description.en[i]));
    p.gallery.forEach((g) => add(g.caption.ar, g.caption.en));
    p.results?.forEach((r) => add(r.label.ar, r.label.en));
  }
  for (const b of d.posts) {
    add(b.title.ar, b.title.en);
    add(b.excerpt.ar, b.excerpt.en);
    b.body.ar.forEach((par, i) => add(par, b.body.en[i]));
    b.tags.forEach((tag) => add(tag, tag));
  }
  for (const bc of d.blogCategories) add(bc.name.ar, bc.name.en);
  return [...set];
}

function applyTranslations(d: {
  categories: Category[];
  projects: Project[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
}) {
  const texts = collectTranslatables(d);
  if (!texts.length) return;
  translateTexts(texts).then((map) => {
    if (!Object.keys(map).length) return;
    const trL = (x: LText) => {
      x.en = map[x.ar] || x.en;
    };
    setDataSafe((prev) => {
      const next = {
        categories: prev.categories.map((c) => ({ ...c, name: { ...c.name }, blurb: { ...c.blurb } })),
        projects: prev.projects.map((p) => ({
          ...p,
          title: { ...p.title },
          tagline: { ...p.tagline },
          client: { ...p.client },
          duration: { ...p.duration },
          services: p.services.map((s) => ({ ...s })),
          description: { ar: [...p.description.ar], en: [...p.description.en] },
          gallery: p.gallery.map((g) => ({ ...g, caption: { ...g.caption } })),
          results: p.results?.map((r) => ({ ...r, label: { ...r.label } })),
        })),
        posts: prev.posts.map((b) => ({
          ...b,
          title: { ...b.title },
          excerpt: { ...b.excerpt },
          body: { ar: [...b.body.ar], en: [...b.body.en] },
          tags: [...b.tags],
        })),
        blogCategories: prev.blogCategories.map((bc) => ({ ...bc, name: { ...bc.name } })),
      };
      for (const c of next.categories) {
        trL(c.name);
        trL(c.blurb);
        if (needsEn(c.name.ar, c.latin)) c.latin = (map[c.name.ar] || c.name.en || "").toUpperCase();
      }
      for (const p of next.projects) {
        trL(p.title);
        trL(p.tagline);
        trL(p.client);
        trL(p.duration);
        p.services.forEach(trL);
        p.description.ar.forEach((par, i) => {
          const tr = map[par];
          if (tr) p.description.en[i] = tr;
        });
        p.gallery.forEach((g) => trL(g.caption));
        p.results?.forEach((r) => trL(r.label));
      }
      for (const b of next.posts) {
        trL(b.title);
        trL(b.excerpt);
        b.body.ar.forEach((par, i) => {
          const tr = map[par];
          if (tr) b.body.en[i] = tr;
        });
        b.tags = b.tags.map((tag) => map[tag] || tag);
      }
      for (const bc of next.blogCategories) trL(bc.name);
      return next;
    });
  });
}

/* ------------------------------------------------------------------ */
/*  قراءة بديلة عبر Firestore REST API (تعمل لو SDK اتحجب)               */
/* ------------------------------------------------------------------ */
type FsValue = {
  stringValue?: string;
  integerValue?: string | number;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: null;
  arrayValue?: { values?: FsValue[] };
  mapValue?: { fields?: Record<string, FsValue> };
};

function decodeFsValue(v: FsValue | undefined): unknown {
  if (!v || typeof v !== "object") return null;
  if ("stringValue" in v) return v.stringValue ?? "";
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue ?? 0;
  if ("booleanValue" in v) return !!v.booleanValue;
  if ("nullValue" in v) return null;
  if ("arrayValue" in v) return (v.arrayValue?.values ?? []).map(decodeFsValue);
  if ("mapValue" in v) {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v.mapValue?.fields ?? {})) out[k] = decodeFsValue(val);
    return out;
  }
  return null;
}

async function fetchViaRest(): Promise<Record<string, unknown> | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${CONTENT_COLLECTION}/${CONTENT_DOC}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = (await res.json()) as { fields?: Record<string, FsValue> };
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(json.fields ?? {})) out[k] = decodeFsValue(v);
  return out;
}

/* ------------------------------------------------------------------ */
/*  المزوّد                                                              */
/* ------------------------------------------------------------------ */
type ContentData = {
  categories: Category[];
  projects: Project[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
};

const EMPTY: ContentData = { categories: [], projects: [], posts: [], blogCategories: [] };

interface ContentValue extends ContentData {
  loading: boolean;
  syncFailed: boolean;
  ready: boolean;
  getCategory: (id: string) => Category | undefined;
  getProject: (slug: string) => Project | undefined;
  projectsByCategory: (id: string) => Project[];
  featuredProjects: () => Project[];
  nextInCategory: (p: Project) => Project | undefined;
  getBlogPost: (slug: string) => BlogPost | undefined;
  getBlogCategory: (id: string) => BlogCategory | undefined;
  retry: () => void;
}

const ContentContext = createContext<ContentValue | null>(null);

/** setter عام صغير علشان applyTranslations تقدر تحدّث البيانات */
let setDataSafe: React.Dispatch<React.SetStateAction<ContentData>> = () => undefined;

export function ContentProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [syncFailed, setSyncFailed] = useState(false);
  const [data, setData] = useState<ContentData>(EMPTY);
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const firstRun = useRef(true);

  useEffect(() => {
    setDataSafe = setData;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | null = null;
    let gotData = false;

    if (firstRun.current) setLoading(true);
    firstRun.current = false;

    const ingest = (raw: Record<string, unknown>) => {
      const normalized = normalizeContent(raw);
      setData(normalized);
      setReady(true);
      setSyncFailed(false);
      setLoading(false);
      applyTranslations(normalized);
    };

    const restAttempt = async () => {
      if (cancelled || gotData) return;
      try {
        const d = await fetchViaRest();
        if (cancelled || gotData) return;
        if (d && Object.keys(d).length) {
          gotData = true;
          ingest(d);
        } else if (!gotData) {
          setSyncFailed(true);
          setLoading(false);
        }
      } catch {
        if (!gotData && !cancelled) {
          setSyncFailed(true);
          setLoading(false);
        }
      }
    };

    const fs = db;
    if (fs) {
      ensureAuth().finally(() => {
        if (cancelled) return;
        try {
          unsub = onSnapshot(
            doc(fs, CONTENT_COLLECTION, CONTENT_DOC),
            (snap) => {
              if (cancelled) return;
              gotData = true;
              if (snap.exists()) {
                ingest(snap.data() as Record<string, unknown>);
              } else {
                setData(EMPTY);
                setReady(true);
                setSyncFailed(false);
                setLoading(false);
              }
            },
            () => {
              // القراءة عبر الـ SDK فشلت (قواعد أمان/شبكة) — جرّب REST
              if (!gotData) void restAttempt();
            }
          );
        } catch {
          void restAttempt();
        }
      });
    } else {
      void restAttempt();
    }

    // تأمين: لو الـ SDK بطيء أو صامت، جرّب REST بعد شوية
    const t1 = setTimeout(() => {
      if (!gotData) void restAttempt();
    }, 1500);

    // سقف صارم: الموقع يفتح مهما حصل خلال 8 ثواني
    const t2 = setTimeout(() => {
      if (!gotData && !cancelled) {
        setSyncFailed(true);
        setLoading(false);
      }
    }, 8000);

    return () => {
      cancelled = true;
      if (unsub) unsub();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [tick]);

  // إعادة محاولة في الخلفية كل 15 ثانية طالما مفيش بيانات
  useEffect(() => {
    if (ready) return;
    const iv = setInterval(() => setTick((v) => v + 1), 15000);
    return () => clearInterval(iv);
  }, [ready]);

  const retry = useCallback(() => setTick((v) => v + 1), []);

  const value = useMemo<ContentValue>(() => {
    const { categories, projects, posts, blogCategories } = data;
    const byCat = (id: string) => projects.filter((p) => p.category === id);
    return {
      loading,
      syncFailed,
      ready,
      categories,
      projects,
      posts,
      blogCategories,
      getCategory: (id) => categories.find((c) => c.id === id),
      getProject: (slug) => projects.find((p) => p.slug === slug),
      projectsByCategory: byCat,
      featuredProjects: () => {
        const f = projects.filter((p) => p.featured);
        return f.length ? f : projects.slice(0, 3);
      },
      nextInCategory: (p) => {
        const list = byCat(p.category);
        if (list.length < 2) return undefined;
        const i = list.findIndex((x) => x.id === p.id);
        return list[(i + 1) % list.length];
      },
      getBlogPost: (slug) => posts.find((p) => p.slug === slug),
      getBlogCategory: (id) => blogCategories.find((c) => c.id === id),
      retry,
    };
  }, [data, loading, syncFailed, ready, retry]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
