import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let robotsTxt = `User-Agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${baseUrl}/sitemap.xml`;

  try {
    const settings = await api.getSettings();
    if (settings?.seo_robots_txt && settings.seo_robots_txt.trim() !== "") {
      robotsTxt = settings.seo_robots_txt;
      
      // If sitemap isn't declared in the user's robots.txt, append it automatically
      if (!robotsTxt.toLowerCase().includes("sitemap:")) {
        robotsTxt += `\n\nSitemap: ${baseUrl}/sitemap.xml`;
      }
    }
  } catch (error) {
    console.error("Robots.txt generation error:", error);
  }

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}
