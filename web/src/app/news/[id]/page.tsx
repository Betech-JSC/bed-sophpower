import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import type { Metadata } from "next";
import ShareSocial from "@/components/ShareSocial";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocaleServer();
  const article = await api.getArticle(id).catch(() => null);
  
  if (!article) return {};

  const customTitle = article.seo_title ? getVal(article.seo_title, locale) : "";
  const customDesc = article.seo_desc ? getVal(article.seo_desc, locale) : "";

  const title = customTitle || getVal(article.title, locale);
  let description = customDesc;
  if (!description) {
    const rawSummary = getVal(article.summary, locale) || "";
    const cleanSummary = rawSummary.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 155);
    description = cleanSummary ? `${cleanSummary}...` : "";
  }

  const formattedTitle = title.includes("Sophpower") ? title : `${title} - Sophpower Vietnam`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let imageUrl = article.image ? api.getImageUrl(article.image) : `${baseUrl}/images/logo.png`;
  if (imageUrl.startsWith("/")) {
    imageUrl = `${baseUrl}${imageUrl}`;
  }
  const hasCustomImage = !!article.image;

  return {
    title: formattedTitle,
    description: description || undefined,
    openGraph: {
      type: "article",
      url: `${baseUrl}/news/${id}`,
      title: formattedTitle,
      description: description || undefined,
      images: [{
        url: imageUrl,
        width: hasCustomImage ? 1200 : 800,
        height: hasCustomImage ? 630 : 800,
        alt: title,
      }],
    },
    twitter: {
      card: hasCustomImage ? "summary_large_image" : "summary",
      title: formattedTitle,
      description: description || undefined,
      images: [imageUrl],
    }
  };
}

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

  // Get dynamic HTML content
  const articleContent = getVal(article.content, locale) || "";

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
        <div 
          className="space-y-6 text-gray-750 text-base leading-relaxed text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-4"
          dangerouslySetInnerHTML={{ __html: articleContent }}
        />

        {/* Social Share Buttons */}
        <ShareSocial title={getVal(article.title, locale)} />
      </article>
    </div>
  );
}
