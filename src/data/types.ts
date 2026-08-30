/** نص ثنائي اللغة */
export interface LText {
  ar: string;
  en: string;
}

export type CategoryId = "websites" | "graphic" | "video" | "marketing";

/** نوع عرض الصورة داخل المعرض واللايت بوكس */
export type FrameType = "full" | "crop-top" | "crop-detail" | "phone";

export interface GalleryItem {
  src: string;
  type: FrameType;
  caption: LText;
}

export interface ResultStat {
  value: number;
  decimals?: number;
  suffix: string;
  label: LText;
}

export interface Project {
  id: string;
  slug: string;
  category: CategoryId;
  year: number;
  duration: LText;
  client: LText;
  title: LText;
  tagline: LText;
  description: { ar: string[]; en: string[] };
  services: LText[];
  image: string;
  gallery: GalleryItem[];
  /** رابط الديمو الخارجي (يُستبدل برابط العميل الحقيقي عند النشر) */
  demoUrl?: string;
  videoUrl?: string;
  results?: ResultStat[];
  featured?: boolean;
}

export interface Category {
  id: CategoryId;
  num: string;
  name: LText;
  latin: string;
  blurb: LText;
  image: string;
  color: string;
  tint: string;
}
