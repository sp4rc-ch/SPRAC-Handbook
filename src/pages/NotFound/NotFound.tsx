import { Inline } from '@/components/content/Inline';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { getNotFound } from '@/content/notFound';
import { ErrorCode } from './ErrorCode';

/** Shown for every address that does not exist. Content: content/not-found.md. */
export function NotFound() {
    const page = getNotFound();

    return (
        <PageLayout footer={false}>
            <section className="flex flex-1 flex-col items-center justify-center px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24 lg:px-20 lg:pt-24 lg:pb-32">
                <div className="flex flex-col items-center gap-6 text-center">
                    <p className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-accent uppercase">{page.eyebrow}</p>
                    <ErrorCode />
                    <div className="flex flex-col items-center gap-3">
                        <h1 className="font-display text-[28px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[34px] lg:text-[40px]">{page.title}</h1>
                        <p className="text-lg leading-[1.6] text-fg-muted">
                            <Inline text={page.text} />
                        </p>
                    </div>
                    <Button href={page.button.href} iconSrc={page.button.icon}>
                        {page.button.label}
                    </Button>
                </div>
            </section>
        </PageLayout>
    );
}
