import type { ReactNode } from 'react';
import { Inline } from '@/components/content/Inline';
import { PageLayout } from '@/components/layout/PageLayout';

type LegalLayoutProps = {
    title: string;
    lead: string;
    /** Label and value of each field of the strip under the lead. */
    meta: [string, string][];
    children: ReactNode;
};

/** Shared frame of the legal notice and privacy policy: title, lead, meta strip, then the article. */
export function LegalLayout({ title, lead, meta, children }: LegalLayoutProps) {
    return (
        <PageLayout>
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24 lg:gap-16 lg:px-20 lg:pt-24 lg:pb-32">
                <header className="flex flex-col gap-6">
                    <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-[-0.025em] md:text-[44px] lg:text-[56px]">{title}</h1>
                    <p className="text-base leading-[1.6] text-fg-muted md:text-lg">
                        <Inline text={lead} />
                    </p>
                    <dl className="flex flex-col gap-4 border-y border-line-subtle py-5 md:flex-row md:gap-6">
                        {meta.map(([label, value], index) => (
                            <div key={label} className={`flex flex-1 flex-col gap-1 ${index > 0 ? 'md:border-l md:border-line-subtle md:pl-6' : ''}`}>
                                <dt className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-subtle uppercase">{label}</dt>
                                <dd className="text-base leading-[1.2] font-medium">
                                    <Inline text={value} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                </header>
                <article className="flex flex-col gap-10 md:gap-12 lg:max-w-[760px] lg:gap-14">{children}</article>
            </div>
        </PageLayout>
    );
}
