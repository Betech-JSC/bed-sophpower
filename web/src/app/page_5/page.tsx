"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && (formData.email || formData.phone)) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
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
        style={{ backgroundImage: "url('/images/banner-contact.png')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase">
            CONTACT
          </h1>
        </div>
      </section>

      {/* Main Form & Details */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row rounded-2xl bg-white overflow-hidden shadow-xl border border-gray-150">
            {/* Info Cards (Left) */}
            <div className="w-full lg:w-[45%] bg-brand-green p-8 sm:p-12 text-white flex flex-col justify-between space-y-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/60">
                    LIÊN HỆ CHÚNG TÔI
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">SOPHPOWER VIETNAM</h2>
                </div>
                <div className="h-0.5 w-16 bg-brand-green" />
                <p className="text-white/80 text-sm leading-relaxed text-justify">
                  Hãy liên hệ với chúng tôi để nhận tư vấn chuyên sâu về nguyên liệu thực phẩm, nguyên liệu mỹ phẩm, các chứng nhận COA/MSDS cũng như báo giá cung ứng số lượng lớn tốt nhất.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email card */}
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-brand-green-light shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-white/60">EMAIL</h3>
                    <a
                      href="mailto:vnsp4@sophpower.com"
                      className="text-sm font-semibold hover:text-brand-green-light transition-colors"
                    >
                      vnsp4@sophpower.com
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-brand-green-light shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-white/60">HOTLINE / ZALO</h3>
                    <span className="text-sm font-semibold">0969 700 520</span>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white/10 p-3 text-brand-green-light shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-white/60">ĐỊA CHỈ VĂN PHÒNG</h3>
                    <span className="text-sm font-semibold leading-relaxed block">
                      No. 37, 19E Street, An Lac Ward, Binh Tan District, Ho Chi Minh City, Vietnam
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form (Right) */}
            <div className="flex-1 p-8 sm:p-12 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  GỬI YÊU CẦU LIÊN HỆ
                </h3>
                <p className="text-sm text-gray-500">
                  Vui lòng để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ lại trong vòng 24h.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 flex items-start gap-4 text-emerald-800 animate-in fade-in duration-300">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold">Gửi yêu cầu thành công!</h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 tracking-wide block">
                      HỌ VÀ TÊN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ tên của bạn..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 tracking-wide block">
                        ĐỊA CHỈ EMAIL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700 tracking-wide block">
                        SỐ ĐIỆN THOẠI
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Số điện thoại / Zalo..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 tracking-wide block">
                      NỘI DUNG YÊU CẦU
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Chi tiết sản phẩm cần báo giá hoặc nội dung cần tư vấn..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green/90 transition-colors shadow-md cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    GỬI YÊU CẦU BÁO GIÁ
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
