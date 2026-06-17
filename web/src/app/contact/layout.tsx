import type { Metadata } from "next";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  return {
    title: `${t.header.contact} - Sophpower Vietnam`,
    description: locale === "vi" 
      ? "Liên hệ với Sophpower Vietnam để nhận tư vấn chuyên sâu và báo giá các loại nguyên liệu thực phẩm, nguyên liệu mỹ phẩm chất lượng cao."
      : "Contact Sophpower Vietnam to get professional consultation and quotations on premium food and cosmetic ingredients.",
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
