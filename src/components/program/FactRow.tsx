type FactRowProps = {
    label: string;
    value: string;
};

/** Label and value on one line, divided from the next row by a hairline. */
export function FactRow({ label, value }: FactRowProps) {
    return (
        <div className="flex items-baseline gap-4 border-b border-line-subtle py-3 last:border-b-0">
            <dt className="w-24 shrink-0 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-muted uppercase">{label}</dt>
            <dd className="min-w-0 flex-1 text-base leading-[1.2] font-medium text-fg">{value}</dd>
        </div>
    );
}
