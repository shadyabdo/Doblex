import type { LText } from "./types";

/* ------------------------------------------------------------------ */
/*  دوبليكس — أنواع المدونة فقط                                            */
/*  المحتوى الفعلي (المقالات والتصنيفات) يُقرأ لحظيًا من Firestore عبر      */
/*  طبقة src/lib/content.tsx — لا تضع محتوى تجريبي هنا.                   */
/* ------------------------------------------------------------------ */

export interface BlogCategory {
  id: string;
  name: LText;
  color: string;
  tint: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: LText;
  excerpt: LText;
  body: { ar: string[]; en: string[] };
  categoryId: string;
  image: string;
  date: string; // ISO
  readMinutes: number;
  tags: string[];
}

/** كاتب المقالات — ثابت */
export const AUTHOR: LText = { ar: "دوبليكس ستوديو", en: "Duplex Studio" };
