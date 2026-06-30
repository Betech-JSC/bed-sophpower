import { cookies, headers } from "next/headers";
import { isLocale, type Locale } from "@/i18n/locale-shared";

export async function getLocaleServer(): Promise<Locale> {
  try {
    // 1. Check custom header from middleware rewrites (for URL routing & bots)
    const reqHeaders = await headers();
    const headerLocale = reqHeaders.get("x-locale");
    if (isLocale(headerLocale)) {
      return headerLocale;
    }

    // 2. Fall back to cookie store (for client persistent selections)
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("ag-kit-locale")?.value;
    return isLocale(cookieLocale) ? cookieLocale : "vi";
  } catch (e) {
    return "vi";
  }
}
