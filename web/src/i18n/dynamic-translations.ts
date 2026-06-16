import { dictionaries } from "./dictionaries";
import { siteDictionaries } from "./site-dictionaries";

function mergeDeep(target: any, source: any) {
  if (!source) return;
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object") {
      if (!target[key]) target[key] = {};
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

let merged = false;

export function applyDynamicTranslations(data: any) {
  if (!data || merged) return;
  
  if (data.site) {
    for (const locale of Object.keys(data.site)) {
      if ((siteDictionaries as any)[locale]) {
        mergeDeep((siteDictionaries as any)[locale], data.site[locale]);
      }
    }
  }
  
  if (data.docs) {
    for (const locale of Object.keys(data.docs)) {
      if ((dictionaries as any)[locale]) {
        mergeDeep((dictionaries as any)[locale], data.docs[locale]);
      }
    }
  }
  
  merged = true;
}
