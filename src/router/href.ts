import { siteHref } from './routes';

export type LinkKind = 'placeholder' | 'anchor' | 'external' | 'internal' | 'other';

/**
 * What kind of address a link in a content file is:
 * "#" is a page that is not built yet, "#something" a place on the same page, "https://..." another site,
 * "/sparc/" a page of this site, and anything else (mailto:, tel:) is left to the browser.
 */
export function linkKind(href: string): LinkKind {
    if (href === '#') return 'placeholder';
    if (href.startsWith('#')) return 'anchor';
    if (/^https?:\/\//.test(href)) return 'external';
    if (href.startsWith('/')) return 'internal';
    return 'other';
}

/** The address to put in `href`: pages of this site get the deploy base path in front. */
export function resolveHref(href: string): string {
    return linkKind(href) === 'internal' ? siteHref(href) : href;
}
