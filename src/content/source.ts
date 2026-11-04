import { parseMarkdown, type Doc } from './markdown';
import { buildSiteMeta, type SiteMeta } from './siteMeta';

/* Every file in content/ is read as text at build time. In the browser and in the pre-render the same strings are used. */
const files = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const cache = new Map<string, Doc>();

/** Raw text of `content/<name>.md`. */
export function readRaw(name: string): string {
    const text = files[`/content/${name}.md`];
    if (text === undefined) throw new Error(`content/${name}.md does not exist`);
    return text;
}

/** Parsed `content/<name>.md`. */
export function readDoc(name: string): Doc {
    let doc = cache.get(name);
    if (!doc) {
        doc = parseMarkdown(readRaw(name));
        cache.set(name, doc);
    }
    return doc;
}

let siteMeta: SiteMeta | undefined;

/** Site name and the title and description of every page, for the <head>. */
export function getSiteMeta(): SiteMeta {
    return (siteMeta ??= buildSiteMeta(readRaw));
}
