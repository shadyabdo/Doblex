import type { LText } from "./types";

export interface ProcessStep {
  t: string;
  d: string;
}

/** قاموس واجهة المستخدم — عربي / إنجليزي */
export const T = {
  brand: { ar: "دوبليكس", en: "Duplex" },
  brandDesc: { ar: "استوديو تقني متكامل", en: "Full-stack creative studio" },

  navHome: { ar: "الرئيسية", en: "Home" },
  navStart: { ar: "ابدأ مشروعك", en: "Start a project" },

  heroKicker: { ar: "استوديو دوبليكس — تأسس 2026", en: "Duplex Studio — Est. 2026" },
  heroL1: { ar: "هنا بتتصنع", en: "We build digital" },
  heroL2: { ar: "التجارب الرقمية", en: "experiences" },
  heroL3: { ar: "اللي بتفرق.", en: "that actually land." },
  heroP: {
    ar: "دوبليكس استوديو تقني متكامل: بنطوّر مواقع وتطبيقات ويب، بنصمم هويات بصرية، بنمنتج فيديو وموشن، وبنشغّل حملات تسويق رقمي بتجيب نتائج — كل ده تحت سقف واحد.",
    en: "Duplex is a full-stack tech studio: we develop websites & web apps, design brand identities, edit video & motion, and run digital marketing campaigns that deliver results — all under one roof.",
  },
  heroCta1: { ar: "استكشف أعمالنا", en: "Explore our work" },
  heroCta2: { ar: "تعرّف على الأقسام", en: "Meet the departments" },
  heroMeta1: { ar: "4 أقسام متكاملة", en: "4 integrated departments" },
  heroMeta2: { ar: "+48 مشروع مسلّم", en: "48+ shipped projects" },
  heroMeta3: { ar: "12 متخصص مبدع", en: "12 creative specialists" },
  heroStatTitle: { ar: "متوسط نمو الحملات", en: "Average campaign growth" },
  heroStatNote: { ar: "عبر عملائنا في 2026", en: "Across our clients in 2026" },
  heroAvailable: { ar: "متاحون لمشروعات جديدة", en: "Available for new projects" },
  heroRollLead: { ar: "بنصنع", en: "We craft" },
  heroRollTail: { ar: "بتفرق.", en: "that land." },
  heroS1: { ar: "من الفكرة", en: "From the idea" },
  heroS2: { ar: "للنتيجة.", en: "to the results." },
  heroDeptsTitle: { ar: "أقسام الاستوديو", en: "Studio departments" },
  heroLangNote: {
    ar: "الموقع بيتكلم عربي وإنجليزي — جرّب المبدّل من فوق.",
    en: "This site speaks Arabic & English — try the toggle above.",
  },
  heroA1: { ar: "فكرتك بتبقى", en: "Your idea becomes" },
  heroA3: { ar: "بتفرق.", en: "that lands." },
  heroPanelsHint: { ar: "مرّر على قسم لاستكشافه", en: "Hover a department to explore" },
  heroDepartments: { ar: "أقسامنا الأربعة", en: "Our four crafts" },

  depsKicker: { ar: "01 — الأقسام", en: "01 — Departments" },
  depsTitle: { ar: "أربعة أقسام.. سقف واحد", en: "Four crafts, one roof" },
  depsSub: {
    ar: "كل قسم فريق متخصص وشغوف بمجاله — وبيشتغلوا مع بعض علشان مشروعك يخرج متكامل من أول بكسل لآخر تقرير نتائج.",
    en: "Each department is a dedicated team obsessed with its craft — working together so your project ships complete, from the first pixel to the last results report.",
  },
  depsProjects: { ar: "مشاريع", en: "projects" },

  workKicker: { ar: "02 — أعمال مختارة", en: "02 — Selected work" },
  workTitle: { ar: "شغل نفخر بيه", en: "Work we're proud of" },
  workAll: { ar: "كل المشاريع", en: "All projects" },

  statsKicker: { ar: "دوبليكس بالأرقام", en: "Duplex in numbers" },

  processKicker: { ar: "03 — طريقة شغلنا", en: "03 — How we work" },
  processTitle: { ar: "من الفكرة للإطلاق", en: "From idea to launch" },

  ctaTitle: { ar: "عندك فكرة؟ خلينا نحوّلها لمنتج.", en: "Got an idea? Let's turn it into a product." },
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
  footerFollow: { ar: "تابعنا", en: "Follow us" },
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
  viewCreatives: { ar: "شاهد الكرياتيفز", en: "View creatives" },
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
  resultsTitle: { ar: "نتائج الحملة", en: "Campaign results" },
  filmTitle: { ar: "الفيديو الكامل", en: "The full film" },
  filmNote: {
    ar: "نسخة العرض — الفيديو النهائي يُسلَّم بجودة 4K مع ألوان وصوت معتمد.",
    en: "Preview cut — the final film is delivered in 4K with graded color & mastered audio.",
  },
  nextProject: { ar: "المشروع التالي", en: "Next project" },
  allProjectsIn: { ar: "كل مشاريع القسم", en: "All department projects" },
  otherCats: { ar: "أقسام أخرى", en: "Other departments" },
  catCount: { ar: "مشاريع منفذة", en: "delivered projects" },
  exploreCat: { ar: "استكشف القسم", en: "Explore department" },
  addressLabel: { ar: "رابط الديمو", en: "Demo URL" },
} satisfies Record<string, LText>;

/** كلمات العنوان الرئيسي — تتبدل رأسيًا بلون كل قسم */
export const HERO_ROLL: { ar: string[]; en: string[] } = {
  ar: ["مواقع", "هويات", "أفلام", "حملات"],
  en: ["websites", "brands", "films", "campaigns"],
};

/** كلمات العنوان المقلوب — مفردات بحسب القسم النشط */
export const HERO_FLIP: { ar: string[]; en: string[] } = {
  ar: ["موقع", "هوية", "فيلم", "حملة"],
  en: ["a website", "an identity", "a film", "a campaign"],
};

export const MARQUEE: { ar: string[]; en: string[] } = {
  ar: [
    "مواقع وتطبيقات ويب",
    "هوية بصرية",
    "مونتاج وموشن جرافيك",
    "تسويق رقمي",
    "تجربة مستخدم UI/UX",
    "سوشيال ميديا",
    "حملات أداء",
  ],
  en: [
    "Websites & Web Apps",
    "Brand Identity",
    "Video Editing & Motion",
    "Digital Marketing",
    "UI/UX Design",
    "Social Media",
    "Performance Campaigns",
  ],
};

export const STATS_LABELS: { ar: string[]; en: string[] } = {
  ar: ["مشروع مسلّم", "عميل سعيد", "متخصص في الفريق", "جائزة تصميم"],
  en: ["Projects shipped", "Happy clients", "Team specialists", "Design awards"],
};

export const PROCESS: { ar: ProcessStep[]; en: ProcessStep[] } = {
  ar: [
    {
      t: "الاكتشاف",
      d: "بنفهم البيزنس والجمهور والمنافسين، وبنحدد أهداف قابلة للقياس قبل أي شغل تنفيذي.",
    },
    {
      t: "التصميم",
      d: "بنبني الهوية وتجربة الاستخدام والواجهات في اسبرنتات سريعة بمراجعات واضحة معاك أول بأول.",
    },
    {
      t: "التنفيذ",
      d: "تطوير نظيف، مونتاج دقيق، ومحتوى جاهز — بجودة تليق باسمك وبمعايير اختبار صارمة.",
    },
    {
      t: "الإطلاق والنمو",
      d: "بنطلق، بنقيس، وبنحسّن باستمرار: تقارير شفافة وتحسينات شهرية تخلي النتائج تكبر.",
    },
  ],
  en: [
    {
      t: "Discover",
      d: "We study the business, audience and competitors, and set measurable goals before any execution.",
    },
    {
      t: "Design",
      d: "Identity, UX and UI built in fast sprints with clear review loops — you're in the picture at every step.",
    },
    {
      t: "Build",
      d: "Clean development, precise editing, launch-ready content — tested hard and built to last.",
    },
    {
      t: "Launch & Grow",
      d: "We ship, measure and continuously improve: transparent reports and monthly optimizations that compound.",
    },
  ],
};

export type TKey = keyof typeof T;
