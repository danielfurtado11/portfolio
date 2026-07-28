import type { Lang } from './types';

/** UI strings (chrome, buttons, labels). Content lives in src/data/*. */
export const strings = {
  // Boot
  bootStarting: { pt: 'A iniciar o Daniel OS', en: 'Starting Daniel OS' },
  bootSkip: { pt: 'Clica para saltar', en: 'Click to skip' },

  // Login / welcome
  loginHello: { pt: 'Bem-vindo', en: 'Welcome' },
  loginEnter: { pt: 'Entrar', en: 'Enter' },
  loginHint: {
    pt: 'Clica em Entrar para explorar o meu desktop',
    en: 'Click Enter to explore my desktop',
  },
  loginShutdown: { pt: 'Encerrar', en: 'Turn off' },

  // Taskbar / start
  start: { pt: 'Iniciar', en: 'Start' },
  startAllApps: { pt: 'Todas as apps', en: 'All apps' },
  startLogOff: { pt: 'Terminar sessão', en: 'Log off' },
  startShutDown: { pt: 'Encerrar', en: 'Shut down' },
  showDesktop: { pt: 'Mostrar o ambiente de trabalho', en: 'Show desktop' },

  // Window chrome
  minimize: { pt: 'Minimizar', en: 'Minimize' },
  maximize: { pt: 'Maximizar', en: 'Maximize' },
  restore: { pt: 'Restaurar', en: 'Restore' },
  close: { pt: 'Fechar', en: 'Close' },

  // System tray
  language: { pt: 'Idioma', en: 'Language' },
  sound: { pt: 'Som', en: 'Sound' },
  soundOn: { pt: 'Som ligado', en: 'Sound on' },
  soundOff: { pt: 'Som desligado', en: 'Sound off' },
  theme: { pt: 'Tema dia/noite', en: 'Day/night theme' },

  // App titles
  appAbout: { pt: 'Sobre Mim', en: 'About Me' },
  appExperience: { pt: 'Experiência', en: 'Experience' },
  appEducation: { pt: 'Educação', en: 'Education' },
  appSkills: { pt: 'Competências', en: 'Skills' },
  appProjects: { pt: 'Projetos', en: 'Projects' },
  appErasmus: { pt: 'Erasmus & Redes', en: 'Erasmus & Networks' },
  appContact: { pt: 'Contactos', en: 'Contact' },
  appCV: { pt: 'CV.pdf', en: 'CV.pdf' },
  appMinesweeper: { pt: 'Campo Minado', en: 'Minesweeper' },
  appTerminal: { pt: 'Terminal', en: 'Terminal' },
  appRecycle: { pt: 'Reciclagem', en: 'Recycle Bin' },

  // Common
  present: { pt: 'Atualidade', en: 'Present' },
  showMore: { pt: 'Mostrar mais', en: 'Show more' },
  showLess: { pt: 'Mostrar menos', en: 'Show less' },
  viewRepo: { pt: 'Ver repositório', en: 'View repository' },
  liveDemo: { pt: 'Demo ao vivo', en: 'Live demo' },
  moreOnGithub: { pt: 'Mais no GitHub', en: 'More on GitHub' },
  downloadCV: { pt: 'Descarregar CV', en: 'Download CV' },
  openCV: { pt: 'Abrir em nova aba', en: 'Open in new tab' },
  contactIntro: {
    pt: 'Estou sempre aberto a novas oportunidades e conversas. Escolhe o canal que preferires.',
    en: "I'm always open to new opportunities and conversations. Pick whichever channel you prefer.",
  },
  copy: { pt: 'Copiar', en: 'Copy' },
  copied: { pt: 'Copiado!', en: 'Copied!' },
  featured: { pt: 'Destaque', en: 'Featured' },
  techStack: { pt: 'Tecnologias', en: 'Tech stack' },
  skillsIntro: {
    pt: 'Ferramentas e áreas com que trabalho, agrupadas por domínio — do treino de modelos ao deployment.',
    en: 'Tools and areas I work with, grouped by domain — from training models to shipping them.',
  },

  // Minesweeper
  msNew: { pt: 'Novo jogo', en: 'New game' },
  msWin: { pt: 'Ganhaste! 🎉', en: 'You win! 🎉' },
  msLose: { pt: 'Boom! 💥', en: 'Boom! 💥' },
  msFlagsLeft: { pt: 'Minas', en: 'Mines' },

  // Recycle bin
  recycleEmpty: {
    pt: 'A Reciclagem está (quase) vazia.',
    en: 'The Recycle Bin is (almost) empty.',
  },
} as const satisfies Record<string, { pt: string; en: string }>;

export type StringKey = keyof typeof strings;

export const translate = (key: StringKey, lang: Lang): string => strings[key][lang];
