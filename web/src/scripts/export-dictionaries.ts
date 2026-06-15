import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { siteDictionaries } from "../i18n/site-dictionaries";
import { dictionaries } from "../i18n/dictionaries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const locales = ["vi", "en", "zh", "ja"] as const;
type Locale = typeof locales[number];

interface TranslationItem {
  group: string;
  key: string;
  text: Record<string, string>;
}

const result: TranslationItem[] = [];
const processedKeys = new Set<string>();

// 1. Process siteDictionaries
const siteVi = siteDictionaries.vi;
for (const groupKey of Object.keys(siteVi)) {
  const group = siteVi[groupKey as keyof typeof siteVi];
  if (typeof group === "object" && group !== null) {
    for (const key of Object.keys(group)) {
      const uniquePath = `site:${groupKey}.${key}`;
      if (processedKeys.has(uniquePath)) continue;
      processedKeys.add(uniquePath);

      const text: Record<string, string> = {};
      for (const locale of locales) {
        const dict = siteDictionaries[locale as Locale];
        const groupObj = dict ? dict[groupKey as keyof typeof dict] : null;
        const val = groupObj ? (groupObj as any)[key] : null;
        
        // Try getting locale val, fallback to english, fallback to empty string
        text[locale] = val || (siteDictionaries.en[groupKey as keyof typeof siteDictionaries.en] as any)[key] || "";
      }
      result.push({
        group: groupKey,
        key: key,
        text,
      });
    }
  }
}

// 2. Process dictionaries
const dictVi = dictionaries.vi;
for (const groupKey of Object.keys(dictVi)) {
  const group = dictVi[groupKey as keyof typeof dictVi];
  if (typeof group === "object" && group !== null) {
    for (const key of Object.keys(group)) {
      const groupNamespace = `docs_${groupKey}`;
      const uniquePath = `docs:${groupNamespace}.${key}`;
      if (processedKeys.has(uniquePath)) continue;
      processedKeys.add(uniquePath);

      const text: Record<string, string> = {};
      for (const locale of locales) {
        const dict = dictionaries[locale as Locale];
        const groupObj = dict ? dict[groupKey as keyof typeof dict] : null;
        const val = groupObj ? (groupObj as any)[key] : null;
        
        text[locale] = val || (dictionaries.en[groupKey as keyof typeof dictionaries.en] as any)[key] || "";
      }
      result.push({
        group: groupNamespace,
        key: key,
        text,
      });
    }
  }
}

const outputPath = join(__dirname, "../../../be/database/seeders/initial_translations.json");
writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
console.log(`Successfully exported ${result.length} translations to ${outputPath}`);
