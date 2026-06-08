import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  desc: string;
  image: string;
}

export default function FoodIngredients() {
  const foodProducts: ProductItem[] = [
    {
      id: "16",
      name: "Bột Beta-carotene",
      desc: "Chất tạo màu hỗn hợp thực phẩm và mỹ phẩm tự nhiên chất lượng cao.",
      image: "/images/products/beta-carotene-powder.jpg",
    },
    {
      id: "17",
      name: "Nhũ tương Beta-carotene",
      desc: "Dạng nhũ tương Beta-carotene tan tốt trong nước, màu sắc ổn định.",
      image: "/images/products/beta-carotene-emulsion.png",
    },
    {
      id: "15",
      name: "Màu đỏ Carmine (E120)",
      desc: "Phụ gia tạo màu đỏ Carmine thực phẩm hỗn hợp, chiết xuất tự nhiên.",
      image: "/images/products/carmine.png",
    },
    {
      id: "18",
      name: "Màu Tím Tự Nhiên",
      desc: "Chất tạo màu tím tự nhiên chất lượng vượt trội cho thực phẩm.",
      image: "/images/products/mau-tim-tu-nhien.png",
    },
    {
      id: "12",
      name: "Flavors (Hương liệu)",
      desc: "Hương liệu thực phẩm tạo mùi hương đậm đà, tự nhiên cho các loại đồ uống.",
      image: "/images/products/flavors.jpg",
    },
    {
      id: "11",
      name: "Coconut Water Powder",
      desc: "Bột nước dừa tự nhiên, giàu khoáng chất dùng làm nguyên liệu đồ uống.",
      image: "/images/products/coconut-water-powder.jpg",
    },
    {
      id: "10",
      name: "Thickening Stabilizer",
      desc: "Chất ổn định làm dày hệ thống đồ uống, sản phẩm sữa và thực phẩm.",
      image: "/images/products/thickening-stabilizer.jpg",
    },
    {
      id: "9",
      name: "Juice Stabilizer",
      desc: "Chất ổn định giúp chống lắng cặn và cải thiện độ phân tán cho nước trái cây.",
      image: "/images/products/juice-stabilizer.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/about-ban.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            FOOD INGREDIENTS
          </h1>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-4" />
        </div>
      </section>

      {/* Main List */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              NGUYÊN LIỆU THỰC PHẨM
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {foodProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/list_2/${prod.id}`}
                className="group flex flex-col sm:flex-row rounded-2xl bg-white border border-gray-150 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-green transition-colors line-clamp-2">
                      {prod.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {prod.desc}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors"
                    >
                      XEM THÊM
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="w-full sm:w-[45%] h-56 sm:h-auto relative bg-gray-100 shrink-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-550 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
