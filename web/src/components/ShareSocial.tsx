"use client";

import React, { useState, useEffect } from "react";
import { Link2, Check } from "lucide-react";

interface ShareSocialProps {
  title: string;
}

export default function ShareSocial({ title }: ShareSocialProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    zalo: `https://sp.zalo.me/share?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-gray-100 my-8">
      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Chia sẻ bài viết:</span>
      <div className="flex items-center gap-2">
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Chia sẻ lên Facebook"
          className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
          </svg>
        </a>

        {/* Zalo */}
        <a
          href={shareLinks.zalo}
          target="_blank"
          rel="noopener noreferrer"
          title="Chia sẻ lên Zalo"
          className="w-9 h-9 rounded-full bg-[#0068ff] hover:bg-[#0056d6] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm font-black text-[11px] tracking-tighter uppercase select-none italic"
        >
          Zalo
        </a>

        {/* Twitter / X */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title="Chia sẻ lên Twitter/X"
          className="w-9 h-9 rounded-full bg-black hover:bg-gray-900 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          title="Sao chép liên kết"
          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 shadow-sm relative"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Link2 className="w-4.5 h-4.5" />
          )}
          
          {/* Copied Tooltip */}
          {copied && (
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap">
              Đã sao chép!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
