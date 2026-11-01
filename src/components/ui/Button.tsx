import type { MouseEvent, ReactNode } from 'react';
import type { IconName } from '@/config/assets';
import { en as t } from '@/i18n/locales/en';
import { Link } from '@/router/Link';
import { Icon } from './Icon';

type ButtonProps = {
    href: string;
    children: ReactNode;
    /** Primary for the one main action per view, secondary for alternatives. */
    variant?: 'primary' | 'secondary';
    /** Opens in a new tab and skips client-side routing. */
    external?: boolean;
    /** Trailing icon, 18px. */
    icon?: IconName;
    /** Stretch to the container width on phones, as in the iPhone frames. */
    fullWidthOnMobile?: boolean;
};

const VARIANTS = {
    primary: 'bg-accent text-on-accent hover:bg-accent-hover focus-visible:outline-fg',
    secondary: 'border border-line-strong text-fg hover:border-fg hover:bg-overlay focus-visible:outline-accent',
};

/** Button, size M (48px). Text on yellow is always ink. */
export function Button({ href, children, variant = 'primary', external = false, icon, fullWidthOnMobile = false }: ButtonProps) {
    const className = [
        'inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md px-6 text-base leading-[1.2] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
        VARIANTS[variant],
        fullWidthOnMobile ? 'w-full md:w-auto' : '',
    ].join(' ');

    const content = (
        <>
            {children}
            {icon && <Icon name={icon} size={18} />}
        </>
    );

    // A bare "#" is a placeholder target: keep the button, but don't jump or open a tab.
    if (href === '#') {
        return (
            <a href={href} onClick={(event: MouseEvent) => event.preventDefault()} className={className}>
                {content}
            </a>
        );
    }

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {content}
                <span className="sr-only">{t.nav.newTab}</span>
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}