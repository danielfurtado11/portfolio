import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/store/useOS';
import { useI18n } from '@/i18n/useI18n';
import { APPS, type AppId } from '@/apps/apps.config';
import { AppIcon } from '@/components/AppIcon';
import { profile } from '@/data/profile';
import { sfx } from '@/lib/sfx';
import { useReducedMotion } from '@/hooks/useMediaQuery';

const LEFT: AppId[] = ['about', 'projects', 'experience', 'skills', 'cv'];
const RIGHT: AppId[] = ['education', 'erasmus', 'contact', 'terminal', 'minesweeper'];

export function StartMenu() {
  const { t, L } = useI18n();
  const openApp = useOS((s) => s.openApp);
  const setStartOpen = useOS((s) => s.setStartOpen);
  const logOff = useOS((s) => s.logOff);
  const setStage = useOS((s) => s.setStage);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // ignore clicks on the start button itself (handled there)
        const el = e.target as HTMLElement;
        if (!el.closest('.startbtn')) setStartOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setStartOpen(false);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [setStartOpen]);

  const launch = (id: AppId) => {
    sfx.open();
    openApp(id);
  };

  const Item = ({ id }: { id: AppId }) => (
    <button className="startmenu__item" onClick={() => launch(id)}>
      <AppIcon id={id} size={26} />
      <span>
        <b>{t(APPS[id].titleKey)}</b>
      </span>
    </button>
  );

  return (
    <motion.div
      className="startmenu"
      ref={ref}
      role="menu"
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="startmenu__head">
        <img src={profile.avatar} alt={profile.fullName} />
        <b>{profile.fullName}</b>
      </div>

      <div className="startmenu__cols">
        <div className="startmenu__left">
          {LEFT.map((id) => (
            <Item key={id} id={id} />
          ))}
          <div className="startmenu__sep" />
          <Item id="recycle" />
        </div>
        <div className="startmenu__right">
          {RIGHT.map((id) => (
            <Item key={id} id={id} />
          ))}
          <div className="startmenu__sep" />
          <button
            className="startmenu__item"
            onClick={() => { sfx.click(); window.open(profile.photo, '_blank'); }}
          >
            <span style={{ fontSize: 22, width: 26, textAlign: 'center' }}>🖼️</span>
            <span><b>{L({ pt: 'A minha foto', en: 'My photo' })}</b></span>
          </button>
        </div>
      </div>

      <div className="startmenu__foot">
        <button className="xp-btn" onClick={() => { sfx.close(); logOff(); }}>
          🔒 {t('startLogOff')}
        </button>
        <button className="xp-btn" onClick={() => { sfx.close(); setStage('boot'); }}>
          ⏻ {t('startShutDown')}
        </button>
      </div>
    </motion.div>
  );
}
