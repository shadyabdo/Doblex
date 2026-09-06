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
import { ViewsProvider } from "./lib/views";
import { LOGO_URL } from "./data";
import { Navbar, Footer } from "./components/chrome";
import { RefreshIcon } from "./components/icons";
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

function Analytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

/** شبكة أمان: تعرض رسالة ودّية بدل الشاشة البيضاء عند أي خطأ */
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[duplex] render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
          <span className="block h-16 w-16 overflow-hidden rounded-2xl border border-line bg-surface shadow">
            <img src={LOGO_URL} alt="Duplex" className="h-full w-full object-cover" />
          </span>
          <p className="font-display text-xl font-extrabold text-ink">حدث خطأ غير متوقع</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-full bg-flame px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(232,89,12,0.35)] transition-all hover:-translate-y-0.5 hover:bg-flame-deep"
          >
            <RefreshIcon className="h-4 w-4" />
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/** شاشة التحميل (لوجو + أنميشن فقط) + بوابة المحتوى */
function ContentGate({ children }: { children: ReactNode }) {
  const { loading } = useContent();

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

  return <>{children}</>;
}

function SyncChip() {
  const { syncFailed, retry } = useContent();
  const { isAr } = useLang();
  if (!syncFailed) return null;
  return (
    <button
      onClick={retry}
      className="fixed bottom-5 start-5 z-50 flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-paper shadow-[0_14px_36px_rgba(13,31,51,0.35)] transition-transform hover:-translate-y-0.5"
    >
      <span className="pulse-dot h-2 w-2 rounded-full bg-flame" />
      {isAr ? "المزامنة متعثرة — اضغط لإعادة المحاولة" : "Sync stalled — tap to retry"}
      <RefreshIcon className="h-3.5 w-3.5 text-flame" />
    </button>
  );
}

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ViewsProvider>
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
                  <SyncChip />
                </div>
              </ContentGate>
            </HashRouter>
          </ContentProvider>
        </HelmetProvider>
        </ViewsProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
