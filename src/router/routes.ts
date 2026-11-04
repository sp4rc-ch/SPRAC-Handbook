import { PAGE_PATHS, PAGES, pagePath, type Page } from './pages';

export { PAGE_PATHS, type Page };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function buildPath(page: Page): string {
    return `${BASE}${pagePath(page)}`;
}

export function parsePath(pathname: string): Page | 'notFound' {
    const relative = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
    const segment = relative.split('/').filter(Boolean).join('/');
    return PAGES.find((key) => PAGE_PATHS[key] === segment) ?? 'notFound';
}

/** Program pages built so far. */
const PROGRAM_PAGES: Partial<Record<string, Page>> = { sparc: 'sparc' };

/** Path of a program's page, or "#" while that page does not exist yet. */
export function programHref(id: string): string {
    const page = PROGRAM_PAGES[id];
    return page ? buildPath(page) : '#';
}

/** True on the page of any program: the Programs menu is the current section. */
export function isProgramPage(page: Page | 'notFound'): boolean {
    return page !== 'notFound' && Object.values(PROGRAM_PAGES).includes(page);
}
