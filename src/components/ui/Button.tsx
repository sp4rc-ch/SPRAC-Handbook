import type { ReactNode } from 'react';
import type { IconName } from '@/config/assets';
import { Icon } from './Icon';
import { SmartLink } from './SmartLink';

type ButtonProps = {
    href: string;
    children: ReactNode;
    /** Primary for the one main action per view, secondary for alternatives. */
    variant?: 'primary' | 'secondary';
    /** M is 48px (hero, forms), S is 36px (cards). */
    size?: 'm' | 's';
    /** Trailing icon from the design (18px, 16px at size S). */
    icon?: IconName;
    /** Trailing icon written in a content file, as a path from public/. Wins over `icon`. */
    iconSrc?: string;
    /** Stretch to the container width on phones, as in the iPhone frames. */
    fullWidthOnMobile?: boolean;
};

const SIZES = {
    m: { box: 'h-12 px-6 text-base', icon: 18 },
    s: { box: 'h-9 px-4 text-sm', icon: 16 },
};

const VARIANTS = {
    primary: 'bg-accent text-on-accent hover:bg-accent-hover focus-visible:outline-fg',
    secondary: 'border border-line-strong text-fg hover:border-fg hover:bg-overlay focus-visible:outline-accent',
};

/** Button, size M (48px) or S (36px). Text on yellow is always ink. The address decides how it behaves, see SmartLink. */
export function Button({ href, children, variant = 'primary', size = 'm', icon, iconSrc, fullWidthOnMobile = false }: ButtonProps) {
    const className = [
        `inline-flex ${SIZES[size].box} shrink-0 items-center justify-center gap-2 rounded-md leading-[1.2] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2`,
        VARIANTS[variant],
        fullWidthOnMobile ? 'w-full md:w-auto' : '',
    ].join(' ');

    return (
        <SmartLink href={href} className={className}>
            {children}
            {(iconSrc || icon) && <Icon name={icon} src={iconSrc} size={SIZES[size].icon} />}
        </SmartLink>
    );
}
