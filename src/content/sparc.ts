import { images, imageOf, keyValue, lists, paragraphs, quote, tables, titleAndText } from './markdown';
import { at, bodyOf, ContentError, link, sourceOf, tile, type LinkSpec, type Tile } from './read';
import { readDoc } from './source';

const FILE = 'sparc';

export type Course = { code: string; name: string; description: string };
export type Level = { title: string; text: string; courses: Course[] };
export type ChecklistContent = { title: string; items: string[] };
export type OfficialLink = { label: string; value: string; icon: string; href: string };

export type Sparc = {
    name: string;
    logo: string;
    intro: string;
    buttons: LinkSpec[];
    note?: string;
    glance: { title: string; facts: [string, string][] };
    what: { title: string; text: string[]; source?: string };
    forYou: { title: string; intro: string[]; source?: string; requirements: ChecklistContent; cases: Tile[] };
    learn: { title: string; intro: string[]; source?: string; levels: Level[] };
    how: { title: string; intro: string[]; source?: string; tiles: Tile[] };
    join: { title: string; intro: string[]; source?: string; steps: { title: string; text: string }[]; accounts: Tile[] };
    rules: { title: string; intro: string[]; source?: string; items: { title: string; text: string }[] };
    get: { title: string; source?: string; yes: ChecklistContent; no: ChecklistContent };
    links: { title: string; intro: string[]; source?: string; rows: OfficialLink[] };
    next: { eyebrow: string; title: string; logo: string; text: string; buttons: LinkSpec[] };
};

function readSparc(): Sparc {
    const page = at(readDoc(FILE).root.sections, 0, FILE, 'the page title (# heading)');
    const sections = page.sections;
    const section = (index: number, what: string) => at(sections, index, FILE, `section number ${index + 1} (${what})`);

    const glance = section(0, 'At a glance');
    const what = section(1, 'What SPARC is');
    const forYou = section(2, 'Is it for you?');
    const learn = section(3, 'What you learn');
    const how = section(4, 'How it works');
    const join = section(5, 'How to join');
    const rules = section(6, 'Rules and deadlines');
    const get = section(7, 'What you get');
    const links = section(8, 'Help and official links');
    const next = section(9, 'Next on the path');

    const checklist = (item: (typeof get)['sections'][number]): ChecklistContent => ({ title: item.title, items: at(lists(item), 0, FILE, `the list under "${item.title}"`) });
    const nextCard = at(next.sections, 0, FILE, 'the card under "Next on the path"');
    const nextLogo = images(nextCard)[0];
    if (!nextLogo) throw new ContentError(FILE, `"${nextCard.title}" needs a logo, for example ![](assets/logos/mark-cylg.svg)`);

    return {
        name: page.title,
        logo: imageOf(at(images(page), 0, FILE, 'the logo under the title').src),
        intro: at(paragraphs(page), 0, FILE, 'the intro paragraph'),
        buttons: at(lists(page), 0, FILE, 'the two buttons').map((item) => link(item, FILE)),
        note: quote(page),
        glance: { title: glance.title, facts: at(lists(glance), 0, FILE, 'the facts list').map((item) => keyValue(item)) },
        what: { title: what.title, text: bodyOf(what), source: sourceOf(what) },
        forYou: {
            title: forYou.title,
            intro: bodyOf(forYou),
            source: sourceOf(forYou),
            requirements: checklist(at(forYou.sections, 0, FILE, 'the "Requirements" part')),
            cases: forYou.sections.slice(1).map((item) => tile(item, FILE)),
        },
        learn: {
            title: learn.title,
            intro: bodyOf(learn),
            source: sourceOf(learn),
            levels: learn.sections.map((level) => ({
                title: level.title,
                text: bodyOf(level).join(' '),
                courses: at(tables(level), 0, FILE, `the course table of "${level.title}"`).rows.map(([code, name, description]) => ({ code, name, description })),
            })),
        },
        how: { title: how.title, intro: bodyOf(how), source: sourceOf(how), tiles: how.sections.map((item) => tile(item, FILE)) },
        join: {
            title: join.title,
            intro: bodyOf(join),
            source: sourceOf(join),
            steps: at(lists(join), 0, FILE, 'the numbered steps').map((item) => {
                const [title, text] = titleAndText(item);
                return { title, text };
            }),
            accounts: join.sections.map((item) => tile(item, FILE)),
        },
        rules: {
            title: rules.title,
            intro: bodyOf(rules),
            source: sourceOf(rules),
            items: at(lists(rules), 0, FILE, 'the list of rules').map((item) => {
                const [title, text] = titleAndText(item);
                return { title, text };
            }),
        },
        get: {
            title: get.title,
            source: sourceOf(get),
            yes: checklist(at(get.sections, 0, FILE, 'the "You get" part')),
            no: checklist(at(get.sections, 1, FILE, 'the "You do not get" part')),
        },
        links: {
            title: links.title,
            intro: bodyOf(links),
            source: sourceOf(links),
            rows: at(tables(links), 0, FILE, 'the table of official links').rows.map(([label, value, icon, href]) => ({ label, value, icon: imageOf(icon), href })),
        },
        next: {
            eyebrow: next.title,
            title: nextCard.title,
            logo: imageOf(nextLogo.src),
            text: bodyOf(nextCard).join(' '),
            buttons: at(lists(nextCard), 0, FILE, 'the two buttons of the last card').map((item) => link(item, FILE)),
        },
    };
}

let sparc: Sparc | undefined;

/** Content of content/sparc.md. */
export function getSparc(): Sparc {
    return (sparc ??= readSparc());
}
