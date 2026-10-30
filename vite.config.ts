import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { translations } from './src/i18n/index';
import { DEFAULT_LANGUAGE, LANGUAGES } from './src/i18n/languages';
import { PAGES, pagePath } from './src/router/pages';
import { getPageMeta, renderHeadTags, renderSitemap } from './src/seo/meta';

/**
 * Writes one HTML file per language and page (e.g. de/legal-notice/index.html) with its own
 * title, description, canonical, hreflang, Open Graph and JSON-LD, plus 404.html and sitemap.xml.
 * GitHub Pages then answers every real route with 200 and the right <head>, instead of a 404
 * fallback that search engines would not index.
 */
function seoPages(): Plugin {
    return {
        name: 'seo-pages',
        apply: 'build',
        enforce: 'post',
        generateBundle(_, bundle) {
            const index = bundle['index.html'];
            if (index?.type !== 'asset') return this.error('index.html was not emitted');

            const template = String(index.source);
            const render = (language: string, head: string) =>
                template.replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, head).replace(/<html lang="[^"]*">/, `<html lang="${language}">`);

            for (const language of LANGUAGES) {
                for (const page of PAGES) {
                    const fileName = `${pagePath(language, page).slice(1)}index.html`;
                    this.emitFile({ type: 'asset', fileName, source: render(language, renderHeadTags(getPageMeta(language, page))) });
                }
            }

            // "/" redirects to the visitor's language in the browser; for crawlers it carries the English home head.
            index.source = render(DEFAULT_LANGUAGE, renderHeadTags(getPageMeta(DEFAULT_LANGUAGE, 'home')));

            const { siteName, notFound } = translations[DEFAULT_LANGUAGE];
            this.emitFile({
                type: 'asset',
                fileName: '404.html',
                source: render(DEFAULT_LANGUAGE, `<title>${notFound.documentTitle} · ${siteName}</title>\n        <meta name="robots" content="noindex" />`),
            });

            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(new Date().toISOString().slice(0, 10)) });
        },
    };
}

export default defineConfig({
    plugins: [react(), tailwindcss(), seoPages()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
});