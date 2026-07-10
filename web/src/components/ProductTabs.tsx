"use client";

import React, { useState } from "react";
import { CheckCircle, MessageSquare, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { getVal } from "@/lib/i18n-utils";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import { api } from "@/lib/api";

interface ProductQuestion {
  id: number;
  customer_name: string;
  question: string;
  answer?: string;
  created_at?: string;
}

export default function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "apps" | "pack" | "qna">("desc");
  const { locale } = useI18n();
  const t = siteDictionaries[locale];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    question: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const specsArray = getVal(product.specs, locale, [] as string[]);
  const applicationsArray = getVal(product.applications, locale, [] as string[]);
  const questionsList: ProductQuestion[] = product.questions || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      await api.submitProductQuestion({
        product_id: product.id,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone || undefined,
        question: form.question,
      });

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", question: "" });
      // Reset success status after 7 seconds
      setTimeout(() => setSuccess(false), 7000);
    } catch (err: any) {
      console.error("Submit question error:", err);
      setErrorMsg(err.message || t.products.qnaError);
    } finally {
      setLoading(false);
    }
  };

  const renderSpecsTable = (specs: string[]) => {
    if (!specs || specs.length === 0) {
      return <p className="text-gray-550 italic">{t.products.noSpecs}</p>;
    }
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider">{t.products.specName}</th>
              <th className="px-6 py-3 text-left font-bold text-gray-900 uppercase tracking-wider">{t.products.specValue}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-150">
            {specs.map((spec, i) => {
              const parts = spec.split(":");
              const key = parts[0]?.trim();
              const val = parts.slice(1).join(":")?.trim();
              return (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-4 font-semibold text-gray-800 w-1/3">{key}</td>
                  <td className="px-6 py-4 text-gray-600">{val || spec}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const tabs = [
    { id: "desc" as const, label: t.products.tabDesc },
    { id: "specs" as const, label: t.products.tabSpecs },
    { id: "apps" as const, label: product.type === 'food' ? t.products.tabAppsFood : t.products.tabAppsCosmetic },
    { id: "pack" as const, label: t.products.tabPack },
    { id: "qna" as const, label: t.products.qnaTab },
  ];

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 font-semibold text-sm transition-all duration-150 border-b-2 -mb-px rounded-t-lg cursor-pointer ${isActive
                ? "border-brand-green text-brand-green bg-brand-green/5"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-8 bg-white min-h-[150px] text-sm sm:text-base leading-relaxed text-gray-700">
        {activeTab === "desc" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.products.tabDesc}</h3>
            <div
              className="rich-text text-justify text-gray-605 leading-relaxed text-sm sm:text-base"
              dangerouslySetInnerHTML={{ __html: getVal(product.desc, locale) }}
            />
          </div>
        )}

        {activeTab === "specs" && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.products.specsTitle}</h3>
            {renderSpecsTable(specsArray)}
          </div>
        )}

        {activeTab === "apps" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {product.type === 'food'
                ? t.products.qnaAppsFoodTitle
                : t.products.qnaAppsCosmeticTitle}
            </h3>
            {applicationsArray && applicationsArray.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applicationsArray.map((app, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-gray-55 p-4 border border-gray-100 text-sm sm:text-base">
                    <CheckCircle className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-gray-600 font-medium">{app}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-550 italic">{t.products.noApps}</p>
            )}
          </div>
        )}

        {activeTab === "pack" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t.products.packTitle}</h3>
            <div className="rounded-xl bg-brand-green/5 p-6 border border-brand-green/20 text-sm sm:text-base">
              <p className="text-gray-850 font-medium">{getVal(product.packaging, locale) || t.products.noPack}</p>
            </div>
          </div>
        )}

        {activeTab === "qna" && (
          <div className="space-y-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {t.products.qnaTitle}
            </h3>

            {/* List of Q&As */}
            <div className="space-y-6">
              {questionsList.length > 0 ? (
                questionsList.map((q) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-gray-55 border border-gray-150 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="rounded-lg bg-brand-green/10 p-2 text-brand-green shrink-0">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400">
                          {q.customer_name} {q.created_at && `• ${new Date(q.created_at).toLocaleDateString()}`}
                        </p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{q.question}</p>
                      </div>
                    </div>
                    {q.answer && (
                      <div className="pl-9 border-l-2 border-brand-green/30 mt-2 text-gray-600 text-sm sm:text-base text-justify">
                        <p className="text-xs font-bold text-brand-green uppercase tracking-wide mb-1">
                          {t.products.qnaReplied}
                        </p>
                        <p>{q.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">
                  {t.products.qnaEmpty}
                </p>
              )}
            </div>

            {/* Submit Form */}
            <div className="border-t border-gray-150 pt-8 max-w-2xl">
              <h4 className="text-base font-bold text-gray-950 mb-4">
                {t.products.qnaFormTitle}
              </h4>

              {success ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 flex items-start gap-3.5 text-emerald-800 animate-in fade-in duration-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">
                      {t.products.qnaSuccessTitle}
                    </h5>
                    <p className="text-sm text-emerald-700 mt-1">
                      {t.products.qnaSuccessDesc}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-750 font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block">
                        {t.products.qnaNameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder={t.products.qnaNamePlaceholder}
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden disabled:bg-gray-100"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block">
                        {t.products.qnaEmailLabel} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder={locale === 'vi' ? 'example@domain.com' : 'example@domain.com'}
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block">
                      {t.products.qnaPhoneLabel} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder={t.products.qnaPhonePlaceholder}
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden disabled:bg-gray-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wide block">
                      {t.products.qnaQuestionLabel} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      name="question"
                      value={form.question}
                      onChange={handleInputChange}
                      placeholder={t.products.qnaQuestionPlaceholder}
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden resize-none disabled:bg-gray-100"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 font-semibold text-white hover:bg-brand-green/90 transition-colors shadow-sm disabled:bg-emerald-800 disabled:opacity-75 cursor-pointer text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.products.qnaSending}
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        {t.products.qnaSend}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
