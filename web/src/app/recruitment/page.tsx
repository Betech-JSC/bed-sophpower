import RecruitmentClient from "@/components/RecruitmentClient";
import type { Metadata } from "next";
import { getLocaleServer } from "@/lib/get-locale-server";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  return {
    title: `${t.footer.careers} - Sophchem Vietnam`,
    description: locale === "vi" 
      ? "Khám phá các cơ hội nghề nghiệp hấp dẫn tại Sophchem Vietnam. Gia nhập đội ngũ của chúng tôi để cùng phát triển sự nghiệp."
      : "Explore exciting career opportunities at Sophchem Vietnam. Join our team and grow your career with us.",
  };
}

export default function Recruitment() {
  return <RecruitmentClient />;

