// Kept free of path aliases and browser APIs: vite.config.ts imports it at build time.
import { PAGES, contentName, type Page } from '../router/pages.ts';
import { parseMarkdown } from './markdown.ts';

export type PageText = { title: string; description: string };

/** What the <head> of every page is built from: the site name and each page's title and description. */
export type SiteMeta = {
    siteName: string;
    notFoundTitle: string;
    pages: Record<Page, PageText>;
};

function field(meta: Record<string, string>, key: string, name: string): string {
    const value = meta[key];
    if (!value) throw new Error(`content/${name}.md: the front matter needs "${key}: ..."`);
    return value;
}

/** Reads title, description and site name from the front matter of the content files. `read` returns the text of `content/<name>.md`. */
export function buildSiteMeta(read: (name: string) => string): SiteMeta {
    const front = (name: string) => parseMarkdown(read(name)).meta;

    const pages = Object.fromEntries(
        PAGES.map((page) => {
            const name = contentName(page);
            const meta = front(name);
            return [page, { title: field(meta, 'title', name), description: field(meta, 'description', name) }];
        })
    ) as Record<Page, PageText>;

    return {
        siteName: field(front('site'), 'siteName', 'site'),
        notFoundTitle: field(front('not-found'), 'title', 'not-found'),
        pages,
    };
}
