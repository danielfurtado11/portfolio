import { useState } from 'react';
import { useOS } from '@/store/useOS';
import { useI18n } from '@/i18n/useI18n';
import { APPS, DESKTOP_ORDER } from '@/apps/apps.config';
import { AppIcon } from '@/components/AppIcon';
import { sfx } from '@/lib/sfx';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function DesktopIcons() {
  const openApp = useOS((s) => s.openApp);
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<string | null>(null);

  const open = (id: (typeof DESKTOP_ORDER)[number]) => {
    sfx.open();
    openApp(id);
  };

  return (
    <div className="dicons" onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
      {DESKTOP_ORDER.filter((id) => APPS[id].onDesktop).map((id) => (
        <button
          key={id}
          className={`dicon ${selected === id ? 'selected' : ''}`}
          onClick={() => (isMobile ? open(id) : setSelected(id))}
          onDoubleClick={() => open(id)}
          onKeyDown={(e) => e.key === 'Enter' && open(id)}
          aria-label={t(APPS[id].titleKey)}
        >
          <span className="dicon__img">
            <AppIcon id={id} size={66} />
          </span>
          <span className="dicon__label">{t(APPS[id].titleKey)}</span>
        </button>
      ))}
    </div>
  );
}
