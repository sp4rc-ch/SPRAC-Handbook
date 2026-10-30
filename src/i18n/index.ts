import type { Language } from './languages.ts';
import { de } from './locales/de.ts';
import { en, type Translation } from './locales/en.ts';
import { fr } from './locales/fr.ts';
import { it } from './locales/it.ts';
import { rm } from './locales/rm.ts';

export const translations: Record<Language, Translation> = { en, de, fr, it, rm };

export type { Translation };