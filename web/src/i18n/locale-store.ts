"use client";

import { LOCALE_KEY, type Locale, isLocale } from "./locale-shared";
export { LOCALE_KEY, type Locale, isLocale };


export function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
}

export function getStoredLocale(): Locale {
    const stored = localStorage.getItem(LOCALE_KEY);
    return isLocale(stored) ? stored : "vi";
}

export function getServerLocale(): Locale {
    return "vi";
}

export function setStoredLocale(next: Locale) {
    localStorage.setItem(LOCALE_KEY, next);
    // Persist for SSR/middleware to read later when content is localized.
    document.cookie = `${LOCALE_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
    // storage event only fires cross-tab; dispatch manually for same-tab listeners.
    window.dispatchEvent(new Event("storage"));
}
