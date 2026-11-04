import { keyValue, lists, paragraphs, type Block } from './markdown';
import { at } from './read';
import { readDoc } from './source';

export type LegalContent = {
    title: string;
    lead: string;
    /** The three fields of the strip under the lead: label and value. */
    meta: [string, string][];
    sections: { heading: string; blocks: Block[] }[];
};

/** Content of a legal page (legal-notice, privacy-policy): lead, a strip of three fields, then plain sections. */
export function readLegal(file: string): LegalContent {
    const page = at(readDoc(file).root.sections, 0, file, 'the page title (# heading)');
    return {
        title: page.title,
        lead: at(paragraphs(page), 0, file, 'the lead paragraph'),
        meta: at(lists(page), 0, file, 'the three fields under the lead').map((item) => keyValue(item)),
        sections: page.sections.map((section) => ({ heading: section.title, blocks: section.blocks })),
    };
}
