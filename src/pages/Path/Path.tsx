import { Inline } from '@/components/content/Inline';
import { PageLayout } from '@/components/layout/PageLayout';
import { RouteMap } from '@/components/path/RouteMap';
import { SituationPicker } from '@/components/path/SituationPicker';
import { LinkRow } from '@/components/program/LinkRow';
import { ProgramSource } from '@/components/program/ProgramSource';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { fileUrl } from '@/config/links';
import { getPath } from '@/content/path';
import { getSite } from '@/content/site';

/** Heading of a section: Space Grotesk bold 28 / 34 / 40, as on the homepage. */
const SECTION_TITLE = 'font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[34px] lg:text-[40px]';

/** Path page: the route, "Where are you now?", who to ask. Desktop 1440, iPad 834, iPhone 393. Content: content/path.md. */
export function Path() {
    const { labels } = getSite();
    const { title, lead, buttons, route, situations, contacts, start } = getPath();

    return (
        <PageLayout>
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-4 pt-4 pb-16 md:gap-24 md:px-8 md:pt-6 md:pb-24 lg:gap-32 lg:px-20 lg:pt-8 lg:pb-32">
                <div className="flex justify-end">
                    {/* Opens this page's Markdown file on the dev branch: the starting point for a change. */}
                    <Button href={fileUrl('content/path.md')} variant="secondary" size="s" icon="pencil-simple">
                        {labels.editPage}
                    </Button>
                </div>

                <section className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                    <div className="flex flex-col items-start gap-6">
                        <h1 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[56px] lg:text-[72px]">{title}</h1>
                        <p className="max-w-[680px] text-base leading-[1.6] text-fg-muted md:text-lg">
                            <Inline text={lead} />
                        </p>
                        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                            {buttons.map((button, index) => (
                                <Button key={button.label} href={button.href} iconSrc={button.icon} variant={index === 0 ? 'primary' : 'secondary'} fullWidthOnMobile>
                                    {button.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <RouteMap route={route} />
                    {route.note && (
                        <Callout>
                            <Inline text={route.note} />
                        </Callout>
                    )}
                </section>

                <section id={situations.id} className="flex scroll-mt-24 flex-col gap-10">
                    <header className="flex flex-col gap-3">
                        <h2 className={SECTION_TITLE}>{situations.title}</h2>
                        {situations.intro.map((text) => (
                            <p key={text} className="max-w-[720px] text-base leading-[1.6] text-fg-muted md:text-lg">
                                <Inline text={text} />
                            </p>
                        ))}
                    </header>
                    <SituationPicker situations={situations.items} initial={situations.initial} label={situations.title} />
                    {situations.source && <ProgramSource>{situations.source}</ProgramSource>}
                </section>

                <section id={contacts.id} className="flex scroll-mt-24 flex-col gap-10">
                    <header className="flex flex-col gap-3">
                        <h2 className={SECTION_TITLE}>{contacts.title}</h2>
                        {contacts.intro.map((text) => (
                            <p key={text} className="max-w-[720px] text-base leading-[1.6] text-fg-muted md:text-lg">
                                <Inline text={text} />
                            </p>
                        ))}
                    </header>
                    <ul className="rounded-xl border border-line-subtle bg-surface px-5 py-1 md:px-6">
                        {contacts.rows.map((row) => (
                            <LinkRow key={row.value} label={row.label} value={row.value} href={row.href} icon={row.icon} />
                        ))}
                    </ul>
                    {contacts.source && <ProgramSource>{contacts.source}</ProgramSource>}
                </section>

                <section className="flex flex-col items-center gap-6 rounded-xl border border-line bg-surface px-5 py-12 text-center md:px-12 md:py-20 lg:px-16 lg:py-24">
                    <p className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">{start.eyebrow}</p>
                    <h2 className={`max-w-[720px] ${SECTION_TITLE}`}>{start.title}</h2>
                    <p className="text-base leading-[1.6] text-fg-muted md:text-lg">
                        <Inline text={start.text} />
                    </p>
                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                        {start.buttons.map((button, index) => (
                            <Button key={button.label} href={button.href} iconSrc={button.icon} variant={index === 0 ? 'primary' : 'secondary'} fullWidthOnMobile>
                                {button.label}
                            </Button>
                        ))}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
