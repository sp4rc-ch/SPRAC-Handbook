import { Button } from '@/components/ui/Button';
import { REPO_URL } from '@/config/links';
import { en } from '@/i18n/locales/en';
import { StatusStrip } from './StatusStrip';

export function LaunchSection() {
    const { home } = en;
    const { launch } = home;

    return (
        <section className="flex flex-col gap-6 md:gap-8">
            <h1 className="font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em] md:text-[56px] lg:text-[72px]">
                {launch.headlineStart}
                <span className="text-accent">{launch.headlineHighlight}</span>
            </h1>
            <p className="text-lg leading-[1.6] text-fg-muted">{launch.intro}</p>
            <StatusStrip
                items={[
                    { label: launch.statusLabel, value: launch.statusValue },
                    { label: launch.launchLabel, value: launch.launchValue },
                ]}
            />
            <div>
                <Button href={REPO_URL} external icon="github-logo" fullWidthOnMobile>
                    {launch.checkRepo}
                </Button>
            </div>
        </section>
    );
}