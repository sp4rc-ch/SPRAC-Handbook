import type { Language } from './languages';
import { de } from './locales/de';
import { en, type Translation } from './locales/en';
import { fr } from './locales/fr';
import { it } from './locales/it';
import { rm } from './locales/rm';

export const translations: Record<Language, Translation> = { en, de, fr, it, rm };

export type { Translation };
