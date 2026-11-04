import { imageOf, linkOf, paragraphs, type Section } from './markdown';

/** A link or button written in Markdown: `[Label](url)`, or `[Label ![](icon)](url)` for a button with an icon. */
export type LinkSpec = { label: string; href: string; icon?: string };

/** An icon (path to a file in public/), a title and a sentence. */
export type Tile = { icon: string; title: string; text: string };

export class ContentError extends Error {
    constructor(file: string, message: string) {
        super(`content/${file}.md: ${message}`);
    }
}

/** A front matter field the page cannot do without. */
export function required(meta: Record<string, string>, key: string, file: string): string {
    const value = meta[key];
    if (!value) throw new ContentError(file, `the front matter needs "${key}: ..."`);
    return value;
}

/** Item `index` of a list, or a readable build error naming the file and what is missing. */
export function at<T>(items: T[], index: number, file: string, what: string): T {
    if (index >= items.length) throw new ContentError(file, `${what} is missing (found ${items.length}, need at least ${index + 1})`);
    return items[index];
}

export function link(item: string, file: string): LinkSpec {
    const { label, href, icon } = linkOf(item);
    if (href === undefined) throw new ContentError(file, `"${item}" should be a link like [Label](https://...)`);
    return { label, href, icon };
}

const SOURCE = /^source:/i;

/** The "Source: ..." paragraph of a section. */
export const sourceOf = (section: Section): string | undefined => paragraphs(section).find((text) => SOURCE.test(text));

/** The paragraphs of a section without its source line. */
export const bodyOf = (section: Section): string[] => paragraphs(section).filter((text) => !SOURCE.test(text));

/** A `###` section made of an image, a title and a sentence. */
export function tile(section: Section, file: string): Tile {
    const image = section.blocks.find((block) => block.kind === 'image');
    if (!image || image.kind !== 'image') throw new ContentError(file, `"${section.title}" needs an icon, for example ![](assets/icons/globe.svg)`);
    return { icon: imageOf(image.src), title: section.title, text: bodyOf(section).join(' ') };
}
