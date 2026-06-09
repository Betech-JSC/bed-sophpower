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

      {/* Corporate Highlights (Giá trị cốt lõi) */}
      <section 
        className="bg-[#062013] py-24 text-white relative overflow-hidden border-t border-white/5"
        style={{ backgroundImage: "radial-gradient(ellipse at top, #0c3a21, #062013, #020b06)" }}
      >
        {/* Subtle dot matrix pattern in the background of the dark section */}
        <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Section: Split Title & Subtext */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Giá trị Cốt lõi<br />của Sophpower
              </h2>
            </div>
            
            <div className="lg:max-w-md">
              <p className="text-emerald-100/70 text-sm sm:text-base leading-relaxed text-justify">
                Chúng tôi xây dựng năng lực cạnh tranh và niềm tin bền vững thông qua việc làm chủ quy trình công nghệ cao, cam kết chất lượng sản phẩm chuẩn quốc tế và tiên phong phát triển các giải pháp đột phá.
              </p>
            </div>
          </div>

          {/* Central Mockup/Dashboard Image Container */}
          <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#082918]/60 p-2 sm:p-4 mb-16 transition-all duration-300 hover:scale-[1.01] hover:border-emerald-500/20">
            <div className="rounded-xl overflow-hidden aspect-[4/3] md:aspect-[16/9] relative bg-emerald-950">
              <img
                src="/images/biotech-core-values.png"
                alt="Sophpower Biotech Systems & Analysis"
                className="absolute inset-0 w-full h-full object-cover opacity-95"
              />
              {/* Overlay shadow to integrate the image with the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bottom Columns: 3 Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-8">
            
            {/* Value 1 */}
            <div className="space-y-4">
              <div className="h-1 w-12 bg-emerald-500 rounded" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Năng lực chuyên sâu</h3>
              <p className="text-sm text-emerald-100/70 leading-relaxed text-justify">
                Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất nguyên liệu quy mô lớn.
              </p>
            </div>

            {/* Value 2 */}
            <div className="space-y-4">
              <div className="h-1 w-12 bg-emerald-500 rounded" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Niềm tin từ thị trường</h3>
              <p className="text-sm text-emerald-100/70 leading-relaxed text-justify">
                Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và đạt tiêu chuẩn chất lượng vượt trội.
              </p>
            </div>

            {/* Value 3 */}
            <div className="space-y-4">
              <div className="h-1 w-12 bg-emerald-500 rounded" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Định hướng đổi mới</h3>
              <p className="text-sm text-emerald-100/70 leading-relaxed text-justify">
                Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) độc quyền đã được cấp bằng sáng chế.
              </p>
            </div>

          </div>
          
        </div>
      </section>

      {/* Section 4: Discover More */}
      <section className="py-24 bg-[#f8f9fa] border-t border-gray-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Centered Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-950 tracking-tight">
              Discover more
            </h2>
            <div className="h-1 w-12 bg-brand-green mx-auto" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: Food Ingredients */}
            <div className="aspect-square bg-white border border-gray-200 rounded-lg p-8 flex flex-col justify-between items-start hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
                Nguyên liệu<br />Thực phẩm
              </h3>
              <Link
                href="/list_2"
                className="inline-flex items-center justify-center border border-gray-300 hover:border-brand-green hover:bg-brand-green hover:text-white text-gray-800 text-sm font-semibold px-6 py-2.5 rounded transition-all"
              >
                Explore
              </Link>
            </div>

            {/* Card 2: Cosmetic Ingredients (Highlighted with visual background) */}
            <div 
              className="relative aspect-square rounded-lg p-8 flex flex-col justify-between items-start overflow-hidden hover:shadow-md transition-all group"
              style={{ backgroundImage: "url('/images/banner-cosmetic.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/35 z-0" />
              
              <h3 className="relative z-10 text-xl font-bold text-white tracking-tight leading-snug">
                Nguyên liệu<br />Mỹ phẩm
              </h3>
              
              <Link
                href="/list_3"
                className="relative z-10 inline-flex items-center justify-center bg-white hover:bg-brand-green hover:text-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded transition-all border border-transparent"
              >
                Explore
              </Link>
            </div>

            {/* Card 3: News Center */}
            <div className="aspect-square bg-white border border-gray-200 rounded-lg p-8 flex flex-col justify-between items-start hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
                Trung tâm<br />Tin tức
              </h3>
              <Link
                href="/news"
                className="inline-flex items-center justify-center border border-gray-300 hover:border-brand-green hover:bg-brand-green hover:text-white text-gray-800 text-sm font-semibold px-6 py-2.5 rounded transition-all"
              >
                Explore
              </Link>
            </div>

          </div>

          {/* Decorative Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button className="text-gray-300 hover:text-gray-650 transition-colors p-2 cursor-not-allowed" disabled>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              <span className="h-2 w-2 rounded-full bg-gray-800" />
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            </div>
            <button className="text-gray-600 hover:text-brand-green transition-colors p-2">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
