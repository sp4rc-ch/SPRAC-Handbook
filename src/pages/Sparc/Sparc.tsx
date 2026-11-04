import { Inline } from '@/components/content/Inline';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { CheckItem } from '@/components/program/CheckItem';
import { FactRow } from '@/components/program/FactRow';
import { LevelCard } from '@/components/program/LevelCard';
import { LinkRow } from '@/components/program/LinkRow';
import { ProgramSection } from '@/components/program/ProgramSection';
import { ProgramStep } from '@/components/program/ProgramStep';
import { ProgramTile } from '@/components/program/ProgramTile';
import { publicUrl } from '@/config/assets';
import { fileUrl } from '@/config/links';
import { getSparc } from '@/content/sparc';
import { getSite } from '@/content/site';
import { contentName } from '@/router/pages';

/** SPARC program page. Desktop 1440, iPad 834, iPhone 393. Content: content/sparc.md. */
export function Sparc() {
    const page = getSparc();
    const { labels } = getSite();
    const { glance, what, forYou, learn, how, join, rules, get, links, next } = page;

    return (
        <PageLayout>
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pt-4 pb-16 md:gap-12 md:px-8 md:pt-6 md:pb-24 lg:gap-16 lg:px-20 lg:pt-8 lg:pb-32">
                <div className="flex justify-end">
                    {/* Opens this page's Markdown file on the dev branch: the starting point for a change. */}
                    <Button href={fileUrl(`content/${contentName('sparc')}.md`)} variant="secondary" size="s" icon="pencil-simple">
                        {labels.editPage}
                    </Button>
                </div>

                <section className="grid gap-10 xl:grid-cols-[1fr_400px] xl:gap-x-20 xl:gap-y-6">
                    <div className="flex flex-col gap-6 xl:col-start-1 xl:row-start-1">
                        <div className="flex items-center gap-5">
                            <img src={publicUrl(page.logo)} alt="" width={72} height={72} className="size-14 shrink-0 md:size-18" />
                            <h1 className="min-w-0 flex-1 font-display text-[56px] leading-[1.1] font-bold tracking-[-0.025em]">{page.name}</h1>
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
                    <ProgramSection title={what.title} intro={what.text} source={what.source} />

                    <ProgramSection title={forYou.title} intro={forYou.intro} source={forYou.source}>
                        <div className="flex flex-col gap-4 rounded-xl border border-line-subtle bg-surface p-6 md:p-8">
                            <h3 className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{forYou.requirements.title}</h3>
                            <ul className="flex flex-col gap-4">
                                {forYou.requirements.items.map((item) => (
                                    <CheckItem key={item}>{item}</CheckItem>
                                ))}
                            </ul>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                            {forYou.cases.map((tile) => (
                                <ProgramTile key={tile.title} icon={tile.icon} title={tile.title} text={tile.text} />
                            ))}
                        </div>
                    </ProgramSection>

                    <ProgramSection title={learn.title} intro={learn.intro} source={learn.source}>
                        <div className="flex flex-col gap-6">
                            {learn.levels.map((level) => (
                                <LevelCard key={level.title} title={level.title} text={level.text} courses={level.courses} />
                            ))}
                        </div>
                    </ProgramSection>

                    <ProgramSection title={how.title} intro={how.intro} source={how.source}>
                        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                            {how.tiles.map((tile) => (
                                <ProgramTile key={tile.title} icon={tile.icon} title={tile.title} text={tile.text} />
                            ))}
                        </div>
                    </ProgramSection>

                    <ProgramSection title={join.title} intro={join.intro} source={join.source}>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <ol className="flex flex-col gap-6 xl:flex-1">
                                {join.steps.map((step, index) => (
                                    <ProgramStep key={step.title} number={index + 1} title={step.title} text={step.text} />
                                ))}
                            </ol>
                            <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:flex-1 xl:grid-cols-1 xl:grid-rows-[1fr_1fr]">
                                {join.accounts.map((tile) => (
                                    <ProgramTile key={tile.title} icon={tile.icon} title={tile.title} text={tile.text} />
                                ))}
                            </div>
                        </div>
                    </ProgramSection>

                    <ProgramSection title={rules.title} intro={rules.intro} source={rules.source}>
                        <ul className="flex flex-col rounded-xl border border-line-subtle bg-surface px-5 py-2 md:px-8">
                            {rules.items.map((item) => (
                                <li key={item.title} className="flex flex-col gap-1 border-b border-line-subtle py-5 last:border-b-0">
                                    <p className="text-base leading-[1.2] font-medium text-fg">{item.title}</p>
                                    <p className="text-sm leading-[1.5] text-fg-muted">
                                        <Inline text={item.text} />
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </ProgramSection>

                    <ProgramSection title={get.title} source={get.source}>
                        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                            <div className="flex flex-col gap-4 rounded-xl border border-line-subtle bg-surface p-6 md:p-8">
                                <h3 className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em]">{get.yes.title}</h3>
                                <ul className="flex flex-col gap-4">
                                    {get.yes.items.map((item) => (
                                        <CheckItem key={item}>{item}</CheckItem>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4 rounded-xl border border-line-subtle bg-surface p-6 md:p-8">
                                <h3 className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em]">{get.no.title}</h3>
                                <ul className="flex flex-col gap-4">
                                    {get.no.items.map((item) => (
                                        <CheckItem key={item} tone="negative">
                                            {item}
                                        </CheckItem>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ProgramSection>

                    <ProgramSection title={links.title} intro={links.intro} source={links.source}>
                        <ul className="rounded-xl border border-line-subtle bg-surface px-5 py-1 md:px-6">
                            {links.rows.map((row) => (
                                <LinkRow key={row.value} label={row.label} value={row.value} href={row.href} icon={row.icon} />
                            ))}
                        </ul>
                    </ProgramSection>
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
