import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/config/assets';

type ProgramTileProps = {
    icon: IconName;
    title: string;
    text: string;
};

/** Small card with a yellow icon chip, a title and a short text. */
export function ProgramTile({ icon, title, text }: ProgramTileProps) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-line-subtle bg-surface p-6">
            <span className="flex h-5 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent">
                <Icon name={icon} size={20} />
            </span>
            <h3 className="font-display text-xl leading-[1.4] font-medium tracking-[-0.005em]">{title}</h3>
            <p className="text-sm leading-[1.5] text-fg-muted">{text}</p>
        </div>
    );
}
