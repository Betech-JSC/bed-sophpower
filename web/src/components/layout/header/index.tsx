"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import LanguageToggle from "./components/language-toggle";
import { useI18n } from "@/i18n/provider";
import { siteDictionaries } from "@/i18n/site-dictionaries";
import { api, Product, Article, ProductCategory } from "@/lib/api";
import { getVal } from "@/lib/i18n-utils";

interface DynamicCategoryItem {
  id: number;
  name: string;
  path: string;
  slug: string;
  type: 'food' | 'cosmetic';
  children?: ProductCategory[];
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMobileSubmenu, setExpandedMobileSubmenu] = useState<string | number | null>(null);
  const [expandedMobileChildSubmenu, setExpandedMobileChildSubmenu] = useState<string | number | null>(null);
  const { locale } = useI18n();
  const t = siteDictionaries[locale];

  const [settings, setSettings] = useState<any>(null);
  const [rootCategories, setRootCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    api.getSettings()
      .then(setSettings)
      .catch((err) => console.error("Failed to load settings in header:", err));

    api.getProductCategories()
      .then((data) => {
        setRootCategories(data);
      })
      .catch((err) => console.error("Failed to load product categories in header:", err));
  }, []);

  const foodBasePath = locale === "vi" ? "/nguyen-lieu-thuc-pham" : "/food-ingredients";
  const cosmeticBasePath = locale === "vi" ? "/nguyen-lieu-my-pham" : "/cosmetic-ingredients";

  const getBasePathForType = (type: 'food' | 'cosmetic') => {
    return type === 'food' ? foodBasePath : cosmeticBasePath;
  };

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
    const cleanPath = path.split("?")[0];
    const normalizedPathname = pathname
      .replace("/food-ingredients", "/nguyen-lieu-thuc-pham")
      .replace("/cosmetic-ingredients", "/nguyen-lieu-my-pham");
    const normalizedPath = cleanPath
      .replace("/food-ingredients", "/nguyen-lieu-thuc-pham")
      .replace("/cosmetic-ingredients", "/nguyen-lieu-my-pham");
    return normalizedPathname.startsWith(normalizedPath);
  };

  // Fallback static root categories if API has not finished loading
  const foodCategoryFromApi = rootCategories.find(c => c.type === 'food' || c.slug === 'nguyen-lieu-thuc-pham');
  const cosmeticCategoryFromApi = rootCategories.find(c => c.type === 'cosmetic' || c.slug === 'nguyen-lieu-my-pham');

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-green shadow-md">
        <div className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-6">
          <div className="flex h-20 items-center justify-between gap-4">
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
            <nav className="hidden lg:flex items-center gap-3 xl:gap-6 shrink-0">
              {/* About Link */}
              <Link
                href="/about"
                className={`relative py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                  isActive("/about")
                    ? "text-[#10e660] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#10e660]"
                    : "text-white hover:text-[#10e660]"
                }`}
              >
                <span className="whitespace-nowrap">{t.header.about}</span>
              </Link>

              {/* Dynamic Root Product Categories from Backend */}
              {rootCategories.length > 0 ? (
                rootCategories.map((rootCat) => {
                  const rootPath = rootCat.slug ? `/${rootCat.slug}` : getBasePathForType(rootCat.type);
                  const rootName = getVal(rootCat.name, locale);
                  const itemIsActive = isActive(rootPath);
                  const hasChildren = rootCat.children && rootCat.children.length > 0;

                  return (
                    <div key={rootCat.id} className="relative group py-6">
                      <Link
                        href={rootPath}
                        className={`inline-flex items-center gap-1 text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                          itemIsActive
                            ? "text-[#10e660]"
                            : "text-white group-hover:text-[#10e660]"
                        }`}
                      >
                        <span className="whitespace-nowrap">{rootName}</span>
                        {hasChildren && (
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 text-white/80 group-hover:text-[#10e660] shrink-0" />
                        )}
                      </Link>
                      {itemIsActive && (
                        <span className="absolute bottom-4 left-0 h-0.5 w-full bg-[#10e660]" />
                      )}

                      {/* Dropdown Menu (Level 2) */}
                      {hasChildren && (
                        <div className="absolute top-full left-0 w-64 pt-1 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                          <div className="bg-white rounded-xl shadow-xl border border-gray-150 py-2 text-gray-800 text-sm font-semibold overflow-visible">
                            {rootCat.children!.map((childCat) => {
                              const childName = getVal(childCat.name, locale);
                              const hasSubChildren = childCat.children && childCat.children.length > 0;
                              const childPath = `${rootPath}?category=${childCat.slug}`;

                              if (hasSubChildren) {
                                return (
                                  <div key={childCat.id} className="relative group/sub">
                                    <Link
                                      href={childPath}
                                      className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green transition-colors border-b border-gray-100 last:border-b-0"
                                    >
                                      <span>{childName}</span>
                                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover/sub:text-brand-green" />
                                    </Link>

                                    {/* Sub-dropdown Menu (Level 3 Flyout) */}
                                    <div className="absolute left-full top-0 ml-1 w-56 pt-0 opacity-0 invisible translate-x-2 group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0 transition-all duration-200 ease-out z-50 pointer-events-none group-hover/sub:pointer-events-auto">
                                      <div className="bg-white rounded-xl shadow-xl border border-gray-150 py-2 text-gray-800 text-sm font-semibold overflow-hidden">
                                        {childCat.children!.map((subChild) => (
                                          <Link
                                            key={subChild.id}
                                            href={`${rootPath}?category=${subChild.slug}`}
                                            className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green transition-colors border-b border-gray-100 last:border-b-0"
                                          >
                                            {getVal(subChild.name, locale)}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <Link
                                  key={childCat.id}
                                  href={childPath}
                                  className="block px-4 py-2.5 hover:bg-gray-50 hover:text-brand-green transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  {childName}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                /* Fallback static navigation while loading */
                <>
                  <Link
                    href={foodBasePath}
                    className={`relative py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                      isActive(foodBasePath) ? "text-[#10e660]" : "text-white hover:text-[#10e660]"
                    }`}
                  >
                    <span className="whitespace-nowrap">{t.header.foodIngredients}</span>
                  </Link>
                  <Link
                    href={cosmeticBasePath}
                    className={`relative py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                      isActive(cosmeticBasePath) ? "text-[#10e660]" : "text-white hover:text-[#10e660]"
                    }`}
                  >
                    <span className="whitespace-nowrap">{t.header.cosmeticIngredients}</span>
                  </Link>
                </>
              )}

              {/* News Link */}
              <Link
                href="/news"
                className={`relative py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                  isActive("/news")
                    ? "text-[#10e660] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#10e660]"
                    : "text-white hover:text-[#10e660]"
                }`}
              >
                <span className="whitespace-nowrap">{t.header.news}</span>
              </Link>

              {/* Contact Link */}
              <Link
                href="/contact"
                className={`relative py-2 text-xs xl:text-sm font-bold tracking-wider uppercase transition-colors duration-200 whitespace-nowrap ${
                  isActive("/contact")
                    ? "text-[#10e660] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#10e660]"
                    : "text-white hover:text-[#10e660]"
                }`}
              >
                <span className="whitespace-nowrap">{t.header.contact}</span>
              </Link>
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

        {/* Mobile Navigation Drawer */}
        <div 
          className={`lg:hidden border-t border-white/10 bg-brand-green px-4 py-3 space-y-2 shadow-inner transition-all duration-350 ease-out origin-top overflow-hidden ${
            mobileMenuOpen 
              ? 'opacity-100 max-h-[700px] translate-y-0 scale-y-100 visible overflow-y-auto' 
              : 'opacity-0 max-h-0 -translate-y-2 scale-y-95 invisible'
          }`}
        >
          {/* About */}
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300 ${
              isActive("/about") ? "bg-white/10 text-[#10e660]" : "text-white hover:bg-white/5 hover:text-[#10e660]"
            }`}
          >
            {t.header.about}
          </Link>

          {/* Dynamic Categories Mobile */}
          {rootCategories.map((rootCat) => {
            const basePath = getBasePathForType(rootCat.type);
            const rootName = getVal(rootCat.name, locale);
            const itemIsActive = isActive(basePath);
            const isExpanded = expandedMobileSubmenu === rootCat.id;
            const hasChildren = rootCat.children && rootCat.children.length > 0;

            if (hasChildren) {
              return (
                <div key={rootCat.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={basePath}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex-1 px-3 py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300 uppercase ${
                        itemIsActive ? "bg-white/10 text-[#10e660]" : "text-white hover:bg-white/5 hover:text-[#10e660]"
                      }`}
                    >
                      {rootName}
                    </Link>
                    <button
                      onClick={() => setExpandedMobileSubmenu(isExpanded ? null : rootCat.id)}
                      className="p-3 text-white hover:text-[#10e660] transition-colors cursor-pointer"
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {/* Level 2 Children */}
                  <div className={`pl-4 border-l-2 border-white/20 ml-3 space-y-1 overflow-hidden transition-all duration-300 ${isExpanded || itemIsActive ? 'max-h-96 py-1' : 'max-h-0 py-0'}`}>
                    {rootCat.children!.map((childCat) => {
                      const childName = getVal(childCat.name, locale);
                      const childPath = `${basePath}?category=${childCat.slug}`;
                      const hasSubChildren = childCat.children && childCat.children.length > 0;
                      const isChildExpanded = expandedMobileChildSubmenu === childCat.id;

                      if (hasSubChildren) {
                        return (
                          <div key={childCat.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <Link
                                href={childPath}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-[#10e660] hover:bg-white/5 transition-colors"
                              >
                                • {childName}
                              </Link>
                              <button
                                onClick={() => setExpandedMobileChildSubmenu(isChildExpanded ? null : childCat.id)}
                                className="p-2 text-white/80 hover:text-[#10e660] transition-colors"
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isChildExpanded ? "rotate-180" : ""}`} />
                              </button>
                            </div>

                            {/* Level 3 Subchildren */}
                            <div className={`pl-4 border-l border-white/10 ml-4 space-y-1 overflow-hidden transition-all duration-300 ${isChildExpanded ? 'max-h-48 py-1' : 'max-h-0 py-0'}`}>
                              {childCat.children!.map((subChild) => (
                                <Link
                                  key={subChild.id}
                                  href={`${basePath}?category=${subChild.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block px-3 py-1.5 rounded-md text-xs font-normal text-white/80 hover:text-[#10e660] transition-colors"
                                >
                                  - {getVal(subChild.name, locale)}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={childCat.id}
                          href={childPath}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-[#10e660] hover:bg-white/5 transition-colors"
                        >
                          • {childName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={rootCat.id}
                href={basePath}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300 uppercase ${
                  itemIsActive ? "bg-white/10 text-[#10e660]" : "text-white hover:bg-white/5 hover:text-[#10e660]"
                }`}
              >
                {rootName}
              </Link>
            );
          })}

          {/* News */}
          <Link
            href="/news"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300 ${
              isActive("/news") ? "bg-white/10 text-[#10e660]" : "text-white hover:bg-white/5 hover:text-[#10e660]"
            }`}
          >
            {t.header.news}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-3 rounded-md text-base font-bold tracking-wide transition-all duration-300 ${
              isActive("/contact") ? "bg-white/10 text-[#10e660]" : "text-white hover:bg-white/5 hover:text-[#10e660]"
            }`}
          >
            {t.header.contact}
          </Link>
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
                                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                                    {art.date}
                                  </p>
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

              {/* 3. Pre-search default state (Popular keywords & Recommended products) */}
              {!loading && searchQuery.trim().length < 2 && (
                <div className="py-3 space-y-5">
                  {/* Popular Keywords */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {t.header.searchPopularKeywords}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {popularKeywords.map((kw) => (
                        <button
                          key={kw}
                          type="button"
                          onClick={() => handleKeywordClick(kw)}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-brand-green/10 text-gray-600 hover:text-brand-green text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Initial Product Suggestions */}
                  {initialProducts.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-gray-100">
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}