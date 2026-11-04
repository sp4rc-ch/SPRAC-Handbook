import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { ContributeItem } from '@/components/ui/ContributeItem';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { ISSUE_URL, REPO_URL } from '@/config/links';
import { en as t } from '@/i18n/locales/en';
import { programHref } from '@/router/routes';

/** Homepage: hero, the three programs, contribute on GitHub. Desktop 1440, iPad 834, iPhone 393. */
export function Home() {
    const { hero, programs, contribute } = t.home;

    return (
        <PageLayout>
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 pt-12 pb-16 md:gap-24 md:px-8 md:pt-16 md:pb-24 lg:gap-32 lg:px-20 lg:pt-24 lg:pb-32">
                <section className="flex flex-col items-start gap-6">
                    <h1 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[56px] lg:text-[72px]">
                        {hero.titleLead} <span className="text-accent">{hero.titleAccent}</span>
                    </h1>
                    <p className="text-lg leading-[1.6] text-fg-muted">{hero.intro}</p>
                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                        <Button href="#programs" icon="arrow-right" fullWidthOnMobile>
                            {hero.explore}
                        </Button>
                        {/* The Path page is not built yet: keep the button, do not jump. */}
                        <Button href="#" variant="secondary" fullWidthOnMobile>
                            {hero.path}
                        </Button>
                    </div>
                </section>

                <section id="programs" className="flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[34px] lg:text-[40px]">{programs.title}</h2>
                        <p className="text-base leading-[1.6] text-fg-muted">{programs.intro}</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
                        {programs.cards.map((card) => (
                            <ProgramCard key={card.id} name={card.name} logo={card.logo} text={card.text} facts={card.facts} href={programHref(card.id)} />
                        ))}
                    </div>
                    <Callout>{programs.note}</Callout>
                </section>

                <section className="flex flex-col gap-6 md:gap-10">
                    <div className="flex flex-col gap-8 rounded-xl border border-line bg-surface p-6 md:gap-10 md:p-10 xl:flex-row xl:items-center xl:gap-16 xl:p-12">
                        <div className="flex min-w-0 flex-col items-start gap-5 xl:flex-1">
                            <h2 className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[34px] lg:text-[40px]">{contribute.title}</h2>
                            <p className="text-base leading-[1.6] text-fg-muted">{contribute.body}</p>
                            <code className="rounded-sm border border-line-subtle bg-overlay px-3 py-2 font-mono text-xs leading-[1.4] text-fg">
                                <span className="text-accent">{contribute.commandPrompt}</span> {contribute.command}
                            </code>
                            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                                <Button href={REPO_URL} external icon="github-logo" fullWidthOnMobile>
                                    {contribute.github}
                                </Button>
                                <Button href={ISSUE_URL} external variant="secondary" icon="arrow-up-right" fullWidthOnMobile>
                                    {contribute.issue}
                                </Button>
                            </div>
                        </div>
                        <ul className="flex flex-col gap-6 md:flex-row xl:w-[440px] xl:shrink-0 xl:flex-col">
                            {contribute.ways.map((way) => (
                                <ContributeItem key={way.title} icon={way.icon} title={way.title} className="md:flex-1 xl:flex-none">
                                    {way.text}
                                </ContributeItem>
                            ))}
                        </ul>
                    </div>
                    <Callout>{contribute.privacy}</Callout>
                </section>
            </div>
        </PageLayout>
    );
}
