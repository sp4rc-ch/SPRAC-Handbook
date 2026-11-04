import type { AnchorHTMLAttributes } from 'react';
import { getSite } from '@/content/site';
import { Link } from '@/router/Link';
import { linkKind, resolveHref } from '@/router/href';

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

/**
 * An anchor that behaves right for any address written in a content file: pages of this site navigate
 * without a reload, other sites open in a new tab, "#" (a page that is not built yet) goes nowhere,
 * and "#section", "mailto:" and "tel:" are left to the browser.
 */
export function SmartLink({ href, children, onClick, ...props }: SmartLinkProps) {
    const kind = linkKind(href);

    if (kind === 'internal') {
        return (
            <Link href={resolveHref(href)} onClick={onClick} {...props}>
                {children}
            </Link>
        );
    }

    if (kind === 'placeholder') {
        return (
            <a
                href="#"
                onClick={(event) => {
                    onClick?.(event);
                    event.preventDefault();
                }}
                {...props}
            >
                {children}
            </a>
        );
    }

    if (kind === 'external') {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...props}>
                {children}
                <span className="sr-only">{getSite().labels.newTab}</span>
            </a>
        );
    }

    return (
        <a href={href} onClick={onClick} {...props}>
            {children}
        </a>
    );
}
