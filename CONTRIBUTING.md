# Contributing

Thanks for helping with The SPRAC Handbook. This file covers who can contribute, setup, conventions and the pull request flow. For an overview of the project see the [README](README.md); for how the code fits together see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Before launch: issues only

Until launch (end of November or early December 2026) we only take issues: a wrong or outdated fact, a broken link, a typo or unclear wording. Pull requests for new pages or UI changes are paused until launch.

Contributions are only accepted from SPARC students and people associated with SPARC.

**Privacy:** do not open issues or comment with a GitHub account that shows your real name or other personal information. Use a separate account, for example with your SPARC alias.

## Setup

Requires Node.js 20.19+, 22.13+ or 24+ and npm.

```bash
npm ci
npm run dev
```

## Checks

There is no CI yet. Run both before you open a pull request and fix everything they report:

```bash
npm run lint
npm run build
```

`npm run build` type-checks the whole project, including every translation file.

## Code style

- TypeScript in strict mode. Unused variables and parameters fail the build.
- Formatting follows `.prettierrc`: 4 spaces, single quotes, semicolons, print width 200, Tailwind classes sorted by `prettier-plugin-tailwindcss`.
- Files end without a trailing newline (see `.editorconfig`). Prettier adds one, so strip it again if you format a whole file.
- Import from `src` with the `@/` alias, for example `@/components/ui/Button`. Files that `vite.config.ts` imports (`src/i18n/locales/en.ts`, `src/router/pages.ts`, `src/seo/meta.ts`) use relative imports with a `.ts` extension instead.
- Style with Tailwind utility classes and the design tokens in `src/index.css` (`bg-canvas`, `text-fg-muted`, `border-line`, `text-accent`, ...). Do not hard-code colours.
- Icons: use `<Icon name="..." />` from `@/components/ui/Icon`. The allowed names are listed in `src/config/assets.ts` and match the Phosphor icons in `public/assets/icons/`.
- No new runtime dependencies without discussing it in an issue first. The site only depends on React.

## Text

The site is English only. All visible text lives in `src/i18n/locales/en.ts`.

## Adding a page

1. Add the URL segment to `PAGE_PATHS` in `src/router/pages.ts`.
2. Add a title and description for it under `meta` in `src/i18n/locales/en.ts`.
3. Create the page in `src/pages/<Name>/<Name>.tsx` and render it in `src/App.tsx`.

The sitemap and the pre-rendered HTML file are generated from `PAGE_PATHS`, so there is nothing else to register.

## Do not edit

- `CONTRIBUTORS.md` is updated by the maintainers on every version change.
- `public/assets/icons/` and `public/assets/logos/` are maintained by the maintainers only. Do not add, change or replace these files in a pull request. If an icon or logo is missing or wrong, open an issue.

## Commits

One logical change per commit, in the format `type: short description`:

```
feat: add legal notice page
fix: mobile footer alignment
docs: update contributing guide
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`. Lowercase, imperative ("add", not "added"), no period, first line under about 50 characters.

## Branches

| Branch            | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `main`            | Production. Only maintainers merge into it, for a release.    |
| `dev`             | Newest state of the project. Only maintainers merge into it.  |
| `feature/<topic>` | One remote branch per change. This is where pull requests go. |

Never open a pull request against `main` or `dev`.

## Pull requests (after launch)

1. Start from the newest `dev`:

    ```bash
    git checkout dev
    git pull origin dev
    git checkout -b feature/<topic>
    ```

2. Keep the change focused, then run `npm run lint` and `npm run build`.
3. Push your branch and open a pull request into the remote `feature/<topic>` branch, not into `dev` or `main`. Fill in the template.
4. A maintainer reviews it, merges the feature branch into `dev`, and later merges `dev` into `main` for a release. Releases are tagged with semantic versions (`v1.2.3`).
