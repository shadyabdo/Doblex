/**
 * نظام استخراج الكلمات المفتاحية التلقائي
 * بيحلل المحتوى ويستخرج أهم الكلمات المفتاحية
 */

// كلمات عربية شائعة نتجاهلها (stop words)
const AR_STOP_WORDS = new Set([
  'في', 'من', 'الى', 'على', 'عن', 'مع', 'هذا', 'هذه', 'التي', 'الذي',
  'هو', 'هي', 'هم', 'نحن', 'انت', 'انا', 'ان', 'انها', 'انه',
  'كان', 'كانت', 'يكون', 'تكون', 'ذلك', 'تلك', 'ال', 'ل', 'ب', 'و', 'ف',
  'ثم', 'او', 'أو', 'لا', 'ما', 'لم', 'لن', 'قد', 'اذا', 'إذا',
  'كل', 'بعض', 'غير', 'بين', 'عند', 'حتى', 'بعد', 'قبل', 'خلال',
  'انه', 'انها', 'التي', 'الذي', 'الذين', 'اما', 'إما', 'ايضا', 'أيضا',
  'لقد', 'لكن', 'ولكن', 'حيث', 'ذات', 'ذو', 'ليس', 'ليست',
  'نحن', 'هم', 'انت', 'أنت', 'انا', 'أنا', 'هؤلاء', 'اولئك',
  'هنا', 'هناك', 'الان', 'الآن', 'دائما', 'ابدا', 'جدا', 'كثيرا',
  'يمكن', 'يستطيع', 'يجب', 'ينبغي', 'لماذا', 'كيف', 'متى', 'اين',
  'احد', 'شيء', 'كل شيء', 'لا شيء', 'اي', 'ايها', 'ايته',
]);

// كلمات إنجليزية شائعة نتجاهلها
const EN_STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
  'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'is', 'are', 'was', 'were', 'been', 'has',
  'had', 'did', 'does', 'am', 'being', 'having', 'doing', 'should', 'must',
]);

interface KeywordResult {
  keyword: string;
  count: number;
  relevance: number;
}

/**
 * يحلل النص ويستخرج الكلمات المفتاحية
 */
export function extractKeywords(
  text: string,
  lang: 'ar' | 'en' = 'ar',
  maxKeywords: number = 10
): string[] {
  if (!text || text.trim().length === 0) return [];

  // تنظيف النص
  const cleanedText = text
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ') // نحافظ على الحروف العربية
    .replace(/\s+/g, ' ')
    .trim();

  // تقسيم النص لكلمات
  const words = cleanedText.split(' ').filter(word => {
    // نتجاهل الكلمات القصيرة جدا
    if (word.length < (lang === 'ar' ? 2 : 3)) return false;
    
    // نتجاهل stop words
    const stopWords = lang === 'ar' ? AR_STOP_WORDS : EN_STOP_WORDS;
    if (stopWords.has(word)) return false;
    
    return true;
  });

  // حساب تكرار كل كلمة
  const wordCount = new Map<string, number>();
  words.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });

  // حساب relevance score
  const totalWords = words.length;
  const results: KeywordResult[] = [];

  wordCount.forEach((count, word) => {
    // TF (Term Frequency)
    const tf = count / totalWords;
    
    // طول الكلمة (كلمات اطول عادة اهم)
    const lengthBonus = Math.min(word.length / 10, 1);
    
    // Relevance score
    const relevance = tf * (1 + lengthBonus);
    
    results.push({ keyword: word, count, relevance });
  });

  // ترتيب حسب relevance
  results.sort((a, b) => b.relevance - a.relevance);

  // إرجاع أهم الكلمات
  return results.slice(0, maxKeywords).map(r => r.keyword);
}

/**
 * يستخرج keywords من مشروع
 */
export function extractProjectKeywords(project: {
  title?: { ar: string; en: string };
  tagline?: { ar: string; en: string };
  description?: { ar: string[]; en: string[] };
  services?: { ar: string; en: string }[];
}): { ar: string[]; en: string[] } {
  const arTexts: string[] = [];
  const enTexts: string[] = [];

  // نجمع النصوص
  if (project.title) {
    if (project.title.ar) arTexts.push(project.title.ar);
    if (project.title.en) enTexts.push(project.title.en);
  }
  if (project.tagline) {
    if (project.tagline.ar) arTexts.push(project.tagline.ar);
    if (project.tagline.en) enTexts.push(project.tagline.en);
  }
  if (project.description) {
    if (project.description.ar) arTexts.push(...project.description.ar);
    if (project.description.en) enTexts.push(...project.description.en);
  }
  if (project.services) {
    project.services.forEach(s => {
      if (s.ar) arTexts.push(s.ar);
      if (s.en) enTexts.push(s.en);
    });
  }

  return {
    ar: extractKeywords(arTexts.join(' '), 'ar', 15),
    en: extractKeywords(enTexts.join(' '), 'en', 15),
  };
}

/**
 * يستخرج keywords من مقال
 */
export function extractPostKeywords(post: {
  title?: { ar: string; en: string };
  excerpt?: { ar: string; en: string };
  body?: { ar: string[]; en: string[] };
  tags?: string[];
}): { ar: string[]; en: string[] } {
  const arTexts: string[] = [];
  const enTexts: string[] = [];

  // نجمع النصوص
  if (post.title) {
    if (post.title.ar) arTexts.push(post.title.ar);
    if (post.title.en) enTexts.push(post.title.en);
  }
  if (post.excerpt) {
    if (post.excerpt.ar) arTexts.push(post.excerpt.ar);
    if (post.excerpt.en) enTexts.push(post.excerpt.en);
  }
  if (post.body) {
    if (post.body.ar) arTexts.push(...post.body.ar);
    if (post.body.en) enTexts.push(...post.body.en);
  }
  if (post.tags) {
    arTexts.push(...post.tags);
    enTexts.push(...post.tags);
  }

  return {
    ar: extractKeywords(arTexts.join(' '), 'ar', 15),
    en: extractKeywords(enTexts.join(' '), 'en', 15),
  };
}

/**
 * يولد meta description من المحتوى
 */
export function generateMetaDescription(
  content: string,
  maxLength: number = 160
): string {
  if (!content) return '';
  
  // نشيل HTML tags لو موجودة
  const text = content.replace(/<[^>]*>/g, '').trim();
  
  // لو النص قصير كفاية
  if (text.length <= maxLength) return text;
  
  // نقطع عند آخر مسافة قبل maxLength
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}
