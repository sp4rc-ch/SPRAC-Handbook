// Kept free of path aliases and browser APIs: vite.config.ts imports it at build time.
/** URL segment for each page, served from the site root. */
export const PAGE_PATHS = {
    home: '',
    legalNotice: 'legal-notice',
    privacyPolicy: 'privacy-policy',
} as const;

export type Page = keyof typeof PAGE_PATHS;

export const PAGES = Object.keys(PAGE_PATHS) as Page[];

/**
 * Site-relative path with a trailing slash ("/", "/legal-notice/"). Each route is
 * built as a folder with its own index.html, which GitHub Pages serves under this form.
 */
export function pagePath(page: Page): string {
    const segment = PAGE_PATHS[page];
    return `/${segment ? `${segment}/` : ''}`;
}