import { createContext, useContext } from 'react';
import { translations, type Translation } from './index';
import { DEFAULT_LANGUAGE, type Language } from './languages';

export const LanguageContext = createContext<Language>(DEFAULT_LANGUAGE);

export function useLanguage(): Language {
    return useContext(LanguageContext);
}

export function useTranslation(): Translation {
    return translations[useLanguage()];
}
