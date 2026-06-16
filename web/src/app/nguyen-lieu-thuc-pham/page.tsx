import ProductListingClient from "@/components/ProductListingClient";

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
