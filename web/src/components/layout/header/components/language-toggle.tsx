'use client';

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
    { value: 'en', label: 'English', flag: '/flags/gb.svg' },
    { value: 'vi', label: 'Tiếng Việt', flag: '/flags/vn.svg' },
] as const;

export default function LanguageToggle() {
    const { locale, setLocale } = useI18n();
    const current = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

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
                    onValueChange={(v) => setLocale(v as Locale)}
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
