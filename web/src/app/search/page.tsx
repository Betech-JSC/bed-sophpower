import React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword = "" } = await searchParams;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  const pageBanner = await api.getPageBanner("search").catch(() => null);
  const bannerImage = pageBanner?.image ? api.getImageUrl(pageBanner.image) : "/images/banner-contact.png";

  // Fetch all products dynamically from Laravel API
  const allProducts = await api.getProducts().catch((err) => {
    console.error("Failed to fetch products for search:", err);
    return [];
  });

  allProducts.sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (dateB !== dateA) return dateB - dateA;
    return b.id - a.id;
  });

  const results = allProducts.filter((p) => {
    const name = getVal(p.name, locale).toLowerCase();
    const desc = getVal(p.desc, locale).toLowerCase();
    return name.includes(normalizedKeyword) || desc.includes(normalizedKeyword);
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: `url('${bannerImage}')` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            {t.search.bannerTitle}
          </h1>
          <p className="mt-2 text-white/80 text-sm">
            {results.length > 0
              ? t.search.foundResults
                  .replace("{{count}}", String(results.length))
                  .replace("{{keyword}}", keyword)
              : t.search.notFoundResults.replace("{{keyword}}", keyword)}
          </p>
        </div>
      </section>

      {/* Results List */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-4xl px-3 sm:px-4 lg:px-6">
          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((prod) => (
                <Link
                  key={`${prod.type}-${prod.id}`}
                  href={prod.type === "food" ? `/nguyen-lieu-thuc-pham/${prod.slug || prod.id}` : `/nguyen-lieu-my-pham/${prod.slug || prod.id}`}
                  className="group flex flex-col sm:flex-row rounded-2xl bg-white border border-gray-150 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block rounded-md bg-brand-green/10 px-2.5 py-0.5 text-xs font-bold text-brand-green uppercase tracking-wide">
                        {prod.type === "food"
                          ? t.search.foodIngredient
                          : t.search.cosmeticIngredient}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                        {getVal(prod.name, locale)}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {getVal(prod.desc, locale)}
                      </p>
                    </div>
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors"
                      >
                        {t.search.productDetails}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full sm:w-[35%] h-48 sm:h-auto relative bg-gray-100 shrink-0">
                    <img
                      src={api.getImageUrl(prod.image)}
                      alt={getVal(prod.name, locale)}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-550 group-hover:scale-102"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-white border border-gray-150 p-8 space-y-4 shadow-sm">
              <Search className="h-16 w-16 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">
                {t.search.noProducts}
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                {t.search.noProductsDesc}
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-xs font-semibold text-white hover:bg-brand-green/90 transition-colors"
                >
                  {t.search.backHome}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

