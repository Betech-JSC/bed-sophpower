import React from "react";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import { api } from "@/lib/api";
import { getVal } from "@/lib/i18n-utils";

interface Policy {
  id: string;
  title: string;
  summary: string;
}

export default async function Policies() {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  const policyLocale: "vi" | "en" = locale === "vi" ? "vi" : "en";
  const pageBanner = await api.getPageBanner("policies").catch(() => null);
  const bannerImage = pageBanner?.image ? api.getImageUrl(pageBanner.image) : "/images/banner-contact.png";

  const fallbackPolicies = [
    {
      id: "quality-standards",
      title: {
        vi: "Chính Sách Chất Lượng & Kiểm Soát Nguyên Liệu",
        en: "Quality Policy & Raw Material Control",
      },
      summary: {
        vi: "Mô tả quy trình kiểm soát chất lượng từ khâu tuyển chọn nhà sản xuất nước ngoài, kiểm định mẫu COA, MSDS đến bàn giao trực tiếp tại kho của khách hàng Việt Nam.",
        en: "Describes the quality control process from selecting foreign manufacturers, verifying COA/MSDS samples, to direct delivery at Vietnamese customers' warehouses.",
      },
    },
    {
      id: "privacy-policy",
      title: {
        vi: "Chính Sách Bảo Mật Thông Tin Đối Tác & Khách Hàng",
        en: "Partner & Customer Information Privacy Policy",
      },
      summary: {
        vi: "Cam kết bảo mật toàn bộ thông tin đơn hàng, công thức mẫu thử nghiệm chuyển giao công nghệ và thông tin hợp đồng kinh tế theo đúng quy định.",
        en: "Commitment to protecting all order information, formula testing samples for technology transfer, and economic contract details in compliance with regulations.",
      },
    },
    {
      id: "cooperation-terms",
      title: {
        vi: "Điều Khoản Hợp Tác & Giao Dịch Cung Ứng",
        en: "Cooperation & Supply Transaction Terms",
      },
      summary: {
        vi: "Quy định chi tiết về các điều khoản công nợ thanh toán, phương thức giao nhận hàng hóa nội địa và quy trình xử lý đổi trả nguyên liệu lỗi phát sinh.",
        en: "Details payment debt terms, domestic delivery methods, and the handling process for returning defective raw materials.",
      },
    },
  ];

  let displayPolicies: Policy[] = [];

  try {
    const pages = await api.getPages();
    displayPolicies = pages.map((p) => {
      const titleStr = getVal(p.title, locale);
      const contentStr = getVal(p.content, locale) || "";
      const cleanContent = contentStr.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      const summaryStr = cleanContent.length > 180 ? cleanContent.substring(0, 180) + "..." : cleanContent;
      return {
        id: p.slug,
        title: titleStr,
        summary: summaryStr,
      };
    });
  } catch (error) {
    console.error("Failed to load policies dynamically on policies listing, falling back:", error);
    displayPolicies = fallbackPolicies.map((p) => ({
      id: p.id,
      title: p.title[policyLocale] || p.title.vi,
      summary: p.summary[policyLocale] || p.summary.vi,
    }));
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner */}
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: `url('${bannerImage}')` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            {t.policies.bannerTitle}
          </h1>
        </div>
      </section>

      {/* Main Listing */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              {t.policies.mainHeading}
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {displayPolicies.map((policy) => (
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
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                      {policy.title}
                    </h3>
                  </div>
                  <p className="text-gray-550 text-sm leading-relaxed">{policy.summary}</p>
                  <div className="pt-2">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors"
                    >
                      {t.policies.details}
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
