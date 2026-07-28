import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useOS, type WinInstance } from '@/store/useOS';
import { APPS } from '@/apps/apps.config';
import { useI18n } from '@/i18n/useI18n';
import { useDrag } from '@/hooks/useDrag';
import { AppIcon } from '@/components/AppIcon';
import { sfx } from '@/lib/sfx';
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery';

const TASKBAR = 44;

export function Window({ win, children }: { win: WinInstance; children: ReactNode }) {
  const meta = APPS[win.id];
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();

  const focusApp = useOS((s) => s.focusApp);
  const closeApp = useOS((s) => s.closeApp);
  const minimizeApp = useOS((s) => s.minimizeApp);
  const toggleMaximize = useOS((s) => s.toggleMaximize);
  const moveApp = useOS((s) => s.moveApp);
  const resizeApp = useOS((s) => s.resizeApp);
  const zTop = useOS((s) => s.zTop);

  const active = win.z === zTop && !win.minimized;
  const start = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const snapshot = () => {
    start.current = { x: win.x, y: win.y, w: win.w, h: win.h };
    focusApp(win.id);
  };

  const dragHandle = useDrag({
    disabled: win.maximized || isMobile,
    onStart: snapshot,
    onMove: ({ dx, dy }) => {
      const nx = Math.min(Math.max(start.current.x + dx, -win.w + 80), window.innerWidth - 80);
      const ny = Math.min(Math.max(start.current.y + dy, 0), window.innerHeight - TASKBAR - 30);
      moveApp(win.id, nx, ny);
    },
  });

  const resizeE = useDrag({
    onStart: snapshot,
    onMove: ({ dx }) =>
      resizeApp(win.id, { w: Math.max(meta.minSize.w, Math.min(start.current.w + dx, window.innerWidth - win.x)) }),
  });
  const resizeS = useDrag({
    onStart: snapshot,
    onMove: ({ dy }) =>
      resizeApp(win.id, { h: Math.max(meta.minSize.h, Math.min(start.current.h + dy, window.innerHeight - win.y - TASKBAR)) }),
  });
  const resizeSE = useDrag({
    onStart: snapshot,
    onMove: ({ dx, dy }) =>
      resizeApp(win.id, {
        w: Math.max(meta.minSize.w, Math.min(start.current.w + dx, window.innerWidth - win.x)),
        h: Math.max(meta.minSize.h, Math.min(start.current.h + dy, window.innerHeight - win.y - TASKBAR)),
      }),
  });

  const style = isMobile
    ? ({ left: 0, top: 0, width: '100vw', height: `calc(100dvh - ${TASKBAR}px)`, zIndex: win.z } as const)
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <motion.section
      className={`win ${active ? '' : 'inactive'}`}
      style={style}
      onPointerDown={() => focusApp(win.id)}
      initial={reduce ? false : { opacity: 0, scale: 0.94, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 6 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-label={t(meta.titleKey)}
    >
      <header
        className="win__bar"
        {...dragHandle}
        onDoubleClick={() => !isMobile && meta.resizable && toggleMaximize(win.id)}
      >
        <span className="win__bar-icon">
          <AppIcon id={win.id} size={18} />
        </span>
        <span className="win__bar-title">{t(meta.titleKey)}</span>
        <div
          className="win__controls"
          onPointerDown={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <button
            className="win__ctrl"
            title={t('minimize')}
            aria-label={t('minimize')}
            onClick={() => { sfx.close(); minimizeApp(win.id); }}
          >
            &#95;
          </button>
          {meta.resizable && !isMobile && (
            <button
              className="win__ctrl"
              title={win.maximized ? t('restore') : t('maximize')}
              aria-label={win.maximized ? t('restore') : t('maximize')}
              onClick={() => toggleMaximize(win.id)}
            >
              {win.maximized ? '❐' : '▢'}
            </button>
          )}
          <button
            className="win__ctrl win__ctrl--close"
            title={t('close')}
            aria-label={t('close')}
            onClick={() => { sfx.close(); closeApp(win.id); }}
          >
            ✕
          </button>
        </div>
      </header>

      <div className="win__body scroll">{children}</div>

      {meta.resizable && !win.maximized && !isMobile && (
        <>
          <div className="win__resize win__resize--e" {...resizeE} />
          <div className="win__resize win__resize--s" {...resizeS} />
          <div className="win__resize win__resize--se" {...resizeSE} />
        </>
      )}
    </motion.section>
  );
}
