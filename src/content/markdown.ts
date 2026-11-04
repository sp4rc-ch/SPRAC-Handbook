// Kept free of path aliases and browser APIs: vite.config.ts imports it at build time.

/*
 * A small reader for the Markdown dialect the content files use (see docs/CONTENT.md).
 * It understands: front matter, headings, paragraphs, bullet and numbered lists, tables,
 * quotes and images, plus **bold**, *italic*, `code`, [links](url) and ![images](path) inside text.
 * Everything else is plain text. There is no dependency on purpose: the site only depends on React.
 */

export type Block =
    | { kind: 'paragraph'; text: string }
    /** A paragraph that holds nothing but an image. */
    | { kind: 'image'; alt: string; src: string }
    /** Items may span several lines: the first line is the title, the rest is the text. */
    | { kind: 'list'; ordered: boolean; items: string[] }
    | { kind: 'table'; header: string[]; rows: string[][] }
    | { kind: 'quote'; text: string };

export type Section = {
    /** 0 for the document itself, 1 to 6 for `#` to `######`. */
    level: number;
    title: string;
    blocks: Block[];
    sections: Section[];
};

export type Doc = {
    /** `key: value` lines of the front matter. */
    meta: Record<string, string>;
    root: Section;
};

const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const BULLET = /^[-*]\s+(.*)$/;
const NUMBERED = /^\d+[.)]\s+(.*)$/;
const IMAGE_ONLY = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

function splitFrontMatter(source: string): { meta: Record<string, string>; body: string } {
    const lines = source.split('\n');
    if (lines[0].trim() !== '---') return { meta: {}, body: source };
    const end = lines.indexOf('---', 1);
    if (end === -1) return { meta: {}, body: source };

    const meta: Record<string, string> = {};
    for (const line of lines.slice(1, end)) {
        const colon = line.indexOf(':');
        if (colon === -1 || line.trimStart().startsWith('#')) continue;
        meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
    }
    return { meta, body: lines.slice(end + 1).join('\n') };
}

function splitRow(line: string): string[] {
    const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/);
    return cells.map((cell) => cell.trim().replace(/\\\|/g, '|'));
}

const isTableStart = (line: string, next: string | undefined) => line.trimStart().startsWith('|') && next !== undefined && /^\s*\|?\s*:?-{3,}/.test(next);

export function parseMarkdown(source: string): Doc {
    const { meta, body } = splitFrontMatter(source.replace(/\r\n?/g, '\n'));
    const lines = body.replace(/<!--[\s\S]*?-->/g, '').split('\n');

    const root: Section = { level: 0, title: '', blocks: [], sections: [] };
    const stack: Section[] = [root];
    const current = () => stack[stack.length - 1];

    let index = 0;
    while (index < lines.length) {
        const line = lines[index];
        const trimmed = line.trim();

        if (trimmed === '' || /^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
            index++;
            continue;
        }

        const heading = HEADING.exec(trimmed);
        if (heading) {
            const section: Section = { level: heading[1].length, title: heading[2], blocks: [], sections: [] };
            while (stack.length > 1 && current().level >= section.level) stack.pop();
            current().sections.push(section);
            stack.push(section);
            index++;
            continue;
        }

        if (isTableStart(line, lines[index + 1])) {
            const header = splitRow(line);
            const rows: string[][] = [];
            index += 2;
            while (index < lines.length && lines[index].trimStart().startsWith('|')) rows.push(splitRow(lines[index++]));
            current().blocks.push({ kind: 'table', header, rows });
            continue;
        }

        if (trimmed.startsWith('>')) {
            const quote: string[] = [];
            while (index < lines.length && lines[index].trim().startsWith('>')) quote.push(lines[index++].trim().replace(/^>\s?/, ''));
            current().blocks.push({ kind: 'quote', text: quote.join(' ').trim() });
            continue;
        }

        const first = BULLET.exec(trimmed) ?? NUMBERED.exec(trimmed);
        if (first) {
            const ordered = NUMBERED.test(trimmed);
            const items: string[] = [];
            while (index < lines.length && lines[index].trim() !== '') {
                const item = lines[index].trim();
                const marker = BULLET.exec(item) ?? NUMBERED.exec(item);
                if (marker && !/^\s{2,}/.test(lines[index])) items.push(marker[1]);
                else if (items.length > 0) items[items.length - 1] += `\n${item}`;
                else break;
                index++;
            }
            current().blocks.push({ kind: 'list', ordered, items });
            continue;
        }

        const paragraph: string[] = [];
        while (index < lines.length) {
            const next = lines[index];
            const text = next.trim();
            if (text === '' || HEADING.test(text) || text.startsWith('>') || BULLET.test(text) || NUMBERED.test(text) || isTableStart(next, lines[index + 1])) break;
            paragraph.push(text);
            index++;
        }
        const text = paragraph.join(' ');
        const image = IMAGE_ONLY.exec(text);
        current().blocks.push(image ? { kind: 'image', alt: image[1], src: image[2] } : { kind: 'paragraph', text });
    }

    return { meta, root };
}

/* ---------- Helpers for reading a parsed document ---------- */

export function paragraphs(section: Section): string[] {
    return section.blocks.flatMap((block) => (block.kind === 'paragraph' ? [block.text] : []));
}

export function lists(section: Section): string[][] {
    return section.blocks.flatMap((block) => (block.kind === 'list' ? [block.items] : []));
}

export function tables(section: Section): { header: string[]; rows: string[][] }[] {
    return section.blocks.flatMap((block) => (block.kind === 'table' ? [{ header: block.header, rows: block.rows }] : []));
}

export function images(section: Section): { alt: string; src: string }[] {
    return section.blocks.flatMap((block) => (block.kind === 'image' ? [{ alt: block.alt, src: block.src }] : []));
}

export function quote(section: Section): string | undefined {
    for (const block of section.blocks) if (block.kind === 'quote') return block.text;
    return undefined;
}

/** "Label: value" -> [label, value]. Only the first colon splits, so values may contain colons. */
export function keyValue(item: string): [string, string] {
    const colon = item.indexOf(':');
    if (colon === -1) return [item.trim(), ''];
    return [item.slice(0, colon).trim(), item.slice(colon + 1).trim()];
}

/** First line of a list item is its title, everything after is its text. */
export function titleAndText(item: string): [string, string] {
    const [title, ...rest] = item.split('\n');
    return [title.trim(), rest.join(' ').trim()];
}

const LINK = /^\[((?:[^[\]]|!\[[^\]]*\]\([^)]*\))*)\]\(([^)\s]+)\)$/;
const TRAILING_IMAGE = /\s*!\[[^\]]*\]\(([^)\s]+)\)\s*$/;

/** "[Label](url)" or "[Label ![](icon)](url)": a link, with an optional icon after the label. Plain text has no href. */
export function linkOf(text: string): { label: string; href?: string; icon?: string } {
    const match = LINK.exec(text.trim());
    if (!match) return { label: text.trim() };
    const icon = TRAILING_IMAGE.exec(match[1])?.[1];
    return { label: match[1].replace(TRAILING_IMAGE, '').trim(), href: match[2], icon };
}

/** The `src` of an image in a table cell, or of a plain path. */
export function imageOf(cell: string): string {
    return IMAGE_ONLY.exec(cell.trim())?.[2] ?? cell.trim();
}

export type Inline =
    | { kind: 'text'; text: string }
    | { kind: 'bold'; text: string }
    | { kind: 'italic'; text: string }
    | { kind: 'code'; text: string }
    | { kind: 'image'; alt: string; src: string }
    | { kind: 'link'; label: string; href: string };

const INLINE = /(\[(?:[^[\]]|!\[[^\]]*\]\([^)]*\))*\]\([^)\s]+\))|(!\[[^\]]*\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(`[^`]+`)|(\*[^*\s][^*]*\*)/g;

/** Splits a piece of text into plain text, bold, italic, code, images and links. */
export function parseInline(text: string): Inline[] {
    const parts: Inline[] = [];
    let last = 0;
    for (const match of text.matchAll(INLINE)) {
        if (match.index > last) parts.push({ kind: 'text', text: text.slice(last, match.index) });
        const [token] = match;
        if (match[1]) {
            const link = linkOf(token);
            parts.push({ kind: 'link', label: link.label, href: link.href ?? '' });
        } else if (match[2]) {
            const image = IMAGE_ONLY.exec(token)!;
            parts.push({ kind: 'image', alt: image[1], src: image[2] });
        } else if (match[3]) {
            parts.push({ kind: 'bold', text: token.slice(2, -2) });
        } else if (match[4]) {
            parts.push({ kind: 'code', text: token.slice(1, -1) });
        } else {
            parts.push({ kind: 'italic', text: token.slice(1, -1) });
        }
        last = match.index + token.length;
    }
    if (last < text.length) parts.push({ kind: 'text', text: text.slice(last) });
    return parts;
}

/** Text with Markdown marks removed, for places that cannot show formatting (page titles, alt text). */
export function plainText(text: string): string {
    return parseInline(text)
        .map((part) => (part.kind === 'image' ? '' : part.kind === 'link' ? part.label : part.kind === 'text' ? part.text : part.text))
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
}
