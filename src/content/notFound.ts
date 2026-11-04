import { lists, paragraphs } from './markdown';
import { at, link, required, type LinkSpec } from './read';
import { readDoc } from './source';

const FILE = 'not-found';

export type NotFound = { eyebrow: string; title: string; text: string; button: LinkSpec };

let notFound: NotFound | undefined;

/** Content of content/not-found.md. */
export function getNotFound(): NotFound {
    if (!notFound) {
        const { meta, root } = readDoc(FILE);
        const page = at(root.sections, 0, FILE, 'the page title (# heading)');
        notFound = {
            eyebrow: required(meta, 'eyebrow', FILE),
            title: page.title,
            text: at(paragraphs(page), 0, FILE, 'the text under the title'),
            button: link(at(at(lists(page), 0, FILE, 'the button list'), 0, FILE, 'the button'), FILE),
        };
    }
    return notFound;
}
