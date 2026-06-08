"use client";

import React, { useEffect, useState } from "react";
import { Phone, Mail, ArrowUp } from "lucide-react";

export default function Toolbar() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Phone/Zalo Link */}
      <a
        href="tel:0969700520"
        title="Tel/Zalo: 0969 700 520"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition-transform hover:scale-110"
      >
        <Phone className="h-5 w-5" />
        <span className="absolute right-14 scale-0 rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md transition-all group-hover:scale-100 whitespace-nowrap">
          Zalo: 0969 700 520
        </span>
      </a>

      {/* Email Link */}
      <a
        href="mailto:vnsp4@sophpower.com"
        title="Email: vnsp4@sophpower.com"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-white shadow-lg transition-transform hover:scale-110"
      >
        <Mail className="h-5 w-5" />
        <span className="absolute right-14 scale-0 rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md transition-all group-hover:scale-100 whitespace-nowrap">
          vnsp4@sophpower.com
        </span>
      </a>

      {/* Scroll to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          title="Lên đầu trang"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-700 shadow-md transition-all hover:bg-gray-200 hover:scale-110 cursor-pointer"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
