"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";

interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export default function News() {
  const articles: Article[] = [
    {
      id: "1",
      title: "Xu Hướng Mỹ Phẩm Thiên Nhiên 2026 – Vì Sao Rosa Damascena Flower Water Được Ưa Chuộng Trong Các Dòng Skincare Hiện Đại?",
      summary: "Năm 2026, xu hướng làm đẹp tại Việt Nam đang thay đổi rõ rệt khi người tiêu dùng ngày càng ưu tiên các sản phẩm có nguồn gốc tự nhiên và mang lại cảm giác dịu nhẹ cho da. Tìm hiểu lý do nước hoa hồng Damask (Rosa Damascena) trở thành xu thế...",
      date: "2026.06.08",
      image: "/images/news/news1.png",
      category: "Nguyên liệu mỹ phẩm",
      author: "Sophpower R&D",
    },
    {
      id: "2",
      title: "Vì Sao Tranexamic Acid Được Nhiều Thương Hiệu Skincare Ứng Dụng Trong Mỹ Phẩm Hiện Đại?",
      summary: "Thị trường skincare đang thay đổi theo hướng chuyên sâu và cá nhân hóa trải nghiệm. Tranexamic Acid đang là hoạt chất nổi tiếng giúp điều trị sạm nám và làm sáng da vượt trội được nhiều nhãn hàng ưu tiên lựa chọn...",
      date: "2026.06.07",
      image: "/images/products/tranexamic-acid.jpg",
      category: "Nguyên liệu mỹ phẩm",
      author: "Sophpower Lab",
    },
    {
      id: "3",
      title: "Thị Trường Mỹ Phẩm Việt Nam Đang Thay Đổi Theo Xu Hướng Nào?",
      summary: "Trong những năm gần đây, thói quen tiêu dùng mỹ phẩm tại Việt Nam thay đổi nhanh chóng. Khách hàng không chỉ quan tâm đến thương hiệu mà bắt đầu đọc kỹ bảng thành phần, hướng đến Clean Beauty và tính minh bạch...",
      date: "2026.06.05",
      image: "/images/products/niacinamide.jpg",
      category: "Thị trường",
      author: "Sophpower Lab",
    },
    {
      id: "4",
      title: "Xu Hướng Nước Trái Cây Tại Việt Nam 2026 – Vì Sao Độ Ổn Định Sản Phẩm Ngày Càng Quan Trọng?",
      summary: "Năm 2026, thị trường đồ uống lành mạnh bùng nổ kéo theo yêu cầu khắt khe về mặt cảm quan nước ép quả. Việc giải quyết các bài toán tách lớp, lắng cặn bằng chất ổn định phức hợp đang là chìa khóa cạnh tranh...",
      date: "2026.06.02",
      image: "/images/products/juice-stabilizer.jpg",
      category: "Nguyên liệu thực phẩm",
      author: "Sophpower F&B",
    },
  ];

  const categories = ["Tất cả", "Nguyên liệu mỹ phẩm", "Nguyên liệu thực phẩm", "Thị trường"];
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredArticles = selectedCategory === "Tất cả"
    ? articles
    : articles.filter((art) => art.category === selectedCategory);

  const featuredArticle = articles[0];
  const gridArticles = selectedCategory === "Tất cả" 
    ? filteredArticles.slice(1) 
    : filteredArticles;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Banner */}
      <section
        className="relative py-20 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/about-ban.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">
            TRUNG TÂM TIN TỨC
          </h1>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-4" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 space-y-12">
          
          {/* Featured Post */}
          {selectedCategory === "Tất cả" && featuredArticle && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-gray-950">
                BÀI VIẾT NỔI BẬT
              </h2>
              <Link
                href={`/news/${featuredArticle.id}`}
                className="group relative flex flex-col lg:flex-row rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs hover:border-brand-green transition-all duration-300"
              >
                {/* Image */}
                <div className="w-full lg:w-[50%] h-64 sm:h-80 lg:h-auto relative bg-gray-55 overflow-hidden shrink-0">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between space-y-6 group-hover:bg-brand-green transition-colors duration-300">
                  <div className="space-y-3">
                    <div className="text-sm text-brand-green group-hover:text-white/95 font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300">
                      <Calendar className="h-4 w-4 text-brand-green group-hover:text-white/95 transition-colors duration-300 shrink-0" />
                      <span className="text-gray-500 group-hover:text-white/95">{featuredArticle.date}</span>
                      <span className="text-gray-300 group-hover:text-white/60">&nbsp;•&nbsp;</span>
                      <span className="text-brand-green group-hover:text-white/95">{featuredArticle.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 leading-snug">
                      {featuredArticle.title}
                    </h3>
                  </div>
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green group-hover:text-white hover:underline uppercase tracking-wider transition-colors duration-300"
                    >
                      XEM THÊM
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Category Tabs & Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-wider uppercase flex items-center gap-2">
              <span className="h-5 sm:h-6 w-1 bg-brand-green" />
              TẤT CẢ BÀI VIẾT
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md px-4 py-2 text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-brand-green text-white shadow-xs"
                      : "bg-white border border-gray-250 text-gray-650 hover:bg-gray-50 hover:text-brand-green"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((art) => (
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
          ) : (
            <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-sm mx-auto space-y-3">
              <p className="text-gray-500 text-sm">Chưa có bài viết nào thuộc danh mục này.</p>
              <button
                onClick={() => setSelectedCategory("Tất cả")}
                className="text-sm font-bold text-brand-green uppercase tracking-wide hover:underline cursor-pointer"
              >
                Quay lại xem tất cả
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
