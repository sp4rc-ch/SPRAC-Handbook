import { Icon } from '@/components/ui/Icon';
import { SmartLink } from '@/components/ui/SmartLink';

type LinkRowProps = {
    label: string;
    value: string;
    href: string;
    /** Path to the icon in public/, as written in the content file. */
    icon: string;
};

/** One official link: what it is for, where it goes and an icon for the kind of link. */
export function LinkRow({ label, value, href, icon }: LinkRowProps) {
    return (
        <li className="border-b border-line-subtle last:border-b-0">
            <SmartLink href={href} className="group flex items-center gap-4 py-4 focus-visible:outline-none">
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-sm leading-[1.5] text-fg-muted">{label}</span>
                    <span className="text-base leading-[1.2] font-medium break-words text-fg transition-colors group-hover:text-accent group-focus-visible:text-accent">{value}</span>
                </span>
                <Icon src={icon} size={20} className="text-fg" />
            </SmartLink>
        </li>
    );
}
