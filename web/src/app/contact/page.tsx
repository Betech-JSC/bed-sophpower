"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useI18n } from "@/i18n/provider";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  const { locale } = useI18n();
  const t = siteDictionaries[locale];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [settings, setSettings] = useState<any>(null);
  const [bannerImage, setBannerImage] = useState("/images/banner-contact.jpg");

  const addressToSearch = locale === "vi"
    ? (settings?.contact_address_vi || "Số 37, Đường 19E, Phường An Lạc, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam")
    : (settings?.contact_address_en || "No. 37, 19E Street, An Lac Ward, Binh Tan District, Ho Chi Minh City, Vietnam");

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(addressToSearch)}&output=embed&z=16`;

  useEffect(() => {
    api.getSettings()
      .then(setSettings)
      .catch((err) => console.error("Failed to load settings on contact page:", err));

    api.getPageBanner("contact")
      .then((banner) => setBannerImage(banner?.image ? api.getImageUrl(banner.image) : "/images/banner-contact.jpg"))
      .catch((err) => console.error("Failed to load contact page banner:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setErrorMessage("");

    try {
      await api.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      // Clear success notification after 7 seconds
      setTimeout(() => setSubmitted(false), 7000);
    } catch (err: any) {
      console.error("Contact submit error:", err);
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrorMessage(err.message || t.contact.unknownError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            {t.contact.title}
          </h1>
        </div>
      </section>

      {/* Main Form & Details */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row rounded-2xl bg-white overflow-hidden shadow-xl border border-gray-150">
            {/* Info Cards (Left) */}
            <ScrollReveal direction="up" duration={600} className="w-full lg:w-[45%] flex">
              <div className="w-full bg-brand-green p-8 sm:p-12 text-white flex flex-col justify-between space-y-10 h-full">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                      {t.contact.contactUs}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">SOPHPOWER VIETNAM</h2>
                  </div>
                  <div className="h-0.5 w-16 bg-brand-green" />
                  <p className="text-white/80 text-sm leading-relaxed text-justify">
                    {t.contact.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email card */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white/10 p-3 text-brand-green-light shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-wider text-white/60">{t.contact.email}</h3>
                      <a
                        href={`mailto:${settings?.contact_email || "info@sophchem.com"}`}
                        className="text-sm font-semibold hover:text-brand-green-light transition-colors"
                      >
                        {settings?.contact_email || "info@sophchem.com"}
                      </a>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white/10 p-3 text-brand-green-light shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-wider text-white/60">{t.contact.hotlineZalo}</h3>
                      <span className="text-sm font-semibold">{"0969 700 520"}</span>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-white/10 p-3 text-brand-green-light shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold tracking-wider text-white/60">{t.contact.officeAddress}</h3>
                      <span className="text-sm font-semibold leading-relaxed block">
                        {locale === "vi"
                          ? (settings?.contact_address_vi || "Số 37, Đường 19E, Phường An Lạc, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam")
                          : (settings?.contact_address_en || "No. 37, 19E Street, An Lac Ward, Binh Tan District, Ho Chi Minh City, Vietnam")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form (Right) */}
            <ScrollReveal direction="up" delay={150} duration={600} className="flex-1">
              <div className="p-8 sm:p-12 space-y-8 h-full">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {t.contact.sendRequest}
                </h3>
                <p className="text-sm text-gray-500">
                  {t.contact.sendRequestSub}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 flex items-start gap-4 text-emerald-800 animate-in fade-in duration-300">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold">{t.contact.successTitle}</h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      {t.contact.successDesc}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-750 font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 tracking-wide block">
                      {t.contact.nameLabel.toUpperCase()} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.contact.namePlaceholder}
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden disabled:bg-gray-100"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 font-semibold">{errors.name[0]}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 tracking-wide block">
                        {t.contact.emailLabel.toUpperCase()} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.contact.emailPlaceholder}
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden disabled:bg-gray-100"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 font-semibold">{errors.email[0]}</p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 tracking-wide block">
                        {t.contact.phoneLabel.toUpperCase()} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t.contact.phonePlaceholder}
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden disabled:bg-gray-100"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-650 font-semibold">{errors.phone[0]}</p>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 tracking-wide block">
                      {t.contact.messageLabel.toUpperCase()} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.contact.messagePlaceholder}
                      disabled={loading}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden resize-none disabled:bg-gray-100"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 font-semibold">{errors.message[0]}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green/90 transition-colors shadow-md disabled:bg-emerald-800 disabled:opacity-75 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t.contact.sendingBtn}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t.contact.sendBtn.toUpperCase()}
                      </>
                    )}
                  </button>
                </form>
              )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-12 bg-gray-55 border-t border-gray-150">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              title="Sophpower Vietnam Office Location"
              src={mapUrl}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
