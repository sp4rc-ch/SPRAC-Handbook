import type { ReactNode } from 'react';
import { ProgramSource } from './ProgramSource';

type ProgramSectionProps = {
    title: string;
    intro?: string;
    source: string;
    children: ReactNode;
};

/** One section of the article: heading, optional intro, content and the source line. */
export function ProgramSection({ title, intro, source, children }: ProgramSectionProps) {
    return (
        <section className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
                <h2 className="font-display text-2xl leading-[1.2] font-medium tracking-[-0.015em] md:text-[28px] lg:text-[32px]">{title}</h2>
                {intro && <p className="text-base leading-[1.6] text-fg-muted">{intro}</p>}
            </header>
            {children}
            <ProgramSource>{source}</ProgramSource>
        </section>
    );
}
