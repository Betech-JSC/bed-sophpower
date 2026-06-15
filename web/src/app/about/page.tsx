import Link from "next/link";
import { Cpu, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export default async function About() {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner Section */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white rounded-b-3xl overflow-hidden"
        style={{ backgroundImage: "url('/images/about-ban.png')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight uppercase">
            {t.about.title}
          </h1>
        </div>
      </section>

      {/* Section 1: Introduction & Product Segments */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  {t.about.overview}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Sophpower Vietnam
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                {t.about.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Segment 1 */}
                <div className="p-6 rounded-xl border border-gray-150 bg-gray-55/50 hover:border-brand-green/20 hover:shadow-[0_4px_12px_rgba(16,109,56,0.04)] transition-all duration-300 flex flex-col gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-lg w-fit">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-950 text-base">{t.about.industrialTitle}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t.about.industrialDesc}
                    </p>
                  </div>
                </div>

                {/* Segment 2 */}
                <div className="p-6 rounded-xl border border-gray-150 bg-gray-55/50 hover:border-brand-green/20 hover:shadow-[0_4px_12px_rgba(16,109,56,0.04)] transition-all duration-300 flex flex-col gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-lg w-fit">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-950 text-base">{t.about.chemicalTitle}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {t.about.chemicalDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-gray-55 border border-gray-200 shadow-sm relative group">
                <img
                  src="/images/about-global-trade.png"
                  alt="Sophpower Global Trade Network"
                  className="w-full h-auto object-cover max-h-[450px] group-hover:scale-102 transition-transform duration-550"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Chemical Supply Chain & Partnership */}
      <section className="py-20 bg-gray-55 border-t border-b border-gray-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Related Image */}
            <div className="lg:col-span-5 lg:order-1 order-2">
              <div className="rounded-2xl overflow-hidden bg-gray-55 border border-gray-200 shadow-sm relative group">
                <img
                  src="/images/about-lab-quality.png"
                  alt="Sophpower Chemical Laboratory Quality Control"
                  className="w-full h-auto object-cover max-h-[450px] group-hover:scale-102 transition-transform duration-550"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-7 lg:order-2 order-1 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  {t.about.networkTitle}
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {t.about.valueConnection}
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
                <p>
                  {t.about.networkDesc1}
                </p>

                <p className="border-l-4 border-brand-green pl-4 italic text-gray-650 bg-brand-green/5 py-4 pr-4 rounded-r-xl">
                  {t.about.networkDesc2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Highlights — same layout as homepage About section */}
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
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest text-white uppercase mb-6">
              {t.about.coreValuesTitle}
            </h2>
            <p className="max-w-3xl mx-auto text-white/75 text-sm sm:text-base leading-relaxed">
              {t.about.coreValuesDesc}
            </p>
          </div>

          {/* 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">

            {/* Value 1 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group">
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys1.png" alt={t.about.value1Title} className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {t.about.value1Title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {t.about.value1Desc}
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group border-t md:border-t-0 border-white/10">
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys2.png" alt={t.about.value2Title} className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {t.about.value2Title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {t.about.value2Desc}
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group border-t md:border-t-0 border-white/10">
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys3.png" alt={t.about.value3Title} className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                  {t.about.value3Title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {t.about.value3Desc}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Khám phá thêm */}
      <section className="py-24 bg-gray-55 border-t border-gray-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Title */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight">
                {t.about.exploreMore}
              </h2>
            </div>

            {/* Right Column: 3 Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1: Food Ingredients */}
              <Link
                href="/nguyen-lieu-thuc-pham"
                className="relative aspect-[4/5] md:aspect-square rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Always-visible Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-550 z-0"
                  style={{ backgroundImage: "url('/images/banner-food.png')" }}
                />
                {/* Dark overlay — always on, darkens on hover */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-0" />

                {/* Title — always visible */}
                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug p-6">
                  {t.about.foodCardTitle}
                </h3>

                {/* Button — slides up on hover */}
                <div className="absolute bottom-6 left-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md">
                    {t.about.viewMore}
                  </span>
                </div>
              </Link>

              {/* Card 2: Cosmetic Ingredients */}
              <Link
                href="/nguyen-lieu-my-pham"
                className="relative aspect-[4/5] md:aspect-square rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-550 z-0"
                  style={{ backgroundImage: "url('/images/banner-cosmetic.png')" }}
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-0" />

                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug p-6">
                  {t.about.cosmeticCardTitle}
                </h3>

                <div className="absolute bottom-6 left-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md">
                    {t.about.viewMore}
                  </span>
                </div>
              </Link>

              {/* Card 3: News Center */}
              <Link
                href="/news"
                className="relative aspect-[4/5] md:aspect-square rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-550 z-0"
                  style={{ backgroundImage: "url('/images/banner-news.png')" }}
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-0" />

                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug p-6">
                  {t.about.newsCardTitle}
                </h3>

                <div className="absolute bottom-6 left-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md">
                    {t.about.viewMore}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
