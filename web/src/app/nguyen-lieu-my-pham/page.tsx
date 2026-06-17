import ProductListingClient from "@/components/ProductListingClient";
import type { Metadata } from "next";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  return {
    title: `${t.header.cosmeticIngredients} - Sophpower Vietnam`,
    description: locale === "vi" 
      ? "Cung cấp trọn gói giải pháp nguyên liệu mỹ phẩm chất lượng cao, hoạt chất thế hệ mới, đa dạng và an toàn cho sản xuất mỹ phẩm."
      : "Providing comprehensive high-quality cosmetic ingredients, active ingredients, and safe solutions for cosmetic manufacturing.",
  };
}

export default async function CosmeticIngredients({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const locale = await getLocaleServer();

  return (
    <ProductListingClient
      type="cosmetic"
      currentPage={currentPage}
      basePath={locale === "vi" ? "/nguyen-lieu-my-pham" : "/cosmetic-ingredients"}
      bannerImage="/images/banner-cosmetic.png"
    />
  );
}
