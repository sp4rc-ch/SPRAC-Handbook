import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SmartLink } from '@/components/ui/SmartLink';
import { linkKind } from '@/router/href';

type TextLinkProps = {
    href: string;
    children: ReactNode;
};

const YELLOW = 'inline-flex items-center gap-1 font-medium whitespace-nowrap text-accent underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none';
const PLAIN = 'font-medium text-fg hover:text-accent focus-visible:text-accent focus-visible:outline-none';

/**
 * Link inside running text. Links to other sites are yellow with arrow-up-right, links to pages of this site
 * end with →, and mail, phone and in-page links are plain.
 */
export function TextLink({ href, children }: TextLinkProps) {
    const kind = linkKind(href);

    if (kind === 'external') {
        return (
            <SmartLink href={href} className={YELLOW}>
                {children}
                <Icon name="arrow-up-right" size={16} />
            </SmartLink>
        );
    }

    if (kind === 'internal') {
        return (
            <SmartLink href={href} className={YELLOW}>
                {children} <span aria-hidden="true">→</span>
            </SmartLink>
        );
    }

    return (
        <SmartLink href={href} className={PLAIN}>
            {children}
        </SmartLink>
    );
}
