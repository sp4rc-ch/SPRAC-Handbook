import { isLanguage, type Language } from '@/i18n/languages';

/** URL segment for each page, placed after the language prefix. */
export const PAGE_PATHS = {
    home: '',
    legalNotice: 'legal-notice',
    privacyPolicy: 'privacy-policy',
} as const;

export type Page = keyof typeof PAGE_PATHS;

export type Route = { language: Language; page: Page | 'notFound' } | { language: undefined; rest: string };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function buildPath(language: Language, page: Page): string {
    const segment = PAGE_PATHS[page];
    return `${BASE}/${language}${segment ? `/${segment}` : ''}`;
}

export function parsePath(pathname: string): Route {
    const relative = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
    const [first, ...others] = relative.split('/').filter(Boolean);

    if (!isLanguage(first)) {
        return { language: undefined, rest: relative.replace(/^\/+/, '') };
    }

    const segment = others.join('/');
    const page = (Object.keys(PAGE_PATHS) as Page[]).find((key) => PAGE_PATHS[key] === segment);
    return { language: first, page: page ?? 'notFound' };
}
