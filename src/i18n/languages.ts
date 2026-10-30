export const LANGUAGES = ['en', 'de', 'fr', 'it', 'rm'] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

/** Each language named in itself, so the dropdown reads the same in every locale. */
export const LANGUAGE_NAMES: Record<Language, string> = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
    rm: 'Rumantsch',
};

export function isLanguage(value: string | undefined): value is Language {
    return LANGUAGES.includes(value as Language);
}