import React from "react";
import { api } from "@/lib/api";
import NewsClient from "@/components/NewsClient";
import type { Metadata } from "next";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  return {
    title: `${t.header.news} - Sophpower Vietnam`,
    description: locale === "vi" 
      ? "Cập nhật các tin tức mới nhất, sự kiện nổi bật và kiến thức hữu ích về nguyên liệu thực phẩm, nguyên liệu mỹ phẩm."
      : "Stay updated with the latest news, events, and professional insights on food and cosmetic ingredients.",
  };
}

export default async function News() {
  const articles = await api.getNews().catch((err) => {
    console.error("Failed to fetch news articles:", err);
    return [];
  });

  return <NewsClient initialArticles={articles} />;
}
