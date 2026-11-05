export type BadgeTone = 'accent' | 'neutral' | 'warning' | 'info';

const TONES: Record<BadgeTone, string> = {
    accent: 'bg-accent-subtle text-accent',
    neutral: 'bg-overlay text-fg-muted',
    warning: 'bg-warning-subtle text-warning',
    info: 'bg-info-subtle text-info',
};

/** Badge / tag: a mono uppercase label. The tone maps to the status colours. */
export function Badge({ children, tone = 'accent' }: { children: string; tone?: BadgeTone }) {
    return <span className={`inline-flex items-center rounded-sm px-2 py-1 font-mono text-xs leading-[1.2] font-medium tracking-[0.1em] whitespace-nowrap uppercase ${TONES[tone]}`}>{children}</span>;
}
