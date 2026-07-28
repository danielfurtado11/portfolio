import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { skillGroups, skillLabel } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export function SkillsApp() {
  const { t, lang, L } = useI18n();
  const reduce = useReducedMotion();

  return (
    <div className="doc">
      <div className="doc__wrap">
        <header className="doc__head">
          <h2 className="doc__title">{t('appSkills')}</h2>
          <p className="doc__intro">{t('skillsIntro')}</p>
        </header>

        <div className="skill-groups">
          {skillGroups.map((group, gi) => (
            <motion.section
              className="skill-group"
              key={group.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.32, delay: reduce ? 0 : gi * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="skill-group__title">{L(group.label)}</h3>
              <ul className="skill-group__list">
                {group.items.map((item) => {
                  const name = skillLabel(item, lang);
                  return <li key={name}>{name}</li>;
                })}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
