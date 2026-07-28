import type { StringKey } from '@/i18n/strings';

export type AppId =
  | 'about'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'erasmus'
  | 'contact'
  | 'cv'
  | 'minesweeper'
  | 'terminal'
  | 'recycle';

export interface AppMeta {
  id: AppId;
  titleKey: StringKey;
  /** icon key resolved by <AppIcon> */
  icon: AppId;
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
  resizable: boolean;
  /** show on the desktop grid */
  onDesktop: boolean;
  /** show in the Start menu */
  inStart: boolean;
}

export const APPS: Record<AppId, AppMeta> = {
  about: {
    id: 'about', titleKey: 'appAbout', icon: 'about',
    defaultSize: { w: 1040, h: 760 }, minSize: { w: 720, h: 560 },
    resizable: true, onDesktop: true, inStart: true,
  },
  experience: {
    id: 'experience', titleKey: 'appExperience', icon: 'experience',
    defaultSize: { w: 840, h: 520 }, minSize: { w: 520, h: 380 },
    resizable: true, onDesktop: true, inStart: true,
  },
  education: {
    id: 'education', titleKey: 'appEducation', icon: 'education',
    defaultSize: { w: 840, h: 500 }, minSize: { w: 520, h: 380 },
    resizable: true, onDesktop: true, inStart: true,
  },
  skills: {
    id: 'skills', titleKey: 'appSkills', icon: 'skills',
    defaultSize: { w: 900, h: 620 }, minSize: { w: 620, h: 460 },
    resizable: true, onDesktop: true, inStart: true,
  },
  projects: {
    id: 'projects', titleKey: 'appProjects', icon: 'projects',
    defaultSize: { w: 880, h: 620 }, minSize: { w: 480, h: 420 },
    resizable: true, onDesktop: true, inStart: true,
  },
  erasmus: {
    id: 'erasmus', titleKey: 'appErasmus', icon: 'erasmus',
    defaultSize: { w: 760, h: 600 }, minSize: { w: 420, h: 380 },
    resizable: true, onDesktop: true, inStart: true,
  },
  contact: {
    id: 'contact', titleKey: 'appContact', icon: 'contact',
    defaultSize: { w: 660, h: 540 }, minSize: { w: 380, h: 400 },
    resizable: true, onDesktop: true, inStart: true,
  },
  cv: {
    id: 'cv', titleKey: 'appCV', icon: 'cv',
    defaultSize: { w: 780, h: 700 }, minSize: { w: 420, h: 420 },
    resizable: true, onDesktop: true, inStart: true,
  },
  minesweeper: {
    id: 'minesweeper', titleKey: 'appMinesweeper', icon: 'minesweeper',
    defaultSize: { w: 380, h: 470 }, minSize: { w: 380, h: 470 },
    resizable: false, onDesktop: true, inStart: true,
  },
  terminal: {
    id: 'terminal', titleKey: 'appTerminal', icon: 'terminal',
    defaultSize: { w: 700, h: 440 }, minSize: { w: 420, h: 300 },
    resizable: true, onDesktop: true, inStart: true,
  },
  recycle: {
    id: 'recycle', titleKey: 'appRecycle', icon: 'recycle',
    defaultSize: { w: 540, h: 420 }, minSize: { w: 360, h: 320 },
    resizable: true, onDesktop: true, inStart: false,
  },
};

/** Order used for the desktop icon grid and Start menu. */
export const DESKTOP_ORDER: AppId[] = [
  'about', 'experience', 'education', 'skills',
  'projects', 'erasmus', 'contact', 'cv',
  'terminal', 'minesweeper', 'recycle',
];
