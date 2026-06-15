"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import LanguageToggle from "./components/language-toggle";
import { useI18n } from "@/i18n/provider";
import { siteDictionaries } from "@/i18n/site-dictionaries";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { locale } = useI18n();
  const t = siteDictionaries[locale];

  const menuItems = [
    { name: t.header.about, path: "/about" },
    { name: t.header.foodIngredients, path: "/nguyen-lieu-thuc-pham" },
    { name: t.header.cosmeticIngredients, path: "/nguyen-lieu-my-pham" },
    { name: t.header.news, path: "/news" },
    { name: t.header.contact, path: "/page_5" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-green shadow-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="hover:opacity-90 transition-opacity flex items-center">
                <img
                  src="/images/f_logo.png"
                  alt="Sophpower Logo"
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative py-2 text-sm font-bold tracking-wider transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-[#10e660] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#10e660]"
                      : "text-white hover:text-[#10e660]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <LanguageToggle />

              {/* Search Toggle */}
              <button
                onClick={toggleSearch}
                className="p-2 text-white hover:text-[#10e660] transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="inline-flex lg:hidden p-2 text-white hover:text-[#10e660] transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-brand-green px-4 py-3 space-y-2 shadow-inner">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide transition-colors duration-150 ${
                  isActive(item.path)
                    ? "bg-white/10 text-[#10e660]"
                    : "text-white hover:bg-white/5 hover:text-[#10e660]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/60 p-4 pt-[15vh] backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={toggleSearch}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.header.searchTitle}</h3>
            <form action="/search" method="get" className="flex gap-2">
              <input
                type="text"
                name="keyword"
                placeholder={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-hidden"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors cursor-pointer"
              >
                {t.header.searchButton}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}