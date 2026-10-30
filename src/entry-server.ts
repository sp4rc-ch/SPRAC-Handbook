// Build-time entry: vite.config.ts renders every route to static HTML with this, so crawlers
// that do not run JavaScript (most AI search bots) still get the full page content.
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { setPrerenderPathname } from './router/navigation';

export function render(pathname: string): string {
    setPrerenderPathname(pathname);
    return renderToString(createElement(App));
}