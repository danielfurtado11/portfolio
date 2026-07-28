export type Lang = 'pt' | 'en';

/** A string that exists in both languages. */
export type Localized = { pt: string; en: string };

/** Pick a language out of a Localized value. */
export const pick = (value: Localized, lang: Lang): string => value[lang];
