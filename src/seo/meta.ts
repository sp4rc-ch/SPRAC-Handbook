// Kept free of path aliases and browser APIs: vite.config.ts imports it at build time.
import { REPO_URL } from '../config/links.ts';
import type { SiteMeta } from '../content/siteMeta.ts';
import { PAGES, pagePath, type Page } from '../router/pages.ts';

/*
 * Public address of the site, including the subpath. vite.config.ts sets it through `define` in the bundles, and on globalThis.
 */
declare const __SITE_URL__: string;

const siteUrl = () => __SITE_URL__;

const OG_IMAGE = { path: '/assets/social/og-image.png', width: 1200, height: 630 };
const LOGO_PATH = '/assets/logos/sparc-community-patch-512.png';

export type PageMeta = {
    page: Page;
    title: string;
    description: string;
    url: string;
};

export function pageUrl(page: Page): string {
    return `${siteUrl()}${pagePath(page)}`;
}

/** Title, description and address of a page, from the front matter of its content file. */
export function getPageMeta(site: SiteMeta, page: Page): PageMeta {
    const { title, description } = site.pages[page];

    return {
        page,
        title: page === 'home' ? title : `${title} · ${site.siteName}`,
        description,
        url: pageUrl(page),
    };
}

function escape(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** schema.org graph: the site, the community behind it, and this page. */
function structuredData(site: SiteMeta, meta: PageMeta): string {
    const SITE_URL = siteUrl();
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: 'SPARC Community',
                url: SITE_URL,
                logo: `${SITE_URL}${LOGO_PATH}`,
                sameAs: [REPO_URL],
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                name: site.siteName,
                url: SITE_URL,
                inLanguage: 'en',
                publisher: { '@id': `${SITE_URL}/#organization` },
            },
            {
                '@type': 'WebPage',
                '@id': `${meta.url}#webpage`,
                url: meta.url,
                name: meta.title,
                description: meta.description,
                inLanguage: 'en',
                isPartOf: { '@id': `${SITE_URL}/#website` },
            },
        ],
    };
    // "<" would let the JSON close the script tag early.
    return JSON.stringify(graph).replace(/</g, '\\u003c');
}

/** Everything that differs per page inside <head>. */
export function renderHeadTags(site: SiteMeta, meta: PageMeta): string {
    const tags = [
        `<title>${escape(meta.title)}</title>`,
        `<meta name="description" content="${escape(meta.description)}" />`,
        `<link rel="canonical" href="${meta.url}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escape(site.siteName)}" />`,
        `<meta property="og:title" content="${escape(meta.title)}" />`,
        `<meta property="og:description" content="${escape(meta.description)}" />`,
        `<meta property="og:url" content="${meta.url}" />`,
        `<meta property="og:image" content="${siteUrl()}${OG_IMAGE.path}" />`,
        `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
        `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
        `<meta property="og:image:alt" content="SPARC Community patch" />`,
        `<meta property="og:locale" content="en_GB" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<script type="application/ld+json">${structuredData(site, meta)}</script>`,
    ];
    return tags.join('\n        ');
}

/** sitemap.xml with every page. */
export function renderSitemap(lastmod: string): string {
    const urls = PAGES.map((page) => `    <url>\n        <loc>${pageUrl(page)}</loc>\n        <lastmod>${lastmod}</lastmod>\n    </url>`);

    return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls, '</urlset>'].join('\n');
}
