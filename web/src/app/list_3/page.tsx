import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  desc: string;
  image: string;
}

export default function CosmeticIngredients() {
  const cosmeticProducts: ProductItem[] = [
    {
      id: "3",
      name: "Niacinamide (Vitamin B3)",
      desc: "Niacinamide là một dạng Vitamin B3 tan trong nước, được biết đến rộng rãi với khả năng cải thiện tình trạng da toàn diện và củng cố hàng rào bảo vệ da.",
      image: "/images/products/niacinamide.jpg",
    },
    {
      id: "4",
      name: "Panthenol",
      desc: "Panthenol là tiền chất của Vitamin B5, nổi tiếng với các đặc tính dưỡng ẩm, làm dịu, hỗ trợ phục hồi làn da bị tổn thương đồng thời mang lại độ đàn hồi mịn màng.",
      image: "/images/products/panthenol.jpg",
    },
    {
      id: "5",
      name: "Tranexamic Acid",
      desc: "Tranexamic Acid là một hoạt chất được ứng dụng rộng rãi trong các sản phẩm làm sáng da, mờ thâm nám và cải thiện các vùng da không đều màu.",
      image: "/images/products/tranexamic-acid.jpg",
    },
    {
      id: "6",
      name: "Proxylane",
      desc: "Proxylane là một hoạt chất đa năng có khả năng chống lão hóa hiệu quả cao, kích thích tổng hợp collagen, tăng mật độ và độ đàn hồi cho da.",
      image: "/images/products/proxylane.jpg",
    },
    {
      id: "7",
      name: "Ectoin",
      desc: "Ectoin là một dẫn xuất axit amin tự nhiên mạnh mẽ, giúp bảo vệ và ổn định các tế bào da trước các tác nhân gây hại từ môi trường bên ngoài.",
      image: "/images/products/ectoin.jpg",
    },
    {
      id: "8",
      name: "Rosa Damascena Flower Water",
      desc: "Nước hoa hồng Damask chưng cất tự nhiên, giàu hoạt chất hỗ trợ cấp ẩm sâu, chống oxy hóa và nuôi dưỡng làn da tươi sáng rạng ngời.",
      image: "/images/products/rosa-water.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/banner-cosmetic.png')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            COSMETIC INGREDIENTS
          </h1>
        </div>
      </section>

      {/* Main List */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              NGUYÊN LIỆU MỸ PHẨM
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cosmeticProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/list_3/${prod.id}`}
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
