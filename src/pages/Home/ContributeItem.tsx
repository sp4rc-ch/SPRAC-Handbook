import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/config/assets';

type ContributeItemProps = { icon: IconName; title: string; description: string };

/** One way to contribute: icon, title, short description. */
export function ContributeItem({ icon, title, description }: ContributeItemProps) {
    return (
        <li className="flex flex-1 items-start gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line-subtle bg-overlay text-accent">
                <Icon name={icon} size={20} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="text-base leading-[1.2] font-medium">{title}</h3>
                <p className="text-sm leading-[1.5] text-fg-muted">{description}</p>
            </div>
        </li>
    );
}