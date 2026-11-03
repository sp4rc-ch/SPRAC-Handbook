# Contributing

Thanks for helping with SPRAC Handbook. This file covers who can contribute, setup, conventions and the pull request flow. For an overview of the project see the [README](README.md) and for how the code fits together see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## What you can change

### Allowed:
Update information that is not true anymore. Do not forget to add the source of your information under the section that you change and the date of change next to "last verified". Open a pull request and a maintainer reviews it.

- Markdown and page content of the topic pages
- Images and files in `public/assets/` (except `icons/` and `logos/`, see [Do not edit](#do-not-edit))

### Allowed only with agreement of a maintainer:
Open an issue and describe the change before you write any code.

- UI: components, styles and design
- Layout: page structure and navigation

### Not allowed:
Maintainers only. Pull requests that change these files get closed.

- `README.md`
- `CONTRIBUTING.md`
- The CI/CD pipeline and workflows

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

## Content

The site is English only. All visible content lives in page specific markdown files. This makes editing and updating content much easier.

## Adding a page

1. Add the URL segment to `PAGE_PATHS` in `src/router/pages.ts`.
2. Add a title and description for it under `meta` in `src/i18n/locales/en.ts`.
3. Create the page in `src/pages/<Name>/<Name>.tsx` and render it in `src/App.tsx`.

The sitemap and the pre-rendered HTML file are generated from `PAGE_PATHS`, so there is nothing else to register.

## AI-assisted contributions

Small AI assistance is fine, for example a suggestion or a fixed typo. The majority of the code you submit must be written by you. This matters because the project may move to Codeberg later, and its Terms of Use ban projects that mostly consist of AI-generated code. The rule covers any generative AI tool, including local models. You are responsible for everything you submit, so read and understand it before you open a pull request.

## Commits

Commit messages follow the format `type: short description`.

```
feat: add legal notice page
fix: mobile footer alignment
docs: update contributing guide
```

### Types

| Type       | Use for                                       |
| ---------- | --------------------------------------------- |
| `feat`     | New feature or visible addition               |
| `fix`      | Bug fix or correction                         |
| `docs`     | `README`, `CONTRIBUTING` or `docs/` only      |
| `style`    | Formatting only, no change in behavior        |
| `refactor` | Restructuring without a change in behavior    |
| `chore`    | Tooling, dependencies, configuration, CI      |

### Rules

1. Write the type in lowercase, followed by a colon and one space.
2. Start the description in lowercase and do not end it with a period.
3. Keep the first line short, about 50 characters and at most 72.
4. Use the imperative: "fix url", not "fixed url" or "fixes url".
5. Make one logical change per commit.
6. Say what changed, not how: `fix: mobile view`, not `fix: change css`.
7. Add a body after a blank line only if the reason for the change is not obvious.

### Examples to avoid

| Instead of                          | Write                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `update Readme.md`                  | `docs: update readme`                                                                               |
| `init`                              | `chore: init project`                                                                               |
| `Add disclaimer dialog, favicon...` | Three commits: `feat: add disclaimer dialog`, `fix: update favicon`, `refactor: restructure footer` |

## Branches

| Branch            | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `main`            | Production. Only maintainers merge into it, for a release.    |
| `dev`             | Newest state of the project. Only maintainers merge into it.  |
| `feature/<topic>` | One remote branch per change. This is where pull requests go. |

Never open a pull request against `main` or `dev`.

## Pull requests

1. Start from the newest `dev`:

    ```bash
    git checkout dev
    git pull origin dev
    git checkout -b feature/<topic>
    ```

2. Keep the change focused, then run `npm run lint` and `npm run build`.
3. Push your branch and open a pull request into the remote `feature/<topic>` branch, not into `dev` or `main`. Fill in the template.
4. A maintainer reviews it, merges the feature branch into `dev`, and later merges `dev` into `main` for a release. Releases are tagged with semantic versions (`v1.2.3`).

## Final words

Thank you for reading our contributing guideline carefully and wanting to contribute to our community project :)