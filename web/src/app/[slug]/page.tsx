import ProductListingClient from "@/components/ProductListingClient";
import type { Metadata } from "next";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";

interface DynamicCategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}

export async function generateMetadata({
  params,
}: DynamicCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];

  try {
    const categories = await api.getProductCategories();
    const currentCategory = categories.find((c) => c.slug === slug);

    if (currentCategory) {
      const name = typeof currentCategory.name === "object"
        ? currentCategory.name[locale] || currentCategory.name.vi
        : currentCategory.name;

      return {
        title: `${name} - Sophchem Vietnam`,
        description: `Cung cấp ${name} chất lượng cao, an toàn và đạt các tiêu chuẩn quốc tế.`,
      };
    }
  } catch (e) {
    console.error("Error generating metadata for dynamic category:", e);
  }

  return {
    title: `Danh mục Sản phẩm - Sophchem Vietnam`,
  };
}

export default async function DynamicCategoryPage({
  params,
  searchParams,
}: DynamicCategoryPageProps) {
  const { slug } = await params;
  const { page = "1", category } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const locale = await getLocaleServer();

  // Exclude static routes if hit
  const reservedSlugs = ["about", "contact", "news", "recruitment", "search", "policies", "admin"];
  if (reservedSlugs.includes(slug)) {
    notFound();
  }

  let rootCategory = null;
  let type: "food" | "cosmetic" = "food";

  try {
    const categories = await api.getProductCategories();
    rootCategory = categories.find((c) => c.slug === slug);
    if (rootCategory) {
      type = rootCategory.type as "food" | "cosmetic";
    }
  } catch (e) {
    console.error("Error fetching category for slug:", slug, e);
  }

  const bannerImage = type === "cosmetic" ? "/images/banner-cosmetic.jpg" : "/images/banner-food.png";

  return (
    <ProductListingClient
      type={type}
      currentPage={currentPage}
      selectedCategory={category || (rootCategory ? rootCategory.slug : undefined)}
      basePath={`/${slug}`}
      bannerImage={bannerImage}
    />
  );
}
