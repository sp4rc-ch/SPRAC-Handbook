import { isLanguage, type Language } from '@/i18n/languages';
import { PAGE_PATHS, PAGES, pagePath, type Page } from './pages';

export { PAGE_PATHS, type Page };

export type Route = { language: Language; page: Page | 'notFound' } | { language: undefined; rest: string };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function buildPath(language: Language, page: Page): string {
    return `${BASE}${pagePath(language, page)}`;
}

/** Same page in another language, keeping whatever follows the language segment. */
export function switchLanguage(pathname: string, language: Language): string {
    const relative = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
    const [, ...rest] = relative.split('/').filter(Boolean);
    return `${BASE}/${language}/${rest.length ? `${rest.join('/')}/` : ''}`;
}

export function parsePath(pathname: string): Route {
    const relative = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
    const [first, ...others] = relative.split('/').filter(Boolean);

    if (!isLanguage(first)) {
        return { language: undefined, rest: relative.replace(/^\/+/, '') };
    }

    const segment = others.join('/');
    const page = PAGES.find((key) => PAGE_PATHS[key] === segment);
    return { language: first, page: page ?? 'notFound' };
}