import { imageOf, images, keyValue, linkOf, lists, paragraphs, quote, slugify, tables, type Section } from './markdown';
import { at, bodyOf, ContentError, link, sourceOf, type LinkSpec } from './read';
import { readDoc } from './source';
import type { OfficialLink } from './program';

const FILE = 'path';

export type BadgeTone = 'accent' | 'neutral' | 'warning' | 'info';
export type BadgeSpec = { label: string; tone: BadgeTone };
export type Station = { logo: string; phase: string; title: string; badges: BadgeSpec[]; text: string };
export type LateralEntry = { tag: string; text: string; button: LinkSpec };
export type Place = { note: string; value: string; href?: string };

/** The three boxes of a situation panel (by when, you need, where), plus an optional extra box. */
export type Situation = {
    id: string;
    label: string;
    title: string;
    text: string;
    button: LinkSpec;
    byWhen: { label: string; value: string; note?: string };
    needs: { label: string; items: string[] };
    where: { label: string; places: Place[] };
    extra?: { label: string; text: string; topics: BadgeSpec[] };
};

export type PathPage = {
    title: string;
    lead: string;
    buttons: LinkSpec[];
    route: { title: string; legend: string[]; stations: Station[]; lateral: LateralEntry; note?: string };
    situations: { title: string; id: string; intro: string[]; source?: string; items: Situation[]; initial: number };
    contacts: { title: string; id: string; intro: string[]; source?: string; rows: OfficialLink[] };
    start: { eyebrow: string; title: string; text: string; buttons: LinkSpec[] };
};

const TONES: BadgeTone[] = ['neutral', 'warning', 'info'];

/** "warning: Compulsory" is a badge with the warning colour. A badge without a prefix is yellow. */
function badge(item: string): BadgeSpec {
    const [prefix, rest] = keyValue(item);
    return TONES.includes(prefix as BadgeTone) ? { tone: prefix as BadgeTone, label: rest } : { tone: 'accent', label: item.trim() };
}

function station(section: Section): Station {
    const [phase, text] = [at(paragraphs(section), 0, FILE, `the phase of "${section.title}"`), at(paragraphs(section), 1, FILE, `the sentence of "${section.title}"`)];
    return {
        logo: imageOf(at(images(section), 0, FILE, `the logo of "${section.title}"`).src),
        phase,
        title: section.title,
        badges: at(lists(section), 0, FILE, `the badges of "${section.title}"`).map(badge),
        text,
    };
}

function place(item: string): Place {
    const [note, value] = keyValue(item);
    const { label, href } = linkOf(value);
    return { note, value: label, href };
}

function situation(section: Section): Situation {
    const card = at(section.sections, 0, FILE, `the title of "${section.title}" (a #### heading)`);
    const [when, needs, where, extra] = card.sections;
    const detail = (part: Section | undefined, what: string) => at(part ? [part] : [], 0, FILE, `${what} of "${section.title}" (a ##### heading)`);
    const whenPart = detail(when, 'the "By when" box');
    const needsPart = detail(needs, 'the "You need" box');
    const wherePart = detail(where, 'the "Where" box');
    const [value, note] = paragraphs(whenPart);

    return {
        id: slugify(section.title),
        label: section.title,
        title: card.title,
        text: at(bodyOf(card), 0, FILE, `the text of "${section.title}"`),
        button: link(at(lists(card)[0] ?? [], 0, FILE, `the button of "${section.title}"`), FILE),
        byWhen: { label: whenPart.title, value: at([value], 0, FILE, `the "By when" text of "${section.title}"`), note },
        needs: { label: needsPart.title, items: at(lists(needsPart), 0, FILE, `the "You need" list of "${section.title}"`) },
        where: { label: wherePart.title, places: at(lists(wherePart), 0, FILE, `the "Where" list of "${section.title}"`).map(place) },
        extra: extra && { label: extra.title, text: at(paragraphs(extra), 0, FILE, `the text of "${extra.title}"`), topics: (lists(extra)[0] ?? []).map((topic) => ({ label: topic, tone: 'neutral' as const })) },
    };
}

function links(section: Section): OfficialLink[] {
    return at(tables(section), 0, FILE, 'the table of contacts').rows.map(([label, value, icon, href]) => ({ label, value, icon: imageOf(icon), href }));
}

const DEFAULT = /^default:\s*(.+)$/i;

function readPath(): PathPage {
    const page = at(readDoc(FILE).root.sections, 0, FILE, 'the page title (# heading)');
    const [route, where, contacts, start] = [0, 1, 2, 3].map((index) => at(page.sections, index, FILE, `section number ${index + 1} (the route, "Where are you now?", who to ask, the closing card)`));

    const stations = route.sections.filter((part) => images(part).length > 0);
    const lateralPart = at(
        route.sections.filter((part) => images(part).length === 0),
        0,
        FILE,
        'the lateral entry part of the route (a ### heading without a logo)'
    );

    const items = where.sections.map(situation);
    const initialLabel = paragraphs(where).map((text) => DEFAULT.exec(text)?.[1]).find(Boolean);
    const initial = Math.max(0, items.findIndex((item) => item.label === initialLabel));
    if (initialLabel && !items.some((item) => item.label === initialLabel)) throw new ContentError(FILE, `"Default: ${initialLabel}" does not match any situation`);

    const card = at(start.sections, 0, FILE, 'the card under the last section');

    return {
        title: page.title,
        lead: at(paragraphs(page), 0, FILE, 'the intro paragraph'),
        buttons: at(lists(page), 0, FILE, 'the two buttons').map((item) => link(item, FILE)),
        route: {
            title: route.title,
            legend: at(lists(route), 0, FILE, 'the two legend entries'),
            stations: stations.map(station),
            lateral: { tag: lateralPart.title, text: at(paragraphs(lateralPart), 0, FILE, 'the lateral entry sentence'), button: link(at(lists(lateralPart)[0] ?? [], 0, FILE, 'the lateral entry button'), FILE) },
            note: quote(route),
        },
        situations: {
            title: where.title,
            id: slugify(where.title),
            intro: bodyOf(where).filter((text) => !DEFAULT.test(text)),
            source: sourceOf(where),
            items,
            initial,
        },
        contacts: { title: contacts.title, id: slugify(contacts.title), intro: bodyOf(contacts), source: sourceOf(contacts), rows: links(contacts) },
        start: {
            eyebrow: start.title,
            title: card.title,
            text: at(bodyOf(card), 0, FILE, 'the sentence of the closing card'),
            buttons: at(lists(card), 0, FILE, 'the two buttons of the closing card').map((item) => link(item, FILE)),
        },
    };
}

let path: PathPage | undefined;

/** Content of content/path.md. */
export function getPath(): PathPage {
    return (path ??= readPath());
}
