import type { ReactNode } from 'react';

type DetailRow = { label: string; value: ReactNode };

/** Key/value rows between hairlines. Phones stack the key above the value. */
export function DetailList({ rows }: { rows: DetailRow[] }) {
    return (
        <dl className="flex flex-col border-t border-line-subtle">
            {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 border-b border-line-subtle py-3.5 md:flex-row md:items-center md:gap-6">
                    <dt className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-subtle uppercase md:w-40 md:shrink-0">{row.label}</dt>
                    <dd className="min-w-0 flex-1 text-base leading-[1.2] font-medium break-words">{row.value}</dd>
                </div>
            ))}
        </dl>
    );
}