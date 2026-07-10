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
import ScrollReveal from "@/components/ScrollReveal";
import TableOfContents from "@/components/TableOfContents";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ preview?: string; secret?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sParams = await searchParams;
  const preview = sParams?.preview === "true";
  const secret = sParams?.secret || "";
  const locale = await getLocaleServer();
  const article = await api.getArticle(id, preview, secret).catch(() => null);
  
  if (!article) return {};

  const customTitle = article.seo_title ? getVal(article.seo_title, locale) : "";
  const customDesc = article.seo_desc ? getVal(article.seo_desc, locale) : "";
  const customKeywords = article.seo_keywords ? getVal(article.seo_keywords, locale) : "";
  const robots = article.meta_robots || undefined;

  const title = customTitle || getVal(article.title, locale);
  let description = customDesc;
  if (!description) {
    const rawSummary = getVal(article.summary, locale) || "";
    const cleanSummary = rawSummary.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 155);
    description = cleanSummary ? `${cleanSummary}...` : "";
  }

  const formattedTitle = title.includes("Sophpower") ? title : `${title} - Sophpower Vietnam`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const customOgImage = article.og_image ? api.getImageUrl(article.og_image) : "";
  let imageUrl = customOgImage || (article.image ? api.getImageUrl(article.image) : `${baseUrl}/images/logo.png`);
  if (imageUrl.startsWith("/")) {
    imageUrl = `${baseUrl}${imageUrl}`;
  }
  const hasCustomImage = !!customOgImage || !!article.image;

  return {
    title: formattedTitle,
    description: description || undefined,
    keywords: customKeywords || undefined,
    robots: robots || undefined,
    alternates: {
      canonical: article.canonical_url || `${baseUrl}/news/${id}`,
    },
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

interface HeadingItem {
  text: string;
  id: string;
  level: number;
}

function extractHeadingsAndInsertIds(htmlContent: string): {
  modifiedHtml: string;
  headings: HeadingItem[];
} {
  const headings: HeadingItem[] = [];
  let idCounter = 1;

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove tone marks/accents
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/-+/g, "-"); // Collapse duplicate dashes
  };

  const modifiedHtml = htmlContent.replace(
    /<(h[23])(\s+[^>]*)?>(.*?)<\/\1>/gi,
    (match, tag, attrs = "", content) => {
      // Strip inner tags to get plain text for slugification
      const plainText = content.replace(/<[^>]*>/g, "").trim();
      if (!plainText) return match;

      let headingId = slugify(plainText);
      if (!headingId) {
        headingId = `heading-${idCounter++}`;
      }

      // Ensure uniqueness
      let finalId = headingId;
      let counter = 1;
      while (headings.some((h) => h.id === finalId)) {
        finalId = `${headingId}-${counter++}`;
      }

      headings.push({
        text: plainText,
        id: finalId,
        level: tag.toLowerCase() === "h2" ? 2 : 3,
      });

      // Filter out existing id attribute if any
      const cleanAttrs = attrs.replace(/\bid\s*=\s*['"][^'"]*['"]/gi, "").trim();
      const updatedAttrs = cleanAttrs ? ` id="${finalId}" ${cleanAttrs}` : ` id="${finalId}"`;

      return `<${tag}${updatedAttrs}>${content}</${tag}>`;
    }
  );

  return { modifiedHtml, headings };
}

export default async function NewsDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ preview?: string; secret?: string }>;
}) {
  const { id } = await params;
  const sParams = await searchParams;
  const preview = sParams?.preview === "true";
  const secret = sParams?.secret || "";
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  
  // Fetch article detail from Laravel API
  const article = await api.getArticle(id, preview, secret).catch(() => null);
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

  // Get dynamic HTML content and extract TOC
  const articleRawContent = getVal(article.content, locale) || "";
  const { modifiedHtml: articleContent, headings } = extractHeadingsAndInsertIds(articleRawContent);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/news/${article.slug || article.id}`;
  const authorName = article.author || "Sophpower";
  
  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": getVal(article.title, locale),
    "image": article.image ? [api.getImageUrl(article.image)] : [`${baseUrl}/images/logo.png`],
    "datePublished": article.date ? new Date(article.date).toISOString() : article.created_at || new Date().toISOString(),
    "dateModified": article.updated_at || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sophpower Vietnam",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`
      }
    },
    "description": (getVal(article.summary, locale) || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160)
  };

  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-4 lg:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
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
        <ScrollReveal direction="up" duration={600}>
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
        </ScrollReveal>

        <div className="h-0.5 w-full bg-gray-100 relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
        </div>

        {/* Feature Image */}
        {article.image && (
          <ScrollReveal direction="up" delay={100} duration={600}>
            <div className="rounded-2xl overflow-hidden bg-gray-55 border border-gray-150">
              <img
                src={api.getImageUrl(article.image)}
                alt={getVal(article.title, locale)}
                className="w-full h-auto object-cover max-h-[450px]"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Table of Contents */}
        {headings.length > 0 && (
          <ScrollReveal direction="up" delay={120} duration={600}>
            <TableOfContents
              headings={headings}
              title={t.newsList.tocTitle}
              hideLabel={t.newsList.tocHide}
              showLabel={t.newsList.tocShow}
            />
          </ScrollReveal>
        )}

        {/* Article content */}
        <ScrollReveal direction="up" delay={150} duration={600}>
          <div 
            className="rich-text text-gray-750 text-base leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </ScrollReveal>

        {/* Social Share Buttons */}
        <ScrollReveal direction="up" delay={200} duration={600}>
          <ShareSocial title={getVal(article.title, locale)} />
        </ScrollReveal>
      </article>
    </div>
  );
}
