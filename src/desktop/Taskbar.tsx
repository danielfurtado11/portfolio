import { useOS } from '@/store/useOS';
import { useI18n } from '@/i18n/useI18n';
import { APPS } from '@/apps/apps.config';
import { AppIcon } from '@/components/AppIcon';
import { BrandFlag } from '@/components/BrandLogo';
import { useNow } from '@/hooks/useNow';
import { sfx, primeAudio } from '@/lib/sfx';

export function Taskbar() {
  const { t, lang } = useI18n();
  const windows = useOS((s) => s.windows);
  const zTop = useOS((s) => s.zTop);
  const startOpen = useOS((s) => s.startOpen);
  const setStartOpen = useOS((s) => s.setStartOpen);
  const toggleFromTaskbar = useOS((s) => s.toggleFromTaskbar);
  const toggleLang = useOS((s) => s.toggleLang);
  const muted = useOS((s) => s.muted);
  const toggleMuted = useOS((s) => s.toggleMuted);
  const session = useOS((s) => s.session);
  const toggleSession = useOS((s) => s.toggleSession);

  const now = useNow();
  const clock = now.toLocaleTimeString(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = now.toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const ordered = [...windows].sort((a, b) => a.openedAt - b.openedAt);

  return (
    <nav className="taskbar" aria-label="Taskbar">
      <button
        className={`startbtn ${startOpen ? 'open' : ''}`}
        onClick={() => { sfx.click(); setStartOpen(!startOpen); }}
        aria-haspopup="menu"
        aria-expanded={startOpen}
      >
        <span className="startbtn__orb">
          <BrandFlag />
        </span>
        {t('start')}
      </button>

      <div className="tasks">
        {ordered.map((w) => (
          <button
            key={w.id}
            className={`taskbtn ${w.z === zTop && !w.minimized ? 'active' : ''}`}
            onClick={() => toggleFromTaskbar(w.id)}
            title={t(APPS[w.id].titleKey)}
          >
            <AppIcon id={w.id} size={16} />
            <span>{t(APPS[w.id].titleKey)}</span>
          </button>
        ))}
      </div>

      <div className="tray">
        <button
          className="tray__btn tray__lang"
          onClick={() => { sfx.toggle(); toggleLang(); }}
          title={t('language')}
        >
          {lang.toUpperCase()}
        </button>
        <button
          className="tray__btn"
          onClick={() => { toggleSession(); primeAudio(); sfx.toggle(); }}
          title={t('theme')}
        >
          {session === 'day' ? '☀️' : '🌙'}
        </button>
        <button
          className="tray__btn"
          onClick={() => { toggleMuted(); if (muted) { primeAudio(); sfx.toggle(); } }}
          title={muted ? t('soundOff') : t('soundOn')}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <div className="tray__clock" title={dateStr}>
          <div>{clock}</div>
        </div>
      </div>
    </nav>
  );
}
