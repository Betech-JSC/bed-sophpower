import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, DollarSign, Briefcase, Mail } from "lucide-react";
import { api } from "@/lib/api";
import { getLocaleServer } from "@/lib/get-locale-server";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocaleServer();
  const t = siteDictionaries[locale];
  
  // Fetch job details from Laravel API
  const job = await api.getJob(id).catch(() => null);
  if (!job) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const responsibilities = getVal<string[]>(job.responsibilities, locale, []);
  const requirements = getVal<string[]>(job.requirements, locale, []);
  const benefits = getVal<string[]>(job.benefits, locale, []);

  return (
    <div className="mx-auto max-w-4xl px-3 py-12 sm:px-4 lg:px-6">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/recruitment"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.recruitment.backLink}
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-gray-150 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
            {getVal(job.department, locale)}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {getVal(job.title, locale)}
          </h1>
        </div>

        {job.summary && (
          <div 
            className="text-gray-650 text-sm sm:text-base leading-relaxed text-justify border-l-4 border-brand-green/30 pl-4 py-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-2"
            dangerouslySetInnerHTML={{ __html: getVal(job.summary, locale) }}
          />
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4.5 w-4.5 text-brand-green shrink-0" />
            {getVal(job.location, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-4.5 w-4.5 text-brand-green shrink-0" />
            {getVal(job.salary, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-4.5 w-4.5 text-brand-green shrink-0" />
            {t.recruitment.type}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4.5 w-4.5 text-brand-green shrink-0" />
            {t.recruitment.deadlineDetail} {formatDate(job.deadline)}
          </span>
        </div>

        {/* Responsibilities */}
        {responsibilities && responsibilities.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-l-3 border-brand-green pl-3">
              {t.recruitment.jobDescription}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-650">
              {responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-l-3 border-brand-green pl-3">
              {t.recruitment.jobRequirements}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-650">
              {requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 border-l-3 border-brand-green pl-3">
              {t.recruitment.benefits}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-650">
              {benefits.map((bene, i) => (
                <li key={i}>{bene}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Application details */}
        <div className="rounded-xl bg-brand-green/5 p-6 border border-brand-green/20 space-y-3">
          <h4 className="font-bold text-brand-green text-sm">{t.recruitment.guideTitle}</h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {t.recruitment.guideDesc}
          </p>
          <div className="flex items-center gap-2 text-brand-green font-bold text-sm sm:text-base pt-1">
            <Mail className="h-5 w-5 shrink-0" />
            <a href="mailto:vnsp4@sophpower.com" className="hover:underline">
              vnsp4@sophpower.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

