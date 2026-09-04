import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, signInAnonymously, type Auth } from "firebase/auth";

/**
 * إعدادات مشروع فايربيز — dublex-26
 * نفس الإعدادات المدمجة في الداشبورد، فيقرأ الموقع نفس المستند الذي تكتب فيه.
 *
 * ملاحظة: كل خطوات التهيئة محمية بـ try/catch — لو البيئة منعت الوصول
 * (قيود iframe / قواعد أمان / شبكة) الموقع يفتح عادي ويقرأ عبر REST كبديل.
 */
const firebaseConfig = {
  apiKey: "AIzaSyB6zdS1RbyPqbKjmArSyEtk2vyO3ErZ6og",
  authDomain: "dublex-26.firebaseapp.com",
  projectId: "dublex-26",
  storageBucket: "dublex-26.firebasestorage.app",
  messagingSenderId: "252085069789",
  appId: "1:252085069789:web:38c7bdef155ad74838f834",
};

export const PROJECT_ID = "dublex-26";

/** مسار المستند الذي تحفظ فيه الداشبورد كل المحتوى */
export const CONTENT_COLLECTION = "dashboards";
export const CONTENT_DOC = "dublex-main";

export let app: FirebaseApp | null = null;
export let db: Firestore | null = null;
let auth: Auth | null = null;

try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.warn("[duplex] firebase init failed:", e);
}
try {
  if (app) db = getFirestore(app);
} catch (e) {
  console.warn("[duplex] firestore init failed:", e);
}
try {
  if (app) auth = getAuth(app);
} catch (e) {
  console.warn("[duplex] auth init failed:", e);
}

/**
 * الداشبورد تفعّل "الدخول المجهول" لتستطيع الكتابة في وضع الإنتاج.
 * نسجّل دخولًا مجهولًا قبل القراءة لرفع احتمال نجاحها حسب قواعد الأمان،
 * ونكمل حتى لو فشل.
 */
let authPromise: Promise<void> | null = null;
export function ensureAuth(): Promise<void> {
  if (!auth) return Promise.resolve();
  if (!authPromise) {
    authPromise = signInAnonymously(auth)
      .then(() => undefined)
      .catch(() => undefined);
  }
  return authPromise;
}
