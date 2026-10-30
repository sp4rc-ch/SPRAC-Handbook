import { useSyncExternalStore } from 'react';

const NAVIGATE_EVENT = 'app:navigate';

export function navigate(to: string, { replace = false } = {}) {
    if (replace) {
        window.history.replaceState(null, '', to);
    } else {
        window.history.pushState(null, '', to);
        window.scrollTo(0, 0);
    }
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

function subscribe(onChange: () => void) {
    window.addEventListener('popstate', onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
        window.removeEventListener('popstate', onChange);
        window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
}

export function usePathname(): string {
    return useSyncExternalStore(subscribe, () => window.location.pathname);
}