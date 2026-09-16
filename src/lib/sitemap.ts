/**
 * مولّد Sitemap ديناميكي
 * بياخد البيانات من Firestore ويولّد sitemap.xml
 */

import type { Category, Project, BlogPost } from "../data";

const BASE_URL = "https://duplex.studio";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export function generateSitemap(
  categories: Category[],
  projects: Project[],
  posts: BlogPost[]
): string {
  const urls: SitemapUrl[] = [];

  // الصفحة الرئيسية
  urls.push({
    loc: BASE_URL,
    changefreq: "daily",
    priority: 1.0,
  });

  // صفحات الأقسام
  categories.forEach((cat: Category) => {
    urls.push({
      loc: `${BASE_URL}/#/work/${cat.id}`,
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  // صفحات المشاريع
  projects.forEach((project: Project) => {
    urls.push({
      loc: `${BASE_URL}/#/project/${project.slug}`,
      lastmod: new Date(project.year, 0, 1).toISOString().split("T")[0],
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  // صفحات المدونة
  urls.push({
    loc: `${BASE_URL}/#/blog`,
    changefreq: "daily",
    priority: 0.8,
  });

  // صفحات المقالات
  posts.forEach((post: BlogPost) => {
    urls.push({
      loc: `${BASE_URL}/#/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: "monthly",
      priority: 0.6,
    });
  });

  // توليد XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

/**
 * يولّد sitemap ويحفظه كملف
 */
export function downloadSitemap(
  categories: Category[],
  projects: Project[],
  posts: BlogPost[]
): void {
  const sitemap = generateSitemap(categories, projects, posts);
  const blob = new Blob([sitemap], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sitemap.xml";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
