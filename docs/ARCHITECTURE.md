# Architecture

The SPRAC Handbook is a static website. There is no backend, database, login or form: the build produces plain HTML, CSS, JavaScript and images that any web host can serve. React renders the pages at build time and takes over in the browser for navigation and the language menu.

## System context

```mermaid
flowchart LR
    Visitor[Browser] -->|HTTPS| Host[Infomaniak web hosting<br/>static files from dist/]
    Crawler[Search and AI crawlers] -->|HTTPS| Host
    Visitor -.->|links only| External[GitHub, SPARC and admin.ch sites]
```

Nothing is loaded from third parties: fonts, icons and images are served from the same host. The only data kept in the browser is the chosen language in `localStorage` (key `sprac.language`).

## Components

```mermaid
flowchart TD
    main[main.tsx] --> App
    App --> Ctx[LanguageContext]
    Ctx --> Home & LegalNotice & PrivacyPolicy & NotFound
    Home & LegalNotice & PrivacyPolicy & NotFound --> PageLayout
    PageLayout --> Navbar --> LanguageSelect
    PageLayout --> Footer
    LegalNotice & PrivacyPolicy --> LegalLayout
```

| Path | Responsibility |
|---|---|
| `src/main.tsx` | Mounts the app: hydrates pre-rendered HTML, otherwise renders from scratch |
| `src/App.tsx` | Reads the URL, redirects paths without a language, picks the page |
| `src/pages/` | One component per page; `Home/` is split into one component per section |
| `src/components/layout/` | Navbar, logo, language select, footer, page frame |
| `src/components/legal/` | Building blocks shared by the legal notice and privacy policy |
| `src/components/ui/` | Button, icon, callout |
| `src/i18n/` | Language list, detection, `LanguageContext`, and all text in `locales/` |
| `src/router/` | Route table (`pages.ts`), URL helpers (`routes.ts`), history navigation and `Link` |
| `src/seo/` | Head tags, JSON-LD and sitemap (`meta.ts`); keeps them in sync in the browser (`usePageMeta.ts`) |
| `src/config/` | External links, contact email, asset URLs and icon names |
| `src/entry-server.ts` | Renders one path to HTML at build time |
| `vite.config.ts` | Build plugins: CSP, per-page HTML files, sitemap, pre-rendering |
| `public/` | Served unchanged: favicons, icons, logos, social image, `robots.txt`, `llms.txt`, `humans.txt`, `.htaccess`, `.well-known/security.txt` |

## Routing

Every URL starts with a language: `/en/`, `/de/`, `/fr/`, `/it/`, `/rm/`. Pages follow it with a trailing slash:

| Path | Page |
|---|---|
| `/<lang>/` | Home (before-launch page) |
| `/<lang>/legal-notice/` | Legal notice |
| `/<lang>/privacy-policy/` | Privacy policy |
| anything else under `/<lang>/` | Not found |

`/` and paths without a language (for example `/legal-notice`) redirect in the browser to the remembered language, else the first supported browser language, else English (`src/i18n/detectLanguage.ts`). The language menu keeps the current page and only swaps the language segment.

There is no router library. `src/router/navigation.ts` wraps the History API and exposes the current path through `useSyncExternalStore`; `Link` intercepts plain clicks so internal links do not reload the page.

## Translations

`src/i18n/locales/en.ts` is the source of truth; its type (`Translation`) is enforced on the other four files, so a missing key fails the build. Components read text with `useTranslation()`. Language names in the menu are written in their own language (`LANGUAGE_NAMES`).

## Build

`npm run build` runs `tsc -b` and then `vite build`, which adds four steps through plugins in `vite.config.ts`:

1. **Content Security Policy**: a strict same-origin CSP is injected as a `<meta>` tag into every page (build only, because the dev server needs inline styles).
2. **Per-page HTML** (`seoPages`): for every language and page, a copy of `index.html` with its own title, description, canonical URL, hreflang links, Open Graph tags and JSON-LD, written to `<lang>/<page>/index.html`. Also writes `404.html` (with `noindex`) and `sitemap.xml`.
3. **Pre-rendering** (`prerender`): builds `src/entry-server.ts` for Node, renders each page to HTML and puts it into its file. The text is then readable without JavaScript, which matters for AI crawlers.
4. **Hydration**: in the browser, `main.tsx` compares `data-prerendered` on the root element with the current path. If they match, React hydrates the existing HTML; on `404.html` or in development it renders from scratch.

Head tags, the sitemap and the route list all come from `src/router/pages.ts` and `src/seo/meta.ts`, so they cannot drift apart.

## Hosting and security

The site is hosted by Infomaniak (Apache). `public/.htaccess` is copied into `dist/` and:

- redirects HTTP and `www.sprac.ch` to `https://sprac.ch`
- serves `404.html` for unknown paths
- sets the headers a `<meta>` tag cannot: HSTS, `frame-ancestors 'none'`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`
- caches hashed build files for a year and revalidates HTML and text files on every visit

Security contact details are in `public/.well-known/security.txt` (RFC 9116).

## Known limitations

- There is no deploy workflow; `dist/` is uploaded by hand.
- sprac.ch does not serve the site yet and its HTTPS certificate is self-signed.
- The "Open an issue" button points to `#` until an issue tracker is set up (`ISSUE_URL` in `src/config/links.ts`).
- The full-site navbar (Programs, Path, FAQ, Glossary) and the extra footer links are not built yet, because those pages do not exist yet.
- Romansh text and the legal texts in German, French, Italian and Romansh still need review by native speakers.
- No licence is chosen yet; the legal notice says "all rights reserved".