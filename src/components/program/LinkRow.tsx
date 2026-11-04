import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/config/assets';
import { en as t } from '@/i18n/locales/en';

type LinkRowProps = {
    label: string;
    value: string;
    href: string;
    icon: IconName;
};

/** One official link: what it is for, where it goes and an icon for the kind of link. */
export function LinkRow({ label, value, href, icon }: LinkRowProps) {
    const web = href.startsWith('http');

    return (
        <li className="border-b border-line-subtle last:border-b-0">
            <a href={href} {...(web && { target: '_blank', rel: 'noopener noreferrer' })} className="group flex items-center gap-4 py-4 focus-visible:outline-none">
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-sm leading-[1.5] text-fg-muted">{label}</span>
                    <span className="text-base leading-[1.2] font-medium break-words text-fg transition-colors group-hover:text-accent group-focus-visible:text-accent">{value}</span>
                </span>
                <Icon name={icon} size={20} className="text-fg" />
                {web && <span className="sr-only">{t.nav.newTab}</span>}
            </a>
        </li>
    );
}
