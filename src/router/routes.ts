import { PAGE_PATHS, PAGES, pagePath, type Page } from './pages';

export { PAGE_PATHS, type Page };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function buildPath(page: Page): string {
    return `${BASE}${pagePath(page)}`;
}

/** A path written in a content file ("/sparc/") with the deploy base path in front. */
export function siteHref(path: string): string {
    return `${BASE}${path}`;
}

export function parsePath(pathname: string): Page | 'notFound' {
    const relative = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
    const segment = relative.split('/').filter(Boolean).join('/');
    return PAGES.find((key) => PAGE_PATHS[key] === segment) ?? 'notFound';
}
