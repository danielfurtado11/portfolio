import { useI18n } from '@/i18n/useI18n';
import type { Localized } from '@/i18n/types';

const items: { label: Localized }[] = [
  { label: { pt: 'bugs.log', en: 'bugs.log' } },
  { label: { pt: 'portfolios.zip', en: 'portfolios.zip' } },
  { label: { pt: 'cafes_bebidos.csv', en: 'coffees_consumed.csv' } },
  { label: { pt: 'ideias_ma.txt', en: 'bad_ideas.txt' } },
];

export function RecycleBinApp() {
  const { t, L } = useI18n();
  return (
    <div className="doc">
      <div className="doc__wrap">
        <header className="doc__head">
          <h2 className="doc__title">{t('appRecycle')}</h2>
          <p className="doc__intro">{t('recycleEmpty')}</p>
        </header>

        <div className="recycle-list">
          {items.map((it, i) => (
            <div className="recycle-row" key={i}>
              <span className="ic" aria-hidden="true"></span>
              <span className="nm">{L(it.label)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
