import { type Locale } from "@/i18n/locale-shared";

/**
 * Prepends the locale prefix to a relative URL path if it is not the default locale (vi).
 * Preserves external links, anchor/hash links, and API routes.
 */
export function localizeLink(href: string, locale: Locale): string {
  if (!href) return "";

  // Do not format external links, anchors, mailto/tel protocols, or api calls
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("/api/") ||
    href.startsWith("/_next/") ||
    href.startsWith("/images/") ||
    href.startsWith("/favicon.ico")
  ) {
    return href;
  }

  // Vietnamese is the default locale at the root path "/"
  if (locale === "vi") {
    return href;
  }

  // Prepend locale prefix
  const cleanHref = href.startsWith("/") ? href : `/${href}`;
  
  // Special case for root
  if (cleanHref === "/") {
    return `/${locale}`;
  }

  // Prevent double prefixing if it already starts with the locale prefix
  if (cleanHref.startsWith(`/${locale}/`) || cleanHref === `/${locale}`) {
    return cleanHref;
  }

  return `/${locale}${cleanHref}`;
}
