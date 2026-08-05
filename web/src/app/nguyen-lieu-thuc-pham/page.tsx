import ProductListingClient from "@/components/ProductListingClient";
import type { Metadata } from "next";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  return {
    title: `${t.header.foodIngredients} - Sophpower Vietnam`,
    description: locale === "vi" 
      ? "Cung cấp đa dạng nguyên liệu thực phẩm, phụ gia thực phẩm chất lượng cao, an toàn và đạt các tiêu chuẩn quốc tế cho ngành chế biến thực phẩm."
      : "Providing diverse high-quality food ingredients, food additives, and safe solutions matching international standards for food processing.",
  };
}

export default async function FoodIngredients({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page = "1", category } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const locale = await getLocaleServer();

  return (
    <ProductListingClient
      type="food"
      currentPage={currentPage}
      selectedCategory={category}
      basePath={locale === "vi" ? "/nguyen-lieu-thuc-pham" : "/food-ingredients"}
      bannerImage="/images/banner-food.png"
    />
  );
}
