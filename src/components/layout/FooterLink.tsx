import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useTranslation } from '@/i18n/LanguageContext';
import { Link } from '@/router/Link';

type FooterLinkProps = {
    href: string;
    children: ReactNode;
    /** Official sites: arrow-up-right and a new tab. */
    external?: boolean;
};

export function FooterLink({ href, children, external = false }: FooterLinkProps) {
    const t = useTranslation();
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

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}