import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { experience } from '@/data/experience';
import type { Localized } from '@/i18n/types';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { sfx } from '@/lib/sfx';

export function ExperienceApp() {
  const { t, L } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => {
    sfx.click();
    setOpen((o) => ({ ...o, [i]: !o[i] }));
  };

  const endLabel = (end: Localized | string) => (typeof end === 'string' ? end : L(end));
  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.4, delay: reduce ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="doc">
      <div className="doc__wrap">
        <header className="doc__head">
          <h2 className="doc__title">{t('appExperience')}</h2>
        </header>

        {experience.map((job, i) => {
          const isOpen = !!open[i];
          return (
            <motion.section className="entry" key={i} {...rise(i)}>
              <div className="entry__head">
                <div>
                  <h3 className="entry__title">{L(job.role)}</h3>
                  <div className="entry__meta">
                    <b>{job.org}</b>
                    <span className="sep">·</span>
                    {L(job.location)}
                  </div>
                </div>
                <div className="entry__period">
                  {job.start} — {job.current ? <span className="now">{t('present')}</span> : endLabel(job.end)}
                </div>
              </div>

              <p className="entry__text">{L(job.summary)}</p>

              <button className="more" onClick={() => toggle(i)} aria-expanded={isOpen}>
                {isOpen ? t('showLess') : t('showMore')}
                <span className={`more__arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">⌄</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="details"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul className="entry__list">
                      {job.bullets.map((b, bi) => (
                        <li key={bi}>{L(b)}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {job.tags && (
                <div className="tags">
                  {job.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
