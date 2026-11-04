# Contributing

Thanks for helping with SPRAC Handbook. This file covers who can contribute, setup, conventions and the pull request flow. For an overview of the project see the [README](README.md) and for how the code fits together see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Getting access

New contributors need to be verified before they can contribute:

1. Send your GitHub account link to An0n on Threema: [Contact An0n on Threema](https://threema.id/87YD3CY3)
2. An0n adds you to the contributor team of this repository in the `sprac-ch` organisation.

This is a security measure. It prevents people from impersonating SPARC Community members.

> [!WARNING]
> Use a burner account for opsec reasons.
>
> Questions about SPARC should not be discussed here (as in not on GitHub, or any public forum for that matter).
> Please contact either [SPARC directly](https://sparc-cyberdefence.ch/us/contact/) or, if community-related, [An0n](https://threema.id/87YD3CY3).

## What you can change

### Allowed:
Update information that is not true anymore. Do not forget to add the source of your information under the section that you change and the date of change next to "last verified". Open a pull request and a maintainer reviews it.

- Text, icon paths and logo paths in the Markdown files in `content/` (see [docs/CONTENT.md](docs/CONTENT.md))
- Images and files in `public/assets/` (except `icons/` and `logos/`)

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

`npm run build` type-checks the whole project and reads every Markdown file in `content/`. If a file is missing something the page needs, the build stops and tells you which file and what.

## Code style

- TypeScript in strict mode. Unused variables and parameters fail the build.
- Formatting follows `.prettierrc`: 4 spaces, single quotes, semicolons, print width 200, Tailwind classes sorted by `prettier-plugin-tailwindcss`.
- Files end with exactly one final newline and no blank line after it (see `.editorconfig`). Prettier adds it for you.
- Import from `src` with the `@/` alias, for example `@/components/ui/Button`. Files that `vite.config.ts` imports (`src/content/markdown.ts`, `src/content/siteMeta.ts`, `src/router/pages.ts`, `src/seo/meta.ts`) use relative imports with a `.ts` extension instead.
- Style with Tailwind utility classes and the design tokens in `src/index.css` (`bg-canvas`, `text-fg-muted`, `border-line`, `text-accent`, ...). Do not hard-code colours.
- Icons: use `<Icon name="..." />` from `@/components/ui/Icon`. The allowed names are listed in `src/config/assets.ts` and match the Phosphor icons in `public/assets/icons/`.
- No new runtime dependencies without discussing it in an issue first. The site depends on React and `motion` (for the mobile menu animation) and nothing else.

## Content

The site is English only. All visible content lives in page specific Markdown files in `content/`, one per page, plus `content/site.md` for the navbar, footer and disclaimer. The paths of the icons and logos a page shows are written in the same file, so text and assets are changed in one place. The format is explained in [docs/CONTENT.md](docs/CONTENT.md). Each page has an "Edit this page" button that opens its Markdown file on the `dev` branch.

## Adding a page

1. Add the URL segment to `PAGE_PATHS` in `src/router/pages.ts`.
2. Create `content/<segment>.md` with a `title` and a `description` in the front matter.
3. Write a reader for the file in `src/content/` and the page in `src/pages/<Name>/<Name>.tsx`, and render it in `src/App.tsx`.

The sitemap, the title in search results and the pre-rendered HTML file are generated from `PAGE_PATHS` and the front matter, so there is nothing else to register.

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

| Branch            | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| `main`            | Production. Only maintainers merge into it, for a release.               |
| `dev`             | Newest state of the project. Pull requests go here, maintainers merge.   |
| `feature/<topic>` | One branch per change. You create it from `dev`.                         |

Never push directly to `main` or `dev`.

## Workflow

As a contributor you have write access to this repository, so there is no need to fork it. Work on a branch and never push directly to `main` or `dev`.

1. Clone the repository:

    ```bash
    git clone https://github.com/sprac-ch/handbook.git
    cd handbook
    ```

2. Make sure your commit identity does not leak personal data. Use your burner account details, for example the GitHub noreply address:

    ```bash
    git config user.name "your-burner-username"
    git config user.email "your-burner-username@users.noreply.github.com"
    ```

3. Create a feature branch from an up-to-date `dev`:

    ```bash
    git switch dev
    git pull
    git switch -c feature/short-description
    ```

4. Make your change. Check [What you can change](#what-you-can-change) first, and open an issue before you touch UI or layout. Install the dependencies once with `npm ci`, keep the change focused, then run both checks:

    ```bash
    npm run lint
    npm run build
    ```

5. Commit using the [commit format](#commits) above, for example `fix: update sparc entry requirements`:

    ```bash
    git add .
    git commit -m "fix: update sparc entry requirements"
    ```

6. Push your branch to the repository:

    ```bash
    git push -u origin feature/short-description
    ```

7. Open a pull request from your branch into `dev`, fill in the template and wait for review. If changes are requested, push further commits to the same branch.

A maintainer reviews the pull request and merges it into `dev`. Later they merge `dev` into `main` for a release. Releases are tagged with semantic versions (`v1.2.3`).

For suggestions, use the [issue tracker](https://github.com/sprac-ch/handbook/issues).

## Final words

Thank you for reading our contributing guideline carefully and wanting to contribute to our community project :)
