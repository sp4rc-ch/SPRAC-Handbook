import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { rememberLanguage } from '@/i18n/detectLanguage';
import { useLanguage, useTranslation } from '@/i18n/LanguageContext';
import { LANGUAGE_NAMES, LANGUAGES } from '@/i18n/languages';
import { Link } from '@/router/Link';
import { usePathname } from '@/router/navigation';
import { switchLanguage } from '@/router/routes';

/** Trigger shows the current language code; the dropdown links to the same page in each language. */
export function LanguageSelect() {
    const language = useLanguage();
    const t = useTranslation();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const menuId = useId();

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                aria-label={t.nav.language}
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((value) => !value)}
                className={`flex h-10 items-center gap-2 rounded-md border px-4 text-sm leading-[1.2] font-medium uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    open ? 'border-accent bg-overlay' : 'border-line hover:border-line-strong hover:bg-overlay'
                }`}
            >
                <Icon name="globe" size={18} />
                {language}
                <Icon name={open ? 'caret-up' : 'caret-down'} size={14} />
            </button>

            {open && (
                <ul id={menuId} className="absolute right-0 z-20 mt-2 flex w-[200px] flex-col gap-0.5 rounded-lg border border-line bg-elevated p-1 shadow-dropdown">
                    {LANGUAGES.map((code) => {
                        const selected = code === language;
                        return (
                            <li key={code}>
                                <Link
                                    href={switchLanguage(pathname, code)}
                                    hrefLang={code}
                                    lang={code}
                                    aria-current={selected ? 'true' : undefined}
                                    onClick={() => {
                                        rememberLanguage(code);
                                        setOpen(false);
                                    }}
                                    className="flex items-center gap-3 rounded-sm px-3 py-2 hover:bg-overlay focus-visible:bg-overlay focus-visible:outline-none"
                                >
                                    <span className={`w-5 font-mono text-xs leading-[1.4] uppercase ${selected ? 'text-accent' : 'text-fg-muted'}`}>{code}</span>
                                    <span className="flex-1 text-sm leading-[1.2] font-medium">{LANGUAGE_NAMES[code]}</span>
                                    <Icon name="check" size={16} className={selected ? 'text-accent' : 'invisible'} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}