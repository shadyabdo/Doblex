/**
 * ترجمة آلية للنصوص العربية → إنجليزية.
 * تُستخدم لملء الحقول الإنجليزية للمحتوى القادم من الداشبورد بالعربية فقط،
 * فيتبدّل المحتوى مع زر اللغة بدل ما يبقى عربيًا ثابتًا.
 * - طلبات مجمعة عبر Google Translate (مع احتياطي MyMemory)
 * - كاش دائم (ذاكرة + localStorage) علشان كل نص يُترجم مرة واحدة بس
 * - عند أي فشل: يُعرض النص الأصلي والموقع لا يتأثر
 */

const AR_RE = /[\u0600-\u06FF]/;
export const hasArabic = (s: string): boolean => AR_RE.test(s);

/** هل النص العربي يحتاج ترجمة للإنجليزية؟ (النص عربي والإنجليزي ناقص أو عربي) */
export const needsEn = (ar: string, en?: string): boolean =>
  !!ar && hasArabic(ar) && (!en || en === ar || hasArabic(en));

const CACHE_KEY = "duplex-tr-v1";
const memCache = new Map<string, string>();

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const obj = JSON.parse(raw) as Record<string, string>;
      for (const [k, v] of Object.entries(obj)) memCache.set(k, v);
    }
  } catch {
    /* ignore */
  }
}
loadCache();

let saveTimer: ReturnType<typeof setTimeout> | null = null;
function persistCache() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      const obj: Record<string, string> = {};
      memCache.forEach((v, k) => (obj[k] = v));
      localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch {
      /* ignore */
    }
  }, 400);
}

async function googleBatch(texts: string[]): Promise<(string | null)[]> {
  const params = new URLSearchParams();
  params.append("sl", "ar");
  params.append("tl", "en");
  params.append("dj", "1");
  texts.forEach((t) => params.append("q", t));
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/t?${params.toString()}`
  );
  if (!res.ok) throw new Error("translate http " + res.status);
  const json: unknown = await res.json();
  const arr = Array.isArray(json) ? json : [json];
  return texts.map((_, i) => {
    const item = arr[i] as { sentences?: { trans?: string }[] } | undefined;
    if (!item?.sentences?.length) return null;
    const out = item.sentences
      .map((s) => s.trans ?? "")
      .join("")
      .trim();
    return out || null;
  });
}

async function myMemory(text: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${encodeURIComponent("ar|en")}`
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      responseData?: { translatedText?: string };
    };
    const out = json.responseData?.translatedText?.trim();
    return out || null;
  } catch {
    return null;
  }
}

/**
 * يترجم قائمة نصوص ويعيد خريطة نص→ترجمة.
 * النصوص المفشلة تُترك بدون ترجمة (لا تظهر في الخريطة).
 */
export async function translateTexts(
  texts: string[]
): Promise<Record<string, string>> {
  const uniq = [...new Set(texts.filter(Boolean))];
  const result: Record<string, string> = {};
  const pending: string[] = [];

  for (const t of uniq) {
    if (memCache.has(t)) result[t] = memCache.get(t)!;
    else pending.push(t);
  }
  if (!pending.length) return result;

  try {
    const done = await googleBatch(pending);
    const failed: string[] = [];
    pending.forEach((t, i) => {
      const tr = done[i];
      if (tr && !hasArabic(tr)) {
        result[t] = tr;
        memCache.set(t, tr);
      } else {
        failed.push(t);
      }
    });
    await Promise.all(
      failed.map(async (t) => {
        const tr = await myMemory(t);
        if (tr && !hasArabic(tr)) {
          result[t] = tr;
          memCache.set(t, tr);
        }
      })
    );
    persistCache();
  } catch {
    await Promise.all(
      pending.map(async (t) => {
        const tr = await myMemory(t);
        if (tr && !hasArabic(tr)) {
          result[t] = tr;
          memCache.set(t, tr);
        }
      })
    );
    persistCache();
  }

  return result;
}
