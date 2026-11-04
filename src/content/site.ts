import { imageOf, keyValue, lists, paragraphs, tables, linkOf, type Section } from './markdown';
import { at, link, required, type LinkSpec } from './read';
import { readDoc } from './source';

const FILE = 'site';

export type NavItem = { label: string; href?: string };
export type ProgramItem = { name: string; logo: string; text: string; href: string };
export type FooterGroup = { title: string; links: { label: string; href: string }[] };

export type Site = {
    name: string;
    /** Path to the site logo in public/. */
    logo: string;
    labels: { newTab: string; openMenu: string; closeMenu: string; mainNavigation: string; editPage: string };
    nav: {
        /** The links of the bar. An item without `href` is the Programs menu. */
        items: NavItem[];
        button: LinkSpec;
        programsLabel: string;
        programs: ProgramItem[];
    };
    footer: { tagline: string; groups: FooterGroup[]; copyright: string; disclaimer: string; lastVerified: string };
    disclaimer: { eyebrow: string; title: string; body: string[]; confirm: string };
};

function readSite(): Site {
    const { meta, root } = readDoc(FILE);
    const sections = root.sections;
    const section = (index: number, what: string): Section => at(sections, index, FILE, what);

    const labelValues = lists(section(0, 'the "Labels" section')).flat().map((item) => keyValue(item)[1]);
    const label = (index: number) => at(labelValues, index, FILE, `label number ${index + 1}`);

    const navigation = section(1, 'the "Navigation" section');
    const navItems = at(lists(navigation), 0, FILE, 'the list of navigation links');
    const programsMenu = at(navigation.sections, 0, FILE, 'the programs table under "Navigation"');
    const button = link(at(navItems, navItems.length - 1, FILE, 'the Wiki button'), FILE);

    const footer = section(2, 'the "Footer" section');
    const groups = footer.sections.slice(0, 3).map((group) => ({
        title: group.title,
        links: at(lists(group), 0, FILE, `the links of "${group.title}"`).map((item) => {
            const { label: text, href } = link(item, FILE);
            return { label: text, href };
        }),
    }));
    const bottom = at(lists(at(footer.sections, 3, FILE, 'the "Bottom bar" section')), 0, FILE, 'the bottom bar list');

    const disclaimer = section(3, 'the disclaimer section');
    const disclaimerLabels = at(lists(disclaimer), 0, FILE, 'the disclaimer labels').map((item) => keyValue(item)[1]);

    return {
        name: required(meta, 'siteName', FILE),
        logo: required(meta, 'logo', FILE),
        labels: { newTab: label(0), openMenu: label(1), closeMenu: label(2), mainNavigation: label(3), editPage: label(4) },
        nav: {
            items: navItems.slice(0, -1).map((item) => {
                const { label: text, href } = linkOf(item);
                return { label: text, href };
            }),
            button,
            programsLabel: programsMenu.title,
            programs: at(tables(programsMenu), 0, FILE, 'the programs table').rows.map(([name, logo, text, href]) => ({ name, logo: imageOf(logo), text, href })),
        },
        footer: {
            tagline: at(paragraphs(footer), 0, FILE, 'the footer text'),
            groups,
            copyright: at(bottom, 0, FILE, 'the copyright line'),
            disclaimer: at(bottom, 1, FILE, 'the disclaimer line'),
            lastVerified: at(bottom, 2, FILE, 'the last verified line'),
        },
        disclaimer: {
            eyebrow: at(disclaimerLabels, 0, FILE, 'the disclaimer eyebrow'),
            title: disclaimer.title,
            body: paragraphs(disclaimer),
            confirm: at(disclaimerLabels, 1, FILE, 'the disclaimer button'),
        },
    };
}

let site: Site | undefined;

/** Content of content/site.md: everything shared by all pages. */
export function getSite(): Site {
    return (site ??= readSite());
}
