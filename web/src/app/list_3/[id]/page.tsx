"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Mail } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  desc: string;
  image: string;
  specs: string[];
  applications: string[];
  packaging: string;
}

const cosmeticProducts: Record<string, Product> = {
  "3": {
    id: "3",
    name: "Niacinamide (Vitamin B3)",
    category: "Nguyên liệu Mỹ phẩm",
    desc: "Niacinamide là một dạng Vitamin B3 tan tốt trong nước, nổi tiếng trong giới da liễu nhờ các đặc tính kháng viêm, điều tiết dầu thừa, hỗ trợ điều trị mụn, se khít lỗ chân lông và làm đều màu da rõ rệt.",
    image: "/images/products/niacinamide.jpg",
    specs: ["Độ tinh khiết: ≥ 99.0%", "Trạng thái: Bột tinh thể màu trắng, không mùi", "Chứng nhận chất lượng: COA, MSDS đầy đủ"],
    applications: ["Sản xuất serum trị mụn, mờ thâm", "Kem dưỡng trắng da mặt và toàn thân", "Sữa rửa mặt và toner kiềm dầu"],
    packaging: "Thùng phuy carton 25kg hoặc đóng túi nhỏ theo nhu cầu.",
  },
  "4": {
    id: "4",
    name: "Panthenol (Provitamin B5)",
    category: "Nguyên liệu Mỹ phẩm",
    desc: "Panthenol là tiền chất của Vitamin B5, hoạt chất dưỡng ẩm vàng có khả năng kích thích tăng sinh tế bào mới, tăng cường hồi phục vết thương và hàng rào bảo vệ tự nhiên của làn da.",
    image: "/images/products/panthenol.jpg",
    specs: ["Dạng: D-Panthenol 75% lỏng nhớt hoặc bột D-Panthenol nguyên chất", "Độ nhớt: Cao ở nhiệt độ thường", "Hòa tan: Tan vô hạn trong nước và cồn"],
    applications: ["Kem dưỡng ẩm chuyên sâu phục hồi da nhạy cảm", "Sản phẩm chăm sóc tóc hư tổn (dầu gội, dầu xả)", "Serum dưỡng mi và sản phẩm chăm sóc móng"],
    packaging: "Chai nhựa 1kg, can 25kg.",
  },
  "5": {
    id: "5",
    name: "Tranexamic Acid",
    category: "Nguyên liệu làm trắng da",
    desc: "Tranexamic Acid là một trong những hoạt chất dẫn đầu trong điều trị sạm nám da bằng cơ chế ức chế plasminogen hoạt động, ngăn chặn sản sinh melanin dưới tác động của tia UV.",
    image: "/images/products/tranexamic-acid.jpg",
    specs: ["Hàm lượng tinh khiết: ≥ 98.5%", "Độ pH hòa tan: 7.0 - 8.0", "Hạn sử dụng: 36 tháng kể từ ngày sản xuất"],
    applications: ["Sản xuất kem hoặc serum đặc trị nám, tàn nhang", "Kem chống nắng tích hợp dưỡng sáng", "Mặt nạ phục hồi dưỡng trắng da"],
    packaging: "Túi nhôm 1kg, thùng 25kg.",
  },
  "6": {
    id: "6",
    name: "Proxylane (Hydroxypropyl Tetrahydropyrantriol)",
    category: "Hoạt chất chống lão hóa",
    desc: "Proxylane là phát minh chống lão hóa mang tính đột phá chiết xuất từ gỗ sồi thiên nhiên, giúp kích thích sản sinh Glycosaminoglycans (GAGs) ở lớp trung bì da, tái tạo cấu trúc nâng đỡ chống chảy xệ hiệu quả.",
    image: "/images/products/proxylane.jpg",
    specs: ["Hàm lượng hoạt chất: 30% Lỏng hoặc bột tinh chất", "Màu sắc: Trong suốt đến vàng nhạt", "Độ ổn định: Không biến đổi màu ở pH trung tính"],
    applications: ["Serum đặc trị nếp nhăn và rãnh sâu", "Kem dưỡng nâng cơ trẻ hóa vùng cổ và mắt", "Các liệu trình chăm sóc da cao cấp"],
    packaging: "Chai 1kg, can 10kg.",
  },
  "7": {
    id: "7",
    name: "Ectoin",
    category: "Hoạt chất bảo vệ da",
    desc: "Ectoin là axit amin sinh ra từ vi khuẩn cực hạn trong sa mạc, có cơ chế liên kết nước cực mạnh tạo thành màng bọc vô hình bảo vệ DNA tế bào da khỏi tia cực tím (UVA/UVB), khói bụi mịn PM2.5 và lão hóa nhiệt.",
    image: "/images/products/ectoin.jpg",
    specs: ["Độ tinh khiết: ≥ 99.0%", "Đặc tính: Kháng nhiệt và muối cao", "Độ hòa tan: Dễ tan trong nước"],
    applications: ["Kem chống nắng quang phổ rộng, kem chống ô nhiễm", "Dược mỹ phẩm trị chàm, viêm da dị ứng", "Serum phục hồi da sau xâm lấn (laser, lăn kim)"],
    packaging: "Túi 1kg, thùng carton 10kg.",
  },
  "8": {
    id: "8",
    name: "Rosa Damascena Flower Water (Nước hoa hồng Damask)",
    category: "Dịch chiết thực vật tự nhiên",
    desc: "Nước chưng cất từ những đóa hồng Damask tươi thu hoạch buổi sớm, chứa dồi dào dưỡng chất tự nhiên và tinh dầu hoa hồng quý giá giúp se khít lỗ chân lông, cấp ẩm tức thì và tạo hương thơm thư giãn sang trọng.",
    image: "/images/products/rosa-water.jpg",
    specs: ["Phương pháp sản xuất: Chưng cất lôi cuốn hơi nước truyền thống", "Độ tinh khiết: 100% tự nhiên, không cồn, không paraben", "Màu sắc: Dịch trong suốt"],
    applications: ["Xịt khoáng cấp ẩm dịu nhẹ", "Toner/Nước hoa hồng cân bằng da", "Dung dịch tẩy trang nhẹ nhàng"],
    packaging: "Can 5kg, phuy nhựa 200kg.",
  },
};

export default function CosmeticProductDetail({
  params,
}: {
  params: React.Usable<{ id: string }>;
}) {
  const { id } = React.use(params);
  const product = cosmeticProducts[id];

  const [activeTab, setActiveTab] = React.useState<"desc" | "specs" | "apps" | "pack">("desc");

  if (!product) {
    notFound();
  }

  // Related products (from same category, excluding current product)
  const relatedList = Object.values(cosmeticProducts)
    .filter((item) => item.id !== id)
    .slice(0, 3);

  const renderSpecsTable = (specs: string[]) => {
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider">Chỉ tiêu kỹ thuật</th>
              <th className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider">Thông số chi tiết</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-150">
            {specs.map((spec, i) => {
              const parts = spec.split(":");
              const key = parts[0]?.trim();
              const val = parts.slice(1).join(":")?.trim();
              return (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-4 font-semibold text-gray-800 w-1/3">{key}</td>
                  <td className="px-6 py-4 text-gray-600">{val || spec}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-green transition-colors">
          Trang chủ
        </Link>
        <span className="text-gray-400">/</span>
        <Link href="/list_3" className="hover:text-brand-green transition-colors">
          Nguyên liệu mỹ phẩm
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main product block */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Product Image */}
        <div className="w-full lg:w-[45%] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-xs">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>

        {/* Product details */}
        <div className="w-full lg:w-[55%] space-y-6">
          <div className="space-y-2">
            <span className="inline-block rounded-md bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="h-0.5 w-full bg-gray-200 relative">
            <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">{product.desc}</p>
          </div>

          {/* Inquiry & Zalo buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              href="/page_5"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-hover transition-colors shadow-md shadow-brand-green/10 text-sm sm:text-base"
            >
              <Mail className="h-4 w-4" />
              YÊU CẦU BÁO GIÁ NGUYÊN LIỆU
            </Link>
            <a
              href="https://zalo.me/0938363363"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0068ff] px-6 py-3 font-semibold text-white hover:bg-[#0056d6] transition-colors shadow-md shadow-[#0068ff]/10 text-sm sm:text-base"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.002 2C6.5 2 2 6 2 11c0 2.9 1.5 5.5 4 7.2V22l4.5-2.6c.5.1 1 .2 1.5.2 5.5 0 10-4 10-9s-4.5-9-10-9zm2.4 12.2h-3.8l3.1-3.6H10.6v-1h3.7l-3.1 3.6h3.2v1z"/>
              </svg>
              LIÊN HỆ QUA ZALO
            </a>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-px">
          {(
            [
              { id: "desc", label: "Mô tả chi tiết" },
              { id: "specs", label: "Thông số kỹ thuật" },
              { id: "apps", label: "Ứng dụng sản xuất" },
              { id: "pack", label: "Quy cách đóng gói" },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 font-semibold text-sm transition-all duration-150 border-b-2 -mb-px rounded-t-lg cursor-pointer ${
                  isActive
                    ? "border-brand-green text-brand-green bg-brand-green/5"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-8 bg-white min-h-[150px] text-sm sm:text-base leading-relaxed text-gray-700">
          {activeTab === "desc" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Chi tiết sản phẩm</h3>
              <p className="text-justify text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">{product.desc}</p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thông số kiểm nghiệm & Chất lượng</h3>
              {renderSpecsTable(product.specs)}
            </div>
          )}

          {activeTab === "apps" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Các ứng dụng sản xuất chính</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 border border-gray-100 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-medium">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "pack" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quy cách & Đóng gói tiêu chuẩn</h3>
              <div className="rounded-xl bg-brand-green/5 p-6 border border-brand-green/20 text-sm sm:text-base">
                <p className="text-gray-800 font-medium">{product.packaging}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedList.map((item) => (
            <Link
              key={item.id}
              href={`/list_3/${item.id}`}
              className="group flex flex-col rounded-xl bg-white border border-gray-200 overflow-hidden hover:border-brand-green/30 hover:shadow-[0_4px_12px_rgba(16,109,56,0.08)] transition-all duration-300"
            >
              {/* Product Image */}
              <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Product Details */}
              <div className="p-5 flex flex-col space-y-2">
                <div>
                  <span className="inline-block text-xs font-semibold text-brand-green bg-brand-green/5 px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-brand-green transition-colors text-base line-clamp-1">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
