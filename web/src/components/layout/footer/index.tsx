"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const quickLinks = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "FOOD INGREDIENTS", path: "/list_2" },
    { name: "COSMETIC INGREDIENTS", path: "/list_3" },
    { name: "NEWS CENTER", path: "/news" },
    { name: "CONTACT", path: "/page_5" },
  ];

  return (
    <footer className="mt-auto bg-brand-green text-white border-t border-brand-green-hover">
      {/* Contact Banner */}
      <div className="bg-brand-green-hover py-10 text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <Mail className="hidden sm:block h-12 w-12 text-white/80" />
              <div>
                <p className="text-xl font-bold">Hãy liên hệ với chúng tôi!</p>
                <p className="text-sm text-white/85">Chúng tôi sẽ mang đến giải pháp phù hợp nhất cho bạn!</p>
              </div>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center gap-2">
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-brand-green px-4 py-3 text-white placeholder-white/60 border border-white/10 focus:outline-hidden focus:ring-1 focus:ring-white/80"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-brand-green-light text-brand-blue px-6 py-3 font-bold hover:bg-brand-green-light/90 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Send className="h-4 w-4" />
                {submitted ? "ĐÃ GỬI" : "GỬI"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-3 py-12 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img
              src="/images/f_logo.png"
              alt="Sophpower Pioneer Herb Footer Logo"
              className="h-14 w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm text-white/85 leading-relaxed">
              Sophpower là một công ty thương mại đa quốc gia có trụ sở tại Việt Nam, kết nối nhà sản xuất với nguồn nguyên liệu chất lượng cao phục vụ ngành thực phẩm và mỹ phẩm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider mb-6">TRUY CẬP NHANH</h3>
            <ul className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-white/80 hover:text-brand-green-light transition-colors font-medium"
                  >
                    &gt; {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider mb-6">LIÊN HỆ CHÚNG TÔI</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-green-light shrink-0 mt-0.5" />
                <a
                  href="mailto:vnsp4@sophpower.com"
                  className="text-sm text-white/80 hover:text-brand-green-light transition-colors"
                >
                  Email: vnsp4@sophpower.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-green-light shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">
                  Tel / Zalo: 0969 700 520
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-green-light shrink-0 mt-0.5" />
                <span className="text-sm text-white/80 leading-relaxed">
                  Địa chỉ: No. 37, 19E Street, An Lac Ward, Binh Tan Dist, Ho Chi Minh City, Vietnam
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            COPYRIGHT © {new Date().getFullYear()} Pioneer Herb Industrial Co., Ltd. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
