import { Inline } from '@/components/content/Inline';
import { Icon } from './Icon';

type ContributeItemProps = {
    /** Path to the icon in public/, as written in the content file. */
    icon: string;
    title: string;
    children: string;
    className?: string;
};

/** One way to contribute: icon, title, short description. */
export function ContributeItem({ icon, title, children, className = '' }: ContributeItemProps) {
    return (
        <li className={`flex items-start gap-4 ${className}`}>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line-subtle bg-overlay text-accent">
                <Icon src={icon} size={20} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p className="text-base leading-[1.2] font-medium text-fg">{title}</p>
                <p className="text-sm leading-[1.5] text-fg-muted">
                    <Inline text={children} />
                </p>
            </div>
        </li>
    );
}
