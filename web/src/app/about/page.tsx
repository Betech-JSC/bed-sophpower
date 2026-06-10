import Link from "next/link";
import { Cpu, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner Section */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/about-ban.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight uppercase">
            VỀ CHÚNG TÔI
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
                  Tổng quan doanh nghiệp
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Sophpower Vietnam
                </h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                Sophpower là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, với hoạt động cốt lõi được chia thành hai phân khúc sản phẩm chính:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Segment 1 */}
                <div className="p-6 rounded-xl border border-gray-150 bg-gray-50/50 hover:border-brand-green/20 hover:shadow-[0_4px_12px_rgba(16,109,56,0.04)] transition-all duration-300 flex flex-col gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-lg w-fit">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-950 text-base">Sản phẩm Công nghiệp</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Tập trung vào các thiết bị nguồn công nghiệp và các sản phẩm phụ trợ liên quan.
                    </p>
                  </div>
                </div>

                {/* Segment 2 */}
                <div className="p-6 rounded-xl border border-gray-150 bg-gray-50/50 hover:border-brand-green/20 hover:shadow-[0_4px_12px_rgba(16,109,56,0.04)] transition-all duration-300 flex flex-col gap-4">
                  <div className="p-3 bg-brand-green/10 text-brand-green rounded-lg w-fit">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-950 text-base">Sản phẩm Hóa chất</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Cung cấp các nhóm nguyên liệu thực phẩm và nguyên liệu thô cho ngành mỹ phẩm.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm relative group">
                <img
                  src="/images/about-global-trade.png"
                  alt="Sophpower Global Trade Network"
                  className="w-full h-auto object-cover max-h-[450px] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Chemical Supply Chain & Partnership */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Related Image */}
            <div className="lg:col-span-5 lg:order-1 order-2">
              <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm relative group">
                <img
                  src="/images/about-lab-quality.png"
                  alt="Sophpower Chemical Laboratory Quality Control"
                  className="w-full h-auto object-cover max-h-[450px] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-7 lg:order-2 order-1 space-y-6">
              <div className="space-y-2">
                <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                  Mạng lưới & Chất lượng
                </span>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  Liên kết Giá trị Toàn diện
                </h2>
              </div>

              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
                <p>
                  Trong phân khúc sản phẩm hóa chất, chúng tôi tận dụng mạng lưới chuỗi cung ứng toàn cầu vững chắc cùng sự thấu hiểu sâu sắc về thị trường địa phương để kết nối các nhà sản xuất với nguồn nguyên liệu và thành phần chất lượng cao. Tất cả các sản phẩm đều được tuyển chọn kỹ lưỡng và kiểm soát chất lượng nghiêm ngặt trong suốt quá trình cung ứng, tuân thủ đầy đủ các tiêu chuẩn quốc tế như{" "}
                  <strong className="text-gray-950 font-bold">ISO, HACCP, HALAL, Kosher, và FDA</strong>, đảm bảo chất lượng đồng đều, an toàn và truy xuất nguồn gốc rõ ràng.
                </p>

                <p className="border-l-4 border-brand-green pl-4 italic text-gray-650 bg-brand-green/5 py-4 pr-4 rounded-r-xl">
                  Là đối tác thương mại tin cậy của khách hàng, lấy triết lý &quot;khách hàng làm trung tâm&quot; làm định hướng cốt lõi, chúng tôi luôn cam kết đảm bảo nguồn cung ổn định, hệ thống giá cả cạnh tranh cao cùng mô hình dịch vụ linh hoạt, đáp ứng nhanh chóng các nhu cầu thực tế. Chúng tôi hỗ trợ đắc lực giúp đối tác tối ưu hóa chi phí, nâng cao hiệu quả mua hàng và tăng cường lợi thế cạnh tranh trên thị trường biến động không ngừng.
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
              GIÁ TRỊ CỐT LÕI
            </h2>
            <p className="max-w-3xl mx-auto text-white/75 text-sm sm:text-base leading-relaxed">
              Chúng tôi xây dựng năng lực cạnh tranh và niềm tin bền vững thông qua việc làm chủ quy trình công nghệ cao, cam kết chất lượng sản phẩm chuẩn quốc tế và tiên phong phát triển các giải pháp đột phá.
            </p>
          </div>

          {/* 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-white/10 rounded-lg overflow-hidden border border-white/10">

            {/* Value 1 */}
            <div className="bg-[#062013]/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col items-center text-center gap-5 hover:bg-brand-green/30 transition-colors duration-300 group">
              <div className="w-24 h-24 shrink-0 [perspective:600px]">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                  <img src="/images/icons/ys1.png" alt="Năng lực chuyên sâu" className="w-24 h-24 object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">Năng lực chuyên sâu</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất nguyên liệu quy mô lớn.
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
                  Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và đạt tiêu chuẩn chất lượng vượt trội.
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
                  Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) độc quyền đã được cấp bằng sáng chế.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Section 4: Khám phá thêm */}
      <section className="py-24 bg-[#f8f9fa] border-t border-gray-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Title */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight leading-tight">
                Khám phá<br className="hidden lg:block" /> thêm
              </h2>
            </div>

            {/* Right Column: 3 Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Food Ingredients */}
              <Link
                href="/list_2"
                className="relative aspect-[4/5] md:aspect-square rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Always-visible Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-500 z-0"
                  style={{ backgroundImage: "url('/images/banner-food.png')" }}
                />
                {/* Dark overlay — always on, darkens on hover */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-0" />

                {/* Title — always visible */}
                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug p-6">
                  Nguyên liệu<br />Thực phẩm
                </h3>

                {/* Button — slides up on hover */}
                <div className="absolute bottom-6 left-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md">
                    Xem thêm
                  </span>
                </div>
              </Link>

              {/* Card 2: Cosmetic Ingredients */}
              <Link
                href="/list_3"
                className="relative aspect-[4/5] md:aspect-square rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-500 z-0"
                  style={{ backgroundImage: "url('/images/banner-cosmetic.png')" }}
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-0" />

                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug p-6">
                  Nguyên liệu<br />Mỹ phẩm
                </h3>

                <div className="absolute bottom-6 left-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md">
                    Xem thêm
                  </span>
                </div>
              </Link>

              {/* Card 3: News Center */}
              <Link
                href="/news"
                className="relative aspect-[4/5] md:aspect-square rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-500 z-0"
                  style={{ backgroundImage: "url('/images/banner-news.png')" }}
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors duration-300 z-0" />

                <h3 className="relative z-10 text-lg sm:text-xl font-bold text-white tracking-tight leading-snug p-6">
                  Trung tâm<br />Tin tức
                </h3>

                <div className="absolute bottom-6 left-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-md">
                    Xem thêm
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
