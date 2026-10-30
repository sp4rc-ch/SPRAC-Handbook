export const LANGUAGES = ['en', 'de', 'fr', 'it', 'rm'] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export function isLanguage(value: string | undefined): value is Language {
    return LANGUAGES.includes(value as Language);
}

/** Picks the first browser language we support, falling back to English. */
export function detectLanguage(): Language {
    for (const tag of navigator.languages) {
        const code = tag.slice(0, 2).toLowerCase();
        if (isLanguage(code)) return code;
    }
    return DEFAULT_LANGUAGE;
}