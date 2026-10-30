import type { ReactNode } from 'react';

/** List with the 5px yellow bullet from the design. */
export function BulletList({ items }: { items: ReactNode[] }) {
    return (
        <ul className="flex flex-col gap-2.5">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-base leading-[1.6] text-fg-muted">
                    <span aria-hidden="true" className="flex h-6 w-1.5 shrink-0 items-center justify-center">
                        <span className="size-[5px] rounded-full bg-accent" />
                    </span>
                    <span className="flex-1">{item}</span>
                </li>
            ))}
        </ul>
    );
}