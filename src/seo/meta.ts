// Kept free of path aliases and browser APIs: vite.config.ts imports it at build time.
import { REPO_URL } from '../config/links';
import { translations } from '../i18n/index';
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '../i18n/languages';
import { PAGES, pagePath, type Page } from '../router/pages';

export const SITE_URL = 'https://sprac.ch';

const OG_IMAGE = { url: `${SITE_URL}/assets/social/og-image.png`, width: 1200, height: 630 };
const LOGO_URL = `${SITE_URL}/assets/logos/sparc-community-patch-512.png`;

const OG_LOCALES: Record<Language, string> = { en: 'en_GB', de: 'de_CH', fr: 'fr_CH', it: 'it_CH', rm: 'rm_CH' };

export type PageMeta = {
    language: Language;
    page: Page;
    title: string;
    description: string;
    url: string;
    alternates: { hreflang: string; href: string }[];
};

export function pageUrl(language: Language, page: Page): string {
    return `${SITE_URL}${pagePath(language, page)}`;
}

export function getPageMeta(language: Language, page: Page): PageMeta {
    const t = translations[language];
    const { title, description } = t.meta[page];

    return {
        language,
        page,
        title: page === 'home' ? title : `${title} · ${t.siteName}`,
        description,
        url: pageUrl(language, page),
        alternates: [
            ...LANGUAGES.map((code) => ({ hreflang: code, href: pageUrl(code, page) })),
            { hreflang: 'x-default', href: pageUrl(DEFAULT_LANGUAGE, page) },
        ],
    };
}

function escape(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** schema.org graph: the site, the community behind it, and this page. */
function structuredData(meta: PageMeta): string {
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#organization`,
                name: 'SPARC Community',
                url: SITE_URL,
                logo: LOGO_URL,
                sameAs: [REPO_URL],
            },
            {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                name: translations[meta.language].siteName,
                url: SITE_URL,
                inLanguage: [...LANGUAGES],
                publisher: { '@id': `${SITE_URL}/#organization` },
            },
            {
                '@type': 'WebPage',
                '@id': `${meta.url}#webpage`,
                url: meta.url,
                name: meta.title,
                description: meta.description,
                inLanguage: meta.language,
                isPartOf: { '@id': `${SITE_URL}/#website` },
            },
        ],
    };
    // "<" would let the JSON close the script tag early.
    return JSON.stringify(graph).replace(/</g, '\\u003c');
}

/** Everything that differs per page inside <head>. */
export function renderHeadTags(meta: PageMeta): string {
    const tags = [
        `<title>${escape(meta.title)}</title>`,
        `<meta name="description" content="${escape(meta.description)}" />`,
        `<link rel="canonical" href="${meta.url}" />`,
        ...meta.alternates.map((alt) => `<link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`),
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escape(translations[meta.language].siteName)}" />`,
        `<meta property="og:title" content="${escape(meta.title)}" />`,
        `<meta property="og:description" content="${escape(meta.description)}" />`,
        `<meta property="og:url" content="${meta.url}" />`,
        `<meta property="og:image" content="${OG_IMAGE.url}" />`,
        `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
        `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
        `<meta property="og:image:alt" content="SPARC Community patch" />`,
        `<meta property="og:locale" content="${OG_LOCALES[meta.language]}" />`,
        ...LANGUAGES.filter((code) => code !== meta.language).map((code) => `<meta property="og:locale:alternate" content="${OG_LOCALES[code]}" />`),
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<script type="application/ld+json">${structuredData(meta)}</script>`,
    ];
    return tags.join('\n        ');
}

/** sitemap.xml with every language version of every page, linked through hreflang. */
export function renderSitemap(lastmod: string): string {
    const urls = PAGES.flatMap((page) =>
        LANGUAGES.map((language) => {
            const meta = getPageMeta(language, page);
            const links = meta.alternates.map((alt) => `        <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n');
            return `    <url>\n        <loc>${meta.url}</loc>\n        <lastmod>${lastmod}</lastmod>\n${links}\n    </url>`;
        })
    );

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...urls,
        '</urlset>',
    ].join('\n');
}