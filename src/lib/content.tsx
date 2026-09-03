import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, ensureAuth, CONTENT_COLLECTION, CONTENT_DOC } from "./firebase";
import type {
  Category,
  GalleryItem,
  LText,
  Project,
  ResultStat,
} from "../data/types";
import type { BlogCategory, BlogPost } from "../data/blog";

/* ------------------------------------------------------------------ */
/*  لوحات ألوان احتياطية (تُستخدم لو لم يحدّد المحتوى لونًا)             */
/* ------------------------------------------------------------------ */
const PALETTE = [
  { color: "#0B7C74", tint: "#E1F0EE" },
  { color: "#E8590C", tint: "#FDEADD" },
  { color: "#1C64D9", tint: "#E4EDFB" },
  { color: "#0C8A5C", tint: "#E0F2EA" },
  { color: "#C2410C", tint: "#FDEADD" },
  { color: "#7C3AED", tint: "#EFE9FD" },
];

/** صور احتياطية نظيفة لو لم يوفر المحتوى صورة */
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

/** يحوّل أي قيمة نصية (نص بسيط أو كائن ar/en) إلى LText */
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

/** يحوّل الوصف إلى { ar: string[], en: string[] } سواء كان نصًا أو مصفوفة أو كائنًا */
function toParagraphs(v: unknown): { ar: string[]; en: string[] } {
  const split = (s: string) =>
    s
      .split(/\n+/)
      .map((x) => x.trim())
      .filter(Boolean);

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

/** يحوّل قائمة خدمات/وسوم إلى LText[] */
function toLTextList(v: unknown): LText[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => toLText(x)).filter((x) => x.ar || x.en);
}

/** يبني معرض صور من مصفوفة روابط أو كائنات، مع صورة احتياطية */
function toGallery(v: unknown, fallback: string): GalleryItem[] {
  const make = (src: string, i: number): GalleryItem => ({
    src,
    type: i === 0 ? "full" : i % 3 === 1 ? "crop-top" : i % 3 === 2 ? "crop-detail" : "phone",
    caption: { ar: `لقطة ${i + 1}`, en: `Shot ${i + 1}` },
  });

  if (Array.isArray(v) && v.length) {
    return v
      .map((x) => (typeof x === "string" ? x : str((x as Record<string, unknown>)?.src ?? (x as Record<string, unknown>)?.url ?? (x as Record<string, unknown>)?.image)))
      .filter(Boolean)
      .map(make);
  }
  return fallback ? [make(fallback, 0)] : [];
}

/** يبني قائمة نتائج/إحصائيات إن وُجدت */
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

/** يحاول مطابقة مرجع المشروع (id/اسم/رقم) مع تصنيف موجود */
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
  const image = str(raw.image ?? raw.cover ?? raw.thumb ?? raw.img) || FALLBACK_IMGS[i % FALLBACK_IMGS.length];
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
    readMinutes: Number(raw.readMinutes ?? raw.readTime ?? raw.minutes) || Math.max(2, Math.round(body.ar.join(" ").split(/\s+/).length / 180)),
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

/** يشتق تصنيفات المقالات من المقالات نفسها لو لم تُ provided */
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
/*  استخراج المصفوفات من المستند — بالأسماء أولًا ثم بالشكل             */
/* ------------------------------------------------------------------ */
const KEY_SETS = {
  categories: ["categories", "domains", "fields", "areas", "departments", "sections", "اقسام", "أقسام", "مجالات", "المجالات"],
  projects: ["projects", "works", "portfolio", "cases", "مشاريع", "المشاريع", "اعمال", "أعمال", "الأعمال"],
  posts: ["posts", "articles", "blog", "blogs", "مقالات", "المقالات", "مدونة", "المدونة"],
  blogCategories: ["blogcategories", "postcategories", "articlecategories", "تصنيفات", "التصنيفات"],
};

const normKey = (k: string) => k.trim().toLowerCase().replace(/[\s_-]/g, "");

/** يجمع كل المصفوفات من المستوى الأعلى ومستوى واحد متداخل */
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

/** يطبّع المستند الخام إلى نماذج الموقع */
export function normalizeContent(data: Record<string, unknown>): {
  categories: Category[];
  projects: Project[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
} {
  const arrays = collectArrays(data);

  const rawCats = pickByKey(arrays, KEY_SETS.categories) ?? [];
  const rawProjects = pickByKey(arrays, KEY_SETS.projects) ?? [];
  const rawPosts = pickByKey(arrays, KEY_SETS.posts) ?? [];
  const rawBlogCats = pickByKey(arrays, KEY_SETS.blogCategories);

  // لو لم نجد بالمفاتيح، خمّن بالشكل
  const leftover = arrays.filter(
    (a) =>
      !rawCats.includes(a.value) && !rawProjects.includes(a.value) && !rawPosts.includes(a.value)
  );
  const guess = { cats: rawCats as unknown[], projects: rawProjects as unknown[], posts: rawPosts as unknown[] };
  if (!rawCats.length || !rawProjects.length || !rawPosts.length) {
    for (const a of leftover) {
      const first = a.value[0] as Record<string, unknown> | undefined;
      if (!first || typeof first !== "object") continue;
      const has = (...ks: string[]) => ks.some((k) => first[k] != null);
      if (!guess.posts.length && (has("date", "body", "content", "publishedAt", "readMinutes"))) guess.posts = a.value;
      else if (!guess.projects.length && (has("demoUrl", "gallery", "demo", "client", "services"))) guess.projects = a.value;
      else if (!guess.cats.length && (has("name", "title", "blurb"))) guess.cats = a.value;
    }
  }

  const categories = (guess.cats as Record<string, unknown>[]).map(normalizeCategory);
  const projects = (guess.projects as Record<string, unknown>[]).map((p, i) => normalizeProject(p, i, categories));
  const posts = (guess.posts as Record<string, unknown>[]).map(normalizePost);
  const blogCategories = rawBlogCats
    ? (rawBlogCats as Record<string, unknown>[]).map(normalizeBlogCategory)
    : deriveBlogCategories(posts);

  return { categories, projects, posts, blogCategories };
}

/* ------------------------------------------------------------------ */
/*  المزوّد — يقرأ المستند لحظيًا ويوزعه على التطبيق                     */
/* ------------------------------------------------------------------ */
interface ContentValue {
  loading: boolean;
  error: string | null;
  ready: boolean;
  categories: Category[];
  projects: Project[];
  posts: BlogPost[];
  blogCategories: BlogCategory[];
  getCategory: (id: string) => Category | undefined;
  getProject: (slug: string) => Project | undefined;
  projectsByCategory: (id: string) => Project[];
  featuredProjects: () => Project[];
  nextInCategory: (p: Project) => Project | undefined;
  getBlogPost: (slug: string) => BlogPost | undefined;
  getBlogCategory: (id: string) => BlogCategory | undefined;
  postsByCategory: (id: string) => BlogPost[];
  retry: () => void;
}

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    categories: Category[];
    projects: Project[];
    posts: BlogPost[];
    blogCategories: BlogCategory[];
  }>({ categories: [], projects: [], posts: [], blogCategories: [] });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    let cancelled = false;
    setLoading(true);
    setError(null);

    ensureAuth().then(() => {
      if (cancelled) return;
      const ref = doc(db, CONTENT_COLLECTION, CONTENT_DOC);
      unsub = onSnapshot(
        ref,
        (snap) => {
          if (cancelled) return;
          const raw = (snap.exists() ? snap.data() : {}) as Record<string, unknown>;
          setData(normalizeContent(raw));
          setLoading(false);
        },
        (err) => {
          if (cancelled) return;
          console.error("[Duplex] Firestore read error:", err);
          setError(err?.message ?? "تعذّر الاتصال بقاعدة البيانات");
          setLoading(false);
        }
      );
    });

    return () => {
      cancelled = true;
      if (unsub) unsub();
    };
  }, [tick]);

  const retry = useCallback(() => setTick((t) => t + 1), []);

  const value = useMemo<ContentValue>(() => {
    const { categories, projects, posts, blogCategories } = data;
    const byCat = (id: string) => projects.filter((p) => p.category === id);
    return {
      loading,
      error,
      ready: !loading && !error,
      categories,
      projects,
      posts,
      blogCategories,
      getCategory: (id) => categories.find((c) => c.id === id),
      getProject: (slug) => projects.find((p) => p.slug === slug),
      projectsByCategory: byCat,
      featuredProjects: () => {
        const f = projects.filter((p) => p.featured);
        return f.length ? f : projects.slice(0, 4);
      },
      nextInCategory: (p) => {
        const list = byCat(p.category);
        if (!list.length) return undefined;
        const i = list.findIndex((x) => x.id === p.id);
        return list[(i + 1) % list.length];
      },
      getBlogPost: (slug) => posts.find((p) => p.slug === slug),
      getBlogCategory: (id) => blogCategories.find((c) => c.id === id),
      postsByCategory: (id) => posts.filter((p) => p.categoryId === id),
      retry,
    };
  }, [data, loading, error, retry]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}
