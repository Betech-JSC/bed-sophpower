"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
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

    const router = useRouter();
    const locale = useSyncExternalStore(subscribe, getStoredLocale, getServerLocale);
    const setLocale = useCallback((next: Locale) => {
        if (next === locale) return;
        setStoredLocale(next);
        window.location.reload();
    }, [locale]);

    const value: I18nValue = {
        locale,
        t: dictionaries[locale],
        setLocale,
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
