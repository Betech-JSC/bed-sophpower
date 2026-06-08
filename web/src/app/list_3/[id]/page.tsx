import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";

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

export default async function CosmeticProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = cosmeticProducts[id];

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/list_3"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh mục Nguyên liệu mỹ phẩm
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Product Image */}
        <div className="w-full lg:w-[45%] rounded-2xl overflow-hidden bg-gray-50 border border-gray-150 shadow-xs">
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
            <p className="text-gray-600 leading-relaxed text-justify">{product.desc}</p>
          </div>

          {/* Specs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3 rounded-xl bg-gray-50 p-6 border border-gray-100">
              <h3 className="font-bold text-brand-green">Thông số kỹ thuật</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications List */}
            <div className="space-y-3 rounded-xl bg-gray-50 p-6 border border-gray-100">
              <h3 className="font-bold text-brand-green">Ứng dụng sản xuất</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {product.applications.map((app, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Packaging */}
          <div className="rounded-xl bg-brand-green/5 p-4 border border-brand-green/20 text-sm text-gray-700">
            <strong>Quy cách đóng gói:</strong> {product.packaging}
          </div>

          {/* Inquiry buttons */}
          <div className="pt-6">
            <Link
              href="/page_5"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green/90 transition-colors shadow-md shadow-brand-green/10"
            >
              <Mail className="h-4 w-4" />
              YÊU CẦU BÁO GIÁ NGUYÊN LIỆU
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
