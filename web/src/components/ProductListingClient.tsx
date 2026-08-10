"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api, ProductCategory } from "@/lib/api";
import { useI18n } from "@/i18n/provider";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

type ProductType = "food" | "cosmetic";

interface ListedProduct {
  id: string;
  slug?: string;
  name: string;
  desc: string;
  image: string;
  categoryName: string;
  productCategoryId?: number | null;
  productCategorySlug?: string;
  productCategoryName?: string;
  typeCategory: ProductType;
}

interface ProductListingClientProps {
  type: ProductType;
  currentPage: number;
  selectedCategory?: string;
  basePath: string;
  bannerImage: string;
}

export default function ProductListingClient({
  type,
  currentPage,
  selectedCategory,
  basePath,
  bannerImage,
}: ProductListingClientProps) {
  const { locale } = useI18n();
  const t = siteDictionaries[locale];
  const [products, setProducts] = useState<ListedProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [activeBannerImage, setActiveBannerImage] = useState(bannerImage);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;
  const isFood = type === "food";
  const title = isFood ? t.products.foodTitle : t.products.cosmeticTitle;
  const emptyText = isFood ? t.products.emptyFood : t.products.emptyCosmetic;
  const pageKey = isFood ? "food" : "cosmetic";

  // Fetch Page Banner dynamically
  useEffect(() => {
    let cancelled = false;

    api.getPageBanner(pageKey).then((banner) => {
      if (cancelled) return;
      setActiveBannerImage(banner?.image ? api.getImageUrl(banner.image) : bannerImage);
    }).catch((err) => {
      console.error(`Failed to load ${pageKey} page banner:`, err);
      if (!cancelled) setActiveBannerImage(bannerImage);
    });

    return () => {
      cancelled = true;
    };
  }, [bannerImage, pageKey]);

  // Fetch Product Categories from Backend API dynamically
  useEffect(() => {
    let cancelled = false;

    api.getProductCategories(type).then((cats) => {
      if (cancelled) return;
      setCategories(cats);
    }).catch((err) => {
      console.error(`Failed to load categories for ${type}:`, err);
    });

    return () => {
      cancelled = true;
    };
  }, [type]);

  // Fetch Products dynamically
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    api.getProducts().then((data) => {
      if (cancelled) return;

      const sortedData = [...data].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        return b.id - a.id;
      });

      const mapped = sortedData.map((p) => {
        const rawDesc = getVal(p.desc, locale) || "";
        const cleanDesc = rawDesc.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
        const pCatSlug = p.productCategory?.slug;
        const pCatName = getVal(p.productCategory?.name, locale);
        const pCatId = p.product_category_id || p.productCategory?.id;

        return {
          id: String(p.id),
          slug: p.slug,
          name: getVal(p.name, locale),
          desc: cleanDesc,
          image: p.image ? api.getImageUrl(p.image) : "/images/placeholder.jpg",
          categoryName: getVal(p.category, locale),
          productCategoryId: pCatId,
          productCategorySlug: pCatSlug,
          productCategoryName: pCatName,
          typeCategory: p.type === "food" ? ("food" as const) : ("cosmetic" as const),
        };
      });

      setProducts(mapped.filter((p) => p.typeCategory === type));
    }).catch((err) => {
      console.error(`Failed to load ${type} products dynamically:`, err);
      if (!cancelled) setProducts([]);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [locale, type]);

  // Helper map for hierarchical category matching (Level 2 & Level 3)
  const getCategoryAndDescendantSlugs = useMemo(() => {
    const map = new Map<string, Set<string>>();

    const registerCategory = (cat: ProductCategory): Set<string> => {
      const slugs = new Set<string>();
      if (cat.slug) slugs.add(cat.slug.toLowerCase());
      slugs.add(String(cat.id));

      if (cat.children && cat.children.length > 0) {
        cat.children.forEach((child) => {
          const childSlugs = registerCategory(child);
          childSlugs.forEach((s) => slugs.add(s));
        });
      }

      if (cat.slug) map.set(cat.slug.toLowerCase(), slugs);
      map.set(String(cat.id), slugs);
      return slugs;
    };

    categories.forEach((root) => {
      registerCategory(root);
    });

    return map;
  }, [categories]);

  // Legacy helper for old products
  const getFoodSubCategory = (prod: ListedProduct): "phu-gia" | "bot-trai-cay" | "huong-lieu" => {
    const cat = (prod.categoryName || "").toLowerCase();
    const name = (prod.name || "").toLowerCase();

    if (
      name.includes("hương liệu") ||
      name.includes("flavor") ||
      cat.includes("hương liệu") ||
      cat.includes("flavor") ||
      cat.includes("fragrance")
    ) {
      return "huong-lieu";
    }

    if (
      name.includes("bột nước") ||
      name.includes("bột trái") ||
      name.includes("bột quả") ||
      name.includes("coconut water powder") ||
      (cat.includes("bột") && (cat.includes("trái") || cat.includes("quả") || cat.includes("juice") || cat.includes("fruit"))) ||
      (name.includes("powder") && (name.includes("coconut") || name.includes("fruit") || name.includes("juice")))
    ) {
      return "bot-trai-cay";
    }

    return "phu-gia";
  };

  const matchCategoryKey = (prod: ListedProduct, key?: string) => {
    if (!key || key === "all") return true;

    const keyLower = key.toLowerCase();
    const descendantSlugs = getCategoryAndDescendantSlugs.get(keyLower);

    // 1. Match via Category Hierarchy (Level 2 or Level 3)
    if (descendantSlugs) {
      if (prod.productCategorySlug && descendantSlugs.has(prod.productCategorySlug.toLowerCase())) {
        return true;
      }
      if (prod.productCategoryId && descendantSlugs.has(String(prod.productCategoryId))) {
        return true;
      }
    }

    // 2. Direct slug match with backend category
    if (prod.productCategorySlug && prod.productCategorySlug.toLowerCase() === keyLower) {
      return true;
    }

    // 3. Direct ID match
    if (prod.productCategoryId && String(prod.productCategoryId) === key) {
      return true;
    }

    // 4. Category Name match
    const pCatName = (prod.productCategoryName || "").toLowerCase();
    if (pCatName && (pCatName === keyLower || pCatName.includes(keyLower))) {
      return true;
    }

    const legacyCatName = (prod.categoryName || "").toLowerCase();
    if (legacyCatName && legacyCatName.includes(keyLower)) {
      return true;
    }

    // 5. Fallback matching for old static category keys
    const subCat = getFoodSubCategory(prod);
    if (key === "huong-lieu" || key === "flavors") {
      return subCat === "huong-lieu";
    }
    if (key === "bot-trai-cay" || key === "fruit-powders") {
      return subCat === "bot-trai-cay";
    }
    if (key === "phu-gia" || key === "additives") {
      return subCat === "phu-gia";
    }

    return false;
  };

  const filteredProducts = products.filter((p) => matchCategoryKey(p, selectedCategory));

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dynamic Category Filter Tabs from Backend API (supporting Level 2 & Level 3 with unified UI)
  const categoryFilterTabs = useMemo(() => {
    const tabs: { key: string; label: string; path: string }[] = [
      { key: "all", label: t.header.allCategories, path: basePath }
    ];

    if (categories && categories.length > 0) {
      const addCategoryTab = (cat: ProductCategory) => {
        const catName = getVal(cat.name, locale) || cat.slug;
        const catSlug = cat.slug || String(cat.id);
        
        // Avoid duplicate tab keys
        if (!tabs.some((t) => t.key === catSlug)) {
          tabs.push({
            key: catSlug,
            label: catName,
            path: `${basePath}?category=${catSlug}`,
          });
        }

        if (cat.children && cat.children.length > 0) {
          cat.children.forEach((child) => {
            addCategoryTab(child);
          });
        }
      };

      // Add all level 2 and level 3 categories under root categories
      categories.forEach((root) => {
        if (root.children && root.children.length > 0) {
          root.children.forEach((child) => {
            addCategoryTab(child);
          });
        } else if (root.parent_id !== null) {
          addCategoryTab(root);
        }
      });
    } else {
      // Fallback tabs if backend categories are loading or not yet created
      if (isFood) {
        tabs.push(
          { key: "phu-gia", label: t.header.additives, path: `${basePath}?category=phu-gia` },
          { key: "bot-trai-cay", label: t.header.fruitPowders, path: `${basePath}?category=bot-trai-cay` },
          { key: "huong-lieu", label: t.header.flavors, path: `${basePath}?category=huong-lieu` }
        );
      }
    }

    return tabs;
  }, [categories, locale, basePath, t.header.allCategories, t.header.additives, t.header.fruitPowders, t.header.flavors, isFood]);

  const categoryQueryStr = selectedCategory ? `&category=${selectedCategory}` : "";

  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: `url('${activeBannerImage}')` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            {title}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              {title}
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
          </div>

          {/* Dynamic Category Filter Tabs (Unified UI for all levels) */}
          {categoryFilterTabs.length > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
              {categoryFilterTabs.map((tab) => {
                const isActiveTab = (!selectedCategory && tab.key === "all") || selectedCategory === tab.key;

                return (
                  <Link
                    key={tab.key}
                    href={tab.path}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                      isActiveTab
                        ? "bg-brand-green text-white shadow-md scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-100 hover:text-brand-green border border-gray-200"
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12 text-gray-550">
              {t.common.loading}
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-550">
              {emptyText}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedProducts.map((prod, index) => (
                  <ScrollReveal key={prod.id} direction="up" delay={(index % 2) * 100} duration={600} className="h-full">
                    <Link
                      href={`${basePath}/${prod.slug || prod.id}`}
                      className="group flex flex-col sm:flex-row h-full rounded-2xl bg-white border border-gray-150 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-green transition-colors line-clamp-2">
                            {prod.name}
                          </h3>
                          <p className="text-gray-550 text-sm leading-relaxed line-clamp-3">
                            {prod.desc}
                          </p>
                        </div>
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors">
                            {t.products.viewMore}
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>

                      <div className="w-full sm:w-[45%] h-56 sm:h-auto relative bg-gray-100 shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-550 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Link
                    href={`${basePath}?page=${currentPage - 1}${categoryQueryStr}`}
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
                        href={`${basePath}?page=${pageNumber}${categoryQueryStr}`}
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
                    href={`${basePath}?page=${currentPage + 1}${categoryQueryStr}`}
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
