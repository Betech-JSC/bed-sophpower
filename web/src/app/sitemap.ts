import { MetadataRoute } from "next";
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes mapping
  const routes = [
    "",
    "/about",
    "/nguyen-lieu-thuc-pham",
    "/nguyen-lieu-my-pham",
    "/news",
    "/recruitment",
    "/page_5",
    "/policies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // 1. Fetch dynamic products
    const products = await api.getProducts().catch(() => []);
    const productUrls = products.map((p) => ({
      url: `${baseUrl}/${p.type === "food" ? "nguyen-lieu-thuc-pham" : "nguyen-lieu-my-pham"}/${p.id}`,
      lastModified: p.updated_at || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // 2. Fetch dynamic articles
    const articles = await api.getNews().catch(() => []);
    const articleUrls = articles.map((a) => ({
      url: `${baseUrl}/news/${a.id}`,
      lastModified: a.updated_at || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // 3. Fetch dynamic jobs
    const jobs = await api.getJobs().catch(() => []);
    const jobUrls = jobs.map((j) => ({
      url: `${baseUrl}/recruitment/${j.id}`,
      lastModified: j.updated_at || new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

    // 4. Fetch dynamic static pages (policies)
    const pages = await api.getPages().catch(() => []);
    const pageUrls = pages.map((po) => ({
      url: `${baseUrl}/policies/${po.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    }));

    return [...routes, ...productUrls, ...articleUrls, ...jobUrls, ...pageUrls];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return routes;
  }
}
