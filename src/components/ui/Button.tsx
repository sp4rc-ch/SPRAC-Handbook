import type { ReactNode } from 'react';
import type { IconName } from '@/config/assets';
import { Link } from '@/router/Link';
import { Icon } from './Icon';

type ButtonProps = {
    href: string;
    children: ReactNode;
    /** Opens in a new tab and skips client-side routing. */
    external?: boolean;
    /** Trailing icon, 18px. */
    icon?: IconName;
};

/** Primary button, size M (48px). Text on yellow is always ink. */
export function Button({ href, children, external = false, icon }: ButtonProps) {
    const className =
        'inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-accent px-6 text-base leading-[1.2] font-medium whitespace-nowrap text-on-accent transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

    const content = (
        <>
            {children}
            {icon && <Icon name={icon} size={18} />}
        </>
    );

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}
