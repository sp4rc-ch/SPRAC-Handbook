import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useLanguage, useTranslation } from '@/i18n/LanguageContext';
import { LANGUAGE_NAMES, LANGUAGES } from '@/i18n/languages';
import { Link } from '@/router/Link';
import { usePathname } from '@/router/navigation';
import { switchLanguage } from '@/router/routes';

/** Trigger shows the current language code; the menu links to the same page in each language. */
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
                className="flex h-10 items-center gap-2 rounded-md border border-line px-4 text-sm leading-[1.2] font-medium uppercase transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
                <Icon name="globe" size={18} />
                {language}
                <Icon name="caret-down" size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <ul id={menuId} className="absolute right-0 z-10 mt-2 min-w-40 rounded-md border border-line bg-canvas py-1 shadow-lg shadow-black/40">
                    {LANGUAGES.map((code) => (
                        <li key={code}>
                            <Link
                                href={switchLanguage(pathname, code)}
                                hrefLang={code}
                                lang={code}
                                aria-current={code === language ? 'true' : undefined}
                                onClick={() => setOpen(false)}
                                className={`flex items-center justify-between gap-4 px-4 py-2 text-sm hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none ${code === language ? 'text-accent' : 'text-fg'}`}
                            >
                                {LANGUAGE_NAMES[code]}
                                <span className="font-mono text-xs text-fg-muted uppercase">{code}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}