"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Facebook, Linkedin, Youtube, Globe } from "lucide-react";

export default function Footer() {
  const categories = {
    ingredients: {
      title: "NGUYÊN LIỆU",
      links: [
        { name: "Nguyên liệu Thực phẩm", path: "/list_2" },
        { name: "Nguyên liệu Mỹ phẩm", path: "/list_3" },
      ],
    },
    company: {
      title: "SOPHPOWER",
      links: [
        { name: "Về chúng tôi", path: "/about" },
        { name: "Tin tức & Sự kiện", path: "/news" },
        { name: "Cơ hội nghề nghiệp", path: "/recruitment" },
      ],
    },
  };

  return (
    <footer className="mt-auto bg-[#072415] bg-dot-matrix text-white border-t border-emerald-950/20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Contact Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#106d38] to-[#0a4f27] border border-emerald-500/20 px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 shadow-xl mb-12 w-full">
          {/* Subtle background pattern overlay inside the card */}
          <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12">
            <div className="text-center lg:text-left space-y-2 max-w-2xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-tight">
                Hãy liên hệ với chúng tôi!
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed">
                Chúng tôi sẽ mang đến giải pháp phù hợp nhất cho bạn!
              </p>
            </div>

            {/* Email Contact Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Cảm ơn bạn! Chúng tôi đã nhận được email và sẽ liên hệ tư vấn trong thời gian sớm nhất.");
                (e.target as HTMLFormElement).reset();
              }}
              className="w-full sm:w-auto min-w-[280px] sm:min-w-[360px]"
            >
              <div className="flex items-center bg-white/10 hover:bg-white/15 border border-white/20 focus-within:border-white focus-within:ring-2 focus-within:ring-white/20 rounded-full p-1 pl-4 transition-all duration-300 shadow-inner">
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  className="bg-transparent border-0 outline-none text-xs sm:text-sm text-white placeholder-emerald-200/50 flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-emerald-50 text-[#106d38] rounded-full p-2.5 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer shadow-md"
                  aria-label="Gửi email"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-12 border-b border-white/10">
          
          {/* Left: Brand Logo */}
          <div className="shrink-0">
            <Link href="/" className="block">
              <img
                src="/images/f_logo.png"
                alt="Sophpower Logo"
                className="h-14 w-auto object-contain hover:scale-102 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Center: Multi-column link directories */}
          <div className="grid grid-cols-2 gap-8 md:gap-16 w-full lg:w-auto lg:ml-auto lg:pl-16">
            {/* Column 1 */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-brand-green-light uppercase">
                {categories.ingredients.title}
              </h3>
              <ul className="space-y-2.5">
                {categories.ingredients.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest text-brand-green-light uppercase">
                {categories.company.title}
              </h3>
              <ul className="space-y-2.5">
                {categories.company.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-gray-300 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Social icons & Capsule Call-to-action buttons */}
          <div className="flex flex-col items-start lg:items-end gap-6 w-full lg:w-auto">
            {/* Social Icons */}
            <div className="flex gap-5">
              <a
                href="#"
                className="text-brand-green-light hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-brand-green-light hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-brand-green-light hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 p-1"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-brand-green-light hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 p-1"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>

            {/* Capsule Pill Buttons */}
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <a
                href="https://zalo.me/0969700520"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full px-5 py-2.5 font-bold tracking-wider text-xs uppercase shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>LIÊN HỆ ZALO</span>
                <span className="bg-[#106d38] text-white p-1 rounded-full shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="tel:0969700520"
                className="inline-flex items-center justify-between gap-4 bg-white hover:bg-gray-100 text-gray-900 rounded-full px-5 py-2.5 font-bold tracking-wider text-xs uppercase shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>HOTLINE: 0969 700 520</span>
                <span className="bg-[#106d38] text-white p-1 rounded-full shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & details info */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-12 text-xs text-gray-400 leading-relaxed">
          <div className="space-y-3 max-w-2xl">
            <p className="font-semibold text-gray-300">
              © {new Date().getFullYear()} Pioneer Herb Industrial Co., Ltd. / Sophpower Vietnam. Bảo lưu mọi quyền.
            </p>
            <p className="text-justify text-gray-400">
              Sophpower là đối tác cung ứng nguyên liệu công nghiệp & hóa chất đa quốc gia uy tín. Chúng tôi cam kết cung cấp nguồn nguyên liệu chất lượng cao tuân thủ các quy trình kiểm định nghiêm ngặt theo tiêu chuẩn quốc tế như ISO, HACCP, HALAL, Kosher và FDA.
            </p>
          </div>
          
          <div className="space-y-1.5 md:text-right text-gray-400 shrink-0">
            <p className="font-medium text-gray-300">Email: vnsp4@sophpower.com</p>
            <p>Địa chỉ: No. 37, 19E Street, An Lac Ward, Binh Tan District,</p>
            <p>Ho Chi Minh City, Vietnam</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
