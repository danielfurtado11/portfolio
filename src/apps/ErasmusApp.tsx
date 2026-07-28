import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { journey } from '@/data/erasmus';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export function ErasmusApp() {
  const { t, L } = useI18n();
  const reduce = useReducedMotion();

  return (
    <div className="doc">
      <div className="doc__wrap">
        <header className="doc__head">
          <h2 className="doc__title">{t('appErasmus')}</h2>
          <p className="doc__intro">
            {L({
              pt: 'Para além do código, cresci muito através de mobilidades internacionais, redes europeias e mentoria.',
              en: 'Beyond code, I grew a lot through international mobilities, European networks and mentoring.',
            })}
          </p>
        </header>

        {journey.map((section, si) => (
          <section className="doc__section" key={si}>
            <h3 className="doc__label">{L(section.heading)}</h3>

            {section.items.map((item, i) => (
              <motion.article
                className="entry"
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="entry__head">
                  <div>
                    <h4 className="entry__title">{L(item.title)}</h4>
                    <div className="entry__meta">
                      <span aria-hidden="true">{item.flag}</span>
                      <span className="sep">·</span>
                      {L(item.place)}
                    </div>
                  </div>
                  <div className="entry__period">{item.period}</div>
                </div>
                <p className="entry__text">{L(item.description)}</p>
              </motion.article>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
