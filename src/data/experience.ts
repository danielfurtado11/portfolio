import type { Localized } from '@/i18n/types';

export interface ExperienceItem {
  role: Localized;
  org: string;
  location: Localized;
  start: string; // display
  end: Localized | string; // Localized when "Present"
  current?: boolean;
  summary: Localized;
  bullets: Localized[];
  tags?: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: { pt: 'AI & Software Engineer', en: 'AI & Software Engineer' },
    org: 'NEXI',
    location: { pt: 'Barcelos, Portugal', en: 'Barcelos, Portugal' },
    start: '09/2024',
    end: { pt: 'Atualidade', en: 'Present' },
    current: true,
    summary: {
      pt: 'Investigação e desenvolvimento na área de IA. Gestão do ciclo de vida completo da plataforma.',
      en: 'Research and development in AI, managing the platform.',
    },
    bullets: [
      {
        pt: 'Deep Learning & Computer Vision: investigação e implementação de modelos de ML.',
        en: 'Deep Learning & Computer Vision: research and implementation of ML models.',
      },
      {
        pt: 'Desenvolvimento web full-stack: desenho e deployment de soluções completas.',
        en: 'Full-stack web development: design and deployment of complete solutions.',
      },
      {
        pt: 'Voice AI: experimentação e integração de modelos de voz.',
        en: 'Voice AI: experimentation and integration of voice models.',
      },
      {
        pt: 'Otimização de performance e integração de sistemas ao longo de todo o ciclo de vida.',
        en: 'Performance optimization and system integration across the whole lifecycle.',
      },
    ],
    tags: ['Deep Learning', 'Computer Vision', 'Voice AI', 'Python', 'Full-stack'],
  },
  {
    role: { pt: 'Colaborador — Comunicação e Imagem', en: 'Collaborator — Communication & Image' },
    org: 'Universidade do Minho',
    location: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    start: '07/2022',
    end: '09/2025',
    summary: {
      pt: 'Representação e promoção da Universidade do Minho em feiras e eventos, incluindo colaboração na aliança europeia ARQUS.',
      en: 'Representing and promoting the University of Minho at fairs and events, including collaboration in the European ARQUS Alliance.',
    },
    bullets: [
      {
        pt: 'Representante em Futuralia (2023, 2025), Qualifica (2023–2025) e UPA (2023–2025).',
        en: 'Representative at Futuralia (2023, 2025), Qualifica (2023–2025) and UPA (2023–2025).',
      },
      {
        pt: 'Monitor do Summer on Campus (2022–2025) e da Semana da Economia de Braga (2024).',
        en: 'Summer on Campus monitor (2022–2025) and Braga Economy Week (2024).',
      },
      {
        pt: 'Promoção da universidade em escolas secundárias.',
        en: 'Promoting the university in secondary schools.',
      },
      {
        pt: 'Aliança ARQUS (9 universidades europeias): colaborador no Council Meet (2023, 2024) e no projeto “Arqus for Ukraine”.',
        en: 'ARQUS Alliance (9 European universities): collaborator at Council Meet (2023, 2024) and the “Arqus for Ukraine” project.',
      },
    ],
    tags: ['Comunicação', 'Eventos', 'ARQUS'],
  },
];
