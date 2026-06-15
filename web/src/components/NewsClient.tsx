"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import { api } from "@/lib/api";

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export default function NewsClient({ initialArticles }: { initialArticles: any[] }) {
  const { locale } = useI18n();
  const t = siteDictionaries[locale];
  const categories = [
    t.newsList.allTab,
    t.newsList.cosmeticTab,
    t.newsList.foodTab,
    t.newsList.marketTab,
  ];
  const [selectedCategory, setSelectedCategory] = useState(t.newsList.allTab);

  const isAllSelected = 
    selectedCategory === t.newsList.allTab || 
    selectedCategory === "Tất cả" || 
    selectedCategory === "All";

  const filteredArticles = isAllSelected
    ? initialArticles
    : initialArticles.filter((art) => {
        const cat = getVal(art.category, locale).toLowerCase();
        const selCat = selectedCategory.toLowerCase();
        
        const isCosmeticTab = selectedCategory === t.newsList.cosmeticTab || selCat.includes("cosmetic") || selCat.includes("mỹ phẩm");
        const isFoodTab = selectedCategory === t.newsList.foodTab || selCat.includes("food") || selCat.includes("thực phẩm");
        const isMarketTab = selectedCategory === t.newsList.marketTab || selCat.includes("market") || selCat.includes("thị trường");

        if (isCosmeticTab) {
          return cat.includes("mỹ phẩm") || cat.includes("cosmetic");
        }
        if (isFoodTab) {
          return cat.includes("thực phẩm") || cat.includes("food");
        }
        if (isMarketTab) {
          return cat.includes("thị trường") || cat.includes("market");
        }
        return cat.includes(selCat);
      });

  const featuredArticle = initialArticles[0];
  const gridArticles = isAllSelected
    ? filteredArticles.slice(1) 
    : filteredArticles;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Banner */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/banner-news.png')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            {t.newsList.bannerTitle}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 space-y-12">
          
          {/* Featured Post */}
          {selectedCategory === "Tất cả" && featuredArticle && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-gray-950">
                {t.newsList.featuredTitle}
              </h2>
              <Link
                href={`/news/${featuredArticle.id}`}
                className="group relative flex flex-col lg:flex-row rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs hover:border-brand-green transition-all duration-300"
              >
                {/* Image */}
                <div className="w-full lg:w-[50%] h-64 sm:h-80 lg:h-auto relative bg-gray-55 overflow-hidden shrink-0">
                  <img
                    src={api.getImageUrl(featuredArticle.image)}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between space-y-6 group-hover:bg-brand-green transition-colors duration-300">
                  <div className="space-y-3">
                    <div className="text-sm text-brand-green group-hover:text-white/95 font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300">
                      <Calendar className="h-4 w-4 text-brand-green group-hover:text-white/95 transition-colors duration-300 shrink-0" />
                      <span className="text-gray-500 group-hover:text-white/95">{formatDate(featuredArticle.date)}</span>
                      <span className="text-gray-300 group-hover:text-white/60">&nbsp;•&nbsp;</span>
                      <span className="text-brand-green group-hover:text-white/95">{getVal(featuredArticle.category, locale)}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 leading-snug leading-snug line-clamp-2">
                      {getVal(featuredArticle.title, locale)}
                    </h3>
                  </div>
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green group-hover:text-white hover:underline uppercase tracking-wider transition-colors duration-300"
                    >
                      {t.products.viewMore}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Category Tabs & Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-wider uppercase flex items-center gap-2">
              <span className="h-5 sm:h-6 w-1 bg-brand-green" />
              {t.newsList.allTitle}
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md px-4 py-2 text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-green text-white shadow-xs"
                      : "bg-white border border-gray-250 text-gray-650 hover:bg-gray-55 hover:text-brand-green"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/news/${art.id}`}
                  className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md hover:shadow-brand-green/5 transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="h-48 relative bg-gray-55 overflow-hidden shrink-0">
                    <img
                      src={api.getImageUrl(art.image)}
                      alt={art.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-5 group-hover:bg-brand-green transition-colors duration-300">
                    <div className="space-y-3">
                      <div className="text-sm text-brand-green group-hover:text-white/95 font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-300">
                        <Calendar className="h-4 w-4 text-brand-green group-hover:text-white/95 transition-colors duration-300 shrink-0" />
                        <span className="text-gray-500 group-hover:text-white/95">{formatDate(art.date)}</span>
                        <span className="text-gray-300 group-hover:text-white/60">&nbsp;•&nbsp;</span>
                        <span className="text-brand-green group-hover:text-white/95">{getVal(art.category, locale)}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-950 group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2">
                        {getVal(art.title, locale)}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-gray-100 group-hover:border-white/20 flex justify-between items-center transition-colors duration-300">
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green group-hover:text-white hover:underline uppercase tracking-wider transition-colors duration-300"
                      >
                        {t.home.readMore.toUpperCase()}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-sm mx-auto space-y-3">
              <p className="text-gray-500 text-sm">{t.newsList.emptyText}</p>
              <button
                onClick={() => setSelectedCategory("Tất cả")}
                className="text-sm font-bold text-brand-green uppercase tracking-wide hover:underline cursor-pointer"
              >
                {t.newsList.backButton}
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
