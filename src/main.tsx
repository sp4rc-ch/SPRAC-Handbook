import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const container = document.getElementById('root')!;
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);

// Built pages ship pre-rendered HTML for their own path. Hydrate it there; anywhere else
// (404.html answering an unknown path, the dev server) render from scratch.
const normalize = (path: string) => path.replace(/\/?$/, '/');
if (container.dataset.prerendered && normalize(container.dataset.prerendered) === normalize(window.location.pathname)) {
    hydrateRoot(container, app);
} else {
    container.replaceChildren();
    createRoot(container).render(app);
}