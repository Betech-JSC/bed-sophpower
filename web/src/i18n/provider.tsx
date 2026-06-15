"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import {
    subscribe,
    getStoredLocale,
    getServerLocale,
    setStoredLocale,
    type Locale,
} from "./locale-store";
import { dictionaries, type Dictionary } from "./dictionaries";
import { siteDictionaries } from "./site-dictionaries";
import { applyDynamicTranslations } from "./dynamic-translations";

interface I18nValue {
    locale: Locale;
    t: Dictionary;
    setLocale: (next: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children, initialTranslations }: { children: React.ReactNode; initialTranslations?: any }) {
    if (initialTranslations) {
        applyDynamicTranslations(initialTranslations);
    }

    const locale = useSyncExternalStore(subscribe, getStoredLocale, getServerLocale);

    const value: I18nValue = {
        locale,
        t: dictionaries[locale],
        setLocale: setStoredLocale,
    };

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
    const ctx = useContext(I18nContext);
    if (!ctx) {
        return {
            locale: "vi",
            t: dictionaries.vi,
            setLocale: setStoredLocale,
        };
    }
    return ctx;
}
