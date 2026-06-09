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

const foodProducts: Record<string, Product> = {
  "16": {
    id: "16",
    name: "Bột Beta-carotene",
    category: "Chất tạo màu thực phẩm",
    desc: "Bột Beta-carotene là chất tạo màu tự nhiên cao cấp, có màu vàng cam đến cam đậm đặc trưng. Sản phẩm được sử dụng phổ biến trong chế biến thực phẩm và sản xuất dược phẩm nhờ khả năng chống oxy hóa mạnh mẽ và bổ sung tiền chất Vitamin A.",
    image: "/images/products/beta-carotene-powder.jpg",
    specs: ["Hàm lượng: 1%, 10%, 20%", "Trạng thái: Bột mịn tan hoàn toàn trong nước", "Hạn sử dụng: 24 tháng kể từ ngày sản xuất"],
    applications: ["Sản xuất nước quả, nước ngọt giải khát", "Chế biến bánh kẹo, thạch rau câu", "Bổ sung dinh dưỡng trong thực phẩm chức năng"],
    packaging: "Thùng 20kg hoặc đóng gói theo yêu cầu.",
  },
  "17": {
    id: "17",
    name: "Nhũ tương Beta-carotene",
    category: "Chất tạo màu thực phẩm",
    desc: "Nhũ tương Beta-carotene là dạng lỏng phân tán nước ổn định cao, giúp tạo màu vàng tươi tự nhiên mà không bị phân lớp hay nổi váng dầu trên bề mặt nước giải khát.",
    image: "/images/products/beta-carotene-emulsion.png",
    specs: ["Hàm lượng: 1% đến 5% Lỏng", "Trạng thái: Nhũ tương lỏng màu cam", "Độ ổn định: Chịu nhiệt tốt, kháng axit cao"],
    applications: ["Đồ uống có gas và nước trái cây không gas", "Các sản phẩm sữa, sữa chua uống", "Sốt và gia vị thực phẩm"],
    packaging: "Can 25kg hoặc phuy nhựa.",
  },
  "15": {
    id: "15",
    name: "Màu đỏ Carmine (E120)",
    category: "Màu đỏ thực phẩm tự nhiên",
    desc: "Màu đỏ Carmine (E120) chiết xuất từ côn trùng cochineal tự nhiên, đem lại tông màu đỏ tươi bền vững với ánh sáng và nhiệt độ cao, thích hợp cho nhiều dây chuyền chế biến thực phẩm khắt khe.",
    image: "/images/products/carmine.png",
    specs: ["Dạng: Bột hoặc lỏng", "Độ bền màu: Rất cao khi chịu nhiệt và ánh sáng", "Tiêu chuẩn: FDA, HACCP"],
    applications: ["Xúc xích, giò chả, lạp xưởng và thịt chế biến", "Nước ngọt, thạch, si rô đỏ", "Mỹ phẩm son môi, phấn má"],
    packaging: "Thùng 20kg hoặc chai lỏng 1kg.",
  },
  "18": {
    id: "18",
    name: "Màu Tím Tự Nhiên",
    category: "Chất tạo màu thực phẩm",
    desc: "Sản phẩm mang lại sắc tím tự nhiên rực rỡ, được chiết xuất từ nguồn thực vật hữu cơ lành tính, đảm bảo độ an toàn tuyệt đối cho người tiêu dùng.",
    image: "/images/products/mau-tim-tu-nhien.png",
    specs: ["Dạng: Bột mịn màu tím sẫm", "Độ tan: Tan tốt trong nước ấm", "Chứng nhận: HALAL, ISO 22000"],
    applications: ["Bánh ngọt, kem, các loại mứt trái cây", "Nước uống hương việt quất, nho", "Kẹo dẻo và thạch"],
    packaging: "Túi zip 5kg, thùng 25kg.",
  },
  "12": {
    id: "12",
    name: "Flavors (Hương liệu thực phẩm)",
    category: "Hương liệu phụ gia",
    desc: "Chúng tôi cung cấp dải hương liệu thực phẩm phong phú, từ hương hoa quả nhiệt đới đến hương sữa ngậy, giúp tối ưu hóa cảm quan hương vị cho các loại thực phẩm và đồ uống.",
    image: "/images/products/flavors.jpg",
    specs: ["Dạng: Lỏng hoặc bột", "Hương vị: Cam, dâu, xoài, sữa, vanilla, v.v.", "Đặc tính: Giữ hương thơm lâu sau chế biến"],
    applications: ["Nước giải khát, trà sữa, cà phê đóng chai", "Bánh kẹo, kem lạnh", "Sữa và các chế phẩm từ sữa"],
    packaging: "Can 5kg, phuy 25kg hoặc theo đơn hàng.",
  },
  "11": {
    id: "11",
    name: "Coconut Water Powder",
    category: "Bột nước quả",
    desc: "Bột nước dừa nguyên chất sấy phun giữ trọn hương vị ngọt thanh tự nhiên và các chất điện giải cần thiết, dùng làm nguyên liệu pha chế đồ uống dinh dưỡng thể thao.",
    image: "/images/products/coconut-water-powder.jpg",
    specs: ["Độ ẩm: Dưới 5%", "Độ hòa tan: 100% trong nước lạnh", "Nguồn gốc: Dừa tươi Bến Tre chọn lọc"],
    applications: ["Bột uống bù khoáng thể thao", "Hòa trộn trà trái cây túi lọc", "Sinh tố và thực phẩm ăn kiêng"],
    packaging: "Túi nhôm 1kg, thùng carton 15kg.",
  },
  "10": {
    id: "10",
    name: "Compound Thickening Stabilizer",
    category: "Chất làm dày ổn định",
    desc: "Hệ phụ gia làm dày và ổn định phức hợp giúp tạo độ sánh mượt đồng đều, cải thiện cấu trúc sản phẩm và hạn chế hiện tượng tách nước trong suốt thời hạn bảo quản.",
    image: "/images/products/thickening-stabilizer.jpg",
    specs: ["Thành phần: Xanthan Gum, Guar Gum, CMC phối trộn", "Độ nhớt: Tùy chỉnh theo ứng dụng", "Độ an toàn: Đáp ứng tiêu chuẩn JECFA"],
    applications: ["Sữa chua, sữa đậu nành, kem tươi", "Nước tương, nước sốt chấm, tương ớt", "Bột bánh mì ngọt chế biến sẵn"],
    packaging: "Bao giấy 25kg.",
  },
  "9": {
    id: "9",
    name: "Compound Juice Stabilizer",
    category: "Chất ổn định nước quả",
    desc: "Hệ ổn định chuyên biệt cho nước ép trái cây giúp liên kết tế bào thịt quả lơ lửng đều trong chai, chống phân lớp tách pha rõ rệt và tạo cảm giác ngon miệng hơn khi uống.",
    image: "/images/products/juice-stabilizer.jpg",
    specs: ["Đặc tính: Tạo hệ nhũ lơ lửng tốt ở pH axit", "Liều lượng sử dụng: 0.1% - 0.3%", "Trạng thái: Bột màu trắng sữa"],
    applications: ["Nước cam ép, nước táo ép có thịt quả", "Nước sinh tố đóng chai", "Nước nha đam hạt chia"],
    packaging: "Bao giấy 25kg có lót túi PE.",
  },
};

export default function FoodProductDetail({
  params,
}: {
  params: React.Usable<{ id: string }>;
}) {
  const { id } = React.use(params);
  const product = foodProducts[id];

  const [activeTab, setActiveTab] = React.useState<"desc" | "specs" | "apps" | "pack">("desc");

  if (!product) {
    notFound();
  }

  // Related products (from same category, excluding current product)
  const relatedList = Object.values(foodProducts)
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
        <Link href="/list_2" className="hover:text-brand-green transition-colors">
          Nguyên liệu thực phẩm
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
              YÊU CẦU BÁO GIÁ SẢN PHẨM
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
        <div className="flex flex-wrap gap-2 border-b border-gray-255 pb-px">
          {(
            [
              { id: "desc", label: "Mô tả chi tiết" },
              { id: "specs", label: "Thông số kỹ thuật" },
              { id: "apps", label: "Ứng dụng thực tế" },
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Các ứng dụng chính trong sản xuất</h3>
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
              href={`/list_2/${item.id}`}
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
