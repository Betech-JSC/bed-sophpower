import { cookies } from "next/headers";
import { isLocale, type Locale } from "@/i18n/locale-store";

export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("ag-kit-locale")?.value;
    return isLocale(locale) ? locale : "vi";
  } catch (e) {
    return "vi";
  }
}
