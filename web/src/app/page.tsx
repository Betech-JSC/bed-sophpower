"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from "lucide-react";


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
  const [activeCosmeticTab, setActiveCosmeticTab] = useState(0);
  const cosmeticCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCosmetic = (direction: "left" | "right") => {
    if (cosmeticCarouselRef.current) {
      const { scrollLeft } = cosmeticCarouselRef.current;
      const scrollAmount = 240;
      cosmeticCarouselRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const banners = [
    {
      image: "/images/banner1.jpg",
      title: "Sophpower Vietnam",
      desc: "Nguồn cung cấp nguyên liệu thực phẩm và mỹ phẩm chất lượng hàng đầu.",
    },
    {
      image: "/images/banner2.jpg",
      title: "Giải pháp tối ưu",
      desc: "Đồng hành và hỗ trợ sự phát triển bền vững của doanh nghiệp bạn.",
    },
  ];

  const foodProducts: Product[] = [
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

  const cosmeticProducts: Product[] = [
    {
      id: "3",
      name: "Niacinamide (Vitamin B3)",
      desc: "Niacinamide là một dạng Vitamin B3 tan trong nước, được biết đến rộng rãi với khả năng cải thiện tình trạng da toàn diện và củng cố hàng rào bảo vệ da.",
      number: "01",
      image: "/images/products/niacinamide.jpg",
      category: "cosmetic",
    },
    {
      id: "4",
      name: "Panthenol",
      desc: "Panthenol là tiền chất của Vitamin B5, nổi tiếng với các đặc tính dưỡng ẩm, làm dịu, hỗ trợ phục hồi làn da bị tổn thương đồng thời mang lại độ đàn hồi mịn màng.",
      number: "02",
      image: "/images/products/panthenol.jpg",
      category: "cosmetic",
    },
    {
      id: "5",
      name: "Tranexamic Acid",
      desc: "Tranexamic Acid là một hoạt chất được ứng dụng rộng rãi trong các sản phẩm làm sáng da, mờ thâm nám và cải thiện các vùng da không đều màu.",
      number: "03",
      image: "/images/products/tranexamic-acid.jpg",
      category: "cosmetic",
    },
    {
      id: "6",
      name: "Proxylane",
      desc: "Proxylane là một hoạt chất đa năng có khả năng chống lão hóa hiệu quả cao, kích thích tổng hợp collagen, tăng mật độ và độ đàn hồi cho da.",
      number: "04",
      image: "/images/products/proxylane.jpg",
      category: "cosmetic",
    },
    {
      id: "7",
      name: "Ectoin",
      desc: "Ectoin là một dẫn xuất axit amin tự nhiên mạnh mẽ, giúp bảo vệ và ổn định các tế bào da trước các tác nhân gây hại từ môi trường bên ngoài.",
      number: "05",
      image: "/images/products/ectoin.jpg",
      category: "cosmetic",
    },
    {
      id: "8",
      name: "Rosa Damascena Flower Water",
      desc: "Nước hoa hồng Damask chưng cất tự nhiên, giàu hoạt chất hỗ trợ cấp ẩm sâu, chống oxy hóa và nuôi dưỡng làn da tươi sáng rạng ngời.",
      number: "06",
      image: "/images/products/rosa-water.jpg",
      category: "cosmetic",
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
      <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
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


      {/* Food Ingredients Section (Nguyên liệu Thực phẩm) */}
      <section className="bg-white py-20 border-t border-gray-150">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight uppercase">
                NGUYÊN LIỆU THỰC PHẨM
              </h2>
              <div className="h-1 w-20 bg-brand-green" />
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi hợp tác với các nhà cung ứng toàn cầu uy tín để mang đến các giải pháp nguyên liệu thực phẩm, chất tạo màu tự nhiên và chất ổn định an toàn cho các nhà sản xuất tại Việt Nam.
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

          {/* Horizontal Tab Carousel Wrapper with Arrows */}
          <div className="relative group/carousel w-full">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollCosmetic("left")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 hover:bg-brand-green hover:border-brand-green hover:text-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollCosmetic("right")}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 hover:bg-brand-green hover:border-brand-green hover:text-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Carousel Container */}
            <div
              ref={cosmeticCarouselRef}
              className="flex overflow-x-auto gap-4 pb-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {foodProducts.map((prod, index) => (
                <button
                  key={prod.id}
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex-none w-44 sm:w-52 h-28 rounded-xl border overflow-hidden text-left cursor-pointer transition-all ${
                    activeTab === index
                      ? "border-brand-green shadow-lg outline outline-2 outline-brand-green outline-offset-[-2px]"
                      : "border-gray-200 bg-white hover:border-brand-green/50"
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
                      activeTab === index
                        ? "opacity-100 scale-105"
                        : "opacity-80 group-hover:opacity-100 group-hover:scale-102"
                    }`}
                    style={{ backgroundImage: `url(${prod.image})` }}
                  />

                  {/* Slanted Green Ribbon Tag */}
                  <div
                    className="absolute top-0 left-0 bg-brand-green text-white text-[11px] font-extrabold pl-3 pr-6 py-1.5 tracking-wide uppercase shrink-0 max-w-[85%] truncate z-10 shadow-sm"
                    style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}
                  >
                    {prod.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Magnified Detail Card */}
          <div className="group mt-8 flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-150 hover:border-brand-green/20 hover:-translate-y-1 transition-all duration-300 bg-white">
            {/* Left Panel: Solid Green background, white text */}
            <div className="relative overflow-hidden w-full md:w-[60%] bg-brand-green text-white p-8 sm:p-12 flex flex-col justify-between items-start space-y-6">
              <div className="absolute inset-0 bg-dot-matrix opacity-15 pointer-events-none transition-opacity duration-300 group-hover:opacity-25" />

              <div className="relative z-10 space-y-4 w-full">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight border-b border-white/20 pb-4">
                  {foodProducts[activeTab].name}
                </h3>
                <p className="text-white/95 text-sm sm:text-base leading-relaxed min-h-[80px]">
                  {foodProducts[activeTab].desc}
                </p>
              </div>
              <div className="relative z-10 pt-4">
                <Link
                  href={`/list_2/${foodProducts[activeTab].id}`}
                  className="inline-flex items-center gap-2 border border-white hover:bg-white hover:text-brand-green text-white px-6 py-2.5 text-xs font-extrabold transition-all duration-300 tracking-wider uppercase rounded-lg shadow-sm"
                >
                  TÌM HIỂU THÊM
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Panel: Large Product Image */}
            <div className="w-full md:w-[40%] h-64 md:h-auto relative bg-gray-50 shrink-0">
              <img
                src={foodProducts[activeTab].image}
                alt={foodProducts[activeTab].name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* About Us Highlights (Về chúng tôi) — sophchem.com style */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #041a0e 0%, #062013 40%, #0a3020 100%)" }}
      >
        {/* Full-bleed background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/images/home-about.jpg')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Centered heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest text-white uppercase mb-6">
              VỀ CHÚNG TÔI
            </h2>
            <p className="max-w-3xl mx-auto text-white/75 text-sm sm:text-base leading-relaxed">
              Sophpower là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, tập trung vào hai phân khúc chính là Sản phẩm Công nghiệp và Sản phẩm Hóa chất. Đối với mảng hóa chất, chúng tôi sở hữu mạng lưới cung ứng đáng tin cậy phục vụ các tiêu chuẩn quốc tế ISO, HACCP, HALAL, Kosher, FDA.
            </p>
          </div>

          {/* CTA button centered — plain Link, no design-system variant conflicts */}
          <div className="flex justify-center mb-14">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/60 text-white bg-transparent hover:bg-white hover:text-brand-green px-8 py-2.5 font-bold tracking-widest uppercase text-sm transition-all duration-300 rounded-lg"
            >
              VỀ CHÚNG TÔI
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">

            {/* Value 1 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group">
              {/* Perspective wrapper for 3D flip */}
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys1.png" alt="Năng lực chuyên sâu" className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Năng lực chuyên sâu</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất quy mô lớn.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group border-t md:border-t-0 border-white/10">
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys2.png" alt="Niềm tin từ thị trường" className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Niềm tin từ thị trường</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và chất lượng vượt trội.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group border-t md:border-t-0 border-white/10">
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys3.png" alt="Định hướng đổi mới sáng tạo" className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Định hướng đổi mới sáng tạo</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) đã được cấp bằng sáng chế.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* News Highlight Section (Trung tâm tin tức) */}
      <section 
        className="relative py-20 bg-[#f4f6f8] border-t border-gray-150 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/news_dna_horizontal.png')" }}
      >
        {/* Soft white overlay to keep the abstract illustrations faint and ensure readability */}
        <div className="absolute inset-0 bg-white/80 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="max-w-3xl space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
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
                      <span className="text-gray-600 group-hover:text-white/95">{art.date}</span>
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
