import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

/**
 * إعدادات مشروع فايربيز — dublex-26
 * نفس الإعدادات المدمجة في الداشبورد، لذا يقرأ الموقع نفس المستند الذي تكتب فيه.
 */
const firebaseConfig = {
  apiKey: "AIzaSyB6zdS1RbyPqbKjmArSyEtk2vyO3ErZ6og",
  authDomain: "dublex-26.firebaseapp.com",
  projectId: "dublex-26",
  storageBucket: "dublex-26.firebasestorage.app",
  messagingSenderId: "252085069789",
  appId: "1:252085069789:web:38c7bdef155ad74838f834",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * الداشبورد تفعّل "الدخول المجهول" لتستطيع الكتابة في وضع الإنتاج.
 * نحاول تسجيل دخول مجهول قبل القراءة لرفع احتمال نجاحها حسب قواعد الأمان،
 * ونكمل حتى لو فشل (قد تكون القراءة مباحة للجميع).
 */
let authPromise: Promise<void> | null = null;
export function ensureAuth(): Promise<void> {
  if (!authPromise) {
    authPromise = signInAnonymously(auth)
      .then(() => undefined)
      .catch(() => undefined);
  }
  return authPromise;
}

/** مسار المستند الذي تحفظ فيه الداشبورد كل المحتوى */
export const CONTENT_COLLECTION = "dashboards";
export const CONTENT_DOC = "dublex-main";
