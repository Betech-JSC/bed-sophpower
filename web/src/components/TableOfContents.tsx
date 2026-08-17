"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";

export interface HeadingItem {
  text: string;
  id: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
  title?: string;
  hideLabel?: string;
  showLabel?: string;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

export default function TableOfContents({
  headings,
  title = "Mục Lục",
  hideLabel = "[Ẩn]",
  showLabel = "[Hiện]"
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll for header height if necessary (usually 80-100px is good, or simply scrollIntoView)
      const yOffset = -90; // Adjust if header is sticky
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Update URL hash without jumping
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 mb-8 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-150/80 pb-3">
        <div className="flex items-center gap-2 font-bold text-gray-800 text-base">
          <List className="h-4.5 w-4.5 text-brand-green" />
          <span>{title}</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-brand-green hover:text-brand-green-hover transition-colors select-none focus:outline-none flex items-center gap-1 cursor-pointer"
        >
          {isOpen ? (
            <>
              <span>{hideLabel}</span>
              <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>{showLabel}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      {/* Body List */}
      {isOpen && (
        <ul className="mt-4 space-y-2.5 list-none pl-0">
          {headings.map((heading, index) => {
            const isH3 = heading.level === 3;
            return (
              <li
                key={index}
                className={`${
                  isH3 ? "pl-6 text-sm text-gray-500" : "text-gray-700 font-medium"
                } relative flex items-start gap-2`}
              >
                {/* Custom dot indicator */}
                <span 
                  className={`inline-block rounded-full bg-brand-green/80 shrink-0 ${
                    isH3 ? "w-1 h-1 mt-2 bg-brand-green/40" : "w-1.5 h-1.5 mt-2"
                  }`} 
                />
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleScroll(e, heading.id)}
                  className="hover:text-brand-green hover:underline decoration-brand-green/30 transition-colors"
                >
                  {decodeHtmlEntities(heading.text)}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
