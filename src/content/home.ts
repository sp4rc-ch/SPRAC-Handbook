import { images, imageOf, keyValue, lists, paragraphs, quote } from './markdown';
import { at, ContentError, link, tile, type LinkSpec, type Tile } from './read';
import { readDoc } from './source';

const FILE = 'home';

export type ProgramCardContent = { name: string; logo: string; text: string; facts: [string, string][]; readMore: LinkSpec };

export type Home = {
    title: { lead: string; accent: string };
    intro: string;
    buttons: LinkSpec[];
    programs: { title: string; intro: string; note?: string; cards: ProgramCardContent[] };
    contribute: { title: string; body: string; command: string; buttons: LinkSpec[]; ways: Tile[]; note?: string };
};

function readHome(): Home {
    const page = at(readDoc(FILE).root.sections, 0, FILE, 'the page title (# heading)');
    const programs = at(page.sections, 0, FILE, 'the programs section');
    const contribute = at(page.sections, 1, FILE, 'the contribute section');

    // "Your path into Swiss Army **cyber.**": the bold words are the yellow ones.
    const title = /^(.*?)\s*\*\*(.+)\*\*\s*$/.exec(page.title);

    const contributeText = paragraphs(contribute);
    const command = contributeText.find((text) => /^`.+`$/.test(text));
    if (!command) throw new ContentError(FILE, 'the contribute section needs the git command in `backticks`');

    return {
        title: { lead: title?.[1] ?? page.title, accent: title?.[2] ?? '' },
        intro: at(paragraphs(page), 0, FILE, 'the intro paragraph'),
        buttons: at(lists(page), 0, FILE, 'the two buttons').map((item) => link(item, FILE)),
        programs: {
            title: programs.title,
            intro: at(paragraphs(programs), 0, FILE, 'the programs intro'),
            note: quote(programs),
            cards: programs.sections.map((card) => {
                const text = paragraphs(card);
                return {
                    name: card.title,
                    logo: imageOf(at(images(card), 0, FILE, `the logo of "${card.title}"`).src),
                    text: at(text, 0, FILE, `the description of "${card.title}"`),
                    facts: at(lists(card), 0, FILE, `the facts of "${card.title}"`).map((item) => keyValue(item)),
                    readMore: link(at(text, 1, FILE, `the "Read more" link of "${card.title}"`), FILE),
                };
            }),
        },
        contribute: {
            title: contribute.title,
            body: at(contributeText.filter((text) => text !== command), 0, FILE, 'the contribute text'),
            command: command.slice(1, -1),
            buttons: at(lists(contribute), 0, FILE, 'the contribute buttons').map((item) => link(item, FILE)),
            ways: contribute.sections.map((way) => tile(way, FILE)),
            note: quote(contribute),
        },
    };
}

let home: Home | undefined;

/** Content of content/home.md. */
export function getHome(): Home {
    return (home ??= readHome());
}
