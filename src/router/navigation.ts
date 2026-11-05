import { useSyncExternalStore } from 'react';

const NAVIGATE_EVENT = 'app:navigate';

/** Scrolls to the element a "#section" in the address points to, once the new page has rendered. */
function scrollToHash(hash: string) {
    const id = decodeURIComponent(hash.slice(1));
    // Two frames: React commits the new page after the navigate event, so the section may not exist yet.
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()));
}

export function navigate(to: string, { replace = false } = {}) {
    if (replace) {
        window.history.replaceState(null, '', to);
    } else {
        window.history.pushState(null, '', to);
        window.scrollTo(0, 0);
    }
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
    const hash = new URL(to, window.location.href).hash;
    if (hash) scrollToHash(hash);
}

function subscribe(onChange: () => void) {
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
        window.removeEventListener('popstate', onChange);
        window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
}

/** Path rendered at build time (see entry-server.ts); there is no window there. */
let prerenderPathname = '/';

export function setPrerenderPathname(pathname: string) {
    prerenderPathname = pathname;
}

const browserPathname = () => window.location.pathname;
// Also used while hydrating in the browser, where it must read the real location.
const serverPathname = () => (typeof window === 'undefined' ? prerenderPathname : window.location.pathname);

export function usePathname(): string {
    return useSyncExternalStore(subscribe, browserPathname, serverPathname);
}
