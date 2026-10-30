type StatusItem = { label: string; value: string };

/** Two label/value pairs between hairlines; stacked on phones, side by side from tablet up. */
export function StatusStrip({ items }: { items: [StatusItem, StatusItem] }) {
    return (
        <dl className="flex flex-col gap-4 border-y border-line-subtle py-5 md:flex-row md:gap-6">
            {items.map((item, index) => (
                <div key={item.label} className={`flex flex-1 flex-col gap-1 ${index > 0 ? 'md:border-l md:border-line-subtle md:pl-6' : ''}`}>
                    <dt className="font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] text-fg-subtle uppercase">{item.label}</dt>
                    <dd className="font-display text-lg leading-[1.4] font-medium tracking-[-0.005em] lg:text-xl">{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}