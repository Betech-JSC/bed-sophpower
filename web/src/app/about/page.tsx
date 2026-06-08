import React from "react";
import { Award, ShieldCheck, Globe, Star } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section
        className="relative py-24 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/about-ban.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-950/60" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">ABOUT US</h1>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-4" />
        </div>
      </section>

      {/* Main Content Section */}
      <section
        className="py-20 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/images/abbg_02.jpg')" }}
      >
        <div className="mx-auto max-w-5xl px-3 sm:px-4 lg:px-6">
          <div className="rounded-2xl bg-white/95 p-8 sm:p-12 shadow-xl border border-gray-100 backdrop-blur-xs space-y-8">
            <h2 className="text-3xl font-extrabold text-brand-green tracking-tight">VỀ CHÚNG TÔI</h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed text-base">
              <p>
                <strong className="text-brand-green text-lg">Sophpower</strong> là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, với hoạt động cốt lõi được chia thành hai phân khúc sản phẩm chính:
              </p>
              
              <ul className="space-y-4 pl-4 border-l-2 border-brand-green">
                <li>
                  <strong className="text-gray-900">Sản phẩm Công nghiệp:</strong> Tập trung vào các thiết bị nguồn công nghiệp và các sản phẩm phụ trợ liên quan.
                </li>
                <li>
                  <strong className="text-gray-900">Sản phẩm Hóa chất:</strong> Cung cấp các nhóm nguyên liệu thực phẩm và nguyên liệu thô cho ngành mỹ phẩm.
                </li>
              </ul>

              <p className="text-justify">
                Trong phân khúc sản phẩm hóa chất, chúng tôi tận dụng mạng lưới chuỗi cung ứng toàn cầu vững chắc cùng sự thấu hiểu sâu sắc về thị trường địa phương để kết nối các nhà sản xuất với nguồn nguyên liệu và thành phần chất lượng cao. Tất cả các sản phẩm đều được tuyển chọn kỹ lưỡng và kiểm soát chất lượng nghiêm ngặt trong suốt quá trình cung ứng, tuân thủ đầy đủ các tiêu chuẩn quốc tế như <strong>ISO, HACCP, HALAL, Kosher, và FDA</strong>, đảm bảo chất lượng đồng đều, an toàn và truy xuất nguồn gốc rõ ràng.
              </p>

              <p className="text-justify">
                Là đối tác thương mại tin cậy của khách hàng, lấy triết lý "khách hàng làm trung tâm" làm định hướng cốt lõi, chúng tôi luôn cam kết đảm bảo nguồn cung ổn định, hệ thống giá cả cạnh tranh cao cùng mô hình dịch vụ linh hoạt, đáp ứng nhanh chóng các nhu cầu thực tế. Chúng tôi hỗ trợ đắc lực giúp đối tác tối ưu hóa chi phí, nâng cao hiệu quả mua hàng và tăng cường lợi thế cạnh tranh trên thị trường biến động không ngừng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Highlights */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advantage 1 */}
            <div className="rounded-2xl bg-white p-8 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl">
                <Globe className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-lg">Năng lực chuyên sâu</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Chuyên gia trong lĩnh vực xử lý các hợp chất khó tan, sở hữu quy trình khép kín từ nghiên cứu và phát triển (R&D) đến sản xuất quy mô lớn.
                </p>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="rounded-2xl bg-white p-8 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-lg">Niềm tin từ thị trường</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Là Doanh nghiệp Công nghệ cao cấp Quốc gia, chúng tôi cam kết mang đến những sản phẩm an toàn, tin cậy và chất lượng vượt trội.
                </p>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="rounded-2xl bg-white p-8 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-lg">Định hướng đổi mới</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tiên phong thúc đẩy các giải pháp thông qua công nghệ siêu phân tử (Supramolecular Technology) đã được cấp bằng sáng chế.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
