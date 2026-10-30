import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useTranslation } from '@/i18n/LanguageContext';
import { Link } from '@/router/Link';

type TextLinkProps = {
    href: string;
    children: ReactNode;
    /** External links get arrow-up-right and a new tab; internal ones end with →. */
    external?: boolean;
};

/** Yellow Label/L link used in the legal texts. */
export function TextLink({ href, children, external = false }: TextLinkProps) {
    const t = useTranslation();
    const className = 'inline-flex items-center gap-1 font-medium whitespace-nowrap text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none';

    if (external) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {children}
                <Icon name="arrow-up-right" size={16} />
                <span className="sr-only">{t.nav.newTab}</span>
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {children} <span aria-hidden="true">→</span>
        </Link>
    );
}