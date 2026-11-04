import { readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { build, defineConfig, type Plugin } from 'vite';
import { buildSiteMeta } from './src/content/siteMeta.ts';
import { PAGES, pagePath } from './src/router/pages.ts';
import { getPageMeta, renderHeadTags, renderSitemap } from './src/seo/meta.ts';

/** Site name and the title and description of every page: the front matter of the files in content/. */
const siteMeta = buildSiteMeta((name) => readFileSync(path.resolve(import.meta.dirname, 'content', `${name}.md`), 'utf8'));

const basePath = (process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, ''); // remove leading and trailing slash
const BASE = basePath ? `/${basePath}/` : '/'; // add them safely
const SITE_URL = `${(process.env.SITE_ORIGIN ?? 'https://sprac.ch').replace(/\/+$/, '')}${BASE.slice(0, -1)}`; // builds the "real" site url

// fix possible issues in browsers when builders tweak (and used in meta.ts)
const define = { __SITE_URL__: JSON.stringify(SITE_URL) };
Object.assign(globalThis, { __SITE_URL__: SITE_URL });

/**
 * Same-origin only: the build has no inline scripts or styles, no eval and no third-party
 * requests. JSON-LD is a data block and is not affected. Build only, because the Vite dev
 * server injects inline styles for hot reload. frame-ancestors, HSTS and Permissions-Policy
 * cannot be set from a <meta> tag and must come from the host as HTTP headers.
 * No upgrade-insecure-requests: it would rewrite the CSS and JS URLs to https when previewing over
 * plain http on the network. The host already redirects http to https (public/.htaccess).
 */
const CONTENT_SECURITY_POLICY = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
].join('; ');

function contentSecurityPolicy(): Plugin {
    return {
        name: 'content-security-policy',
        apply: 'build',
        transformIndexHtml: () => [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY }, injectTo: 'head-prepend' }],
    };
}

const ROOT_DIV = '<div id="root"></div>';
const OUTLET = '<!--prerender-->';

/** Marks a page's root element with the path it was built for, plus a slot for the pre-rendered markup. */
const prerenderSlot = (pathname: string) => `<div id="root" data-prerendered="${pathname}">${OUTLET}</div>`;

/**
 * Writes one HTML file per page (e.g. legal-notice/index.html) with its own
 * title, description, canonical, Open Graph and JSON-LD, plus 404.html and sitemap.xml.
 * The host then answers every real route with 200 and the right <head>, instead of a 404
 * fallback that search engines would not index. The page body is filled in by prerender().
 */
function seoPages(): Plugin {
    return {
        name: 'seo-pages',
        apply: (config, { command }) => command === 'build' && !config.build?.ssr,
        enforce: 'post',
        generateBundle(_, bundle) {
            const index = bundle['index.html'];
            if (index?.type !== 'asset') return this.error('index.html was not emitted');

            const template = String(index.source);
            const render = (head: string, root = ROOT_DIV) => template.replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, head).replace(ROOT_DIV, root);

            for (const page of PAGES.filter((key) => key !== 'home')) {
                const pathname = pagePath(page);
                this.emitFile({ type: 'asset', fileName: `${pathname.slice(1)}index.html`, source: render(renderHeadTags(siteMeta, getPageMeta(siteMeta, page)), prerenderSlot(`${BASE}${pathname.slice(1)}`)) });
            }

            index.source = render(renderHeadTags(siteMeta, getPageMeta(siteMeta, 'home')), prerenderSlot(BASE));

            this.emitFile({
                type: 'asset',
                fileName: '404.html',
                source: render(`<title>${siteMeta.notFoundTitle} · ${siteMeta.siteName}</title>\n        <meta name="robots" content="noindex" />`),
            });

            this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: renderSitemap(new Date().toISOString().slice(0, 10)) });
        },
    };
}

/**
 * Renders each page's React tree into its HTML file, so the content is in the HTML itself and
 * readable without JavaScript (most AI crawlers). The browser then hydrates it (see main.tsx).
 */
function prerender(): Plugin {
    let outDir = '';
    return {
        name: 'prerender',
        apply: (config, { command }) => command === 'build' && !config.build?.ssr,
        configResolved(config) {
            outDir = path.resolve(config.root, config.build.outDir);
        },
        async closeBundle() {
            const serverDir = path.resolve(import.meta.dirname, 'node_modules/.tmp/prerender');
            await build({
                configFile: false,
                logLevel: 'warn',
                base: BASE,
                define,
                resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
                build: { ssr: 'src/entry-server.ts', outDir: serverDir, emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } } },
            });
            const { render } = (await import(pathToFileURL(path.join(serverDir, 'entry-server.mjs')).href)) as { render: (pathname: string) => string };

            const files = PAGES.map((page) => `${pagePath(page).slice(1)}index.html`);
            for (const file of files) {
                const filePath = path.join(outDir, file);
                const html = await readFile(filePath, 'utf8');
                const pathname = html.match(/data-prerendered="([^"]+)"/)?.[1];
                if (!pathname || !html.includes(OUTLET)) throw new Error(`prerender: no slot in ${file}`);
                await writeFile(filePath, html.replace(OUTLET, render(pathname)));
            }
        },
    };
}

export default defineConfig({
    base: BASE,
    define,
    plugins: [react(), tailwindcss(), contentSecurityPolicy(), seoPages(), prerender()],
    resolve: {
        alias: {
            '@': path.resolve(import.meta.dirname, './src'),
        },
    },
});
