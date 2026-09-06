/* ------------------------------------------------------------------ */
/*  دوبليكس — الأنواع + قاموس الواجهة + الثوابت                          */
/*  المحتوى الفعلي (المجالات / المشاريع / المقالات) يُقرأ لحظيًا من        */
/*  Firestore عبر طبقة src/lib/content.tsx — لا تضع محتوى هنا.           */
/* ------------------------------------------------------------------ */

export interface LText {
  ar: string;
  en: string;
}

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
  category: string;
  year: number;
  duration: LText;
  client: LText;
  title: LText;
  tagline: LText;
  description: { ar: string[]; en: string[] };
  services: LText[];
  image: string;
  gallery: GalleryItem[];
  demoUrl?: string;
  videoUrl?: string;
  results?: ResultStat[];
  featured?: boolean;
}

export interface Category {
  id: string;
  num: string;
  name: LText;
  latin: string;
  blurb: LText;
  image: string;
  color: string;
  tint: string;
}

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
  date: string;
  readMinutes: number;
  tags: string[];
}

/* ------------------------------ ثوابت ------------------------------ */

export const LOGO_URL =
  "https://www.image2url.com/r2/default/images/1788096124951-89c2faca-7359-4beb-9d53-d81a0ffc007b.jfif";

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

export const AUTHOR: LText = { ar: "دوبليكس ستوديو", en: "Duplex Studio" };

/* --------------------------- قاموس الواجهة --------------------------- */

export const T: Record<string, LText> = {
  brand: { ar: "دوبليكس", en: "Duplex" },
  navHome: { ar: "الرئيسية", en: "Home" },
  navBlog: { ar: "المدونة", en: "Blog" },
  navStart: { ar: "ابدأ مشروعك", en: "Start a project" },
  viewsLabel: { ar: "مشاهدة", en: "views" },
  pageViewsLabel: { ar: "مشاهدة لهذه الصفحة", en: "page views" },

  heroKicker: { ar: "استوديو دوبليكس — تأسس 2026", en: "Duplex Studio — Est. 2026" },
  heroAvailable: { ar: "متاحون لمشروعات جديدة", en: "Available for new projects" },
  heroS1: { ar: "من الفكرة", en: "From the idea" },
  heroS2: { ar: "للنتيجة.", en: "to the result." },
  heroDeptsTitle: { ar: "أقسامنا", en: "Our crafts" },
  heroSplitHint: { ar: "مرّر على قسم لاستكشافه", en: "Hover a craft to explore" },
  heroCta1: { ar: "استكشف أعمالنا", en: "Explore our work" },
  heroCta2: { ar: "تعرّف على الأقسام", en: "Meet the departments" },
  heroSwitchHint: { ar: "جرّب تبديل اللغة — المحتوى بيتبدل معاها", en: "Try switching the language — content switches too" },
  heroFeatured: { ar: "مشروع في الواجهة", en: "Featured project" },
  heroViewCase: { ar: "افتح دراسة الحالة", en: "Open the case study" },
  heroNoWork: { ar: "أضف مشاريعك من الداشبورد لتظهر هنا", en: "Add your projects from the dashboard to showcase them here" },

  depsKicker: { ar: "01 — الأقسام", en: "01 — Departments" },
  depsTitle: { ar: "أقسام الاستوديو", en: "Studio departments" },
  depsSub: {
    ar: "كل قسم فريق متخصص وشغوف بمجاله — وبيشتغلوا مع بعض علشان مشروعك يخرج متكامل من أول بكسل لآخر تقرير نتائج.",
    en: "Each department is a dedicated team obsessed with its craft — working together so your project ships complete, from first pixel to final report.",
  },
  depsProjects: { ar: "مشاريع", en: "projects" },

  workKicker: { ar: "02 — أعمال مختارة", en: "02 — Selected work" },
  workTitle: { ar: "شغل نفخر بيه", en: "Work we're proud of" },
  workAll: { ar: "كل المشاريع", en: "All projects" },
  workEmpty: { ar: "لا توجد مشاريع في هذا القسم بعد — أضفها من الداشبورد.", en: "No projects in this department yet — add them from the dashboard." },

  statsKicker: { ar: "دوبليكس بالأرقام", en: "Duplex in numbers" },

  processKicker: { ar: "03 — طريقة شغلنا", en: "03 — How we work" },
  processTitle: { ar: "من الفكرة للإطلاق", en: "From idea to launch" },

  blogKicker: { ar: "04 — من المدونة", en: "04 — From the blog" },
  blogMore: { ar: "عرض المزيد", en: "View more" },
  blogPageTitle: { ar: "مدونة دوبليكس", en: "Duplex Blog" },
  blogPageSub: {
    ar: "كل اللي اتعلمناه من مشاريعنا: رؤى عن التصميم والتطوير والفيديو والتسويق — مكتوبة ببساطة لفريقك وبيزنسك.",
    en: "Everything we've learned from our projects: insights on design, development, video and marketing — written simply for your team and business.",
  },
  by: { ar: "بقلم", en: "Written by" },
  all: { ar: "الكل", en: "All" },
  noPosts: { ar: "لا توجد مقالات بعد — أضفها من الداشبورد.", en: "No articles yet — add them from the dashboard." },
  readMin: { ar: "دقائق قراءة", en: "min read" },
  backBlog: { ar: "رجوع للمدونة", en: "Back to blog" },
  relatedPosts: { ar: "مقالات ذات صلة", en: "Related articles" },

  ctaTitle: { ar: "عندك فكرة؟ خلينا نحوّلها لنتيجة.", en: "Got an idea? Let's turn it into results." },
  ctaSub: {
    ar: "ابعتلنا تفاصيل مشروعك وهنرد عليك خلال 24 ساعة بخطة مبدئية وتكلفة تقديرية.",
    en: "Send us your project brief and we'll reply within 24 hours with an initial plan and estimate.",
  },
  ctaMail: { ar: "راسلنا بالإيميل", en: "Email us" },
  ctaWa: { ar: "واتساب مباشر", en: "Direct WhatsApp" },
  ctaCopy: { ar: "انسخ الإيميل", en: "Copy email" },
  ctaCopied: { ar: "اتنسخ ✓", en: "Copied ✓" },

  footerAbout: {
    ar: "استوديو تقني متكامل اتأسس سنة 2026، وبيشتغل مع الشركات والبراندات الطموحة في مصر والخليج.",
    en: "A full-stack tech studio founded in 2026, working with ambitious companies and brands across Egypt & the GCC.",
  },
  footerDeps: { ar: "الأقسام", en: "Departments" },
  footerContact: { ar: "تواصل معنا", en: "Contact" },
  footerHours: { ar: "الأحد – الخميس، 10ص – 6م", en: "Sun – Thu, 10am – 6pm" },
  footerRights: { ar: "كل الحقوق محفوظة.", en: "All rights reserved." },
  footerMade: { ar: "صُنع بشغف في القاهرة", en: "Crafted with passion in Cairo" },

  backHome: { ar: "الرئيسية", en: "Home" },
  backTo: { ar: "رجوع للقسم", en: "Back to department" },
  overview: { ar: "نظرة عامة على المشروع", en: "Project overview" },
  galleryTitle: { ar: "معرض الصور", en: "Image gallery" },
  galleryHint: { ar: "اضغط على أي صورة لتكبيرها", en: "Click any image to enlarge" },
  client: { ar: "العميل", en: "Client" },
  year: { ar: "السنة", en: "Year" },
  duration: { ar: "مدة التنفيذ", en: "Duration" },
  services: { ar: "الخدمات", en: "Services" },
  department: { ar: "القسم", en: "Department" },
  viewDemo: { ar: "عرض الموقع — ديمو", en: "View website — demo" },
  viewDesigns: { ar: "استعراض التصاميم", en: "Browse the designs" },
  watchFilm: { ar: "شاهد الفيلم", en: "Watch the film" },
  openExternal: { ar: "فتح في نافذة جديدة", en: "Open in new tab" },
  demoNote: {
    ar: "معاينة تفاعلية داخل الاستوديو — الرابط الخارجي للديمو الحي متاح بالأسفل.",
    en: "In-studio interactive preview — the live demo link is available below.",
  },
  pageHome: { ar: "الرئيسية", en: "Home" },
  pageServices: { ar: "الخدمات", en: "Services" },
  pageGallery: { ar: "المعرض", en: "Gallery" },
  pageContact: { ar: "تواصل", en: "Contact" },
  reload: { ar: "إعادة تحميل", en: "Reload" },
  close: { ar: "إغلاق", en: "Close" },
  of: { ar: "من", en: "of" },
  filmTitle: { ar: "الفيديو الكامل", en: "The full film" },
  filmNote: {
    ar: "نسخة العرض — الفيديو النهائي يُسلَّم بجودة 4K مع ألوان وصوت معتمد.",
    en: "Preview cut — the final film is delivered in 4K with graded color & mastered audio.",
  },
  resultsTitle: { ar: "نتائج الحملة", en: "Campaign results" },
  nextProject: { ar: "المشروع التالي", en: "Next project" },
  catCount: { ar: "مشاريع منفذة", en: "delivered projects" },
  otherCats: { ar: "أقسام أخرى", en: "Other departments" },
};

/* ------------------- ترجمات مصفوفات (خارج القاموس) ------------------- */

export const MARQUEE: { ar: string[]; en: string[] } = {
  ar: ["مواقع وتطبيقات ويب", "هوية بصرية", "مونتاج وموشن جرافيك", "تسويق رقمي", "تجربة مستخدم UI/UX", "سوشيال ميديا", "حملات أداء"],
  en: ["Websites & Web Apps", "Brand Identity", "Video Editing & Motion", "Digital Marketing", "UI/UX Design", "Social Media", "Performance Campaigns"],
};

export const PROCESS: { ar: { t: string; d: string }[]; en: { t: string; d: string }[] } = {
  ar: [
    { t: "الاكتشاف", d: "بنفهم البيزنس والجمهور والمنافسين، وبنحدد أهداف قابلة للقياس قبل أي شغل تنفيذي." },
    { t: "التصميم", d: "بنبني الهوية وتجربة الاستخدام والواجهات في اسبرنتات سريعة بمراجعات واضحة معاك أول بأول." },
    { t: "التنفيذ", d: "تطوير نظيف، مونتاج دقيق، ومحتوى جاهز — بجودة تليق باسمك وبمعايير اختبار صارمة." },
    { t: "الإطلاق والنمو", d: "بنطلق، بنقيس، وبنحسّن باستمرار: تقارير شفافة وتحسينات شهرية تخلي النتائج تكبر." },
  ],
  en: [
    { t: "Discover", d: "We study the business, audience and competitors, and set measurable goals before any execution." },
    { t: "Design", d: "Identity, UX and UI built in fast sprints with clear review loops — you're in the picture at every step." },
    { t: "Build", d: "Clean development, precise editing, launch-ready content — tested hard and built to last." },
    { t: "Launch & Grow", d: "We ship, measure and continuously improve: transparent reports and monthly optimizations that compound." },
  ],
};

export const STATS_LABELS: { ar: string[]; en: string[] } = {
  ar: ["مشروع مسلّم", "عميل سعيد", "متخصص في الفريق", "جائزة تصميم"],
  en: ["Projects shipped", "Happy clients", "Team specialists", "Design awards"],
};
