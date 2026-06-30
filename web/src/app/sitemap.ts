import { MetadataRoute } from "next";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes mapping
  const staticPaths = [
    { vi: "", en: "/en", priority: 1.0 },
    { vi: "/about", en: "/en/about", priority: 0.8 },
    { vi: "/nguyen-lieu-thuc-pham", en: "/en/food-ingredients", priority: 0.8 },
    { vi: "/nguyen-lieu-my-pham", en: "/en/cosmetic-ingredients", priority: 0.8 },
    { vi: "/news", en: "/en/news", priority: 0.8 },
    { vi: "/recruitment", en: "/en/recruitment", priority: 0.8 },
    { vi: "/contact", en: "/en/contact", priority: 0.8 },
    { vi: "/policies", en: "/en/policies", priority: 0.8 },
  ];

  const routes = staticPaths.flatMap((path) => [
    {
      url: `${baseUrl}${path.vi}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: path.priority,
    },
    {
      url: `${baseUrl}${path.en}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: path.priority,
    }
  ]);

  try {
    // 1. Fetch dynamic products
    const products = await api.getProducts().catch(() => []);
    const productUrls = products.flatMap((p) => {
      const viPath = `/${p.type === "food" ? "nguyen-lieu-thuc-pham" : "nguyen-lieu-my-pham"}/${p.slug || p.id}`;
      const enPath = `/en/${p.type === "food" ? "food-ingredients" : "cosmetic-ingredients"}/${p.slug || p.id}`;
      const lastModified = p.updated_at || new Date().toISOString();
      return [
        { url: `${baseUrl}${viPath}`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 },
        { url: `${baseUrl}${enPath}`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 },
      ];
    });

    // 2. Fetch dynamic articles
    const articles = await api.getNews().catch(() => []);
    const articleUrls = articles.flatMap((a) => {
      const lastModified = a.updated_at || new Date().toISOString();
      return [
        { url: `${baseUrl}/news/${a.slug || a.id}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 },
        { url: `${baseUrl}/en/news/${a.slug || a.id}`, lastModified, changeFrequency: "weekly" as const, priority: 0.6 },
      ];
    });

    // 3. Fetch dynamic jobs
    const jobs = await api.getJobs().catch(() => []);
    const jobUrls = jobs.flatMap((j) => {
      const lastModified = j.updated_at || new Date().toISOString();
      return [
        { url: `${baseUrl}/recruitment/${j.slug || j.id}`, lastModified, changeFrequency: "weekly" as const, priority: 0.5 },
        { url: `${baseUrl}/en/recruitment/${j.slug || j.id}`, lastModified, changeFrequency: "weekly" as const, priority: 0.5 },
      ];
    });

    // 4. Fetch dynamic static pages (policies)
    const pages = await api.getPages().catch(() => []);
    const pageUrls = pages.flatMap((po) => {
      const lastModified = new Date().toISOString();
      return [
        { url: `${baseUrl}/policies/${po.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.4 },
        { url: `${baseUrl}/en/policies/${po.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.4 },
      ];
    });

    return [...routes, ...productUrls, ...articleUrls, ...jobUrls, ...pageUrls];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return routes;
  }
}
