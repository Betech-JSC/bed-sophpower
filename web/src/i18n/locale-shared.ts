export const LOCALE_KEY = "ag-kit-locale";
export const LOCALES = ["en", "vi", "zh", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string | null | undefined): value is Locale {
    return value === "en" || value === "vi" || value === "zh" || value === "ja";
}
