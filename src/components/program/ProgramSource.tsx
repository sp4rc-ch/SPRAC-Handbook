import { Icon } from '@/components/ui/Icon';

/** Where a section's facts come from, with the date they were last checked. */
export function ProgramSource({ children }: { children: string }) {
    return (
        <p className="flex items-start gap-2 font-mono text-xs leading-[1.4] text-fg-subtle">
            <Icon name="info" size={14} className="mt-px" />
            <span className="min-w-0 flex-1">{children}</span>
        </p>
    );
}
