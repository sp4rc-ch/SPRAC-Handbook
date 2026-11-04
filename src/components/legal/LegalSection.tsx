import type { ReactNode } from 'react';

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="font-display text-xl leading-[1.3] font-medium tracking-[-0.01em] md:text-[22px] lg:text-2xl">{heading}</h2>
            {children}
        </section>
    );
}

/** Body/M paragraph in secondary text. */
export function Paragraph({ children }: { children: ReactNode }) {
    return <p className="text-base leading-[1.6] text-fg-muted">{children}</p>;
}

/** Inline emphasis inside a paragraph, in primary text. */
export function Emphasis({ children }: { children: ReactNode }) {
    return <strong className="font-medium text-fg">{children}</strong>;
}
