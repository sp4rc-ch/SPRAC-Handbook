import type { ReactNode } from 'react';
import { Icon } from './Icon';

/** Highlighted note with info icon and yellow left edge. */
export function Callout({ children }: { children: ReactNode }) {
    return (
        <aside className="flex items-start gap-3 rounded-md border-l-3 border-accent bg-accent-subtle px-5 py-4">
            <Icon name="info" size={20} className="text-accent" />
            <p className="flex-1 text-sm leading-[1.5] text-fg">{children}</p>
        </aside>
    );
}