/* ------------------------------------------------------------------ */
/*  دوبليكس — إعدادات ثابتة فقط                                           */
/*  المحتوى الفعلي (الأقسام / المشاريع) يُقرأ لحظيًا من Firestore عبر       */
/*  طبقة src/lib/content.tsx — لا تضع محتوى تجريبي هنا.                   */
/* ------------------------------------------------------------------ */

export const LOGO_URL =
  "https://www.image2url.com/r2/default/images/1788096124951-89c2faca-7359-4beb-9d53-d81a0ffc007b.jfif";

/** إحصائيات تعريفية ثابتة (تُعرض في الهيرو وشريط الأرقام) */
export const STATS = [48, 32, 12, 5];

export const CONTACT = {
  email: "hello@duplex.studio",
  phone: "+20 101 234 5678",
  whatsapp: "https://wa.me/201012345678",
  address: { ar: "القاهرة الجديدة، مصر", en: "New Cairo, Egypt" },
};

export const SOCIALS = [
  { id: "instagram", label: "Instagram", url: "https://instagram.com" },
  { id: "behance", label: "Behance", url: "https://behance.net" },
  { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com" },
  { id: "x", label: "X", url: "https://x.com" },
];
