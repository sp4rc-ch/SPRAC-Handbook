# Content

All text of the site, and the paths of the icons and logos it shows, live in Markdown files in [`content/`](../content). Components only decide how things look. To change a sentence, swap an icon or add a tile you edit a Markdown file, nothing else.

| File                          | Page or part                                                       |
| ----------------------------- | ------------------------------------------------------------------ |
| `content/site.md`             | Shared by all pages: navbar, footer, first-visit disclaimer, labels |
| `content/home.md`             | Homepage (`/`)                                                     |
| `content/sparc.md`            | SPARC page (`/sparc/`)                                             |
| `content/cylg.md`             | Cyber Lehrgang page (`/cylg/`)                                     |
| `content/cybat42.md`          | Cyber Bataillon 42 page (`/cybat42/`)                              |
| `content/path.md`             | Path page (`/path/`)                                               |
| `content/legal-notice.md`     | Legal notice (`/legal-notice/`)                                    |
| `content/privacy-policy.md`   | Privacy policy (`/privacy-policy/`)                                |
| `content/not-found.md`        | The 404 page                                                       |

A page's file is named after its URL: `/sparc/` reads `content/sparc.md`, the homepage reads `content/home.md`.

## Writing rules

Every file starts with a few lines between `---` marks. They are used for the page title and description in search results (`title`, `description`), not shown on the page itself.

```md
---
title: SPARC
description: SPARC explained: what the programme is, who it is for and how to join.
---
```

The rest is ordinary Markdown:

| You write                       | You get                                                              |
| ------------------------------- | -------------------------------------------------------------------- |
| `# Title`, `## Section`, `###`  | The page title, a section, a part of a section                       |
| A paragraph                     | A paragraph                                                          |
| `**bold**`, `*italic*`, `` `code` `` | Emphasis in the text                                            |
| `[text](https://...)`           | A link. See "Links" below                                            |
| `- item` or `1. item`           | A list                                                               |
| `> text`                        | A highlighted note (the yellow bar)                                  |
| `\| a \| b \|` rows             | A table, with a header row and a `\| --- \| --- \|` row under it     |
| `![](assets/icons/globe.svg)`   | An icon or logo. The path starts in `public/`                        |
| `<!-- text -->`                 | A comment for editors, shown nowhere                                 |

### Links

| Address                         | What happens                                       |
| ------------------------------- | -------------------------------------------------- |
| `https://...`                   | Opens the other site in a new tab                  |
| `/sparc/`                       | Goes to that page of this site                     |
| `#`                             | The page is not built yet: the link stays, nothing happens |
| `#programs`                     | Scrolls to a place on the same page                |
| `mailto:...`, `tel:...`         | Opens the mail or phone app                        |

A button with an icon is a link with an image after its label: `[Open an issue ![](assets/icons/arrow-up-right.svg)](https://...)`.

### Icons and logos

The path of every icon and logo you see in the content is written in the Markdown file, so you can replace one by pointing to another file in `public/`. Add new files to `public/assets/icons/` or `public/assets/logos/` and write their path. Icons shown through a path must be single-colour SVG files like the ones in `public/assets/icons/`: the site colours them. Icons that belong to the design itself (the caret of a menu, the check marks, the burger) are part of the components and not in the Markdown.

## How each page is read

A page has a fixed layout, so its sections come in a fixed order. Inside a section you can change text freely and add or remove entries. If a section is missing, the build stops and names the file and what is missing.

Anything written after a `###` heading belongs to that part, up to the next heading. Put intro text, `Source:` lines and notes (`> ...`) before the first `###` of a section.

### Program pages: `sparc.md`, `cylg.md` and `cybat42.md`

SPARC, the Cyber Lehrgang and Cyber Bataillon 42 share one frame and are read by the same code (`src/content/program.ts`). A program page is:

1. `# Name`: the program's logo as an image, the intro paragraph, a list of two links (the yellow button, then the outlined one) and a `>` note.
2. `## At a glance`: a list of `Label: value` lines.
3. Then one `##` section per entry of the page's layout, in that order. Each section has one of these kinds:

| Kind           | What you write in the section                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `text`         | Paragraphs only                                                                                                     |
| `tiles`        | `###` tiles: an icon, then a sentence                                                                               |
| `requirements` | `###` checklists (a list) shown side by side, then `###` tiles                                                      |
| `checklists`   | `###` checklists (a list) shown side by side                                                                        |
| `levels`       | One `###` per card, with a sentence and a table `Code \| Name \| What it covers`                                     |
| `steps`        | A numbered list (the first line of a step is its title, the indented line below is its text), then `###` tiles      |
| `rules`        | A list in the same form as the steps                                                                                |
| `yesno`        | Two `###` parts with a list each: "You get", then "You do not get"                                                  |
| `links`        | A table `What for \| Shown as \| Icon \| Link`                                                                      |

4. The last section, "Next on the path": one `###` card with a logo, a sentence and a list of two links (outlined, then yellow).

The order of the sections:

- `sparc.md`: *What SPARC is* (`text`), *Is it for you?* (`requirements`), *What you learn* (`levels`), *How it works* (`tiles`), *How to join* (`steps`), *Rules and deadlines* (`rules`), *What you get* (`yesno`), *Help and official links* (`links`).
- `cylg.md`: *What the CYLG is* (`tiles`), *Is it for you?* (`requirements`), *What you learn* (`levels`), *How to get in* (`steps`), *During the course* (`tiles`), *Commitments and deadlines* (`rules`), *What you get* (`yesno`), *Help and official links* (`links`).
- `cybat42.md`: *What it does* (`tiles`), *Where it fits* (`tiles`), *Roles and fields* (`checklists`), *Join through lateral entry* (`steps`), *Service* (`rules`), *Growth and limits* (`yesno`), *Help and official links* (`links`).

Details:

- A paragraph that starts with `Source:` is the source line shown at the end of its section.
- Tiles come in rows of three when the number of tiles divides by three, otherwise in rows of two.
- Every section can be linked to with its title: `[How to get in](#how-to-get-in)` scrolls to the section called "How to get in".
- The page title is shown smaller on phones when it is longer than 8 characters.

### `path.md`

1. `# Title`: the headline, the lead paragraph and a list of two links (the yellow button, then the outlined one).
2. `## The route`: a `>` note (shown under the route card), a list of two legend labels (main route, lateral entry), then one `###` per stop with a logo, the phase (first paragraph), a list of badges and a sentence. The `###` without a logo is the lateral entry strip: a sentence and a list with one link. A badge is yellow by default; start it with `neutral:`, `warning:` or `info:` for another colour (`- warning: Compulsory`).
3. `## Where are you now?`: an intro, a line `Default: 16+` (the chip that is selected first), a `Source:` line, then one `###` per chip (the heading is the chip). Inside it:
   - `####` the title of the panel, then its sentence and a list with one link (the button);
   - `#####` three boxes in this order: *By when* (the text, optionally a second line below it), *You need* (a list) and *Where* (a list of `Text: [address](url)`);
   - an optional fourth `#####` box with a sentence and a list of topics (shown as grey badges).
4. `## Who to ask`: an intro, a `Source:` line and a table `What for | Shown as | Icon | Link`.
5. `## Ready?`: one `###` card with a sentence and a list of two links (yellow, then outlined).

### `home.md`

1. `# Your path into Swiss Army **cyber.**`: the bold words turn yellow. Then the intro and a list of two links.
2. `## ...` programs: an intro, a `>` note, then one `###` card per program with a logo, a sentence, a list of `Label: value` facts and a `[Read more](/sparc/)` link.
3. `## ...` contribute: a paragraph, the git command in `` `backticks` ``, a list of two links, a `>` note (before the first `###`), then one `###` per way to contribute (icon and sentence).

### `site.md`

- `## Labels`: five lines `Name: text` for screen readers and buttons, in this order: new tab, open menu, close menu, main navigation, edit page.
- `## Navigation`: a list. The first link is the Homepage, a line without a link is the Programs menu, the last item is the yellow button. The `### Programs` table below lists the menu entries: `Name | Logo | Description | Link`.
- `## Footer`: the footer text, then `###` groups of links (three groups), then `### Bottom bar` with three lines: copyright, disclaimer, last verified.
- `## Disclaimer`: a list with the eyebrow and the button text, then the paragraphs of the disclaimer. The heading is the dialog title.

### Legal notice and privacy policy

`# Title`, a lead paragraph and a list of three `Label: value` lines (the strip under the lead). Then one `##` per section. In a section:

- A list whose lines all start with `**Label:**` becomes a key/value list, any other list becomes bullets.
- A table becomes a table on tablet and desktop and cards on phones.
- A line that holds only a link is shown as a link on its own.

### `not-found.md`

`eyebrow:` in the front matter, `# Title`, a paragraph and a list with one link (the button).

## Adding a page

1. Add the URL segment to `PAGE_PATHS` in `src/router/pages.ts`.
2. Create `content/<segment>.md` with `title` and `description`.
3. Write a reader for it in `src/content/` and a page component in `src/pages/`, and render it in `src/App.tsx`. A program page only needs its list of section kinds (see `cylg.ts`) and a page component that shows `ProgramPageView` (see `pages/Cylg/Cylg.tsx`).

The sitemap, the title in search results and the pre-rendered HTML file come from steps 1 and 2.

## Editing on GitHub

The "Edit this page" button on a page opens its Markdown file on the `dev` branch. Do not commit there: follow the workflow in [CONTRIBUTING.md](../CONTRIBUTING.md) and open a pull request.
