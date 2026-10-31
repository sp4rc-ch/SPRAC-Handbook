import { Button } from '@/components/ui/Button';
import { Callout } from '@/components/ui/Callout';
import { ISSUE_URL, REPO_URL } from '@/config/links';
import { en } from '@/i18n/locales/en';
import { ContributeItem } from './ContributeItem';

/**
 * Panel with the issue call to action and the three ways to help. Phones stack everything,
 * tablets put the ways in a row under the text, desktop puts them in a column beside it.
 */
export function ContributeSection() {
    const { home } = en;
    const { contribute } = home;

    return (
        <section className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-col gap-8 rounded-xl border border-line bg-surface p-6 md:gap-10 md:p-10 lg:flex-row lg:items-center lg:gap-16 lg:p-12">
                <div className="flex flex-1 flex-col gap-5">
                    <h2 className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[34px] lg:text-[40px]">{contribute.title}</h2>
                    <p className="text-base leading-[1.6] text-fg-muted">
                        {contribute.introStart} <strong className="font-medium text-fg">{contribute.introEmphasis}</strong>
                    </p>
                    <code className="self-start rounded-sm border border-line-subtle bg-overlay px-3 py-2 font-mono text-xs leading-[1.4] whitespace-nowrap text-accent">{contribute.code}</code>
                    <div className="flex flex-col gap-3 md:flex-row">
                        <Button href={ISSUE_URL} external icon="github-logo" fullWidthOnMobile>
                            {contribute.openIssue}
                        </Button>
                        <Button href={REPO_URL} external variant="secondary" icon="arrow-up-right" fullWidthOnMobile>
                            {contribute.viewRepo}
                        </Button>
                    </div>
                </div>

                <ul className="flex flex-col gap-6 md:flex-row lg:w-[440px] lg:shrink-0 lg:flex-col">
                    <ContributeItem icon="warning-circle" title={contribute.ways.fact.title} description={contribute.ways.fact.description} />
                    <ContributeItem icon="link-simple" title={contribute.ways.link.title} description={contribute.ways.link.description} />
                    <ContributeItem icon="pencil-simple" title={contribute.ways.typo.title} description={contribute.ways.typo.description} />
                </ul>
            </div>

            <Callout>{contribute.privacyNote}</Callout>
        </section>
    );
}