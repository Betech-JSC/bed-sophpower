import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Calendar } from "lucide-react";

interface Policy {
  id: string;
  title: string;
  updatedAt: string;
  paragraphs: string[];
}

const policiesData: Record<string, Policy> = {
  "quality-standards": {
    id: "quality-standards",
    title: "Chính Sách Chất Lượng & Kiểm Soát Nguyên Liệu",
    updatedAt: "2026-06-01",
    paragraphs: [
      "Sophpower Việt Nam cam kết cung cấp các dòng sản phẩm nguyên liệu thực phẩm và mỹ phẩm đáp ứng đầy đủ các tiêu chuẩn chất lượng đã cam kết với khách hàng. Toàn bộ các sản phẩm nhập khẩu đều có nguồn gốc xuất xứ rõ ràng và được sản xuất bởi các nhà máy đạt tiêu chuẩn quản lý chất lượng quốc tế.",
      "Mỗi lô hàng nhập khẩu đều được kiểm tra hồ sơ chất lượng nghiêm ngặt trước khi thông quan, bao gồm chứng nhận phân tích sản phẩm (COA) từ nhà sản xuất, phiếu an toàn hóa chất (MSDS) và chứng nhận lưu hành tự do (CFS) từ cơ quan có thẩm quyền nước xuất khẩu.",
      "Quy trình lấy mẫu thử nghiệm được thực hiện độc lập trước khi giao hàng cho khách hàng để đảm bảo các chỉ tiêu hóa lý, vi sinh và hàm lượng kim loại nặng nằm trong giới hạn cho phép. Trong trường hợp xảy ra sai lệch về chất lượng so với tiêu chuẩn công bố, Sophpower chịu trách nhiệm thu hồi và đổi mới sản phẩm cho đối tác trong thời gian ngắn nhất.",
    ],
  },
  "privacy-policy": {
    id: "privacy-policy",
    title: "Chính Sách Bảo Mật Thông Tin Đối Tác & Khách Hàng",
    updatedAt: "2026-06-01",
    paragraphs: [
      "Chúng tôi coi trọng việc bảo vệ dữ liệu cá nhân và thông tin thương mại của tất cả đối tác. Mọi thông tin thu thập trong quá trình giao dịch, ký kết hợp đồng và gửi mẫu thử nghiệm đều được bảo mật tuyệt đối.",
      "Thông tin chi tiết về công thức ứng dụng sản phẩm, quy trình công nghệ chuyển giao từ đội ngũ R&D của Sophpower đến phòng lab của khách hàng được phân loại là thông tin mật và chỉ sử dụng nội bộ nhằm mục đích phát triển sản phẩm của riêng khách hàng đó.",
      "Chúng tôi cam kết không chia sẻ thông tin giao dịch, dữ liệu mua hàng hoặc danh tính khách hàng cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý bằng văn bản của người đại diện có thẩm quyền từ phía đối tác.",
    ],
  },
  "cooperation-terms": {
    id: "cooperation-terms",
    title: "Điều Khoản Hợp Tác & Giao Dịch Cung Ứng",
    updatedAt: "2026-06-01",
    paragraphs: [
      "Mối quan hệ giao dịch thương mại giữa Sophpower và khách hàng được điều chỉnh bởi các điều khoản quy định chi tiết trong Hợp đồng mua bán. Khách hàng thực hiện thanh toán tiền mua hàng theo đúng kỳ hạn và phương thức thỏa thuận.",
      "Về giao nhận hàng hóa, hàng được bàn giao tại địa chỉ kho của khách hàng kèm đầy đủ hóa đơn giá trị gia tăng, phiếu giao hàng và COA tương ứng của lô hàng. Khách hàng có trách nhiệm kiểm tra số lượng và tình trạng bao bì trực tiếp khi nhận hàng.",
      "Mọi khiếu nại về số lượng hoặc lỗi bao bì rách hỏng phát sinh trong quá trình vận chuyển cần được phản hồi ngay lập tức cho nhân viên giao nhận và lập biên bản ghi nhận tại chỗ để làm căn cứ xử lý đổi trả hoặc bù hàng.",
    ],
  },
};

export default async function PolicyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const policy = policiesData[id];

  if (!policy) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/policies"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh mục Chính sách
        </Link>
      </div>

      {/* Policy Container */}
      <article className="rounded-2xl bg-white border border-gray-150 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-green">
            <FileText className="h-6 w-6" />
            <span className="text-xs font-bold tracking-wider uppercase">Chính sách doanh nghiệp</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {policy.title}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <Calendar className="h-4 w-4 text-brand-green" />
            <span>Ngày cập nhật: {policy.updatedAt}</span>
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-100 relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-750 text-base leading-relaxed text-justify">
          {policy.paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
