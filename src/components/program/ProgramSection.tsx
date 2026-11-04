import type { ReactNode } from 'react';
import { Inline } from '@/components/content/Inline';
import { slugify } from '@/content/markdown';
import { ProgramSource } from './ProgramSource';

type ProgramSectionProps = {
    title: string;
    /** Paragraphs under the heading. */
    intro?: string[];
    /** The "Source: ..." line shown at the end of the section. */
    source?: string;
    children?: ReactNode;
};

/** One section of the article: heading, optional intro, content and the source line. */
export function ProgramSection({ title, intro = [], source, children }: ProgramSectionProps) {
    return (
        <section id={slugify(title)} className="flex scroll-mt-24 flex-col gap-6">
            <header className="flex flex-col gap-3">
                <h2 className="font-display text-2xl leading-[1.2] font-medium tracking-[-0.015em] md:text-[28px] lg:text-[32px]">{title}</h2>
                {intro.map((text) => (
                    <p key={text} className="text-base leading-[1.6] text-fg-muted">
                        <Inline text={text} />
                    </p>
                ))}
            </header>
            {children}
            {source && <ProgramSource>{source}</ProgramSource>}
        </section>
    );
}
