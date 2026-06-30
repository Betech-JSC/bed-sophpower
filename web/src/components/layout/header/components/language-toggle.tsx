'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../../../ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '../../../ui/menu';
import { useI18n } from '@/i18n/provider';
import type { Locale } from '@/i18n/locale-store';

const LOCALES = [
    { value: 'vi', label: 'Tiếng Việt', flag: '/flags/vn.svg' },
    { value: 'en', label: 'English', flag: '/flags/gb.svg' },
    { value: 'zh', label: '中文 (Chinese)', flag: '/flags/cn.svg' },
    { value: 'ja', label: '日本語 (Japanese)', flag: '/flags/jp.svg' },
] as const;

export default function LanguageToggle() {
    const { locale, setLocale } = useI18n();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

    const handleLocaleChange = (newLocale: Locale) => {
        // Strip current locale prefix from path if any
        let cleanPath = pathname;
        const match = pathname.match(/^\/(en|vi|zh|ja)(\/|$)/);
        if (match) {
            // pathname starts with a locale, e.g. "/en/about"
            // match[0] is "/en/" or "/en"
            const prefixLength = match[0].endsWith('/') ? match[0].length - 1 : match[0].length;
            cleanPath = pathname.substring(prefixLength) || '/';
        }

        // Build localized URL path
        let newPath = cleanPath;
        if (newLocale !== 'vi') {
            newPath = `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;
        }

        // Retain query parameters
        const searchString = searchParams.toString();
        const queryString = searchString ? `?${searchString}` : '';

        // Save locale selection and redirect
        setLocale(newLocale);
        router.push(newPath + queryString);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon" aria-label="Select language">
                        <img
                            src={current.flag}
                            alt={current.label}
                            className="w-5 h-auto rounded-[2px]"
                        />
                    </Button>
                }
            />
            <DropdownMenuContent align="end" className="min-w-36 bg-white border border-gray-200">
                <DropdownMenuRadioGroup
                    value={locale}
                    onValueChange={(v) => handleLocaleChange(v as Locale)}
                >
                    {LOCALES.map((l) => (
                        <DropdownMenuRadioItem
                            key={l.value}
                            value={l.value}
                            className="text-neutral-800 dark:text-neutral-200 font-medium cursor-pointer data-highlighted:text-white data-highlighted:bg-brand-green"
                        >
                            <span className="flex items-center gap-2">
                                <img src={l.flag} alt="" className="w-5 h-auto rounded-[2px] shrink-0" />
                                {l.label}
                            </span>
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
