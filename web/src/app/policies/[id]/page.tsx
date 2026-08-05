import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Calendar } from "lucide-react";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import type { Metadata } from "next";

import { api } from "@/lib/api";
import { getVal } from "@/lib/i18n-utils";

interface Policy {
  id: string;
  title: { vi: string; en: string };
  updatedAt: string;
  paragraphs: { vi: string[]; en: string[] };
}

const policiesData: Record<string, Policy> = {
  "quality-standards": {
    id: "quality-standards",
    title: {
      vi: "Chính Sách Chất Lượng & Kiểm Soát Nguyên Liệu",
      en: "Quality Policy & Raw Material Control",
    },
    updatedAt: "2026-06-01",
    paragraphs: {
      vi: [
        "Sophpower Việt Nam cam kết cung cấp các dòng sản phẩm nguyên liệu thực phẩm và mỹ phẩm đáp ứng đầy đủ các tiêu chuẩn chất lượng đã cam kết với khách hàng. Toàn bộ các sản phẩm nhập khẩu đều có nguồn gốc xuất xứ rõ ràng và được sản xuất bởi các nhà máy đạt tiêu chuẩn quản lý chất lượng quốc tế.",
        "Mỗi lô hàng nhập khẩu đều được kiểm tra hồ sơ chất lượng nghiêm ngặt trước khi thông quan, bao gồm chứng nhận phân tích sản phẩm (COA) từ nhà sản xuất, phiếu an toàn hóa chất (MSDS) và chứng nhận lưu hành tự do (CFS) từ cơ quan có thẩm quyền nước xuất khẩu.",
        "Quy trình lấy mẫu thử nghiệm được thực hiện độc lập trước khi giao hàng cho khách hàng để đảm bảo các chỉ tiêu hóa lý, vi sinh và hàm lượng kim loại nặng nằm trong giới hạn cho phép. Trong trường hợp xảy ra sai lệch về chất lượng so với tiêu chuẩn công bố, Sophpower chịu trách nhiệm thu hồi và đổi mới sản phẩm cho đối tác trong thời gian ngắn nhất.",
      ],
      en: [
        "Sophpower Vietnam is committed to providing food and cosmetic ingredient products that fully meet the quality standards committed to our customers. All imported products have clear origins and are manufactured by factories meeting international quality management standards.",
        "Each imported shipment undergoes strict quality document inspection before customs clearance, including Certificate of Analysis (COA) from the manufacturer, Material Safety Data Sheets (MSDS), and Certificate of Free Sale (CFS) from the competent authorities of the exporting country.",
        "Independent sample testing is performed before delivery to customers to ensure that physical, chemical, microbiological indicators, and heavy metal content are within permissible limits. In case of any quality deviations from published standards, Sophpower is responsible for recalling and replacing products for partners in the shortest time.",
      ],
    },
  },
  "privacy-policy": {
    id: "privacy-policy",
    title: {
      vi: "Chính Sách Bảo Mật Thông Tin Đối Tác & Khách Hàng",
      en: "Partner & Customer Information Privacy Policy",
    },
    updatedAt: "2026-06-01",
    paragraphs: {
      vi: [
        "Chúng tôi coi trọng việc bảo vệ dữ liệu cá nhân và thông tin thương mại của tất cả đối tác. Mọi thông tin thu thập trong quá trình giao dịch, ký kết hợp đồng và gửi mẫu thử nghiệm đều được bảo mật tuyệt đối.",
        "Thông tin chi tiết về công thức ứng dụng sản phẩm, quy trình công nghệ chuyển giao từ đội ngũ R&D của Sophpower đến phòng lab của khách hàng được phân loại là thông tin mật và chỉ sử dụng nội bộ nhằm mục đích phát triển sản phẩm của riêng khách hàng đó.",
        "Chúng tôi cam kết không chia sẻ thông tin giao dịch, dữ liệu mua hàng hoặc danh tính khách hàng cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý bằng văn bản của người đại diện có thẩm quyền từ phía đối tác.",
      ],
      en: [
        "We value the protection of personal data and commercial information of all partners. All information collected during transactions, contract signings, and sample submissions is kept strictly confidential.",
        "Detailed information regarding product application formulas and technology transfer processes from Sophpower's R&D team to the customer's laboratory is classified as confidential and is used solely for the customer's own product development purposes.",
        "We commit not to share transaction details, purchase data, or customer identities with any third party without prior written consent from the authorized representative of the partner.",
      ],
    },
  },
  "cooperation-terms": {
    id: "cooperation-terms",
    title: {
      vi: "Điều Khoản Hợp Tác & Giao Dịch Cung Ứng",
      en: "Cooperation & Supply Transaction Terms",
    },
    updatedAt: "2026-06-01",
    paragraphs: {
      vi: [
        "Mối quan hệ giao dịch thương mại giữa Sophpower và khách hàng được điều chỉnh bởi các điều khoản quy định chi tiết trong Hợp đồng mua bán. Khách hàng thực hiện thanh toán tiền mua hàng theo đúng kỳ hạn và phương thức thỏa thuận.",
        "Về giao nhận hàng hóa, hàng được bàn giao tại địa chỉ kho của khách hàng kèm đầy đủ hóa đơn giá trị gia tăng, phiếu giao hàng và COA tương ứng của lô hàng. Khách hàng có trách nhiệm kiểm tra số lượng và tình trạng bao bì trực tiếp khi nhận hàng.",
        "Mọi khiếu nại về số lượng hoặc lỗi bao bì rách hỏng phát sinh trong quá trình vận chuyển cần được phản hồi ngay lập tức cho nhân viên giao nhận và lập biên bản ghi nhận tại chỗ để làm căn cứ xử lý đổi trả hoặc bù hàng.",
      ],
      en: [
        "The commercial transaction relationship between Sophpower and the customer is governed by the terms specified in the Purchase Agreement. Customers shall make payments for purchases in accordance with the agreed terms and methods.",
        "Regarding product delivery, goods are handed over at the customer's warehouse address along with full value-added invoices, delivery notes, and the corresponding COA of the batch. Customers are responsible for inspecting the quantity and packaging condition directly upon receipt.",
        "Any complaints regarding quantities or damaged packaging during transport must be immediately reported to the delivery staff and recorded on-site as a basis for return or replenishment.",
      ],
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocaleServer();
  let title = "";
  let description = "";
  let keywords = "";
  let robots = undefined;
  let canonical = "";
  let customOgImage = "";

  try {
    const pageData = await api.getPage(id);
    const customTitle = pageData.seo_title ? getVal(pageData.seo_title, locale) : "";
    const customDesc = pageData.seo_desc ? getVal(pageData.seo_desc, locale) : "";
    
    title = customTitle || getVal(pageData.title, locale) || "";
    if (customDesc) {
      description = customDesc;
    } else {
      const content = getVal(pageData.content, locale) || "";
      description = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 155);
    }
    keywords = pageData.seo_keywords ? getVal(pageData.seo_keywords, locale) || "" : "";
    robots = pageData.meta_robots || undefined;
    canonical = pageData.canonical_url || "";
    customOgImage = pageData.og_image ? api.getImageUrl(pageData.og_image) : "";
  } catch (error) {
    const policy = policiesData[id];
    if (policy) {
      const policyLocale: "vi" | "en" = locale === "vi" ? "vi" : "en";
      title = policy.title[policyLocale] || policy.title.vi;
      description = (policy.paragraphs[policyLocale] || policy.paragraphs.vi)?.[0]?.slice(0, 155) || "";
    }
  }

  const formattedTitle = title 
    ? (title.includes("Sophpower") ? title : `${title} - Sophpower`) 
    : "Sophpower Policy";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let shareImageUrl = customOgImage || `${baseUrl}/images/logo.png`;
  if (shareImageUrl.startsWith("/")) {
    shareImageUrl = `${baseUrl}${shareImageUrl}`;
  }
  const hasCustomImage = !!customOgImage;

  return {
    title: formattedTitle,
    description: description ? `${description}...` : undefined,
    keywords: keywords || undefined,
    robots: robots || undefined,
    alternates: {
      canonical: canonical || `${baseUrl}/policies/${id}`,
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/policies/${id}`,
      title: formattedTitle,
      description: description || undefined,
      images: [{
        url: shareImageUrl,
        width: hasCustomImage ? 1200 : 800,
        height: hasCustomImage ? 630 : 800,
        alt: title,
      }],
    },
    twitter: {
      card: hasCustomImage ? "summary_large_image" : "summary",
      title: formattedTitle,
      description: description || undefined,
      images: [shareImageUrl],
    }
  };
}

export default async function PolicyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];

  let activeTitle = "";
  let activeParagraphs: string[] = [];
  let contentHtml = "";
  let updatedAt = "2026-06-01";

  try {
    const pageData = await api.getPage(id);
    activeTitle = getVal(pageData.title, locale);
    contentHtml = getVal(pageData.content, locale) || "";
    if ((pageData as any).updated_at) {
      updatedAt = new Date((pageData as any).updated_at).toISOString().split('T')[0];
    }
  } catch (error) {
    console.error(`Failed to load page ${id} from API, falling back to static data:`, error);
    const policy = policiesData[id];
    if (!policy) {
      notFound();
    }
    const policyLocale: "vi" | "en" = locale === "vi" ? "vi" : "en";
    activeTitle = policy.title[policyLocale] || policy.title.vi;
    activeParagraphs = policy.paragraphs[policyLocale] || policy.paragraphs.vi;
    updatedAt = policy.updatedAt;
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
          {t.policies.backLink}
        </Link>
      </div>

      {/* Policy Container */}
      <article className="rounded-2xl bg-white border border-gray-150 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-green">
            <FileText className="h-6 w-6" />
            <span className="text-xs font-bold tracking-wider uppercase">
              {t.policies.corporatePolicy}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {activeTitle}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <Calendar className="h-4 w-4 text-brand-green" />
            <span>
              {t.policies.lastUpdated}: {updatedAt}
            </span>
          </div>
        </div>

        <div className="h-0.5 w-full bg-gray-100 relative">
          <div className="absolute left-0 top-0 h-full w-24 bg-brand-green" />
        </div>

        {/* Content */}
        <div className="rich-text text-gray-750 text-base leading-relaxed text-justify">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            activeParagraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))
          )}
        </div>
      </article>
    </div>
  );
}
