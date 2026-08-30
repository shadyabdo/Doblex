/* ------------------------------------------------------------------ */
/*  ربط جوجل أناليتكس — Google Analytics 4                             */
/*                                                                     */
/*  1) ضع معرّف القياس الخاص بك في GA_MEASUREMENT_ID أدناه             */
/*     (يبدأ بـ "G-")                                                  */
/*  2) سيتم تحميل سكربت gtag تلقائيًا وارسال page_view مع كل تنقّل     */
/*  إذا تُرك فارغًا لن يتم تحميل أي سكربت (وضع التطوير)                */
/* ------------------------------------------------------------------ */

export const GA_MEASUREMENT_ID = ""; // ← ضع المعرّف هنا، مثال: "G-ABC123XYZ"

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (initialized || !GA_MEASUREMENT_ID) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

/** أرسل حدث page_view — يُستدعى تلقائيًا مع كل تغيير في المسار */
export function trackPageView(path: string): void {
  if (!initialized || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
  });
}

/** أرسل حدث مخصص (اختياري) مثل نقرات الأزرار */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!initialized || !window.gtag) return;
  window.gtag("event", name, params ?? {});
}
