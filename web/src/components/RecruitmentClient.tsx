"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { useI18n } from "@/i18n/provider";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";

interface ListedJob {
  id: string;
  slug?: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  deadline: string;
  summary: string;
}

export default function RecruitmentClient() {
  const { locale } = useI18n();
  const t = siteDictionaries[locale];
  const [jobs, setJobs] = useState<ListedJob[]>([]);
  const [bannerImage, setBannerImage] = useState("/images/banner-contact.png");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    api.getPageBanner("recruitment").then((banner) => {
      if (cancelled) return;
      setBannerImage(banner?.image ? api.getImageUrl(banner.image) : "/images/banner-contact.png");
    }).catch((err) => {
      console.error("Failed to load recruitment page banner:", err);
      if (!cancelled) setBannerImage("/images/banner-contact.png");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    api.getJobs().then((data) => {
      if (cancelled) return;

      const sortedData = [...data].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        return b.id - a.id;
      });

      const mapped = sortedData.map((job) => {
        const rawSummary = getVal(job.summary, locale) || "";
        return {
          id: String(job.id),
          slug: job.slug,
          title: getVal(job.title, locale),
          department: getVal(job.department, locale),
          location: getVal(job.location, locale),
          salary: getVal(job.salary, locale),
          deadline: job.deadline,
          summary: rawSummary.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
        };
      });

      setJobs(mapped);
    }).catch((err) => {
      console.error("Failed to load recruitment jobs dynamically:", err);
      if (!cancelled) setJobs([]);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="relative py-28 lg:py-36 bg-cover bg-center text-white"
        style={{ backgroundImage: `url('${bannerImage}')` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            {t.recruitment.title}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
              {t.recruitment.mainHeading}
            </h2>
            <div className="h-0.5 w-16 bg-brand-green mx-auto" />
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              {t.recruitment.subtitle}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">
              {t.common.loading}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t.recruitment.empty}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/recruitment/${job.slug || job.id}`}
                  className="group block rounded-2xl bg-white border border-gray-150 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
                        {job.department}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
                        {job.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 group-hover:text-brand-green uppercase tracking-wide transition-colors shrink-0">
                      {t.recruitment.details}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="text-gray-550 text-sm leading-relaxed line-clamp-3">
                    {job.summary}
                  </p>

                  <div className="pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4.5 w-4.5 text-brand-green shrink-0" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="h-4.5 w-4.5 text-brand-green shrink-0" />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4.5 w-4.5 text-brand-green shrink-0" />
                      {t.recruitment.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4.5 w-4.5 text-brand-green shrink-0" />
                      {t.recruitment.deadline} {formatDate(job.deadline)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
