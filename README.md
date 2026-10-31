# The SPRAC Handbook

This is a **community-driven project maintained by the SPARC Community** to provide comprehensive and correct information and resources regarding to SPARC, CyLg, and Cybat.

> [!WARNING]
> All the content found here is or was found on the vast and wide internet. This handbook only aggregates and organizes the information for easier access. We do not claim ownership of any of the content. All the content found here was already approved/meant for distribution.
>
> **We are not affiliated with SPARC, Cybat, or CyLg in any official way.** We try our best to provide accurate information, but **we cannot guarantee its completeness or reliability, since the information is constantly changing and being updated.**



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

Vite prints the local URL, normally `http://localhost:5173`.

## Usage

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload                |
| `npm run build`   | Type-check, then build the static site into `dist/` |
| `npm run preview` | Serve `dist/` locally to check the production build |
| `npm run lint`    | Run ESLint                                          |

`npm run build` writes one pre-rendered HTML file per page (`dist/legal-notice/index.html`, ...) plus `sitemap.xml` and `404.html`. Upload the contents of `dist/` to the web host. All page text lives in `src/i18n/locales/en.ts`.

## Project layout

```
src/pages/        one folder per page: Home, LegalNotice, PrivacyPolicy, NotFound
src/components/   layout/ (navbar, footer), legal/ (legal page blocks), ui/ (button, icon, callout)
src/i18n/         locales/en.ts with all page text
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

## Acknowledgements

- [@voin-sh | Vo1n](https://github.com/vo1n-sh) (Technical Lead SPRAC Handbook) for building and desigining the whole website.

## Contact

- **Threema:** [Join the Community (requires a SPARC Threema ID)](https://threema.id/87YD3CY3?text=Hello%20There,%0AI%20would%20like%20to%20join%20the%20SPARC%20Community!%20I%20herby%20accept%20the%20Community%20rules,%20which%20is%20the%20SPARC%20Code%20of%20Conduct%2E%0ACheers%0A%3Cyour%20hackername,%20and%20questions%20if%20any%3E) | [General Inquiries](https://threema.id/87YD3CY3) | Technical Lead: Vo1n on Threema
- **GitHub:** bugs and content suggestions go on the [issue tracker](https://github.com/sp4rc-ch/SPRAC-Handbook/issues).

## License

No license has been chosen yet. One will be added later. Until then, all rights are reserved by the contributors.
