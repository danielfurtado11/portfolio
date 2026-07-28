import type { ComponentType } from 'react';
import type { AppId } from './apps.config';
import { AboutApp } from './AboutApp';
import { ExperienceApp } from './ExperienceApp';
import { EducationApp } from './EducationApp';
import { SkillsApp } from './SkillsApp';
import { ProjectsApp } from './ProjectsApp';
import { ErasmusApp } from './ErasmusApp';
import { ContactApp } from './ContactApp';
import { CVApp } from './CVApp';
import { MinesweeperApp } from './MinesweeperApp';
import { TerminalApp } from './TerminalApp';
import { RecycleBinApp } from './RecycleBinApp';

export const APP_CONTENT: Record<AppId, ComponentType> = {
  about: AboutApp,
  experience: ExperienceApp,
  education: EducationApp,
  skills: SkillsApp,
  projects: ProjectsApp,
  erasmus: ErasmusApp,
  contact: ContactApp,
  cv: CVApp,
  minesweeper: MinesweeperApp,
  terminal: TerminalApp,
  recycle: RecycleBinApp,
};
