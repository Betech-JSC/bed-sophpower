import React from "react";
import { api } from "@/lib/api";
import NewsClient from "@/components/NewsClient";

export default async function News() {
  const articles = await api.getNews().catch((err) => {
    console.error("Failed to fetch news articles:", err);
    return [];
  });

  return <NewsClient initialArticles={articles} />;
}
