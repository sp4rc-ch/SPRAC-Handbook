import { Inline } from '@/components/content/Inline';
import { publicUrl } from '@/config/assets';
import type { ProgramCardContent } from '@/content/home';
import { Button } from './Button';

/** Program card: mark, name, description, three key facts and a Read more button pinned to the bottom. */
export function ProgramCard({ name, logo, text, facts, readMore }: ProgramCardContent) {
    return (
        <article className="flex flex-col justify-between rounded-xl border border-line bg-elevated p-6">
            <div className="flex flex-col gap-4 pb-6">
                <div className="flex items-center gap-3.5">
                    <img src={publicUrl(logo)} alt="" width={40} height={40} className="size-10 shrink-0" />
                    <h3 className="flex-1 font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-[22px] lg:text-2xl">{name}</h3>
                </div>
                <p className="text-sm leading-[1.5] text-fg-muted">
                    <Inline text={text} />
                </p>
                <dl className="border-b border-line-subtle">
                    {facts.map(([label, value]) => (
                        <div key={label} className="flex items-baseline gap-3 border-t border-line-subtle py-2.5">
                            <dt className="w-[76px] shrink-0 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-subtle uppercase">{label}</dt>
                            <dd className="min-w-0 flex-1 text-sm leading-[1.5] text-fg">
                                <Inline text={value} />
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="flex">
                <Button href={readMore.href} variant="secondary" size="s" icon="arrow-right">
                    {readMore.label}
                    <span className="sr-only"> · {name}</span>
                </Button>
            </div>
        </article>
    );
}
