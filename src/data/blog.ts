import type { LText } from "./types";

/* ------------------------------------------------------------------ */
/*  دوبليكس — بيانات المدونة والتصنيفات                                 */
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

export const AUTHOR: LText = { ar: "دوبليكس ستوديو", en: "Duplex Studio" };

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "team", name: { ar: "الفريق", en: "Team" }, color: "#0B7C74", tint: "#E1F0EE" },
  { id: "services", name: { ar: "خدماتنا", en: "Services" }, color: "#E8590C", tint: "#FDEADD" },
  { id: "web", name: { ar: "تطوير المواقع", en: "Web Dev" }, color: "#1C64D9", tint: "#E4EDFB" },
  { id: "graphic", name: { ar: "الجرافيك ديزاين", en: "Graphic" }, color: "#C2410C", tint: "#FDEADD" },
  { id: "video", name: { ar: "الفيديو", en: "Video" }, color: "#7C3AED", tint: "#EFE9FD" },
  { id: "marketing", name: { ar: "التسويق الرقمي", en: "Marketing" }, color: "#0C8A5C", tint: "#E0F2EA" },
];

export const getBlogCategory = (id: string): BlogCategory | undefined =>
  BLOG_CATEGORIES.find((c) => c.id === id);

const IMG = {
  team: "https://image.qwenlm.ai/generated-images/81591bcd-81fd-40b2-9e59-b1b05f923cda/_result.png",
  services: "https://image.qwenlm.ai/generated-images/5c6a13a4-77f8-4cfb-9fc4-d963c1b67293/_result.png",
  web: "https://image.qwenlm.ai/generated-images/cdba26e2-0317-46d3-988d-189e8a413214/_result.png",
  graphic: "https://image.qwenlm.ai/generated-images/0f4241b7-cf05-41aa-ac53-e172b5b3dbf0/_result.png",
  video: "https://image.qwenlm.ai/generated-images/3672147f-a408-4d29-98f8-7888071e8bbb/_result.png",
  marketing: "https://image.qwenlm.ai/generated-images/378aec70-79ea-4ef6-b127-139f0cc35413/_result.png",
  web2: "https://image.qwenlm.ai/generated-images/e537a6f3-5d4f-489f-8e1c-b47b9ed040c4/_result.png",
  marketing2: "https://image.qwenlm.ai/generated-images/a9cec40f-deeb-44a7-9612-649e4bcc9550/_result.png",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b-1",
    slug: "duplex-story",
    title: {
      ar: "حكاية دوبليكس: كيف بدأ الفريق وإلى أين نتجه",
      en: "The Duplex Story: How Our Team Began and Where We're Headed",
    },
    excerpt: {
      ar: "من فكرة بسيطة بين صديقين إلى استوديو متكامل بأربعة أقسام. هذه قصتنا، وقيمنا، ولماذا نؤمن أن الإبداع الحقيقي يصنع الفارق.",
      en: "From a simple idea between two friends to a full studio with four departments. This is our story, our values, and why we believe real creativity makes the difference.",
    },
    body: {
      ar: [
        "بدأت دوبليكس في 2019 كفكرة بسيطة: لماذا يضطر صاحب المشروع للتعامل مع أربعة أطراف مختلفة — مطوّر، مصمم، مونتير، ومسوّق — بينما يمكن لكل هؤلاء أن يعملوا معًا تحت سقف واحد؟ كانت الإجابة هي دوبليكس.",
        "اليوم، يضم الفريق أكثر من 20 متخصصًا موزعين على أربعة أقسام متكاملة. نؤمن أن أفضل النتائج تولد عندما يتحدث المطوّر لغة المصمم، ويفهم المسوّق ما يفعله المونتير. هذا التكامل هو سرنا.",
        "قيمنا ثلاث: الشفافية مع العميل في كل مرحلة، الجودة التي لا نقبل فيها التنازل، والتعلّم المستمر. كل مشروع بالنسبة لنا ليس مجرد تسليم، بل فرصة لإثبات أن الإبداع المدروس يصنع الفارق الحقيقي.",
      ],
      en: [
        "Duplex began in 2019 as a simple idea: why should a business owner juggle four separate parties — a developer, a designer, an editor, and a marketer — when they could all work together under one roof? The answer was Duplex.",
        "Today, our team includes more than 20 specialists across four integrated departments. We believe the best results are born when the developer speaks the designer's language and the marketer understands what the editor does. This integration is our secret.",
        "Our values are three: transparency with the client at every stage, quality we never compromise on, and continuous learning. Every project is not just a delivery, but a chance to prove that thoughtful creativity makes a real difference.",
      ],
    },
    categoryId: "team",
    image: IMG.team,
    date: "2026-01-12",
    readMinutes: 6,
    tags: ["duplex", "team", "story"],
  },
  {
    id: "b-2",
    slug: "what-we-do",
    title: {
      ar: "ماذا نقدم في دوبليكس؟ نظرة على خدماتنا وهدفنا",
      en: "What We Do at Duplex: A Look at Our Services and Goal",
    },
    excerpt: {
      ar: "أربعة أقسام، هدف واحد: تحويل فكرتك إلى حضور رقمي متكامل. تعرّف على ما نقدمه ولماذا نعمل بالطريقة التي نعمل بها.",
      en: "Four departments, one goal: turning your idea into a complete digital presence. Learn what we offer and why we work the way we do.",
    },
    body: {
      ar: [
        "هدفنا في دوبليكس واضح: أن نأخذ بيد مشروعك من مجرد فكرة إلى حضور رقمي كامل ومتكامل. لا نبيع خدمات منفصلة، بل نبني منظومة تعمل معًا.",
        "قسم تطوير المواقع يبني الأساس: موقع أو متجر أو منصة سريعة وآمنة. قسم الجرافيك ديزاين يمنح مشروعك هوية بصرية لا تُنسى. قسم الفيديو يحوّل رسالتك إلى قصة متحركة تمسك العين. وقسم التسويق الرقمي يضمن أن كل هذا يصل للجمهور الصحيح ويجلب نتائج مقيسة.",
        "ما يميزنا هو أن هذه الأقسام لا تعمل في صوامع منعزلة. كل مشروع يمر بمنهجية واحدة: اكتشاف، تصميم، تنفيذ، ثم إطلاق ونمو مستمر. هذا هو وعدنا لكل عميل.",
      ],
      en: [
        "Our goal at Duplex is clear: to take your project from a mere idea to a complete digital presence. We don't sell isolated services — we build an ecosystem that works together.",
        "The web development department builds the foundation: a fast, secure site, store, or platform. The graphic design department gives your project an unforgettable visual identity. The video department turns your message into a moving story that holds the eye. And digital marketing ensures all of this reaches the right audience and delivers measured results.",
        "What sets us apart is that these departments don't work in isolated silos. Every project follows one methodology: discover, design, build, then launch and continuous growth. That is our promise to every client.",
      ],
    },
    categoryId: "services",
    image: IMG.services,
    date: "2026-01-25",
    readMinutes: 5,
    tags: ["services", "duplex", "goal"],
  },
  {
    id: "b-3",
    slug: "speed-matters",
    title: {
      ar: "لماذا السرعة أهم مما تظن في موقعك الإلكتروني؟",
      en: "Why Speed Matters More Than You Think for Your Website?",
    },
    excerpt: {
      ar: "ثانية واحدة من التأخير قد تكلفك 7% من تحويلاتك. إليك كيف نرفع سرعة المواقع في دوبليكس ولماذا هذا أول ما نقيسه.",
      en: "One second of delay can cost you 7% of conversions. Here's how we boost website speed at Duplex and why it's the first thing we measure.",
    },
    body: {
      ar: [
        "تشير الدراسات إلى أن 53% من زوار الموبايل يغادرون الموقع إذا استغرق تحميله أكثر من 3 ثوانٍ. السرعة ليست رفاهية تقنية، بل عامل حاسم في بقاء الزائر وتحويله إلى عميل.",
        "في دوبليكس نبدأ كل مشروع ويب بقياس الأداء: تحسين الصور، تقليل طلبات الخادم، استخدام شبكات توزيع المحتوى، والبناء على تقنيات حديثة مثل Next.js. هدفنا الدائم أن يتخطى الموقع 90 نقطة في اختبارات الأداء.",
        "النتيجة؟ مواقع عملائنا لا تبدو أسرع فحسب، بل تتصدر نتائج البحث لأن جوجل يكافئ السرعة. إذا كان موقعك بطيئًا، فأنت تخسر عملاء كل يوم دون أن تشعر.",
      ],
      en: [
        "Studies show 53% of mobile visitors leave a site if it takes more than 3 seconds to load. Speed is not a technical luxury — it's a decisive factor in whether a visitor stays and converts into a customer.",
        "At Duplex, we begin every web project by measuring performance: image optimization, reducing server requests, using CDNs, and building on modern tech like Next.js. Our constant goal is for the site to score above 90 in performance tests.",
        "The result? Our clients' sites don't just feel faster — they rank higher in search because Google rewards speed. If your site is slow, you're losing customers every day without noticing.",
      ],
    },
    categoryId: "web",
    image: IMG.web,
    date: "2026-02-03",
    readMinutes: 4,
    tags: ["web", "performance", "speed"],
  },
  {
    id: "b-4",
    slug: "brand-identity",
    title: {
      ar: "الهوية البصرية: الانطباع الأول الذي يدوم",
      en: "Brand Identity: The First Impression That Lasts",
    },
    excerpt: {
      ar: "يقرر العميل خلال 7 ثوانٍ ما إذا كان يثق بعلامتك. تعرّف على عناصر الهوية البصرية الناجحة وكيف نبنيها في قسم الجرافيك.",
      en: "A customer decides within 7 seconds whether to trust your brand. Learn the elements of a successful visual identity and how our graphic team builds it.",
    },
    body: {
      ar: [
        "الهوية البصرية ليست مجرد لوجو جميل. إنها منظومة متكاملة: الألوان، الخطوط، الصور، نبرة الصوت، وحتى طريقة صفّ العناصر. كلها تعمل معًا لتقول للعميل من أنت قبل أن يقرأ كلمة واحدة.",
        "في قسم الجرافيك ديزاين بدوبليكس، نبدأ دائمًا من الاستراتيجية: من جمهورك؟ ما الذي يميزك؟ ما الشعور الذي تريد أن تتركه؟ ثم نترجم الإجابات إلى عناصر بصرية متسقة تعمل عبر كل المنصات.",
        "النتيجة التي نراها مرارًا: علامات صغيرة بهوية قوية تنافس أسماء كبيرة. لأن الاتساق يبني الثقة، والثقة تبني المبيعات.",
      ],
      en: [
        "A visual identity is not just a pretty logo. It's an integrated system: colors, fonts, imagery, tone of voice, even how elements are arranged. They all work together to tell the customer who you are before they read a single word.",
        "In Duplex's graphic design department, we always start from strategy: who is your audience? What sets you apart? What feeling do you want to leave? Then we translate the answers into consistent visual elements that work across every platform.",
        "The result we see again and again: small brands with a strong identity competing with big names. Because consistency builds trust, and trust builds sales.",
      ],
    },
    categoryId: "graphic",
    image: IMG.graphic,
    date: "2026-02-14",
    readMinutes: 5,
    tags: ["graphic", "branding", "identity"],
  },
  {
    id: "b-5",
    slug: "short-video-power",
    title: {
      ar: "قوة الفيديو القصير في عصر السوشيال ميديا",
      en: "The Power of Short Video in the Social Media Era",
    },
    excerpt: {
      ar: "الفيديو القصير هو العملة الأعلى قيمة على الإنترنت اليوم. إليك لماذا نركز عليه في قسم الفيديو وكيف نصنع فيديوهات توقف السكرول.",
      en: "Short video is the most valuable currency on the internet today. Here's why our video department focuses on it and how we craft scroll-stopping videos.",
    },
    body: {
      ar: [
        "تستهلك المنصات اليوم مليارات المشاهدات يوميًا للفيديو القصير — الريلز والتيك توك والشورتس. الجمهور لم يعد يقرأ، بل يشاهد. وإذا لم تلتقط انتباهه في أول 3 ثوانٍ، فقد خسرت.",
        "في قسم الفيديو بدوبليكس نتخصص في صناعة فيديوهات قصيرة بإيقاع محكم: افتتاحية خاطفة، مونتاج متزامن مع الإيقاع، تلوين سينمائي، ونهاية تدفع للفعل. كل ثانية محسوبة.",
        "الدرس الأهم الذي تعلمناه: الجودة السينمائية ليست حكرًا على الإعلانات الكبيرة. حتى فيديو 15 ثانية يمكن أن يبدو كفيلم، وهذا ما يصنع الفارق بين فيديو يُنسى وفيديو ينتشر.",
      ],
      en: [
        "Today's platforms consume billions of short-video views daily — Reels, TikTok, and Shorts. The audience no longer reads; they watch. And if you don't grab their attention in the first 3 seconds, you've lost them.",
        "In Duplex's video department, we specialize in crafting tight-paced short videos: a gripping opening, editing synced to the beat, cinematic grading, and an ending that drives action. Every second is calculated.",
        "The most important lesson we've learned: cinematic quality is not reserved for big ads. Even a 15-second video can look like a film — and that's what separates a video that's forgotten from one that goes viral.",
      ],
    },
    categoryId: "video",
    image: IMG.video,
    date: "2026-02-22",
    readMinutes: 4,
    tags: ["video", "reels", "editing"],
  },
  {
    id: "b-6",
    slug: "measure-marketing",
    title: {
      ar: "كيف تقيس نجاح حملتك التسويقية بالأرقام؟",
      en: "How to Measure Your Marketing Campaign's Success with Numbers?",
    },
    excerpt: {
      ar: "الإعجابات لا تدفع الفواتير. تعرّف على المؤشرات التي نراقبها في قسم التسويق الرقمي ولماذا نؤمن بالتسويق المقيس.",
      en: "Likes don't pay the bills. Learn the metrics our digital marketing team tracks and why we believe in measured marketing.",
    },
    body: {
      ar: [
        "أكبر خطأ في التسويق الرقمي هو قياس النجاح بالإعجابات والمتابعات. هذه أرقام تشعر بها جيدًا لكنها لا تدفع الفواتير. النجاح الحقيقي يُقاس بالتحويلات: كم زائر أصبح عميلًا؟ وكم كلفك كل عميل؟",
        "في دوبليكس نضبط تتبع الأحداث بالكامل قبل إطلاق أي حملة: من أول نقرة إلى آخر عملية شراء. ثم نراقب مؤشرات مثل تكلفة التحويل، العائد على الإنفاق الإعلاني ROAS، ومعدل الاحتفاظ.",
        "ونشغّل اختبارات A/B باستمرار على الرسائل والعروض، لأن التسويق المقيس لا يخمّن — بل يتعلم ويحسّن كل أسبوع. هذا هو الفرق بين إنفاق الأموال واستثمارها.",
      ],
      en: [
        "The biggest mistake in digital marketing is measuring success by likes and followers. These numbers feel good but don't pay the bills. Real success is measured in conversions: how many visitors became customers? And how much did each customer cost?",
        "At Duplex, we set up full event tracking before launching any campaign: from the first click to the final purchase. Then we monitor metrics like cost per conversion, return on ad spend (ROAS), and retention rate.",
        "And we run continuous A/B tests on messages and offers, because measured marketing doesn't guess — it learns and improves every week. That's the difference between spending money and investing it.",
      ],
    },
    categoryId: "marketing",
    image: IMG.marketing,
    date: "2026-03-02",
    readMinutes: 6,
    tags: ["marketing", "analytics", "roi"],
  },
  {
    id: "b-7",
    slug: "ecommerce-mistakes",
    title: {
      ar: "5 أخطاء شائعة تدمّر متجرك الإلكتروني — وكيف تتجنبها",
      en: "5 Common Mistakes That Destroy Your E-commerce Store — and How to Avoid Them",
    },
    excerpt: {
      ar: "من بطء التحميل إلى خطوات الشراء المعقدة، هذه أكثر الأخطاء التي نراها في المتاجر وكيف نعالجها في دوبليكس.",
      en: "From slow loading to complicated checkout, these are the most common mistakes we see in stores and how we fix them at Duplex.",
    },
    body: {
      ar: [
        "بعد عشرات مشاريع المتاجر الإلكترونية، لاحظنا أن نفس الأخطاء تتكرر. الأول: بطء تحميل صفحات المنتج، وهو ما يدفع الزائر للمغادرة قبل أن يرى أي شيء. الثاني: صور منتجات ضعيفة لا تبيع.",
        "الثالث: خطوات شراء طويلة ومعقدة تزيد هجر السلة. الرابع: غياب وسائل الدفع المحلية التي يثق بها جمهورك. الخامس: عدم وجود سياسة إرجاع واضحة تطمئن المشتري.",
        "في دوبليكس نعالج هذه النقاط في كل متجر نبنيه: سرعة فوق 90 نقطة، تصوير منتج احترافي، تشك-أوت من خطوتين كحد أقصى، كل وسائل الدفع، وسياسات واضحة. النتيجة متاجر تبيع فعلاً، لا مجرد واجهات جميلة.",
      ],
      en: [
        "After dozens of e-commerce projects, we've noticed the same mistakes repeat. First: slow product-page loading, which makes visitors leave before seeing anything. Second: weak product photos that don't sell.",
        "Third: long, complicated checkout steps that increase cart abandonment. Fourth: the absence of local payment methods your audience trusts. Fifth: no clear return policy that reassures the buyer.",
        "At Duplex, we address these points in every store we build: speed above 90, professional product photography, checkout in at most two steps, every payment method, and clear policies. The result is stores that actually sell, not just pretty interfaces.",
      ],
    },
    categoryId: "web",
    image: IMG.web2,
    date: "2026-03-10",
    readMinutes: 5,
    tags: ["web", "ecommerce", "store"],
  },
  {
    id: "b-8",
    slug: "launch-playbook",
    title: {
      ar: "من الفكرة إلى الإطلاق: منهجيتنا الكاملة في العمل",
      en: "From Idea to Launch: Our Complete Working Methodology",
    },
    excerpt: {
      ar: "أربع مراحل نمر بها مع كل مشروع: اكتشاف، تصميم، تنفيذ، ثم إطلاق ونمو. إليك ما يحدث في كل مرحلة بالتفصيل.",
      en: "Four phases we go through with every project: discover, design, build, then launch and grow. Here's what happens in each phase in detail.",
    },
    body: {
      ar: [
        "كل مشروع في دوبليكس يمر بأربع مراحل مدروسة. في مرحلة الاكتشاف ندرس عملك وجمهورك ومنافسيك ونضع أهدافًا قابلة للقياس. لا نبدأ أي تنفيذ قبل أن نتفق على خارطة الطريق.",
        "في مرحلة التصميم نبني الهوية والواجهات في دورات سريعة تراجعها معنا خطوة بخطوة. ثم مرحلة التنفيذ: تطوير نظيف ومونتاج دقيق ومحتوى جاهز، بجودة نختبرها بصرامة.",
        "أخيرًا مرحلة الإطلاق والنمو: نطلق، نقيس، ونحسّن باستمرار بتقارير شفافة. لأن المشروع الناجح لا يتوقف عند الإطلاق — بل يبدأ عنده. هذه المنهجية هي التي تجعل عملاءنا يعودون إلينا مشروعًا بعد مشروع.",
      ],
      en: [
        "Every project at Duplex goes through four deliberate phases. In the discovery phase, we study your business, audience, and competitors, setting measurable goals. We never begin execution before agreeing on the roadmap.",
        "In the design phase, we build identity and interfaces in fast sprints you review with us step by step. Then the build phase: clean development, precise editing, launch-ready content — quality we test rigorously.",
        "Finally, the launch and growth phase: we ship, measure, and continuously improve with transparent reports. Because a successful project doesn't stop at launch — it begins there. This methodology is why our clients return to us project after project.",
      ],
    },
    categoryId: "services",
    image: IMG.marketing2,
    date: "2026-03-18",
    readMinutes: 7,
    tags: ["services", "process", "methodology"],
  },
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const blogPostsByCategory = (categoryId: string): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.categoryId === categoryId);
