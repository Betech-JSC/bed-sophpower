import ProductListingClient from "@/components/ProductListingClient";

export default async function CosmeticIngredients({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page) || 1;

  return (
    <ProductListingClient
      type="cosmetic"
      currentPage={currentPage}
      basePath="/nguyen-lieu-my-pham"
      bannerImage="/images/banner-cosmetic.png"
    />
  );
}
