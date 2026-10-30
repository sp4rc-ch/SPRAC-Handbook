# The SPRAC Handbook

An unofficial handbook for everything related to SPARC, Cybat 42 and CyLg, for people taking part in or interested in these programs.
The site is a static single-page app built with React, Vite and Tailwind CSS. It aggregates and organises information that is already public. It is maintained by the SPARC community and is not affiliated with SPARC, Cybat or CyLg.

## Table of contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Project layout](#project-layout)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Maintainers](#maintainers)
- [Contact](#contact)
- [License](#license)

## Requirements

- Node.js 20.19+, 22.13+ or 24+ (required by Vite 8 and ESLint 10)
- npm

## Quick start

```bash
git clone https://github.com/sp4rc-ch/SPRAC-Handbook.git
cd SPRAC-Handbook
npm ci
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`. Opening `/` redirects to your browser language, for example `/de/`.

## Usage

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check, then build the static site into `dist/` |
| `npm run preview` | Serve `dist/` locally to check the production build |
| `npm run lint` | Run ESLint |

`npm run build` writes one pre-rendered HTML file per language and page (`dist/de/legal-notice/index.html`, ...) plus `sitemap.xml` and `404.html`. Upload the contents of `dist/` to the web host. All page text lives in `src/i18n/locales/`, one file per language.

## Project layout

```
src/pages/        one folder per page: Home, LegalNotice, PrivacyPolicy, NotFound
src/components/   layout/ (navbar, footer, language select), legal/ (legal page blocks), ui/ (button, icon, callout)
src/i18n/         supported languages and locales/en.ts ... rm.ts with all page text
src/router/       routes, URL building and client-side navigation
src/seo/          per-page head tags, JSON-LD and the sitemap
src/config/       external links, contact email, asset paths
public/           copied as is: favicons, assets/icons, assets/logos, robots.txt, llms.txt, .htaccess, .well-known/
docs/             architecture notes
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md): routing, deployment, where to change things
- [Contributing](CONTRIBUTING.md): setup, conventions, how to add content

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) first. Report problems on the [issue tracker](https://github.com/sp4rc-ch/SPRAC-Handbook/issues).

## Maintainers

| Name | Role |
|---|---|
| An0n | Repository owner |
| vo1n | Maintainer |

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for who built what.

## Contact

- **Threema:** search for the maintainers' aliases, An0n or vo1n, in Threema and send a message.
- **GitHub:** bugs and content suggestions go on the [issue tracker](https://github.com/sp4rc-ch/SPRAC-Handbook/issues).

## License

No license has been chosen yet. One will be added later. Until then, all rights are reserved by the contributors.