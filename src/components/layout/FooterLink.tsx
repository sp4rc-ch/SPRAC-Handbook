import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { en as t } from '@/i18n/locales/en';
import { Link } from '@/router/Link';

type FooterLinkProps = {
    href: string;
    children: ReactNode;
    /** Official sites: arrow-up-right and a new tab. */
    external?: boolean;
};

export function FooterLink({ href, children, external = false }: FooterLinkProps) {
    const className = 'flex items-center gap-1 text-sm leading-[1.5] whitespace-nowrap text-fg-muted transition-colors hover:text-fg focus-visible:text-fg focus-visible:outline-none';

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {children}
                <Icon name="arrow-up-right" size={14} />
                <span className="sr-only">{t.nav.newTab}</span>
            </a>
        );
    }

    // A bare "#" is a placeholder for a page that is not built yet: keep the link, do not jump.
    if (href === '#') {
        return (
            <a href={href} onClick={(event) => event.preventDefault()} className={className}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}
