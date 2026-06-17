import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { api } from "@/lib/api";
import ProductTabs from "@/components/ProductTabs";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

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
  const product = await api.getProduct(id, preview, secret).catch(() => null);
  
  if (!product) return {};

  const customTitle = product.seo_title ? getVal(product.seo_title, locale) : "";
  const customDesc = product.seo_desc ? getVal(product.seo_desc, locale) : "";
  const customKeywords = product.seo_keywords ? getVal(product.seo_keywords, locale) : "";
  const robots = product.meta_robots || undefined;

  const name = customTitle || getVal(product.name, locale);
  let description = customDesc;
  if (!description) {
    const rawDesc = getVal(product.desc, locale) || "";
    const cleanDesc = rawDesc.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 155);
    description = cleanDesc ? `${cleanDesc}...` : "";
  }

  const formattedTitle = name.includes("Sophpower") ? name : `${name} - Sophpower Vietnam`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const customOgImage = product.og_image ? api.getImageUrl(product.og_image) : "";
  let imageUrl = customOgImage || (product.image ? api.getImageUrl(product.image) : `${baseUrl}/images/logo.png`);
  if (imageUrl.startsWith("/")) {
    imageUrl = `${baseUrl}${imageUrl}`;
  }
  const hasCustomImage = !!customOgImage || !!product.image;

  return {
    title: formattedTitle,
    description: description || undefined,
    keywords: customKeywords || undefined,
    robots: robots || undefined,
    alternates: {
      canonical: product.canonical_url || `${baseUrl}/${locale === "vi" ? "nguyen-lieu-my-pham" : "cosmetic-ingredients"}/${id}`,
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${locale === "vi" ? "nguyen-lieu-my-pham" : "cosmetic-ingredients"}/${id}`,
      title: formattedTitle,
      description: description || undefined,
      images: [{
        url: imageUrl,
        width: hasCustomImage ? 1200 : 800,
        height: hasCustomImage ? 630 : 800,
        alt: name,
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

export default async function CosmeticProductDetail({
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

  // Fetch product from Laravel API
  const product = await api.getProduct(id, preview, secret).catch(() => null);
  if (!product || product.type !== 'cosmetic') {
    notFound();
  }

  // Fetch all cosmetic products to calculate related products
  const allCosmeticProducts = await api.getProducts('cosmetic').catch(() => []);
  const relatedList = allCosmeticProducts
    .filter((item) => String(item.id) !== String(id))
    .slice(0, 3);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const productUrl = `${baseUrl}/${locale === "vi" ? "nguyen-lieu-my-pham" : "cosmetic-ingredients"}/${product.slug || product.id}`;
  
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": getVal(product.name, locale),
    "image": product.image ? api.getImageUrl(product.image) : undefined,
    "description": (getVal(product.desc, locale) || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160),
    "category": getVal(product.category, locale),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "VND",
      "availability": "https://schema.org/InStock",
      "url": productUrl,
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumbs */}
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-green transition-colors">
          {t.products.homeBreadcrumb}
        </Link>
        <span className="text-gray-400">/</span>
        <Link 
          href={locale === "vi" ? "/nguyen-lieu-my-pham" : "/cosmetic-ingredients"} 
          className="hover:text-brand-green transition-colors"
        >
          {t.products.cosmeticBreadcrumb}
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
          {getVal(product.name, locale)}
        </span>
      </nav>

      {/* Main product block */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Product Image */}
        <ScrollReveal direction="up" duration={600} className="w-full lg:w-[45%]">
          <div className="rounded-2xl overflow-hidden bg-gray-55 border border-gray-200 shadow-xs">
            <img
              src={api.getImageUrl(product.image)}
              alt={getVal(product.name, locale)}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        </ScrollReveal>

        {/* Product details */}
        <ScrollReveal direction="up" delay={150} duration={600} className="w-full lg:w-[55%]">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-block rounded-md bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green uppercase tracking-wide">
                {getVal(product.category, locale)}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {getVal(product.name, locale)}
              </h1>
            </div>

            <div className="h-0.5 w-full bg-gray-200 relative">
              <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">{t.products.descriptionTitle}</h3>
              <div
                className="text-gray-605 leading-relaxed text-justify text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
                dangerouslySetInnerHTML={{ __html: getVal(product.desc, locale) }}
              />
            </div>

            {/* Inquiry & Zalo buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-hover transition-colors shadow-md shadow-brand-green/10 text-sm sm:text-base"
              >
                <Mail className="h-4 w-4" />
                {t.products.inquiryCosmeticButton}
              </Link>
              <a
                href="https://zalo.me/0969700520"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0068ff] px-6 py-3 font-semibold text-white hover:bg-[#0056d6] transition-colors shadow-md shadow-[#0068ff]/10 text-sm sm:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.002 2C6.5 2 2 6 2 11c0 2.9 1.5 5.5 4 7.2V22l4.5-2.6c.5.1 1 .2 1.5.2 5.5 0 10-4 10-9s-4.5-9-10-9zm2.4 12.2h-3.8l3.1-3.6H10.6v-1h3.7l-3.1 3.6h3.2v1z" />
                </svg>
                {t.products.zaloButton}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Interactive Tabs (Render Client Component) */}
      <ScrollReveal direction="up" delay={250} duration={600}>
        <ProductTabs product={product} />
      </ScrollReveal>

      {/* Related Products */}
      <div className="mt-20 border-t border-gray-200 pt-12">
        <ScrollReveal direction="up" duration={600}>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.products.relatedTitle}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedList.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delay={index * 100} duration={600} className="h-full">
              <Link
                href={locale === "vi" ? `/nguyen-lieu-my-pham/${item.slug || item.id}` : `/cosmetic-ingredients/${item.slug || item.id}`}
                className="group flex flex-col h-full rounded-xl bg-white border border-gray-200 overflow-hidden hover:border-brand-green/30 hover:shadow-[0_4px_12px_rgba(16,109,56,0.08)] transition-all duration-300"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-gray-55 overflow-hidden relative">
                  <img
                    src={api.getImageUrl(item.image)}
                    alt={getVal(item.name, locale)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
                  />
                </div>
                {/* Product Details */}
                <div className="p-5 flex flex-col space-y-2">
                  <div>
                    <span className="inline-block text-xs font-semibold text-brand-green bg-brand-green/5 px-2 py-0.5 rounded uppercase tracking-wider">
                      {getVal(item.category, locale)}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-brand-green transition-colors text-base line-clamp-1">
                    {getVal(item.name, locale)}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
