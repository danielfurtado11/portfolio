import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { profile } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export function AboutApp() {
  const { L, lang } = useI18n();
  const reduce = useReducedMotion();

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.4, delay: reduce ? 0 : i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  const facts = [
    L(profile.location),
    lang === 'pt' ? `${profile.age} anos` : `${profile.age} years old`,
    lang === 'pt' ? 'Mestrado · Universidade do Minho' : 'MSc · University of Minho',
    'AI & Software Engineer @ NEXI',
  ];

  return (
    <div className="doc">
      <div className="doc__wrap">
        <motion.header
          className="about-head"
          {...(reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } })}
        >
          <div className="about-head__photo">
            <img src={profile.photo} alt={profile.fullName} />
          </div>
          <div>
            <h2 className="about-head__name">{profile.fullName}</h2>
            <p className="about-head__role">{L(profile.headline)}</p>
            <p className="about-facts">
              {facts.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </p>
          </div>
        </motion.header>

        {profile.aboutSections.map((sec, i) => (
          <motion.section className="about-sec" key={i} {...rise(i)}>
            <h3 className="about-sec__title">{L(sec.title)}</h3>
            <p className="about-sec__text">{L(sec.text)}</p>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
