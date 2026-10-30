import { DEFAULT_LANGUAGE, isLanguage, type Language } from './languages';

/** Picks the first browser language we support, falling back to English. */
export function detectLanguage(): Language {
    for (const tag of navigator.languages) {
        const code = tag.slice(0, 2).toLowerCase();
        if (isLanguage(code)) return code;
    }
    return DEFAULT_LANGUAGE;
}