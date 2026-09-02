import type { Category, CategoryId, Project } from "./types";

/* ------------------------------------------------------------------ */
/*  دوبليكس — بيانات الأقسام والمشاريع                                  */
/*  الصور المُولَّدة تعيش على CDN، وروابط الديمو قابلة للاستبدال          */
/* ------------------------------------------------------------------ */

/*
  صور فوتوغرافية حقيقية (Unsplash) — بدون نصوص مولّدة، محتوى إنجليزي نظيف.
  معاملات الرابط: auto=format (صيغة مثالية) + fit=crop (قص للأبعاد) + w/h + q (جودة).
*/
const u = (id: string, w = 1280, h = 832) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const IMG = {
  /** متجر أورا — أزياء ومتجر إلكتروني */
  ecommerce: u("photo-1445205170230-053b83016050"),
  /** منصة ديار — عمارة ومباني حديثة */
  realestate: u("photo-1486406146926-c627a92ad1ab"),
  /** مطعم زيتون — داخل مطعم دافئ */
  restaurant: u("photo-1517248135467-4c7edcad34c4"),
  /** هوية قهوة مَدى — قهوة مختصة */
  coffee: u("photo-1509042239860-f550ce710b93"),
  /** بوسترات مهرجان ضوء — إضاءة حفل/مهرجان */
  posters: u("photo-1514525253161-7a46d19cd819"),
  /** سوشيال ميديا بَلس — لياقة وجيم */
  social: u("photo-1534438327276-14e5300c3a48"),
  /** فواصل شرارة — شارع ليلي بإضاءة نيون */
  neonFilm: u("photo-1519501025264-65ba15a82390"),
  /** فيلم ترحال — كثبان صحراوية وقت الغروب */
  desertFilm: u("photo-1473580044384-7ba9967e16a0"),
  /** إطلاق تطبيق وصلة — أطعمة شهية */
  foodApp: u("photo-1504674900247-0877df9cc836"),
  /** محرّك عملاء كلينيكا — شاشة تحليلات وتقارير */
  leadGen: u("photo-1551288049-bebda4e38f71"),
};

export const LOGO_URL =
  "https://www.image2url.com/r2/default/images/1788096124951-89c2faca-7359-4beb-9d53-d81a0ffc007b.jfif";

export const CATEGORIES: Category[] = [
  {
    id: "websites",
    num: "01",
    name: { ar: "تطوير المواقع", en: "Web Development" },
    latin: "WEBSITES",
    blurb: {
      ar: "مواقع شركات، متاجر إلكترونية، ومنصات ويب كاملة — سريعة، آمنة، ومبنية للتحويل.",
      en: "Company sites, e-commerce stores and full web platforms — fast, secure and built to convert.",
    },
    image: IMG.ecommerce,
    color: "#0B7C74",
    tint: "#E1F0EE",
  },
  {
    id: "graphic",
    num: "02",
    name: { ar: "الجرافيك ديزاين", en: "Graphic Design" },
    latin: "GRAPHIC",
    blurb: {
      ar: "هويات بصرية، بوسترات، وتغليف وسوشيال ميديا — تصميم يخلّي البراند محفور في الذاكرة.",
      en: "Brand identities, posters, packaging and social media — design that makes brands unforgettable.",
    },
    image: IMG.coffee,
    color: "#E8590C",
    tint: "#FDEADD",
  },
  {
    id: "video",
    num: "03",
    name: { ar: "الفيديو إديتينج", en: "Video Editing" },
    latin: "VIDEO",
    blurb: {
      ar: "مونتاج إعلاني ووثائقي، تلوين سينمائي، وموشن جرافيك — قصة متحركة تمسك العين من أول ثانية.",
      en: "Commercial & documentary editing, cinematic grading and motion graphics — stories that hook from frame one.",
    },
    image: IMG.neonFilm,
    color: "#1C64D9",
    tint: "#E4EDFB",
  },
  {
    id: "marketing",
    num: "04",
    name: { ar: "الديجيتال ماركتينج", en: "Digital Marketing" },
    latin: "MARKETING",
    blurb: {
      ar: "حملات أداء، إدارة سوشيال ميديا، وتحسين محركات بحث — نمو مقيس بأرقام واضحة مش كلام.",
      en: "Performance campaigns, social management and SEO — measurable growth driven by numbers, not noise.",
    },
    image: IMG.foodApp,
    color: "#0C8A5C",
    tint: "#E0F2EA",
  },
];

export const PROJECTS: Project[] = [
  /* ------------------------------ المواقع ------------------------------ */
  {
    id: "p-aura",
    slug: "aura-store",
    category: "websites",
    year: 2026,
    duration: { ar: "8 أسابيع", en: "8 weeks" },
    client: { ar: "أورا للأزياء", en: "Aura Fashion" },
    title: { ar: "متجر أورا", en: "Aura Store" },
    tagline: {
      ar: "متجر أزياء إلكتروني بتجربة شراء سلسة من أول سكرول لآخر تشك-أوت.",
      en: "A fashion e-commerce store with a seamless journey from first scroll to checkout.",
    },
    description: {
      ar: [
        "أورا براند أزياء محلي كان بيعتمد على الإنستجرام فقط في البيع. الهدف كان متجر إلكتروني كامل يعكس فخامة البراند ويحوّل المتابعين لمشتريين فعليين، مع تجربة موبايل أولاً لأن 82% من جمهورهم بيتصفح من الموبايل.",
        "بنيينا المتجر على Next.js مع هيدلس كوميرس، وصممنا واجهة إديتوريال بصور كبيرة ومساحات بيضاء تحاكي مجلات الموضة. أضفنا ويشفيت، فلاتر ذكية، وخطوات تشك-أوت مختصرة خفّضت معدل هجر السلة بنسبة ملحوظة.",
      ],
      en: [
        "Aura was a local fashion label selling exclusively through Instagram. The goal: a full e-commerce store that reflects the brand's premium feel and converts followers into buyers — mobile-first, since 82% of their audience browses on mobile.",
        "We built the store on Next.js with headless commerce and designed an editorial interface with large imagery and generous whitespace inspired by fashion magazines. Wishlist, smart filters and a compressed checkout flow noticeably reduced cart abandonment.",
      ],
    },
    services: [
      { ar: "تطوير Next.js", en: "Next.js development" },
      { ar: "هيدلس كوميرس", en: "Headless commerce" },
      { ar: "تصميم UI/UX", en: "UI/UX design" },
      { ar: "تحسين سرعة وأداء", en: "Performance optimization" },
      { ar: "تكامل دفع وشحن", en: "Payment & shipping integration" },
    ],
    image: IMG.ecommerce,
    demoUrl: "https://www.asos.com",
    gallery: [
      { src: IMG.ecommerce, type: "full", caption: { ar: "الصفحة الرئيسية — نسخة الديسكتوب", en: "Homepage — desktop view" } },
      { src: IMG.ecommerce, type: "crop-top", caption: { ar: "الهيدر وشريط التنقل الرئيسي", en: "Header & main navigation" } },
      { src: IMG.ecommerce, type: "crop-detail", caption: { ar: "شبكة المنتجات والفلترة", en: "Product grid & filtering" } },
      { src: IMG.ecommerce, type: "phone", caption: { ar: "تجربة الموبايل", en: "Mobile experience" } },
    ],
    results: [
      { value: 38, suffix: "%", label: { ar: "زيادة في معدل التحويل", en: "Conversion rate lift" } },
      { value: 2.4, suffix: "x", decimals: 1, label: { ar: "نمو المبيعات الشهرية", en: "Monthly sales growth" } },
      { value: 51, suffix: "%", label: { ar: "انخفاض هجر السلة", en: "Cart abandonment drop" } },
    ],
    featured: true,
  },
  {
    id: "p-diyar",
    slug: "diyar-estates",
    category: "websites",
    year: 2026,
    duration: { ar: "12 أسبوع", en: "12 weeks" },
    client: { ar: "ديار العقارية", en: "Diyar Estates" },
    title: { ar: "منصة ديار العقارية", en: "Diyar Estates Platform" },
    tagline: {
      ar: "منصة عقارات بخريطة تفاعلية وبحث فوري — من الاستكشاف لحجز المعاينة.",
      en: "A real-estate platform with an interactive map and instant search — from browsing to booking viewings.",
    },
    description: {
      ar: [
        "ديار شركة تطوير عقاري كانت بتعرض مشاريعها في ملفات PDF وصور واتساب. احتاجوا منصة ويب احترافية تعرض الوحدات بخريطة تفاعلية وفلاتر دقيقة، وتحوّل الزائر لعميل محتمل مسجّل في الـ CRM.",
        "نفّذنا المنصة بنظام إدارة محتوى مرن يسمح لفريقهم بإضافة وحدات ومشاريع بدون أي تدخل تقني، مع خريطة Mapbox مخصصة، حاسبة أقساط، ونموذج حجز معاينة متصل مباشرة بنظام إدارة العملاء.",
      ],
      en: [
        "Diyar, a real-estate developer, was showcasing projects through PDFs and WhatsApp photos. They needed a professional web platform presenting units on an interactive map with precise filters — converting visitors into CRM-registered leads.",
        "We delivered the platform with a flexible CMS letting their team add units and projects with zero technical help, plus a custom Mapbox map, an installment calculator, and a viewing-booking form wired directly into their CRM.",
      ],
    },
    services: [
      { ar: "تطوير منصة ويب", en: "Web platform development" },
      { ar: "خرائط تفاعلية", en: "Interactive maps" },
      { ar: "نظام إدارة محتوى", en: "CMS" },
      { ar: "تكامل CRM", en: "CRM integration" },
    ],
    image: IMG.realestate,
    demoUrl: "https://www.propertyfinder.ae",
    gallery: [
      { src: IMG.realestate, type: "full", caption: { ar: "لوحة المنصة — عرض الديسكتوب", en: "Platform dashboard — desktop" } },
      { src: IMG.realestate, type: "crop-top", caption: { ar: "شريط البحث والفلاتر", en: "Search bar & filters" } },
      { src: IMG.realestate, type: "crop-detail", caption: { ar: "الخريطة التفاعلية وبطاقات الوحدات", en: "Interactive map & unit cards" } },
      { src: IMG.realestate, type: "phone", caption: { ar: "تصفح الوحدات من الموبايل", en: "Browsing units on mobile" } },
    ],
    results: [
      { value: 1200, suffix: "+", label: { ar: "عميل محتمل شهرياً", en: "Monthly leads" } },
      { value: 64, suffix: "%", label: { ar: "من الزيارات من الموبايل", en: "Traffic from mobile" } },
    ],
  },
  {
    id: "p-zaytoun",
    slug: "zaytoun-restaurant",
    category: "websites",
    year: 2026,
    duration: { ar: "6 أسابيع", en: "6 weeks" },
    client: { ar: "مطعم زيتون", en: "Zaytoun Restaurant" },
    title: { ar: "موقع مطعم زيتون", en: "Zaytoun Restaurant Site" },
    tagline: {
      ar: "موقع مطعم بطابع شامي دافيء مع منيو رقمي وحجز طاولات أونلاين.",
      en: "A warm Levantine restaurant site with a digital menu and online table reservations.",
    },
    description: {
      ar: [
        "زيتون مطعم عائلي بجمهور وفيّ، لكن حضوره الرقمي كان شبه معدوم. صممنا موقع يحكي قصة المكان: صور أكلات حقيقية، قصة العائلة، ومنيو رقمي يتحدث حسب الموسم.",
        "أضفنا نظام حجز طاولات متصل بواتساب المطعم، وخرائط الوصول، ونسخة إنجليزية كاملة للسواح — والنتيجة حجوزات أونلاين بتمثل دلوقتي أكتر من ثلث حجوزات الأسبوع.",
      ],
      en: [
        "Zaytoun is a family restaurant with a loyal crowd but almost no digital presence. We designed a site that tells the place's story: real food photography, the family's journey, and a seasonal digital menu.",
        "We added a table-reservation system connected to the restaurant's WhatsApp, arrival maps, and a full English version for tourists — online bookings now represent over a third of weekly reservations.",
      ],
    },
    services: [
      { ar: "تصميم وتطوير موقع", en: "Website design & build" },
      { ar: "تصوير أطعمة", en: "Food photography direction" },
      { ar: "حجز طاولات", en: "Table reservations" },
      { ar: "تهيئة SEO محلي", en: "Local SEO" },
    ],
    image: IMG.restaurant,
    demoUrl: "https://www.olivegarden.com",
    gallery: [
      { src: IMG.restaurant, type: "full", caption: { ar: "الصفحة الرئيسية — الثيم الداكن", en: "Homepage — dark theme" } },
      { src: IMG.restaurant, type: "crop-top", caption: { ar: "الهيرو وقصة المطعم", en: "Hero & restaurant story" } },
      { src: IMG.restaurant, type: "crop-detail", caption: { ar: "المنيو الرقمي", en: "The digital menu" } },
      { src: IMG.restaurant, type: "phone", caption: { ar: "الحجز من الموبايل", en: "Booking on mobile" } },
    ],
    featured: true,
  },

  /* --------------------------- الجرافيك ديزاين --------------------------- */
  {
    id: "p-mada",
    slug: "mada-coffee",
    category: "graphic",
    year: 2026,
    duration: { ar: "5 أسابيع", en: "5 weeks" },
    client: { ar: "قهوة مَدى", en: "Mada Coffee" },
    title: { ar: "هوية قهوة مَدى", en: "Mada Coffee Identity" },
    tagline: {
      ar: "هوية بصرية كاملة لبراند قهوة مختصة — من اللوجو للكوب للرف.",
      en: "A complete visual identity for a specialty coffee brand — from logo to cup to shelf.",
    },
    description: {
      ar: [
        "مَدى براند قهوة مختصة ناشئ كان محتاج هوية تنافس الأسماء الكبيرة على الرف وفي فيد الإنستجرام. بدأنا من الاستراتيجية: براند هادئ، دقيق، وبيفهم في القهوة بجد.",
        "صممنا لوجو تايبوغرافي مستوحى من موجات التقطير، نظام ألوان كرافت وتركواز عميق، تطبيقات كاملة: أكواب، أكياس، كروت، منيو، وواجهة الركنة — مع دليل هوية يضمن الاتساق مع أي مصمم مستقبلي.",
      ],
      en: [
        "Mada is an emerging specialty-coffee brand that needed an identity able to compete with big names — on the shelf and in the Instagram feed. We started from strategy: a calm, precise brand that genuinely knows coffee.",
        "We designed a typographic logo inspired by brewing waves, a kraft-and-deep-teal color system, and full applications: cups, bags, cards, menus and kiosk UI — plus a brand guideline ensuring consistency with any future designer.",
      ],
    },
    services: [
      { ar: "استراتيجية براند", en: "Brand strategy" },
      { ar: "تصميم لوجو", en: "Logo design" },
      { ar: "تغليف منتجات", en: "Packaging" },
      { ar: "دليل هوية", en: "Brand guidelines" },
      { ar: "تطبيقات مطبوعة", en: "Print applications" },
    ],
    image: IMG.coffee,
    demoUrl: "https://www.behance.net",
    gallery: [
      { src: IMG.coffee, type: "full", caption: { ar: "بورد الهوية الكامل", en: "Full identity board" } },
      { src: IMG.coffee, type: "crop-top", caption: { ar: "اللوجو والاشتقاقات", en: "Logo & lockups" } },
      { src: IMG.coffee, type: "crop-detail", caption: { ar: "تغليف الأكواب والأكياس", en: "Cup & bag packaging" } },
      { src: IMG.coffee, type: "phone", caption: { ar: "الهوية على الموبايل", en: "Identity on mobile" } },
    ],
    featured: true,
  },
  {
    id: "p-daw",
    slug: "daw-festival",
    category: "graphic",
    year: 2026,
    duration: { ar: "3 أسابيع", en: "3 weeks" },
    client: { ar: "مهرجان ضوء للفنون", en: "Daw Arts Festival" },
    title: { ar: "بوسترات مهرجان ضوء", en: "Daw Festival Posters" },
    tagline: {
      ar: "سلسلة بوسترات لمهرجان فنون ضوئية — تايبوغرافي عربي معاصر بنبض كهربائي.",
      en: "A poster series for a light-arts festival — contemporary Arabic typography with an electric pulse.",
    },
    description: {
      ar: [
        "مهرجان ضوء فعالية فنية سنوية بتحوّل شوارع المدينة للوحات ضوئية. المطلوب كان سلسلة بوسترات تعلن ثلاث ليالٍ مختلفة بنفس الروح لكن بشخصية مستقلة لكل ليلة.",
        "اشتغلنا على الخط العربي كعنصر ضوئي متوهج: تكوينات حرة، تباين عالي بين الكحلي والبرتقالي، ومسارات ضوء مرسومة يدوياً — السلسلة اتطبعت بمقاسات من A3 لبانرات 6 متر.",
      ],
      en: [
        "Daw is an annual arts festival transforming city streets into light canvases. The brief: a poster series announcing three different nights — same spirit, independent personality for each night.",
        "We treated Arabic lettering as a glowing light element: free compositions, high contrast between navy and orange, and hand-drawn light trails — the series was printed from A3 up to 6-meter banners.",
      ],
    },
    services: [
      { ar: "تصميم بوسترات", en: "Poster design" },
      { ar: "تايبوغرافي عربي", en: "Arabic typography" },
      { ar: "إشراف طباعة", en: "Print supervision" },
      { ar: "سوشيال ميديا كيت", en: "Social media kit" },
    ],
    image: IMG.posters,
    demoUrl: "https://www.behance.net",
    gallery: [
      { src: IMG.posters, type: "full", caption: { ar: "السلسلة الكاملة — ثلاث ليالٍ", en: "Full series — three nights" } },
      { src: IMG.posters, type: "crop-top", caption: { ar: "الليلة الأولى: الافتتاح", en: "Night one: opening" } },
      { src: IMG.posters, type: "crop-detail", caption: { ar: "تفاصيل التايبوغرافي", en: "Typography details" } },
      { src: IMG.posters, type: "phone", caption: { ar: "نسخ السوشيال ميديا", en: "Social media versions" } },
    ],
  },
  {
    id: "p-pulse",
    slug: "pulse-fitness",
    category: "graphic",
    year: 2026,
    duration: { ar: "4 أسابيع", en: "4 weeks" },
    client: { ar: "نادي بَلس للياقة", en: "Pulse Fitness Club" },
    title: { ar: "سوشيال ميديا بَلس", en: "Pulse Social Pack" },
    tagline: {
      ar: "باكيدج سوشيال ميديا شهري لنادي لياقة — طاقة عالية وقوالب جاهزة للفريق.",
      en: "A monthly social-media pack for a fitness club — high energy and ready-to-use templates for the team.",
    },
    description: {
      ar: [
        "بَلس نادي لياقة جديد كان بينشر محتوى عشوائي من غير لغة بصرية موحدة. بنينا لهم نظام تصميم للسوشيال ميديا: قوالب عروض، اقتباسات تدريب، جداول حصص، وقصص تفاعلية.",
        "سلّمنا مكتبة قوالب Figma قابلة للتعديل مع دليل استخدام بسيط، ففريق النادي بقى يقدر ينتج بوست متسق في دقائق — والتفاعل تضاعف خلال أول شهرين.",
      ],
      en: [
        "Pulse, a new fitness club, was posting random content with no unified visual language. We built a social-media design system: offer templates, training quotes, class schedules and interactive stories.",
        "We delivered an editable Figma template library with a simple usage guide, so the club's team can now produce consistent posts in minutes — engagement doubled within the first two months.",
      ],
    },
    services: [
      { ar: "نظام تصميم سوشيال", en: "Social design system" },
      { ar: "قوالب Figma", en: "Figma templates" },
      { ar: "هوية محتوى", en: "Content identity" },
      { ar: "موشن قصير", en: "Short motion assets" },
    ],
    image: IMG.social,
    demoUrl: "https://www.behance.net",
    gallery: [
      { src: IMG.social, type: "full", caption: { ar: "شبكة التصميمات الكاملة", en: "Full design grid" } },
      { src: IMG.social, type: "crop-top", caption: { ar: "بوستات العروض", en: "Offer posts" } },
      { src: IMG.social, type: "crop-detail", caption: { ar: "قصص إنستجرام", en: "Instagram stories" } },
      { src: IMG.social, type: "phone", caption: { ar: "شكل الفيد النهائي", en: "Final feed look" } },
    ],
  },

  /* ---------------------------- الفيديو إديتينج ---------------------------- */
  {
    id: "p-sharara",
    slug: "sharara-cuts",
    category: "video",
    year: 2026,
    duration: { ar: "أسبوعان", en: "2 weeks" },
    client: { ar: "مشروبات شرارة", en: "Sharara Drinks" },
    title: { ar: "فواصل شرارة الإعلانية", en: "Sharara Ad Cuts" },
    tagline: {
      ar: "سلسلة فواصل إعلانية قصيرة بمونتاج إيقاعي سريع وتلوين نيون ليلي.",
      en: "A series of short ad cuts with fast-paced editing and a neon-night color grade.",
    },
    description: {
      ar: [
        "شرارة براند مشروبات طاقة جديد استهدف جمهور السهر والشباب. المطلوب فواصل 15 و30 ثانية للسوشيال ميديا واليوتيوب بإحساس سينمائي ليلي يوقف السكرول.",
        "اشتغلنا مونتاج إيقاعي متزامن مع البيت، تلوين أورنج-تيل سينمائي، ساوند ديزاين مكثف، ونسخ مخصصة لكل منصة بنسب عرض مختلفة — الفواصل حققت ملايين المشاهدات العضوية في أول أسبوعين.",
      ],
      en: [
        "Sharara is a new energy-drink brand targeting nightlife and youth audiences. The brief: 15s and 30s cuts for social and YouTube with a cinematic night feel that stops the scroll.",
        "We delivered beat-synced rhythmic editing, a cinematic orange-teal grade, dense sound design, and platform-specific aspect ratios — the cuts earned millions of organic views in the first two weeks.",
      ],
    },
    services: [
      { ar: "مونتاج إعلاني", en: "Commercial editing" },
      { ar: "تلوين سينمائي", en: "Color grading" },
      { ar: "ساوند ديزاين", en: "Sound design" },
      { ar: "نسخ متعددة المنصات", en: "Multi-platform versions" },
    ],
    image: IMG.neonFilm,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    gallery: [
      { src: IMG.neonFilm, type: "full", caption: { ar: "كادر من الفاصل — تلوين ليلي", en: "Frame from the cut — night grade" } },
      { src: IMG.neonFilm, type: "crop-top", caption: { ar: "الإطار السينمائي العريض", en: "Widescreen cinematic frame" } },
      { src: IMG.neonFilm, type: "crop-detail", caption: { ar: "لقطة المنتج", en: "Product shot" } },
      { src: IMG.neonFilm, type: "phone", caption: { ar: "نسخة الريلز الرأسية", en: "Vertical reels version" } },
    ],
    featured: true,
  },
  {
    id: "p-tarhal",
    slug: "tarhal-film",
    category: "video",
    year: 2026,
    duration: { ar: "3 أسابيع", en: "3 weeks" },
    client: { ar: "ترحال للسفر", en: "Tarhal Travel" },
    title: { ar: "فيلم ترحال", en: "Tarhal — The Journey Film" },
    tagline: {
      ar: "فيلم علامة تجارية لشركة رحلات سفاري — صحراء، ضوء ذهبي، وقصة حركة.",
      en: "A brand film for a safari travel company — desert, golden light, and a story in motion.",
    },
    description: {
      ar: [
        "ترحال شركة رحلات سفاري ودفع رباعي كانت محتاجة فيلم علامة يوصل إحساس المغامرة قبل ما العميل يحجز. صورنا يومين في الصحراء بمعدات سينمائية وطائرة درون.",
        "في البوست برودكشن بنينا السرد من لقطات الحركة والسماء الواسعة، تلوين ذهبي دافيء مع ظلال تركواز، وموسيقى تصاعدية — الفيلم اتعرض في حملة إطلاقهم وحقق أعلى نسبة مشاهدة في تاريخ حساباتهم.",
      ],
      en: [
        "Tarhal, a safari & 4x4 travel company, needed a brand film that delivers the thrill of adventure before the client even books. We shot two days in the desert with cinema cameras and a drone.",
        "In post-production we built the narrative from action shots and wide skies, graded warm gold with teal shadows over escalating music — the film headlined their launch campaign and became the most-watched asset in their accounts' history.",
      ],
    },
    services: [
      { ar: "إخراج وبوست برودكشن", en: "Direction & post-production" },
      { ar: "مونتاج سردي", en: "Narrative editing" },
      { ar: "تلوين ذهبي", en: "Golden-hour grading" },
      { ar: "مكساج موسيقى", en: "Music mix" },
    ],
    image: IMG.desertFilm,
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    gallery: [
      { src: IMG.desertFilm, type: "full", caption: { ar: "الكادر الافتتاحي — الساعة الذهبية", en: "Opening frame — golden hour" } },
      { src: IMG.desertFilm, type: "crop-top", caption: { ar: "لقطات الدرون الواسعة", en: "Wide drone shots" } },
      { src: IMG.desertFilm, type: "crop-detail", caption: { ar: "تفاصيل الحركة والغبار", en: "Action & dust details" } },
      { src: IMG.desertFilm, type: "phone", caption: { ar: "مقتطفات ستوري", en: "Story snippets" } },
    ],
  },

  /* --------------------------- الديجيتال ماركتينج --------------------------- */
  {
    id: "p-wasla",
    slug: "wasla-launch",
    category: "marketing",
    year: 2026,
    duration: { ar: "10 أسابيع", en: "10 weeks" },
    client: { ar: "تطبيق وصلة", en: "Wasla App" },
    title: { ar: "إطلاق تطبيق وصلة", en: "Wasla App Launch" },
    tagline: {
      ar: "حملة إطلاق متكاملة لتطبيق توصيل طعام — من صفر تحميلات لقوائم المتاجر.",
      en: "A full launch campaign for a food-delivery app — from zero downloads to trending charts.",
    },
    description: {
      ar: [
        "وصلة تطبيق توصيل طعام جديد دخل سوق مزدحم. بنينا حملة إطلاق على ثلاث مراحل: تشويق قبل الإطلاق، زخم يوم الإطلاق، واستدامة بعدها — عبر ميتا وتيك توك وجوجل.",
        "صممنا كرياتيفز مخصصة لكل مرحلة وجمهور، ضبطنا تتبع الأحداث بالكامل، وشغّلنا اختبار A/B مستمر على الرسائل والعروض — الحملة جابت تكلفة تثبيت أقل من المستهدف بـ 31%.",
      ],
      en: [
        "Wasla, a new food-delivery app, entered a crowded market. We built a three-phase launch campaign: pre-launch teaser, launch-day momentum, and post-launch retention — across Meta, TikTok and Google.",
        "We designed creatives tailored to each phase and audience, set up full event tracking, and ran continuous A/B tests on messages and offers — the campaign achieved a cost-per-install 31% below target.",
      ],
    },
    services: [
      { ar: "استراتيجية إطلاق", en: "Launch strategy" },
      { ar: "إعلانات ميتا وتيك توك", en: "Meta & TikTok ads" },
      { ar: "تتبع وتحليلات", en: "Tracking & analytics" },
      { ar: "اختبارات A/B", en: "A/B testing" },
    ],
    image: IMG.foodApp,
    gallery: [
      { src: IMG.foodApp, type: "full", caption: { ar: "عائلة كرياتيفز الإطلاق", en: "Launch creative family" } },
      { src: IMG.foodApp, type: "crop-top", caption: { ar: "إعلانات الموبايل", en: "Mobile ads" } },
      { src: IMG.foodApp, type: "crop-detail", caption: { ar: "عروض الأسبوع الأول", en: "First-week offers" } },
      { src: IMG.foodApp, type: "phone", caption: { ar: "تجربة التطبيق داخل الإعلان", en: "In-ad app experience" } },
    ],
    results: [
      { value: 120, suffix: "K", label: { ar: "تحميل في أول شهر", en: "Downloads in month one" } },
      { value: 31, suffix: "%", label: { ar: "توفير في تكلفة التثبيت", en: "CPI under target" } },
      { value: 4.6, suffix: "x", decimals: 1, label: { ar: "عائد إنفاق إعلاني ROAS", en: "Return on ad spend" } },
    ],
    featured: true,
  },
  {
    id: "p-clinica",
    slug: "clinica-leads",
    category: "marketing",
    year: 2026,
    duration: { ar: "مستمرة — 6 شهور", en: "Ongoing — 6 months" },
    client: { ar: "عيادات كلينيكا", en: "Clinica Clinics" },
    title: { ar: "محرّك عملاء كلينيكا", en: "Clinica Lead Engine" },
    tagline: {
      ar: "نظام توليد عملاء مستقر لسلسلة عيادات — مواعيد ممتلئة بتكلفة ثابتة.",
      en: "A steady lead-generation system for a clinic chain — full calendars at a stable cost.",
    },
    description: {
      ar: [
        "كلينيكا سلسلة عيادات أسنان وجلدية كانت تعتمد على التوصيات فقط. بنينا لهم محرّك عملاء رقمي كامل: صفحات هبوط لكل خدمة، نماذج حجز متصلة بالاستقبال، ومتابعة واتساب آلية.",
        "شغّلنا حملات بحث وجوجل مابس وسوشيال بشكل متزامن مع تحسين أسبوعي للعروض والكلمات — خلال 6 شهور بقى فيه قائمة انتظار في فرعَيْن، وتكلفة العميل انخفضت للنص.",
      ],
      en: [
        "Clinica, a dental & dermatology clinic chain, relied purely on word of mouth. We built them a complete digital lead engine: a landing page per service, booking forms wired to reception, and automated WhatsApp follow-ups.",
        "We ran search, Google Maps and social campaigns in parallel with weekly optimization of offers and keywords — within 6 months two branches had waiting lists, and cost per patient was halved.",
      ],
    },
    services: [
      { ar: "صفحات هبوط", en: "Landing pages" },
      { ar: "إعلانات بحث وخرائط", en: "Search & Maps ads" },
      { ar: "أتمتة واتساب", en: "WhatsApp automation" },
      { ar: "تقارير أداء شهرية", en: "Monthly performance reports" },
    ],
    image: IMG.leadGen,
    gallery: [
      { src: IMG.leadGen, type: "full", caption: { ar: "لوحة الأداء والكرياتيفز", en: "Performance board & creatives" } },
      { src: IMG.leadGen, type: "crop-top", caption: { ar: "مؤشرات الحملات", en: "Campaign metrics" } },
      { src: IMG.leadGen, type: "crop-detail", caption: { ar: "إعلانات الخدمات", en: "Service ads" } },
      { src: IMG.leadGen, type: "phone", caption: { ar: "نموذج الحجز على الموبايل", en: "Mobile booking form" } },
    ],
    results: [
      { value: 2400, suffix: "+", label: { ar: "حجز في 6 شهور", en: "Bookings in 6 months" } },
      { value: 50, suffix: "%", label: { ar: "انخفاض تكلفة العميل", en: "Cost per patient drop" } },
      { value: 92, suffix: "%", label: { ar: "نسبة إشغال المواعيد", en: "Calendar occupancy" } },
    ],
  },
];

/* ------------------------------ Helpers ------------------------------ */

export const getCategory = (id: string): Category | undefined =>
  CATEGORIES.find((c) => c.id === id);

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const projectsByCategory = (id: CategoryId): Project[] =>
  PROJECTS.filter((p) => p.category === id);

export const featuredProjects = (): Project[] =>
  PROJECTS.filter((p) => p.featured);

export const nextInCategory = (p: Project): Project => {
  const list = projectsByCategory(p.category);
  const i = list.findIndex((x) => x.id === p.id);
  return list[(i + 1) % list.length];
};

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
