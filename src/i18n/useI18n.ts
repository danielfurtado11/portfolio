import { useOS } from '@/store/useOS';
import { translate, type StringKey } from './strings';
import { pick, type Localized } from './types';

/**
 * Access the active language and translation helpers.
 *  - `t(key)` translates a UI string key.
 *  - `L(localized)` picks the active language from a { pt, en } value.
 */
export function useI18n() {
  const lang = useOS((s) => s.lang);
  return {
    lang,
    t: (key: StringKey) => translate(key, lang),
    L: (value: Localized) => pick(value, lang),
  };
}
