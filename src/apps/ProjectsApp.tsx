import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { projects, githubProfile, type Project } from '@/data/projects';
import { DocButton } from '@/components/DocButton';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export function ProjectsApp() {
  const { t, L } = useI18n();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="doc">
      <div className="doc__wrap">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key="detail"
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              <button className="backlink" onClick={() => setSelected(null)}>
                ← {L({ pt: 'Voltar aos projetos', en: 'Back to projects' })}
              </button>

              <div className="proj-detail__head">
                <div
                  className="proj-detail__mark"
                  style={{ background: `${selected.accent[0]}16`, color: selected.accent[0] }}
                >
                  {selected.emoji}
                </div>
                <div>
                  <h2 className="proj-detail__name">{selected.name}</h2>
                  <div className="proj-detail__meta">
                    {L(selected.category)} · {selected.year}
                  </div>
                </div>
              </div>

              <div className="proj-detail__text">
                {L(selected.description).split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <h3 className="doc__label">{t('techStack')}</h3>
              <div className="tags" style={{ marginTop: 0 }}>
                {selected.tech.map((tech) => (
                  <span className="tag" key={tech}>{tech}</span>
                ))}
              </div>

              <div className="proj-detail__actions">
                {selected.demo && (
                  <DocButton variant="primary" onClick={() => window.open(selected.demo, '_blank')}>
                    {t('liveDemo')}
                    <span className="docbtn__ic" aria-hidden="true">↗</span>
                  </DocButton>
                )}
                {selected.repo && (
                  <DocButton onClick={() => window.open(selected.repo, '_blank')}>
                    {t('viewRepo')}
                    <span className="docbtn__ic" aria-hidden="true">↗</span>
                  </DocButton>
                )}
                {selected.repoExtra && (
                  <DocButton onClick={() => window.open(selected.repoExtra!.url, '_blank')}>
                    {selected.repoExtra.label}
                    <span className="docbtn__ic" aria-hidden="true">↗</span>
                  </DocButton>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
            >
              <header className="doc__head">
                <h2 className="doc__title">{t('appProjects')}</h2>
              </header>

              <div className="proj-grid">
                {projects.map((p) => (
                  <button
                    className="proj-card"
                    key={p.id}
                    onClick={() => setSelected(p)}
                    style={{ ['--pc' as string]: p.accent[0] }}
                  >
                    {p.featured && <span className="proj-star">★ {t('featured')}</span>}
                    <div className="proj-card__top">
                      <span className="proj-card__name">{p.name}</span>
                      <span className="proj-card__year">{p.year}</span>
                    </div>
                    <div className="proj-card__cat">{L(p.category)}</div>
                    <div className="proj-card__tag">{L(p.tagline)}</div>
                    <div className="proj-card__tech">
                      {p.tech.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="proj-more">
                <DocButton onClick={() => window.open(githubProfile, '_blank')}>
                  {t('moreOnGithub')}
                  <span className="docbtn__ic" aria-hidden="true">↗</span>
                </DocButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
