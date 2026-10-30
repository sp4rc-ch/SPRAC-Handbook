import { PageLayout } from '@/components/layout/PageLayout';
import { ContributeSection } from './ContributeSection';
import { LaunchSection } from './LaunchSection';

/** Before-launch one-pager: launch estimate, repo link, how to contribute. */
export function Home() {
    return (
        <PageLayout>
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 pt-12 pb-16 md:gap-24 md:px-8 md:pt-16 md:pb-24 lg:gap-32 lg:px-20 lg:pt-24 lg:pb-32">
                <LaunchSection />
                <ContributeSection />
            </div>
        </PageLayout>
    );
}