import { images, imageOf, keyValue, lists, paragraphs, quote, tables, titleAndText, type Section } from './markdown';
import { at, bodyOf, ContentError, link, sourceOf, tile, type LinkSpec, type Tile } from './read';
import { readDoc } from './source';

/*
 * A program page (SPARC, CyLG, ...) has the same frame: a hero, an "At a glance" card, a row of sections and a card
 * that points to the next step. What differs is which kinds of section the page has and in which order.
 * Each program declares that order (see sparc.ts, cylg.ts); this file reads the Markdown according to it.
 */

export type Course = { code: string; name: string; description: string };
export type Level = { title: string; text: string; courses: Course[] };
export type Checklist = { title: string; items: string[] };
export type Step = { title: string; text: string };
export type OfficialLink = { label: string; value: string; icon: string; href: string };

type Base = { title: string; intro: string[]; source?: string };

/**
 * The kinds of section a program page can have:
 * - `text`: heading and paragraphs only
 * - `tiles`: tiles (### with an icon and a sentence)
 * - `requirements`: checklists (### with a list) next to each other, then tiles
 * - `checklists`: `###` checklists next to each other, all with the same (positive) tone
 * - `levels`: one card per ### with a table of courses
 * - `steps`: a numbered list, then tiles beside it
 * - `rules`: a list of rules (first line title, indented line text)
 * - `yesno`: two ### checklists, "You get" and "You do not get"
 * - `links`: a table of official links
 */
export type SectionKind = 'text' | 'tiles' | 'requirements' | 'checklists' | 'levels' | 'steps' | 'rules' | 'yesno' | 'links';

export type ProgramSection =
    | ({ kind: 'text' } & Base)
    | ({ kind: 'tiles'; tiles: Tile[] } & Base)
    | ({ kind: 'requirements'; lists: Checklist[]; tiles: Tile[] } & Base)
    | ({ kind: 'checklists'; lists: Checklist[] } & Base)
    | ({ kind: 'levels'; levels: Level[] } & Base)
    | ({ kind: 'steps'; steps: Step[]; tiles: Tile[] } & Base)
    | ({ kind: 'rules'; items: Step[] } & Base)
    | ({ kind: 'yesno'; yes: Checklist; no: Checklist } & Base)
    | ({ kind: 'links'; rows: OfficialLink[] } & Base);

export type ProgramPage = {
    name: string;
    /** Path to the program's mark in public/. */
    logo: string;
    intro: string;
    buttons: LinkSpec[];
    note?: string;
    glance: { title: string; facts: [string, string][] };
    sections: ProgramSection[];
    next: { eyebrow: string; title: string; logo: string; text: string; buttons: LinkSpec[] };
};

const hasImage = (section: Section) => section.blocks.some((block) => block.kind === 'image');

function checklist(section: Section, file: string): Checklist {
    return { title: section.title, items: at(lists(section), 0, file, `the list under "${section.title}"`) };
}

function stepsOf(section: Section, file: string): Step[] {
    return at(lists(section), 0, file, `the list in "${section.title}"`).map((item) => {
        const [title, text] = titleAndText(item);
        return { title, text };
    });
}

function readSection(kind: SectionKind, section: Section, file: string): ProgramSection {
    const base: Base = { title: section.title, intro: bodyOf(section), source: sourceOf(section) };
    const tiles = (parts: Section[]) => parts.map((part) => tile(part, file));

    switch (kind) {
        case 'text':
            return { kind, ...base };
        case 'tiles':
            return { kind, ...base, tiles: tiles(section.sections) };
        case 'requirements':
            return {
                kind,
                ...base,
                lists: section.sections.filter((part) => !hasImage(part)).map((part) => checklist(part, file)),
                tiles: tiles(section.sections.filter(hasImage)),
            };
        case 'checklists':
            return { kind, ...base, lists: section.sections.map((part) => checklist(part, file)) };
        case 'levels':
            return {
                kind,
                ...base,
                levels: section.sections.map((level) => ({
                    title: level.title,
                    text: bodyOf(level).join(' '),
                    courses: at(tables(level), 0, file, `the course table of "${level.title}"`).rows.map(([code, name, description]) => ({ code, name, description })),
                })),
            };
        case 'steps':
            return { kind, ...base, steps: stepsOf(section, file), tiles: tiles(section.sections) };
        case 'rules':
            return { kind, ...base, items: stepsOf(section, file) };
        case 'yesno':
            return {
                kind,
                ...base,
                yes: checklist(at(section.sections, 0, file, 'the "You get" part'), file),
                no: checklist(at(section.sections, 1, file, 'the "You do not get" part'), file),
            };
        case 'links':
            return {
                kind,
                ...base,
                rows: at(tables(section), 0, file, 'the table of official links').rows.map(([label, value, icon, href]) => ({ label, value, icon: imageOf(icon), href })),
            };
    }
}

/**
 * Reads `content/<file>.md`. After the title the file has: "At a glance", one `##` section per entry of `layout`
 * (in that order), and the section about the next step.
 */
export function readProgram(file: string, layout: SectionKind[]): ProgramPage {
    const page = at(readDoc(file).root.sections, 0, file, 'the page title (# heading)');
    const parts = page.sections;
    if (parts.length !== layout.length + 2) {
        throw new ContentError(file, `expected ${layout.length + 2} sections after the title (At a glance, ${layout.length} content sections, Next on the path), found ${parts.length}`);
    }

    const glance = parts[0];
    const next = parts[parts.length - 1];
    const nextCard = at(next.sections, 0, file, 'the card under the last section');
    const nextLogo = images(nextCard)[0];
    if (!nextLogo) throw new ContentError(file, `"${nextCard.title}" needs a logo, for example ![](assets/logos/mark-cylg.svg)`);

    return {
        name: page.title,
        logo: imageOf(at(images(page), 0, file, 'the logo under the title').src),
        intro: at(paragraphs(page), 0, file, 'the intro paragraph'),
        buttons: at(lists(page), 0, file, 'the two buttons').map((item) => link(item, file)),
        note: quote(page),
        glance: { title: glance.title, facts: at(lists(glance), 0, file, 'the facts list').map((item) => keyValue(item)) },
        sections: layout.map((kind, index) => readSection(kind, parts[index + 1], file)),
        next: {
            eyebrow: next.title,
            title: nextCard.title,
            logo: imageOf(nextLogo.src),
            text: bodyOf(nextCard).join(' '),
            buttons: at(lists(nextCard), 0, file, 'the two buttons of the last card').map((item) => link(item, file)),
        },
    };
}
