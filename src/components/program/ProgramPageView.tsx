import { Inline } from '@/components/content/Inline';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { publicUrl } from '@/config/assets';
import { fileUrl } from '@/config/links';
import type { Checklist, ProgramPage, ProgramSection as SectionContent } from '@/content/program';
import type { Tile } from '@/content/read';
import { getSite } from '@/content/site';
import { CheckItem } from './CheckItem';
import { FactRow } from './FactRow';
import { LevelCard } from './LevelCard';
import { LinkRow } from './LinkRow';
import { ProgramSection } from './ProgramSection';
import { ProgramStep } from './ProgramStep';
import { ProgramTile } from './ProgramTile';

/**
 * Tiles side by side from tablet up: three in a row when they divide by three, otherwise two. Each row is its own
 * block, so on phones the tiles of a row are 16px apart and the rows 24px apart, as in the iPhone frames.
 */
function TileGrid({ tiles }: { tiles: Tile[] }) {
    const perRow = tiles.length % 3 === 0 ? 3 : 2;
    const columns = perRow === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
    const rows = Array.from({ length: Math.ceil(tiles.length / perRow) }, (_, index) => tiles.slice(index * perRow, (index + 1) * perRow));

    return (
        <div className="flex flex-col gap-6">
            {rows.map((row) => (
                <div key={row[0].title} className={`grid gap-4 md:gap-6 ${columns}`}>
                    {row.map((tile) => (
                        <ProgramTile key={tile.title} icon={tile.icon} title={tile.title} text={tile.text} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function ChecklistCard({ list }: { list: Checklist }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-line-subtle bg-surface p-6 md:p-8">
            <h3 className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{list.title}</h3>
            <ul className="flex flex-col gap-4">
                {list.items.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                ))}
            </ul>
        </div>
    );
}

function YesNoCard({ list, tone }: { list: Checklist; tone?: 'negative' }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-line-subtle bg-surface p-6 md:p-8">
            <h3 className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em]">{list.title}</h3>
            <ul className="flex flex-col gap-4">
                {list.items.map((item) => (
                    <CheckItem key={item} tone={tone}>
                        {item}
                    </CheckItem>
                ))}
            </ul>
        </div>
    );
}

/** Titles longer than this are set smaller on phones, as in the iPhone frame of the Cyber Lehrgang page. */
const LONG_TITLE = 8;

/** One section of the article, drawn according to its kind. */
function Section({ section }: { section: SectionContent }) {
    const { title, intro, source } = section;

    switch (section.kind) {
        case 'text':
            return <ProgramSection title={title} intro={intro} source={source} />;
        case 'tiles':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <TileGrid tiles={section.tiles} />
                </ProgramSection>
            );
        case 'requirements':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    {section.lists.length > 0 && (
                        <div className={`grid gap-6 ${section.lists.length > 1 ? 'md:grid-cols-2' : ''}`}>
                            {section.lists.map((list) => (
                                <ChecklistCard key={list.title} list={list} />
                            ))}
                        </div>
                    )}
                    {section.tiles.length > 0 && <TileGrid tiles={section.tiles} />}
                </ProgramSection>
            );
        case 'checklists':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {section.lists.map((list) => (
                            <YesNoCard key={list.title} list={list} />
                        ))}
                    </div>
                </ProgramSection>
            );
        case 'levels':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <div className="flex flex-col gap-6">
                        {section.levels.map((level) => (
                            <LevelCard key={level.title} title={level.title} text={level.text} courses={level.courses} />
                        ))}
                    </div>
                </ProgramSection>
            );
        case 'steps':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <ol className="flex flex-col gap-6 xl:flex-1">
                            {section.steps.map((step, index) => (
                                <ProgramStep key={step.title} number={index + 1} title={step.title} text={step.text} />
                            ))}
                        </ol>
                        <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:flex-1 xl:grid-cols-1 xl:grid-rows-[1fr_1fr]">
                            {section.tiles.map((tile) => (
                                <ProgramTile key={tile.title} icon={tile.icon} title={tile.title} text={tile.text} />
                            ))}
                        </div>
                    </div>
                </ProgramSection>
            );
        case 'rules':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <ul className="flex flex-col rounded-xl border border-line-subtle bg-surface px-5 py-1 md:px-8 md:py-2">
                        {section.items.map((item) => (
                            <li key={item.title} className="flex flex-col gap-1 border-b border-line-subtle py-5 last:border-b-0">
                                <p className="text-base leading-[1.2] font-medium text-fg">{item.title}</p>
                                <p className="text-sm leading-[1.5] text-fg-muted">
                                    <Inline text={item.text} />
                                </p>
                            </li>
                        ))}
                    </ul>
                </ProgramSection>
            );
        case 'yesno':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        <YesNoCard list={section.yes} />
                        <YesNoCard list={section.no} tone="negative" />
                    </div>
                </ProgramSection>
            );
        case 'links':
            return (
                <ProgramSection title={title} intro={intro} source={source}>
                    <ul className="rounded-xl border border-line-subtle bg-surface px-5 py-1 md:px-6">
                        {section.rows.map((row) => (
                            <LinkRow key={row.value} label={row.label} value={row.value} href={row.href} icon={row.icon} />
                        ))}
                    </ul>
                </ProgramSection>
            );
    }
}

type ProgramPageViewProps = {
    page: ProgramPage;
    /** Name of the page's file in content/ (without .md): the "Edit this page" button opens it on GitHub. */
    contentFile: string;
};

/** A program page: SPARC, the Cyber Lehrgang, ... Desktop 1440, iPad 834, iPhone 393. */
export function ProgramPageView({ page, contentFile }: ProgramPageViewProps) {
    const { labels } = getSite();
    const { glance, next } = page;
    const titleSize = page.name.length > LONG_TITLE ? 'text-[40px] leading-[46px] [text-box:trim-both_cap_alphabetic] md:text-[56px] md:leading-[1.1]' : 'text-[56px] leading-[1.1]';

    return (
        <PageLayout>
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pt-4 pb-16 md:gap-12 md:px-8 md:pt-6 md:pb-24 lg:gap-16 lg:px-20 lg:pt-8 lg:pb-32">
                <div className="flex justify-end">
                    {/* Opens this page's Markdown file on the dev branch: the starting point for a change. */}
                    <Button href={fileUrl(`content/${contentFile}.md`)} variant="secondary" size="s" icon="pencil-simple">
                        {labels.editPage}
                    </Button>
                </div>

                <section className="grid gap-10 xl:grid-cols-[1fr_400px] xl:gap-x-20 xl:gap-y-6">
                    <div className="flex flex-col gap-6 xl:col-start-1 xl:row-start-1">
                        <div className="flex items-center gap-5">
                            <img src={publicUrl(page.logo)} alt="" width={72} height={72} className="size-14 shrink-0 md:size-18" />
                            <h1 className={`min-w-0 flex-1 font-display font-bold tracking-[-0.025em] ${titleSize}`}>{page.name}</h1>
                        </div>
                        <p className="text-base leading-[1.6] text-fg-muted md:text-lg">
                            <Inline text={page.intro} />
                        </p>
                        <div className="flex flex-col gap-3 md:flex-row">
                            {page.buttons.map((button, index) => (
                                <Button key={button.label} href={button.href} iconSrc={button.icon} variant={index === 0 ? 'primary' : 'secondary'} fullWidthOnMobile>
                                    {button.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <aside className="self-start rounded-xl border border-line-subtle bg-surface px-5 py-6 md:p-8 xl:col-start-2 xl:row-span-2 xl:row-start-1">
                        <h2 className="pb-1 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">{glance.title}</h2>
                        <dl className="flex flex-col gap-1">
                            {glance.facts.map(([label, value]) => (
                                <FactRow key={label} label={label} value={value} />
                            ))}
                        </dl>
                    </aside>
                    {page.note && (
                        <div className="md:mt-2 xl:col-start-1 xl:row-start-2 xl:mt-0">
                            <Callout>
                                <Inline text={page.note} />
                            </Callout>
                        </div>
                    )}
                </section>

                <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
                    {page.sections.map((section) => (
                        <Section key={section.title} section={section} />
                    ))}
                </div>

                <section className="flex flex-col gap-6 rounded-xl border border-line bg-surface px-5 py-6 md:p-10 xl:flex-row xl:items-center xl:gap-8">
                    <img src={publicUrl(next.logo)} alt="" width={72} height={72} className="size-14 shrink-0 md:size-18" />
                    <div className="flex min-w-0 flex-col gap-2 xl:flex-1">
                        <p className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">{next.eyebrow}</p>
                        <h2 className="font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-[22px] lg:text-2xl">{next.title}</h2>
                        <p className="text-base leading-[1.6] text-fg-muted">
                            <Inline text={next.text} />
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:flex-row xl:shrink-0">
                        {next.buttons.map((button, index) => (
                            <Button key={button.label} href={button.href} iconSrc={button.icon} variant={index === 0 ? 'secondary' : 'primary'} fullWidthOnMobile>
                                {button.label}
                            </Button>
                        ))}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
