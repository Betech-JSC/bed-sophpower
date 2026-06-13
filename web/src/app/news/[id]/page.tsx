import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  
  // Fetch article detail from Laravel API
  const article = await api.getArticle(id).catch(() => null);
  if (!article) {
    notFound();
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Split content into paragraphs for clean typography
  const articleContent = getVal(article.content, locale);
  const paragraphs = articleContent
    ? articleContent.split(/\r?\n/).filter((p) => p.trim() !== "")
    : [];

  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.newsList.backToNews}
        </Link>
      </div>

      {/* Article Container */}
      <article className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {getVal(article.title, locale)}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-405 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-brand-green" />
              {formatDate(article.date)}
            </span>
            <span className="text-gray-300">•</span>
            <span>{t.newsList.authorLabel}: {article.author}</span>
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-100 relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
        </div>

        {/* Feature Image */}
        {article.image && (
          <div className="rounded-2xl overflow-hidden bg-gray-55 border border-gray-150">
            <img
              src={api.getImageUrl(article.image)}
              alt={getVal(article.title, locale)}
              className="w-full h-auto object-cover max-h-[450px]"
            />
          </div>
        )}

        {/* Article content */}
        <div className="space-y-6 text-gray-750 text-base leading-relaxed text-justify whitespace-pre-wrap">
          {paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
