"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { useI18n } from "@/i18n/provider";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

interface Product {
  id: string;
  slug?: string;
  name: string;
  desc: string;
  number: string;
  image: string;
  category: "food" | "cosmetic";
}

export default function Home() {
  const { locale } = useI18n();
  const t = siteDictionaries[locale];

  const [activeBanner, setActiveBanner] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
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

  const [rawBanners, setRawBanners] = useState<any[]>([]);
  const [rawProducts, setRawProducts] = useState<any[]>([]);
  const [rawArticles, setRawArticles] = useState<any[]>([]);

  const mockArticles = [
    {
      id: "1",
      slug: "",
      title: locale === 'vi'
        ? "Xu Hướng Mỹ Phẩm Thiên Nhiên 2026 – Vì Sao Rosa Damascena Flower Water Được Ưa Chuộng Trong Các Dòng Skincare Hiện Đại?"
        : "Natural Cosmetics Trend 2026 – Why Rosa Damascena Flower Water Is Favored in Modern Skincare?",
      date: "2026.06.08",
      image: "/images/news/news1.png",
      category: locale === 'vi' ? "Nguyên liệu mỹ phẩm" : "Cosmetic ingredient",
    },
    {
      id: "2",
      slug: "",
      title: locale === 'vi'
        ? "Vì Sao Tranexamic Acid Được Nhiều Thương Hiệu Skincare Ứng Dụng Trong Mỹ Phẩm Hiện Đại?"
        : "Why Is Tranexamic Acid Widely Used by Skincare Brands in Modern Cosmetics?",
      date: "2026.06.07",
      image: "/images/products/tranexamic-acid.jpg",
      category: locale === 'vi' ? "Nguyên liệu mỹ phẩm" : "Cosmetic ingredient",
    },
    {
      id: "3",
      slug: "",
      title: locale === 'vi'
        ? "Thị Trường Mỹ Phẩm Việt Nam Đang Thay Đổi Theo Xu Hướng Nào?"
        : "Which Trends Are Shaping the Vietnamese Cosmetics Market?",
      date: "2026.06.05",
      image: "/images/products/niacinamide.jpg",
      category: locale === 'vi' ? "Thị trường" : "Market",
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Derived state dynamically for locale change responsiveness without API re-fetch
  const banners = rawBanners.length > 0
    ? rawBanners.map((b) => ({
        image: b.image ? api.getImageUrl(b.image) : '/images/banner1.jpg',
        title: getVal(b.title, locale),
        desc: getVal(b.desc, locale),
      }))
    : [
        {
          image: "/images/banner1.jpg",
          title: "Sophpower Vietnam",
          desc: t.home.banner1Desc,
        },
        {
          image: "/images/banner2.jpg",
          title: t.home.banner2Title,
          desc: t.home.banner2Desc,
        },
      ];

  const foodProducts = React.useMemo(() => {
    const dataToUse = rawProducts.length > 0 ? rawProducts : [];
    if (dataToUse.length > 0) {
      const sortedData = [...dataToUse].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        return b.id - a.id;
      });
      return sortedData
        .map((p, idx) => {
          const rawDesc = getVal(p.desc, locale) || "";
          const cleanDesc = rawDesc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
          return {
            id: String(p.id),
            slug: p.slug,
            name: getVal(p.name, locale),
            desc: cleanDesc,
            number: String(idx + 1).padStart(2, '0'),
            image: p.image ? api.getImageUrl(p.image) : '/images/placeholder.jpg',
            category: p.type === 'food' ? ('food' as const) : ('cosmetic' as const),
          };
        })
        .filter((p) => p.category === 'food');
    }

    return [
      {
        id: "16",
        slug: "",
        name: locale === 'vi' ? "Bột Beta-carotene" : "Beta-carotene Powder",
        desc: locale === 'vi'
          ? "Chất tạo màu hỗn hợp thực phẩm và mỹ phẩm tự nhiên chất lượng cao."
          : "High-quality natural food and cosmetic compound colorant.",
        number: "01",
        image: "/images/products/beta-carotene-powder.jpg",
        category: "food" as const,
      },
      {
        id: "17",
        slug: "",
        name: locale === 'vi' ? "Nhũ tương Beta-carotene" : "Beta-carotene Emulsion",
        desc: locale === 'vi'
          ? "Dạng nhũ tương Beta-carotene tan tốt trong nước, màu sắc ổn định."
          : "Water-soluble Beta-carotene emulsion with stable coloring.",
        number: "02",
        image: "/images/products/beta-carotene-emulsion.png",
        category: "food" as const,
      },
      {
        id: "15",
        slug: "",
        name: locale === 'vi' ? "Màu đỏ Carmine (E120)" : "Carmine Red (E120)",
        desc: locale === 'vi'
          ? "Phụ gia tạo màu đỏ Carmine thực phẩm hỗn hợp, chiết xuất tự nhiên."
          : "Natural extract food compound Carmine red coloring additive.",
        number: "03",
        image: "/images/products/carmine.png",
        category: "food" as const,
      },
      {
        id: "18",
        slug: "",
        name: locale === 'vi' ? "Màu Tím Tự Nhiên" : "Natural Pur" + "ple Color",
        desc: locale === 'vi'
          ? "Chất tạo màu tím tự nhiên chất lượng vượt trội cho thực phẩm."
          : "Superior quality natural pur" + "ple coloring agent for food.",
        number: "04",
        image: "/images/products/mau-tim-tu-nhien.png",
        category: "food" as const,
      },
      {
        id: "12",
        slug: "",
        name: locale === 'vi' ? "Flavors (Hương liệu)" : "Flavors",
        desc: locale === 'vi'
          ? "Hương liệu thực phẩm tạo mùi hương đậm đà, tự nhiên cho các loại đồ uống."
          : "Food flavors providing rich, natural aroma for various beverages.",
        number: "05",
        image: "/images/products/flavors.jpg",
        category: "food" as const,
      },
      {
        id: "11",
        slug: "",
        name: locale === 'vi' ? "Coconut Water Powder" : "Coconut Water Powder",
        desc: locale === 'vi'
          ? "Bột nước dừa tự nhiên, giàu khoáng chất dùng làm nguyên liệu đồ uống."
          : "Natural coconut water powder, rich in minerals for beverage ingredients.",
        number: "06",
        image: "/images/products/coconut-water-powder.jpg",
        category: "food" as const,
      },
      {
        id: "10",
        slug: "",
        name: locale === 'vi' ? "Thickening Stabilizer" : "Thickening Stabilizer",
        desc: locale === 'vi'
          ? "Chất ổn định làm dày hệ thống đồ uống, sản phẩm sữa và thực phẩm."
          : "Stabilizer for thickening beverage systems, dairy, and food products.",
        number: "07",
        image: "/images/products/thickening-stabilizer.jpg",
        category: "food" as const,
      },
      {
        id: "9",
        slug: "",
        name: locale === 'vi' ? "Juice Stabilizer" : "Juice Stabilizer",
        desc: locale === 'vi'
          ? "Chất ổn định giúp chống lắng cặn và cải thiện độ phân tán cho nước trái cây."
          : "Stabilizer helping prevent sedimentation and improve dispersion in juices.",
        number: "08",
        image: "/images/products/juice-stabilizer.jpg",
        category: "food" as const,
      },
    ];
  }, [rawProducts, locale]);

  const homeArticles = React.useMemo(() => {
    if (rawArticles.length > 0) {
      return rawArticles.slice(0, 3).map((art) => ({
        id: String(art.id),
        slug: art.slug,
        title: getVal(art.title, locale),
        date: art.date || (art.created_at ? new Date(art.created_at).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US') : '2026.06.08'),
        image: art.image ? api.getImageUrl(art.image) : '/images/placeholder.jpg',
        category: getVal(art.category, locale),
      }));
    }
    return mockArticles;
  }, [rawArticles, mockArticles, locale]);

  // Auto transition banner slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Fetch products, news and banners dynamically from Laravel API ONCE on mount
  useEffect(() => {
    api.getBanners().then((data) => {
      if (data && data.length > 0) {
        setRawBanners(data);
      }
    }).catch((err) => {
      console.error("Failed to load banners dynamically on homepage:", err);
    });

    api.getProducts().then((data) => {
      if (data && data.length > 0) {
        setRawProducts(data);
      }
    }).catch((err) => {
      console.error("Failed to load products dynamically on homepage:", err);
    });

    api.getNews().then((data) => {
      if (data && data.length > 0) {
        setRawArticles(data);
      }
    }).catch((err) => {
      console.error("Failed to load news dynamically on homepage:", err);
    });
  }, []);

  // Reset activeTab if it goes out of bounds when foodProducts changes
  useEffect(() => {
    if (activeTab >= foodProducts.length && foodProducts.length > 0) {
      setActiveTab(0);
    }
  }, [foodProducts, activeTab]);

  const currentProduct = foodProducts[activeTab] || foodProducts[0] || {
    id: "",
    slug: "",
    name: "",
    desc: "",
    number: "",
    image: "/images/placeholder.jpg",
    category: "food" as const
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${banner.image})` }}
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/45 z-10 flex items-center">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide uppercase leading-tight animate-in fade-in slide-in-from-bottom-5 duration-700">
                  {banner.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                  {banner.desc}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Navigation Indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBanner(index)}
              className={`h-1 w-8 transition-all duration-300 ${index === activeBanner ? "bg-brand-green" : "bg-white/40"
                } cursor-pointer`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Food Ingredients Section (Nguyên liệu Thực phẩm) */}
      <section className="bg-white py-20 border-t border-gray-150">
        <div className="mx-auto max-w-7xl 3xl:max-w-[90rem] 4xl:max-w-[100rem] px-3 sm:px-4 lg:px-6">
          {/* Header Title Section */}
          <ScrollReveal direction="up" duration={600}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight uppercase">
                  {t.home.foodTitle}
                </h2>
                <div className="h-1 w-20 bg-brand-green" />
                <p className="text-gray-600 leading-relaxed">
                  {t.home.foodDesc}
                </p>
              </div>
              <Link
                href={locale === "vi" ? "/nguyen-lieu-thuc-pham" : "/food-ingredients"}
                className="inline-flex items-center gap-2 text-brand-green font-bold hover:underline"
              >
                {t.home.viewAll}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Horizontal Tab Carousel Wrapper with Arrows */}
          <ScrollReveal direction="up" delay={100} duration={600}>
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
                    className={`group relative flex-none w-44 sm:w-52 h-28 rounded-xl border overflow-hidden text-left cursor-pointer transition-all ${activeTab === index
                        ? "border-brand-green shadow-lg outline outline-2 outline-brand-green outline-offset-[-2px]"
                        : "border-gray-200 bg-white hover:border-brand-green/50"
                      }`}
                  >
                    {/* Background Image */}
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${activeTab === index
                          ? "opacity-100 scale-105"
                          : "opacity-80 group-hover:opacity-100 group-hover:scale-102"
                        }`}
                      style={{ backgroundImage: `url(${api.getImageUrl(prod.image)})` }}
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
          </ScrollReveal>

          {/* Magnified Detail Card */}
          <ScrollReveal direction="up" delay={200} duration={600}>
            <div className="group mt-8 flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-150 hover:border-brand-green/20 hover:-translate-y-1 transition-all duration-300 bg-white">
              {/* Left Panel: Solid Green background, white text */}
              <div className="relative overflow-hidden w-full md:w-[60%] bg-brand-green text-white p-8 sm:p-12 flex flex-col justify-between items-start space-y-6">
                <div className="absolute inset-0 bg-dot-matrix opacity-15 pointer-events-none transition-opacity duration-300 group-hover:opacity-25" />

                <div className="relative z-10 space-y-4 w-full">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight border-b border-white/20 pb-4">
                    {currentProduct.name}
                  </h3>
                  <p className="text-white/95 text-sm sm:text-base leading-relaxed min-h-[80px]">
                    {currentProduct.desc}
                  </p>
                </div>
                <div className="relative z-10 pt-4">
                  <Link
                    href={locale === "vi" ? `/nguyen-lieu-thuc-pham/${currentProduct.slug || currentProduct.id}` : `/food-ingredients/${currentProduct.slug || currentProduct.id}`}
                    className="inline-flex items-center gap-2 border border-white hover:bg-white hover:text-brand-green text-white px-6 py-2.5 text-xs font-extrabold transition-all duration-300 tracking-wider uppercase rounded-lg shadow-sm"
                  >
                    {t.home.learnMore}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Panel: Large Product Image */}
              <div className="w-full md:w-[40%] h-64 md:h-auto relative bg-gray-55 shrink-0">
                <img
                  src={api.getImageUrl(currentProduct.image)}
                  alt={currentProduct.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
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
          <ScrollReveal direction="up" duration={600}>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest text-white uppercase mb-6">
                {t.footer.aboutUs.toUpperCase()}
              </h2>
              <p className="max-w-3xl mx-auto text-white/75 text-sm sm:text-base leading-relaxed">
                {t.home.aboutDesc}
              </p>
            </div>
          </ScrollReveal>

          {/* CTA button centered */}
          <ScrollReveal direction="up" delay={100} duration={600}>
            <div className="flex justify-center mb-14">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/60 text-white bg-transparent hover:bg-white hover:text-brand-green px-8 py-2.5 font-bold tracking-widest uppercase text-sm transition-all duration-300 rounded-lg"
              >
                {t.footer.aboutUs.toUpperCase()}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">

            {/* Value 1 */}
            <ScrollReveal direction="up" delay={150} duration={600} className="h-full w-full">
              <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group h-full">
                {/* Perspective wrapper for 3D flip */}
                <div className="w-24 h-24 shrink-0 [perspective:600px]">
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                    <img src="/images/icons/ys1.png" alt={t.home.value1Title} className="w-24 h-24 object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                    {t.home.value1Title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t.home.value1Desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Value 2 */}
            <ScrollReveal direction="up" delay={250} duration={600} className="h-full w-full">
              <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group border-t md:border-t-0 border-white/10 h-full">
                <div className="w-24 h-24 shrink-0 [perspective:600px]">
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                    <img src="/images/icons/ys2.png" alt={t.home.value2Title} className="w-24 h-24 object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                    {t.home.value2Title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t.home.value2Desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Value 3 */}
            <ScrollReveal direction="up" delay={350} duration={600} className="h-full w-full">
              <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group border-t md:border-t-0 border-white/10 h-full">
                <div className="w-24 h-24 shrink-0 [perspective:600px]">
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                    <img src="/images/icons/ys3.png" alt={t.home.value3Title} className="w-24 h-24 object-contain" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                    {t.home.value3Title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t.home.value3Desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>

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
          <ScrollReveal direction="up" duration={600}>
            <div className="max-w-3xl space-y-3 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {t.home.newsCenterTitle}
              </h2>
              <div className="h-1 w-20 bg-brand-green" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeArticles.map((art, index) => (
              <ScrollReveal key={art.id} direction="up" delay={index * 100} duration={600} className="h-full w-full">
                <Link
                  href={`/news/${art.slug || art.id}`}
                  className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md hover:shadow-brand-green/5 transition-all duration-300 h-full"
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
                        <span className="text-gray-600 group-hover:text-white/95">{formatDate(art.date)}</span>
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
                        {t.home.readMore}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Button Go To News Page */}
          <ScrollReveal direction="up" delay={200} duration={600}>
            <div className="flex justify-center mt-12">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-hover transition-colors shadow-md shadow-brand-green/10"
              >
                {t.home.newsMoreBtn}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
