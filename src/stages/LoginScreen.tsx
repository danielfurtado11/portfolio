import { motion } from 'framer-motion';
import { useOS } from '@/store/useOS';
import { useI18n } from '@/i18n/useI18n';
import { Wallpaper } from '@/components/Wallpaper';
import { BrandFlag } from '@/components/BrandLogo';
import { profile } from '@/data/profile';
import { primeAudio, sfx } from '@/lib/sfx';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export function LoginScreen() {
  const { t, lang } = useI18n();
  const enter = useOS((s) => s.enter);
  const setStage = useOS((s) => s.setStage);
  const toggleLang = useOS((s) => s.toggleLang);
  const muted = useOS((s) => s.muted);
  const toggleMuted = useOS((s) => s.toggleMuted);
  const session = useOS((s) => s.session);
  const toggleSession = useOS((s) => s.toggleSession);
  const reduce = useReducedMotion();

  const handleEnter = () => {
    primeAudio();
    sfx.startup();
    setTimeout(enter, reduce ? 0 : 260);
  };

  return (
    <div className="login">
      <Wallpaper />
      <div className="login__topbar" />
      <div className="login__botbar" />

      <div className="login__corner">
        <button className="pilltoggle" onClick={toggleLang} aria-label={t('language')}>
          🌐 {lang.toUpperCase()}
        </button>
        <button
          className="pilltoggle"
          onClick={() => { toggleMuted(); if (muted) { primeAudio(); sfx.toggle(); } }}
          aria-label={t('sound')}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button className="pilltoggle" onClick={toggleSession} aria-label={t('theme')}>
          {session === 'day' ? '☀️' : '🌙'}
        </button>
      </div>

      <motion.div
        className="login__card login__card--center"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="login__welcome">
          <BrandFlag /> <span>{t('loginHello')} · Daniel OS</span>
        </div>

        <div className="login__avatarwrap" title={profile.fullName}>
          <img className="login__avatar" src={profile.avatar} alt={profile.fullName} />
          <span className="login__status" />
        </div>

        <div className="login__name" aria-label="Daniel Furtado">
          Daniel Furtado
        </div>

        <div className="login__tagline">AI &amp; Software Engineer</div>

        <button className="login__enter" onClick={handleEnter}>
          {t('loginEnter')} <span className="arrow">→</span>
        </button>

        <div className="login__hint">{t('loginHint')}</div>
      </motion.div>

      <div className="login__footer">
        <button className="pilltoggle" onClick={() => setStage('boot')} title={t('loginShutdown')}>
          ⏻ {t('loginShutdown')}
        </button>
      </div>
    </div>
  );
}
