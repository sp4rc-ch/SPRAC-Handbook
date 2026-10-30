import { DEFAULT_LANGUAGE, isLanguage, type Language } from './languages';

/** The only thing the site stores in the browser, as described in the privacy policy. */
const STORAGE_KEY = 'sprac.language';

/** Remembers an explicit choice from the language dropdown. Storage can be blocked, so failures are ignored. */
export function rememberLanguage(language: Language) {
    try {
        localStorage.setItem(STORAGE_KEY, language);
    } catch {
        // Private mode or blocked site data: the site simply falls back to the browser language.
    }
}

function storedLanguage(): Language | undefined {
    try {
        const value = localStorage.getItem(STORAGE_KEY) ?? undefined;
        return isLanguage(value) ? value : undefined;
    } catch {
        return undefined;
    }
}

/** The remembered choice, else the first browser language we support, else English. */
export function detectLanguage(): Language {
    const stored = storedLanguage();
    if (stored) return stored;

    for (const tag of navigator.languages) {
        const code = tag.slice(0, 2).toLowerCase();
        if (isLanguage(code)) return code;
    }
    return DEFAULT_LANGUAGE;
}