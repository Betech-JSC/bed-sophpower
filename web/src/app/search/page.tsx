import React from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  type: "food" | "cosmetic";
}

const allProducts: ProductItem[] = [
  // Food
  {
    id: "16",
    name: "Bột Beta-carotene",
    desc: "Chất tạo màu hỗn hợp thực phẩm và mỹ phẩm tự nhiên chất lượng cao.",
    image: "/images/products/beta-carotene-powder.jpg",
    type: "food",
  },
  {
    id: "17",
    name: "Nhũ tương Beta-carotene",
    desc: "Dạng nhũ tương Beta-carotene tan tốt trong nước, màu sắc ổn định.",
    image: "/images/products/beta-carotene-emulsion.png",
    type: "food",
  },
  {
    id: "15",
    name: "Màu đỏ Carmine (E120)",
    desc: "Phụ gia tạo màu đỏ Carmine thực phẩm hỗn hợp, chiết xuất tự nhiên.",
    image: "/images/products/carmine.png",
    type: "food",
  },
  {
    id: "18",
    name: "Màu Tím Tự Nhiên",
    desc: "Chất tạo màu tím tự nhiên chất lượng vượt trội cho thực phẩm.",
    image: "/images/products/mau-tim-tu-nhien.png",
    type: "food",
  },
  {
    id: "12",
    name: "Flavors (Hương liệu)",
    desc: "Hương liệu thực phẩm tạo mùi hương đậm đà, tự nhiên cho các loại đồ uống.",
    image: "/images/products/flavors.jpg",
    type: "food",
  },
  {
    id: "11",
    name: "Coconut Water Powder",
    desc: "Bột nước dừa tự nhiên, giàu khoáng chất dùng làm nguyên liệu đồ uống.",
    image: "/images/products/coconut-water-powder.jpg",
    type: "food",
  },
  {
    id: "10",
    name: "Thickening Stabilizer",
    desc: "Chất ổn định làm dày hệ thống đồ uống, sản phẩm sữa và thực phẩm.",
    image: "/images/products/thickening-stabilizer.jpg",
    type: "food",
  },
  {
    id: "9",
    name: "Juice Stabilizer",
    desc: "Chất ổn định giúp chống lắng cặn và cải thiện độ phân tán cho nước trái cây.",
    image: "/images/products/juice-stabilizer.jpg",
    type: "food",
  },
  // Cosmetics
  {
    id: "3",
    name: "Niacinamide (Vitamin B3)",
    desc: "Niacinamide là một dạng Vitamin B3 tan trong nước, giúp kháng viêm, mờ thâm mụn.",
    image: "/images/products/niacinamide.jpg",
    type: "cosmetic",
  },
  {
    id: "4",
    name: "Panthenol",
    desc: "Panthenol là tiền chất của Vitamin B5, giúp dưỡng ẩm sâu và phục hồi làn da nhạy cảm.",
    image: "/images/products/panthenol.jpg",
    type: "cosmetic",
  },
  {
    id: "5",
    name: "Tranexamic Acid",
    desc: "Tranexamic Acid là hoạt chất làm sáng da mạnh mẽ, mờ sạm nám và tàn nhang hiệu quả.",
    image: "/images/products/tranexamic-acid.jpg",
    type: "cosmetic",
  },
  {
    id: "6",
    name: "Proxylane",
    desc: "Proxylane là hoạt chất chống lão hóa vượt trội giúp kích thích sản sinh collagen nội sinh.",
    image: "/images/products/proxylane.jpg",
    type: "cosmetic",
  },
  {
    id: "7",
    name: "Ectoin",
    desc: "Ectoin là chất bảo vệ tế bào da tự nhiên khỏi tác nhân khói bụi và tia UV có hại.",
    image: "/images/products/ectoin.jpg",
    type: "cosmetic",
  },
  {
    id: "8",
    name: "Rosa Damascena Flower Water",
    desc: "Nước hoa hồng chưng cất tự nhiên giúp se khít lỗ chân lông và làm dịu cấp ẩm da.",
    image: "/images/products/rosa-water.jpg",
    type: "cosmetic",
  },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string }>;
}) {
  const { keyword = "" } = await searchParams;
  const normalizedKeyword = keyword.trim().toLowerCase();

  const results = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(normalizedKeyword) ||
      p.desc.toLowerCase().includes(normalizedKeyword)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-16 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/about-ban.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight uppercase">
            KẾT QUẢ TÌM KIẾM
          </h1>
          <p className="mt-2 text-white/80 text-sm">
            Tìm thấy {results.length} sản phẩm phù hợp cho từ khóa &quot;{keyword}&quot;
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
                  href={prod.type === "food" ? `/list_2/${prod.id}` : `/list_3/${prod.id}`}
                  className="group flex flex-col sm:flex-row rounded-2xl bg-white border border-gray-150 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block rounded-md bg-brand-green/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-green uppercase tracking-wide">
                        {prod.type === "food" ? "Nguyên liệu thực phẩm" : "Nguyên liệu mỹ phẩm"}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                        {prod.name}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                        {prod.desc}
                      </p>
                    </div>
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors"
                      >
                        CHI TIẾT SẢN PHẨM
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full sm:w-[35%] h-48 sm:h-auto relative bg-gray-100 shrink-0">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-550 group-hover:scale-102"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-white border border-gray-150 p-8 space-y-4 shadow-sm">
              <Search className="h-16 w-16 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Không tìm thấy sản phẩm</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Không tìm thấy kết quả phù hợp cho &quot;{keyword}&quot;. Vui lòng thử tìm với từ khóa khác như &quot;Beta-carotene&quot; hoặc &quot;Niacinamide&quot;.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-xs font-semibold text-white hover:bg-brand-green/90 transition-colors"
                >
                  Quay lại trang chủ
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
