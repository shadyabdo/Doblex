import { Component, useEffect, type ErrorInfo, type ReactNode } from "react";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider, useLang } from "./i18n";
import { ContentProvider, useContent } from "./lib/content";
import { LOGO_URL } from "./data/projects";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { initAnalytics, trackPageView } from "./lib/analytics";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

/** شبكة أمان: أي خطأ وقت التشغيل يعرض شاشة ودّية بدل الشاشة البيضاء */
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Duplex] Render error:", error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
        <span className="block h-16 w-16 overflow-hidden rounded-2xl border border-line bg-surface shadow">
          <img src={LOGO_URL} alt="Duplex" className="h-full w-full object-cover" />
        </span>
        <div className="max-w-md">
          <p className="font-display text-xl font-extrabold text-ink">حدث خطأ غير متوقع</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Something went wrong while rendering the page. Please reload — if it
            persists, check the Firestore connection.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full bg-flame px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(232,89,12,0.35)] transition-all hover:-translate-y-0.5 hover:bg-flame-deep"
        >
          إعادة تحميل الصفحة
        </button>
      </div>
    );
  }
}

function Analytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

/** شاشة تظهر أثناء المزامنة مع السحاب أو عند تعذّر الاتصال */
function ContentGate({ children }: { children: ReactNode }) {
  const { loading, error, retry } = useContent();
  const { isAr } = useLang();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
        <span className="relative block h-20 w-20 overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
          <img src={LOGO_URL} alt="Duplex" className="h-full w-full object-cover" />
          <span className="sync-sheen absolute inset-0" aria-hidden />
        </span>
        <div className="flex items-end gap-1.5" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="sync-bar w-2 rounded-full bg-teal"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
        <span className="block h-16 w-16 overflow-hidden rounded-2xl border border-line bg-surface shadow">
          <img src={LOGO_URL} alt="Duplex" className="h-full w-full object-cover" />
        </span>
        <div className="max-w-md">
          <p className="font-display text-xl font-extrabold text-ink">
            {isAr ? "تعذّر الاتصال بقاعدة البيانات" : "Couldn't reach the database"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {isAr
              ? "المحتوى يُقرأ لحظيًا من Firestore. تأكد من اتصالك بالإنترنت ومن قواعد الأمان، ثم أعد المحاولة."
              : "Content is read live from Firestore. Check your connection and security rules, then retry."}
          </p>
        </div>
        <button
          onClick={retry}
          className="rounded-full bg-flame px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(232,89,12,0.35)] transition-all hover:-translate-y-0.5 hover:bg-flame-deep"
        >
          {isAr ? "إعادة المحاولة" : "Retry"}
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <HelmetProvider>
          <ContentProvider>
            <HashRouter>
              <ScrollToTop />
              <Analytics />
              <ContentGate>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1 pt-20 md:pt-24">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/work/:categoryId" element={<Category />} />
                      <Route path="/project/:slug" element={<ProjectDetail />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ContentGate>
            </HashRouter>
          </ContentProvider>
        </HelmetProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
