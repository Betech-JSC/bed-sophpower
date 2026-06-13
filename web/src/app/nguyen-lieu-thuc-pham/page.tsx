import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export default async function FoodIngredients({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const itemsPerPage = 6;
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];

  const foodProducts = await api.getProducts('food').catch((err) => {
    console.error("Failed to fetch food products:", err);
    return [];
  });

  foodProducts.sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    if (dateB !== dateA) return dateB - dateA;
    return b.id - a.id;
  });

  const totalItems = foodProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const paginatedProducts = foodProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/banner-food.png')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            {t.products.foodTitle}
          </h1>
        </div>
      </section>

      {/* Main List */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              {t.products.foodTitle}
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-550">
              {t.products.emptyFood}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/nguyen-lieu-thuc-pham/${prod.id}`}
                    className="group flex flex-col sm:flex-row rounded-2xl bg-white border border-gray-150 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Content */}
                    <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-green transition-colors line-clamp-2">
                          {getVal(prod.name, locale)}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                          {getVal(prod.desc, locale)}
                        </p>
                      </div>
                      <div className="pt-2">
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors"
                        >
                          {t.products.viewMore}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-full sm:w-[45%] h-56 sm:h-auto relative bg-gray-100 shrink-0">
                      <img
                        src={api.getImageUrl(prod.image)}
                        alt={getVal(prod.name, locale)}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-550 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Link
                    href={`/nguyen-lieu-thuc-pham?page=${currentPage - 1}`}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-semibold transition-colors ${
                      currentPage <= 1
                        ? "pointer-events-none text-gray-300 border-gray-150"
                        : "text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green bg-white"
                    }`}
                  >
                    &lt;
                  </Link>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <Link
                        key={pageNumber}
                        href={`/nguyen-lieu-thuc-pham?page=${pageNumber}`}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-semibold transition-colors ${
                          currentPage === pageNumber
                            ? "bg-brand-green border-brand-green text-white"
                            : "text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green bg-white"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}
                  <Link
                    href={`/nguyen-lieu-thuc-pham?page=${currentPage + 1}`}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg border text-sm font-semibold transition-colors ${
                      currentPage >= totalPages
                        ? "pointer-events-none text-gray-300 border-gray-150"
                        : "text-gray-700 border-gray-200 hover:border-brand-green hover:text-brand-green bg-white"
                    }`}
                  >
                    &gt;
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
