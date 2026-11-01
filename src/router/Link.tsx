import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigate } from './navigation';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Anchor for internal routes: navigates without a page reload, but keeps cmd/ctrl-click working. */
export function Link({ href, onClick, ...props }: LinkProps) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(href);
    };

    return <a href={href} onClick={handleClick} {...props} />;
}