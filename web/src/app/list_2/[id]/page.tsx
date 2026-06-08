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

export default async function FoodProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = foodProducts[id];

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/list_2"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh mục Nguyên liệu thực phẩm
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
              <h3 className="font-bold text-brand-green">Ứng dụng chính</h3>
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
              YÊU CẦU BÁO GIÁ SẢN PHẨM
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
