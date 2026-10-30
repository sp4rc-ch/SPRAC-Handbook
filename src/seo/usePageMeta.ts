import { useEffect } from 'react';
import { translations } from '@/i18n';
import type { Language } from '@/i18n/languages';
import type { Page } from '@/router/pages';
import { getPageMeta } from './meta';

function upsert<T extends HTMLElement>(selector: string, create: () => T): T {
    const existing = document.head.querySelector<T>(selector);
    if (existing) return existing;
    const element = create();
    document.head.append(element);
    return element;
}

function setDescription(content: string) {
    upsert('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' })).content = content;
}

function setCanonical(href: string | null) {
    const link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (href === null) return link?.remove();
    upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).href = href;
}

function setNoIndex(noIndex: boolean) {
    const robots = document.head.querySelector('meta[name="robots"]');
    if (!noIndex) return robots?.remove();
    upsert('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' })).content = 'noindex';
}

/**
 * Keeps <html lang>, title, description and canonical in sync during client-side navigation.
 * The full head (hreflang, Open Graph, JSON-LD) is written into each page's HTML at build time.
 */
export function usePageMeta(language: Language, page: Page | 'notFound') {
    useEffect(() => {
        document.documentElement.lang = language;

        if (page === 'notFound') {
            const t = translations[language];
            document.title = `${t.notFound.documentTitle} · ${t.siteName}`;
            setCanonical(null);
            setNoIndex(true);
            return;
        }

        const meta = getPageMeta(language, page);
        document.title = meta.title;
        setDescription(meta.description);
        setCanonical(meta.url);
        setNoIndex(false);
    }, [language, page]);
}