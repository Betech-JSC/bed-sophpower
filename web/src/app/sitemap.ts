import { MetadataRoute } from "next";
import { api, ProductCategory } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const baseUrl = rawBaseUrl.replace(/\/$/, "");

  // Static routes mapping
  const routes = [
    "",
    "/about",
    "/nguyen-lieu-thuc-pham",
    "/nguyen-lieu-my-pham",
    "/news",
    "/recruitment",
    "/contact",
    "/policies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  try {
    // 1. Fetch product categories
    const categories = await api.getProductCategories().catch(() => []);
    const categoryUrls: MetadataRoute.Sitemap = [];

    const extractCategoryUrls = (cats: ProductCategory[]) => {
      cats.forEach((cat) => {
        if (cat.slug) {
          categoryUrls.push({
            url: `${baseUrl}/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          });
        }
        if (cat.children && cat.children.length > 0) {
          extractCategoryUrls(cat.children);
        }
      });
    };
    extractCategoryUrls(categories);

    // 2. Fetch dynamic products
    const products = await api.getProducts().catch(() => []);
    const productUrls = products.map((p) => ({
      url: `${baseUrl}/${p.type === "food" ? "nguyen-lieu-thuc-pham" : "nguyen-lieu-my-pham"}/${p.slug || p.id}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // 3. Fetch dynamic articles
    const articles = await api.getNews().catch(() => []);
    const articleUrls = articles.map((a) => ({
      url: `${baseUrl}/news/${a.slug || a.id}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // 4. Fetch dynamic jobs
    const jobs = await api.getJobs().catch(() => []);
    const jobUrls = jobs.map((j) => ({
      url: `${baseUrl}/recruitment/${j.slug || j.id}`,
      lastModified: j.updated_at ? new Date(j.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // 5. Fetch dynamic static pages (policies)
    const pages = await api.getPages().catch(() => []);
    const pageUrls = pages.map((po) => ({
      url: `${baseUrl}/policies/${po.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    // De-duplicate URLs if any overlaps exist
    const allEntries = [...routes, ...categoryUrls, ...productUrls, ...articleUrls, ...jobUrls, ...pageUrls];
    const uniqueEntriesMap = new Map<string, MetadataRoute.Sitemap[number]>();
    allEntries.forEach((entry) => {
      if (!uniqueEntriesMap.has(entry.url)) {
        uniqueEntriesMap.set(entry.url, entry);
      }
    });

    return Array.from(uniqueEntriesMap.values());
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return routes;
  }
}

