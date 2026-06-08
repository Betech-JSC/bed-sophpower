"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Calendar, Users, Eye, Settings, Heart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  desc: string;
  number: string;
  image: string;
  category: "food" | "cosmetic";
}

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const banners = [
    {
      image: "/images/banner1.jpg",
      title: "Pioneer Herb Industrial",
      desc: "Nguồn cung cấp nguyên liệu thực phẩm và mỹ phẩm chất lượng hàng đầu.",
    },
    {
      image: "/images/banner2.jpg",
      title: "Giải pháp tối ưu",
      desc: "Đồng hành và hỗ trợ sự phát triển bền vững của doanh nghiệp bạn.",
    },
  ];

  const products: Product[] = [
    {
      id: "16",
      name: "Bột Beta-carotene",
      desc: "Chất tạo màu hỗn hợp thực phẩm và mỹ phẩm tự nhiên chất lượng cao.",
      number: "01",
      image: "/images/products/beta-carotene-powder.jpg",
      category: "food",
    },
    {
      id: "17",
      name: "Nhũ tương Beta-carotene",
      desc: "Dạng nhũ tương Beta-carotene tan tốt trong nước, màu sắc ổn định.",
      number: "02",
      image: "/images/products/beta-carotene-emulsion.png",
      category: "food",
    },
    {
      id: "15",
      name: "Màu đỏ Carmine (E120)",
      desc: "Phụ gia tạo màu đỏ Carmine thực phẩm hỗn hợp, chiết xuất tự nhiên.",
      number: "03",
      image: "/images/products/carmine.png",
      category: "food",
    },
    {
      id: "18",
      name: "Màu Tím Tự Nhiên",
      desc: "Chất tạo màu tím tự nhiên chất lượng vượt trội cho thực phẩm.",
      number: "04",
      image: "/images/products/mau-tim-tu-nhien.png",
      category: "food",
    },
    {
      id: "12",
      name: "Flavors (Hương liệu)",
      desc: "Hương liệu thực phẩm tạo mùi hương đậm đà, tự nhiên cho các loại đồ uống.",
      number: "05",
      image: "/images/products/flavors.jpg",
      category: "food",
    },
    {
      id: "11",
      name: "Coconut Water Powder",
      desc: "Bột nước dừa tự nhiên, giàu khoáng chất dùng làm nguyên liệu đồ uống.",
      number: "06",
      image: "/images/products/coconut-water-powder.jpg",
      category: "food",
    },
    {
      id: "10",
      name: "Thickening Stabilizer",
      desc: "Chất ổn định làm dày hệ thống đồ uống, sản phẩm sữa và thực phẩm.",
      number: "07",
      image: "/images/products/thickening-stabilizer.jpg",
      category: "food",
    },
    {
      id: "9",
      name: "Juice Stabilizer",
      desc: "Chất ổn định giúp chống lắng cặn và cải thiện độ phân tán cho nước trái cây.",
      number: "08",
      image: "/images/products/juice-stabilizer.jpg",
      category: "food",
    },
  ];

  const homeArticles = [
    {
      id: "1",
      title: "Xu Hướng Mỹ Phẩm Thiên Nhiên 2026 – Vì Sao Rosa Damascena Flower Water Được Ưa Chuộng Trong Các Dòng Skincare Hiện Đại?",
      date: "2026.06.08",
      image: "/images/news/news1.png",
      category: "Nguyên liệu mỹ phẩm",
    },
    {
      id: "2",
      title: "Vì Sao Tranexamic Acid Được Nhiều Thương Hiệu Skincare Ứng Dụng Trong Mỹ Phẩm Hiện Đại?",
      date: "2026.06.07",
      image: "/images/products/tranexamic-acid.jpg",
      category: "Nguyên liệu mỹ phẩm",
    },
    {
      id: "3",
      title: "Thị Trường Mỹ Phẩm Việt Nam Đang Thay Đổi Theo Xu Hướng Nào?",
      date: "2026.06.05",
      image: "/images/products/niacinamide.jpg",
      category: "Thị trường",
    },
  ];

  // Auto transition banner slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-gray-900">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
          </div>
        ))}

        {/* Slider Navigation Indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBanner(index)}
              className={`h-1 w-8 transition-all duration-300 ${
                index === activeBanner ? "bg-brand-green" : "bg-white/40"
              } cursor-pointer`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Products (Sản phẩm chính) */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                SẢN PHẨM CHÍNH
              </h2>
              <div className="h-1 w-20 bg-brand-green" />
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi tận dụng mạng lưới chuỗi cung ứng toàn cầu đã được xây dựng vững chắc cùng sự am hiểu sâu sắc về thị trường địa phương để kết nối các nhà sản xuất với nguồn nguyên liệu và thành phần chất lượng cao.
              </p>
            </div>
            <Link
              href="/list_2"
              className="inline-flex items-center gap-2 text-brand-green font-bold hover:underline"
            >
              Xem chi tiết
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Interactive Products Grid Tabs */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Tabs List (Left) */}
            <div className="w-full lg:w-[45%] grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((prod, index) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all text-left cursor-pointer ${
                    activeTab === index
                      ? "bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20"
                      : "bg-white border-gray-200 text-gray-800 hover:border-brand-green/40 hover:bg-gray-50"
                  }`}
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        activeTab === index ? "text-white/60" : "text-gray-400 group-hover:text-brand-green/60"
                      }`}
                    >
                      {prod.number}
                    </span>
                    <h3 className="font-bold text-sm tracking-wide line-clamp-1">
                      {prod.name}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${
                      activeTab === index ? "text-white/80" : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Tabs Content Display (Right) */}
            <div className="w-full lg:w-[55%] flex flex-col md:flex-row rounded-2xl bg-brand-green overflow-hidden text-white shadow-xl">
              {/* Text Area */}
              <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold border-b border-brand-green pb-4">
                    {products[activeTab].name}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed min-h-[60px]">
                    {products[activeTab].desc}
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href={`/list_2/${products[activeTab].id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-xs font-semibold hover:bg-brand-green/90 transition-colors"
                  >
                    XEM THÊM CHI TIẾT
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Image Area */}
              <div className="w-full md:w-[45%] h-64 md:h-auto relative bg-gray-100">
                <img
                  src={products[activeTab].image}
                  alt={products[activeTab].name}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Highlights (Về chúng tôi) */}
      <section
        className="relative py-24 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/home-about.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-950/70" />
        <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">VỀ CHÚNG TÔI</h2>
            <div className="h-1 w-20 bg-brand-green mx-auto" />
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Sophpower là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, tập trung vào hai phân khúc chính là Sản phẩm Công nghiệp và Sản phẩm Hóa chất. Đối với mảng hóa chất, chúng tôi sở hữu mạng lưới cung ứng đáng tin cậy phục vụ các tiêu chuẩn quốc tế ISO, HACCP, HALAL, Kosher, FDA.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-2.5 font-bold hover:bg-white hover:text-gray-900 transition-colors"
              >
                TÌM HIỂU VỀ CHÚNG TÔI
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Advantages Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#235236]/70 border border-brand-green/60 hover:bg-[#106d38] transition-colors duration-300">
              <div className="mb-4 transition-transform duration-500 hover:rotate-y-180">
                <img src="/images/icons/ys1.png" alt="Năng lực" className="h-14 w-auto" />
              </div>
              <h3 className="text-lg font-bold mb-3">Năng lực chuyên sâu</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất quy mô lớn.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#235236]/70 border border-brand-green/60 hover:bg-[#106d38] transition-colors duration-300">
              <div className="mb-4 transition-transform duration-500 hover:rotate-y-180">
                <img src="/images/icons/ys2.png" alt="Niềm tin" className="h-14 w-auto" />
              </div>
              <h3 className="text-lg font-bold mb-3">Niềm tin từ thị trường</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và chất lượng vượt trội.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#235236]/70 border border-brand-green/60 hover:bg-[#106d38] transition-colors duration-300">
              <div className="mb-4 transition-transform duration-500 hover:rotate-y-180">
                <img src="/images/icons/ys3.png" alt="Sáng tạo" className="h-14 w-auto" />
              </div>
              <h3 className="text-lg font-bold mb-3">Định hướng đổi mới</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) đã được cấp bằng sáng chế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Highlight Section (Trung tâm tin tức) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="max-w-3xl space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              TRUNG TÂM TIN TỨC
            </h2>
            <div className="h-1 w-20 bg-brand-green" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeArticles.map((art) => (
              <Link
                key={art.id}
                href={`/news/${art.id}`}
                className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md hover:shadow-brand-green/5 transition-all duration-300"
              >
                {/* Card Image */}
                <div className="h-48 relative bg-gray-55 overflow-hidden shrink-0">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-5 group-hover:bg-brand-green transition-colors duration-300">
                  <div className="space-y-3">
                    <div className="text-sm text-brand-green group-hover:text-white/95 font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-300">
                      <Calendar className="h-4 w-4 text-brand-green group-hover:text-white/95 transition-colors duration-300 shrink-0" />
                      <span className="text-gray-500 group-hover:text-white/95">{art.date}</span>
                      <span className="text-gray-300 group-hover:text-white/60">&nbsp;•&nbsp;</span>
                      <span className="text-brand-green group-hover:text-white/95">{art.category}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-950 group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2">
                      {art.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-gray-100 group-hover:border-white/20 flex justify-between items-center transition-colors duration-300">
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green group-hover:text-white hover:underline uppercase tracking-wider transition-colors duration-300"
                    >
                      ĐỌC TIẾP
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Button Go To News Page */}
          <div className="flex justify-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-hover transition-colors shadow-md shadow-brand-green/10"
            >
              XEM THÊM TIN TỨC
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
