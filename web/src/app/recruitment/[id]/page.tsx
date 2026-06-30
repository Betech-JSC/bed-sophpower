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
  const customKeywords = job.seo_keywords ? getVal(job.seo_keywords, locale) : "";
  const robots = job.meta_robots || undefined;

  const title = customTitle || getVal(job.title, locale);
  let description = customDesc;
  if (!description) {
    const rawSummary = getVal(job.summary, locale) || "";
    const cleanSummary = rawSummary.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 155);
    description = cleanSummary ? `${cleanSummary}...` : "";
  }

  const formattedTitle = title.includes("Sophpower") ? title : `${title} - Tuyển dụng - Sophpower`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  const customOgImage = job.og_image ? api.getImageUrl(job.og_image) : "";
  let shareImageUrl = customOgImage || `${baseUrl}/images/logo.png`;
  if (shareImageUrl.startsWith("/")) {
    shareImageUrl = `${baseUrl}${shareImageUrl}`;
  }
  const hasCustomImage = !!customOgImage;

  return {
    title: formattedTitle,
    description: description || undefined,
    keywords: customKeywords || undefined,
    robots: robots || undefined,
    alternates: {
      canonical: job.canonical_url || `${baseUrl}/recruitment/${job.slug || id}`,
      languages: {
        vi: `${baseUrl}/recruitment/${job.slug || id}`,
        en: `${baseUrl}/en/recruitment/${job.slug || id}`,
        zh: `${baseUrl}/zh/recruitment/${job.slug || id}`,
        ja: `${baseUrl}/ja/recruitment/${job.slug || id}`,
      }
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/recruitment/${id}`,
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

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocaleServer();
  const job = await api.getJob(id).catch(() => null);

  if (!job) {
    return <RecruitmentDetailClient id={id} />;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  // Helper to normalize array lists
  const normalizeList = (value: any): string[] => {
    if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
    if (typeof value === "string" && value.trim() !== "") return [value];
    return [];
  };

  const jobTitle = getVal(job.title, locale);
  const jobSummary = (getVal(job.summary, locale) || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  
  // Combine details for structured JobPosting Google description (HTML format is supported by Google Jobs)
  const jobResponsibilities = normalizeList(getVal(job.responsibilities, locale, []));
  const jobRequirements = normalizeList(getVal(job.requirements, locale, []));
  const jobBenefits = normalizeList(getVal(job.benefits, locale, []));

  let descParts: string[] = [];
  if (jobSummary) {
    descParts.push(`<p>${jobSummary}</p>`);
  }
  if (jobResponsibilities.length > 0) {
    descParts.push(`<h3>Mô tả công việc / Job Description:</h3><ul>${jobResponsibilities.map(r => `<li>${r}</li>`).join("")}</ul>`);
  }
  if (jobRequirements.length > 0) {
    descParts.push(`<h3>Yêu cầu công việc / Job Requirements:</h3><ul>${jobRequirements.map(r => `<li>${r}</li>`).join("")}</ul>`);
  }
  if (jobBenefits.length > 0) {
    descParts.push(`<h3>Quyền lợi / Benefits:</h3><ul>${jobBenefits.map(b => `<li>${b}</li>`).join("")}</ul>`);
  }
  const fullDescription = descParts.join("\n\n");

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobTitle,
    "description": fullDescription || jobTitle,
    "datePosted": job.created_at ? new Date(job.created_at).toISOString() : new Date().toISOString(),
    "validThrough": job.deadline ? new Date(job.deadline).toISOString() : undefined,
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Sophpower Vietnam",
      "sameAs": baseUrl,
      "logo": `${baseUrl}/images/logo.png`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": getVal(job.location, locale) || "Hồ Chí Minh",
        "addressCountry": "VN"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <RecruitmentDetailClient id={id} />
    </>
  );
}

