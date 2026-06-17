"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Loader2 } from "lucide-react";
import LanguageToggle from "./components/language-toggle";
import { useI18n } from "@/i18n/provider";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import { api, Product, Article } from "@/lib/api";
import { getVal } from "@/lib/i18n-utils";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { locale } = useI18n();
  const t = siteDictionaries[locale];

  const [settings, setSettings] = useState<any>(null);
  useEffect(() => {
    api.getSettings()
      .then(setSettings)
      .catch((err) => console.error("Failed to load settings in header:", err));
  }, []);

  const menuItems = [
    { name: t.header.about, path: "/about" },
    { name: t.header.foodIngredients, path: "/nguyen-lieu-thuc-pham" },
    { name: t.header.cosmeticIngredients, path: "/nguyen-lieu-my-pham" },
    { name: t.header.news, path: "/news" },
    { name: t.header.contact, path: "/contact" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery("");
      setSuggestions({ products: [], articles: [] });
    }
  };

  const [suggestions, setSuggestions] = useState<{ products: Product[]; articles: Article[] }>({ products: [], articles: [] });
  const [loading, setLoading] = useState(false);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);

  const popularKeywords = locale === "vi" 
    ? ["Beta-carotene", "Chất bảo quản", "Hương liệu", "Thực phẩm", "Mỹ phẩm"] 
    : ["Beta-carotene", "Preservatives", "Fragrance", "Food", "Cosmetic"];

  // Fetch initial suggested products on modal open
  useEffect(() => {
    if (searchOpen && initialProducts.length === 0) {
      api.getProducts().then((res) => {
        setInitialProducts(res.slice(0, 3));
      }).catch(err => console.error("Error fetching initial suggestions:", err));
    }
  }, [searchOpen, initialProducts.length]);

  // Debounced search suggestions effect
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) {
      setSuggestions({ products: [], articles: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      Promise.all([
        api.getProducts(undefined, trimmed).catch(() => []),
        api.getNews(trimmed).catch(() => [])
      ]).then(([prods, news]) => {
        setSuggestions({
          products: prods.slice(0, 4),
          articles: news.slice(0, 3)
        });
        setLoading(false);
      }).catch((err) => {
        console.error("Error fetching search suggestions:", err);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

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
                  src={settings?.site_logo ? api.getImageUrl(settings.site_logo) : "/images/f_logo.png"}
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
                className="inline-flex lg:hidden p-2 text-white hover:text-[#10e660] transition-colors cursor-pointer focus:outline-none"
                aria-label="Toggle Menu"
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                    }`}
                  />
                  <span
                    className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with smooth transitions */}
        <div 
          className={`lg:hidden border-t border-white/10 bg-brand-green px-4 py-3 space-y-2 shadow-inner transition-all duration-350 ease-out origin-top overflow-hidden ${
            mobileMenuOpen 
              ? 'opacity-100 max-h-96 translate-y-0 scale-y-100 visible' 
              : 'opacity-0 max-h-0 -translate-y-2 scale-y-95 invisible'
          }`}
        >
          {menuItems.map((item, idx) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                transitionDelay: mobileMenuOpen ? `${idx * 40}ms` : '0ms',
              }}
              className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300 transform ${
                mobileMenuOpen 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-3 opacity-0'
              } ${
                isActive(item.path)
                  ? "bg-white/10 text-[#10e660]"
                  : "text-white hover:bg-white/5 hover:text-[#10e660]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/60 p-4 pt-[15vh] backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col">
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
                autoComplete="off"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand-green px-5 py-2 text-sm font-semibold text-white hover:bg-brand-green/90 transition-colors cursor-pointer"
              >
                {t.header.searchButton}
              </button>
            </form>

            {/* Suggestions Container */}
            <div className="mt-4 max-h-[55vh] overflow-y-auto divide-y divide-gray-100 pr-1 scrollbar-thin select-none">
              {/* 1. Loading Indicator */}
              {loading && (
                <div className="flex items-center justify-center py-6 text-gray-400 gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-brand-green" />
                  <span className="text-xs font-semibold">{t.header.searchSearching}</span>
                </div>
              )}

              {/* 2. Typing suggestions (Active search) */}
              {!loading && searchQuery.trim().length >= 2 && (
                <>
                  {suggestions.products.length === 0 && suggestions.articles.length === 0 ? (
                    <div className="py-8 text-center space-y-2 text-gray-400">
                      <p className="text-sm font-bold text-gray-950">
                        {t.header.searchNoResults}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t.header.searchTryOther}
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Products Group */}
                      {suggestions.products.length > 0 && (
                        <div className="py-3 space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {t.header.searchProducts}
                          </p>
                          <div className="space-y-1.5">
                            {suggestions.products.map((prod) => (
                              <Link
                                key={prod.id}
                                href={prod.type === 'food' ? `/nguyen-lieu-thuc-pham/${prod.slug || prod.id}` : `/nguyen-lieu-my-pham/${prod.slug || prod.id}`}
                                onClick={toggleSearch}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-150 transition-all duration-150"
                              >
                                <img
                                  src={api.getImageUrl(prod.image)}
                                  alt={getVal(prod.name, locale)}
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-gray-900 truncate">
                                    {getVal(prod.name, locale)}
                                  </h4>
                                  <span className="inline-block rounded bg-brand-green/10 px-1.5 py-0.5 text-[9px] font-extrabold text-brand-green uppercase tracking-wider mt-0.5">
                                    {prod.type === 'food' ? t.header.searchFood : t.header.searchCosmetic}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Articles Group */}
                      {suggestions.articles.length > 0 && (
                        <div className="py-3 space-y-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {t.header.searchNews}
                          </p>
                          <div className="space-y-1.5">
                            {suggestions.articles.map((art) => (
                              <Link
                                key={art.id}
                                href={`/news/${art.slug || art.id}`}
                                onClick={toggleSearch}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-150 transition-all duration-150"
                              >
                                <img
                                  src={api.getImageUrl(art.image)}
                                  alt={getVal(art.title, locale)}
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-gray-900 truncate">
                                    {getVal(art.title, locale)}
                                  </h4>
                                  <span className="text-[10px] text-gray-500 block mt-0.5">
                                    {art.author}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* 3. Empty input suggestions (Initial state) */}
              {!loading && searchQuery.trim().length < 2 && (
                <>
                  {/* Popular Keywords */}
                  <div className="py-3 space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {t.header.searchPopularKeywords}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularKeywords.map((kw) => (
                        <button
                          key={kw}
                          type="button"
                          onClick={() => handleKeywordClick(kw)}
                          className="px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-650 hover:bg-emerald-50 hover:border-brand-green hover:text-emerald-800 transition-all font-bold cursor-pointer"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Products */}
                  {initialProducts.length > 0 && (
                    <div className="py-3 space-y-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {t.header.searchSuggestedProducts}
                      </p>
                      <div className="space-y-1.5">
                        {initialProducts.map((prod) => (
                          <Link
                            key={prod.id}
                            href={prod.type === 'food' ? `/nguyen-lieu-thuc-pham/${prod.slug || prod.id}` : `/nguyen-lieu-my-pham/${prod.slug || prod.id}`}
                            onClick={toggleSearch}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-150 transition-all duration-150"
                          >
                            <img
                              src={api.getImageUrl(prod.image)}
                              alt={getVal(prod.name, locale)}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-gray-900 truncate">
                                {getVal(prod.name, locale)}
                              </h4>
                              <span className="inline-block rounded bg-brand-green/10 px-1.5 py-0.5 text-[9px] font-extrabold text-brand-green uppercase tracking-wider mt-0.5">
                                {prod.type === 'food' ? t.header.searchFood : t.header.searchCosmetic}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}