import { Locale } from "@/i18n/locale-store";

export function getVal(field: any, locale: Locale): string;
export function getVal(field: any, locale: Locale, fallbackValue: string): string;
export function getVal<T>(field: any, locale: Locale, fallbackValue: T): T;
export function getVal(field: any, locale: Locale, fallbackValue: any = ""): any {
  if (!field) return fallbackValue;
  
  if (typeof field === "string") return field;
  
  if (Array.isArray(field)) {
    return field;
  }
  
  const val = field[locale] !== undefined ? field[locale] : (field["vi"] !== undefined ? field["vi"] : field["en"]);
  return val !== undefined ? val : fallbackValue;
}
