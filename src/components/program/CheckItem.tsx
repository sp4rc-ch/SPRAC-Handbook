import { Icon } from '@/components/ui/Icon';

type CheckItemProps = {
    children: string;
    /** Positive: yellow check. Negative: grey cross. */
    tone?: 'positive' | 'negative';
};

/** One line of a checklist. */
export function CheckItem({ children, tone = 'positive' }: CheckItemProps) {
    return (
        <li className="flex items-start gap-3">
            <span className="flex h-[25.6px] w-5 shrink-0 items-center justify-center">
                <Icon name={tone === 'positive' ? 'check-circle' : 'x-circle'} size={20} className={tone === 'positive' ? 'text-accent' : 'text-fg-muted'} />
            </span>
            <span className="min-w-0 flex-1 text-base leading-[1.6] text-fg">{children}</span>
        </li>
    );
}
