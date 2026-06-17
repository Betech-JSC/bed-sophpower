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
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page) || 1;

  return (
    <ProductListingClient
      type="food"
      currentPage={currentPage}
      basePath="/nguyen-lieu-thuc-pham"
      bannerImage="/images/banner-food.png"
    />
  );
}
