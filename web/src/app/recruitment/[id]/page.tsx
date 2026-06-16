import { api } from "@/lib/api";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import type { Metadata } from "next";
import RecruitmentDetailClient from "@/components/RecruitmentDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocaleServer();
  const job = await api.getJob(id).catch(() => null);
  
  if (!job) return {};

  const customTitle = job.seo_title ? getVal(job.seo_title, locale) : "";
  const customDesc = job.seo_desc ? getVal(job.seo_desc, locale) : "";

  const title = customTitle || getVal(job.title, locale);
  let description = customDesc;
  if (!description) {
    const rawSummary = getVal(job.summary, locale) || "";
    const cleanSummary = rawSummary.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 155);
    description = cleanSummary ? `${cleanSummary}...` : "";
  }

  const formattedTitle = title.includes("Sophpower") ? title : `${title} - Tuyển dụng - Sophpower`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let shareImageUrl = `${baseUrl}/images/logo.png`;
  if (shareImageUrl.startsWith("/")) {
    shareImageUrl = `${baseUrl}${shareImageUrl}`;
  }

  return {
    title: formattedTitle,
    description: description || undefined,
    openGraph: {
      type: "website",
      url: `${baseUrl}/recruitment/${id}`,
      title: formattedTitle,
      description: description || undefined,
      images: [{
        url: shareImageUrl,
        width: 800,
        height: 800,
        alt: "Sophpower Logo",
      }],
    },
    twitter: {
      card: "summary",
      title: formattedTitle,
      description: description || undefined,
      images: [shareImageUrl],
    }
  };
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RecruitmentDetailClient id={id} />;
}

