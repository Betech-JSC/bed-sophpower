import React from "react";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

interface Policy {
  id: string;
  title: string;
  summary: string;
  updatedAt: string;
}

export default function Policies() {
  const policies: Policy[] = [
    {
      id: "quality-standards",
      title: "Chính Sách Chất Lượng & Kiểm Soát Nguyên Liệu",
      summary: "Mô tả quy trình kiểm soát chất lượng từ khâu tuyển chọn nhà sản xuất nước ngoài, kiểm định mẫu COA, MSDS đến bàn giao trực tiếp tại kho của khách hàng Việt Nam.",
      updatedAt: "2026-06-01",
    },
    {
      id: "privacy-policy",
      title: "Chính Sách Bảo Mật Thông Tin Đối Tác & Khách Hàng",
      summary: "Cam kết bảo mật toàn bộ thông tin đơn hàng, công thức mẫu thử nghiệm chuyển giao công nghệ và thông tin hợp đồng kinh tế theo đúng quy định.",
      updatedAt: "2026-06-01",
    },
    {
      id: "cooperation-terms",
      title: "Điều Khoản Hợp Tác & Giao Dịch Cung Ứng",
      summary: "Quy định chi tiết về các điều khoản công nợ thanh toán, phương thức giao nhận hàng hóa nội địa và quy trình xử lý đổi trả nguyên liệu lỗi phát sinh.",
      updatedAt: "2026-06-01",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/banner-contact.png')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            POLICIES
          </h1>
        </div>
      </section>

      {/* Main Listing */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              CHÍNH SÁCH VÀ ĐIỀU KHOẢN
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {policies.map((policy) => (
              <Link
                key={policy.id}
                href={`/policies/${policy.id}`}
                className="group flex items-start gap-4 rounded-2xl bg-white border border-gray-150 p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="rounded-xl bg-brand-green/10 p-3 text-brand-green shrink-0 mt-1">
                  <FileText className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Cập nhật: {policy.updatedAt}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                      {policy.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{policy.summary}</p>
                  <div className="pt-2">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors"
                    >
                      CHI TIẾT
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
