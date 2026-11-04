import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { SmartLink } from '@/components/ui/SmartLink';
import { linkKind } from '@/router/href';

type FooterLinkProps = {
    href: string;
    children: ReactNode;
};

const CLASS_NAME = 'flex items-center gap-1 text-sm leading-[1.5] whitespace-nowrap text-fg-muted transition-colors hover:text-fg focus-visible:text-fg focus-visible:outline-none';

/** Footer link. Links to other sites show arrow-up-right and open in a new tab. */
export function FooterLink({ href, children }: FooterLinkProps) {
    return (
        <SmartLink href={href} className={CLASS_NAME}>
            {children}
            {linkKind(href) === 'external' && <Icon name="arrow-up-right" size={14} />}
        </SmartLink>
    );
}
