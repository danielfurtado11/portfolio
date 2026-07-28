import { create } from 'zustand';
import type { Lang } from '@/i18n/types';
import { APPS, type AppId } from '@/apps/apps.config';

export type Stage = 'boot' | 'login' | 'desktop';
export type Session = 'day' | 'night';

export interface WinInstance {
  id: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** rect to restore to when un-maximizing */
  restore?: { x: number; y: number; w: number; h: number };
  /** monotonically increasing focus stamp (for taskbar ordering) */
  openedAt: number;
}

interface OSState {
  // preferences
  lang: Lang;
  session: Session;
  muted: boolean;
  toggleLang: () => void;
  setLang: (l: Lang) => void;
  toggleSession: () => void;
  toggleMuted: () => void;

  // stage machine
  stage: Stage;
  setStage: (s: Stage) => void;
  enter: () => void; // login -> desktop
  logOff: () => void; // desktop -> login

  // start menu
  startOpen: boolean;
  setStartOpen: (v: boolean) => void;

  // windows
  windows: WinInstance[];
  zTop: number;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  toggleFromTaskbar: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  moveApp: (id: AppId, x: number, y: number) => void;
  resizeApp: (id: AppId, patch: Partial<Pick<WinInstance, 'x' | 'y' | 'w' | 'h'>>) => void;
  minimizeAll: () => void;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/** Cascading spawn position so new windows don't stack exactly. */
function spawnRect(count: number, w: number, h: number) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const baseX = Math.max(24, vw * 0.14);
  const baseY = Math.max(20, vh * 0.09);
  const step = 30;
  const x = clamp(baseX + (count % 6) * step, 8, Math.max(8, vw - w - 8));
  const y = clamp(baseY + (count % 6) * step, 8, Math.max(8, vh - h - 60));
  return { x, y };
}

export const useOS = create<OSState>((set, get) => ({
  lang: 'en',
  session: 'day',
  muted: false,

  toggleLang: () => set((s) => ({ lang: s.lang === 'pt' ? 'en' : 'pt' })),
  setLang: (l) => set({ lang: l }),
  toggleSession: () => set((s) => ({ session: s.session === 'day' ? 'night' : 'day' })),
  toggleMuted: () => set((s) => ({ muted: !s.muted })),

  stage: 'boot',
  setStage: (stage) => set({ stage }),
  enter: () => set({ stage: 'desktop' }),
  logOff: () => set({ stage: 'login', windows: [], startOpen: false }),

  startOpen: false,
  setStartOpen: (startOpen) => set({ startOpen }),

  windows: [],
  zTop: 100,

  openApp: (id) => {
    const state = get();
    const existing = state.windows.find((w) => w.id === id);
    const nextZ = state.zTop + 1;
    if (existing) {
      // already open -> unminimize + focus
      set({
        zTop: nextZ,
        startOpen: false,
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, minimized: false, z: nextZ } : w,
        ),
      });
      return;
    }
    const meta = APPS[id];
    const { w, h } = meta.defaultSize;
    const { x, y } = spawnRect(state.windows.length, w, h);
    const win: WinInstance = {
      id, x, y, w, h, z: nextZ,
      minimized: false, maximized: false,
      openedAt: Date.now(),
    };
    set({ windows: [...state.windows, win], zTop: nextZ, startOpen: false });
  },

  closeApp: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusApp: (id) => {
    const state = get();
    const nextZ = state.zTop + 1;
    set({
      zTop: nextZ,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, z: nextZ, minimized: false } : w,
      ),
    });
  },

  toggleFromTaskbar: (id) => {
    const state = get();
    const win = state.windows.find((w) => w.id === id);
    if (!win) {
      get().openApp(id);
      return;
    }
    const isTop = win.z === state.zTop && !win.minimized;
    if (isTop) {
      set({ windows: state.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)) });
    } else {
      get().focusApp(id);
    }
  },

  minimizeApp: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    })),

  toggleMaximize: (id) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight - 44; // minus taskbar
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          const r = w.restore ?? { x: 60, y: 40, w: w.w, h: w.h };
          return { ...w, maximized: false, ...r };
        }
        return {
          ...w,
          maximized: true,
          restore: { x: w.x, y: w.y, w: w.w, h: w.h },
          x: 0, y: 0, w: vw, h: vh,
        };
      }),
    }));
  },

  moveApp: (id, x, y) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)) })),

  resizeApp: (id, patch) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, ...patch } : w)) })),

  minimizeAll: () =>
    set((s) => ({ windows: s.windows.map((w) => ({ ...w, minimized: true })) })),
}));
