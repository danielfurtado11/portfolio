import type { Lang, Localized } from '@/i18n/types';

/**
 * Skills grouped by area instead of arbitrary tiers or percentages.
 * Items are plain strings when the name is the same in both languages
 * (tech names, mostly) and { pt, en } when they need translating.
 */
export type SkillItem = string | Localized;

export interface SkillGroup {
  id: string;
  label: Localized;
  items: SkillItem[];
}

/** Resolve a skill label for the active language. */
export const skillLabel = (item: SkillItem, lang: Lang): string =>
  typeof item === 'string' ? item : item[lang];

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    label: { pt: 'IA & Machine Learning', en: 'AI & Machine Learning' },
    items: [
      'Machine Learning',
      'Deep Learning',
      { pt: 'Redes Neuronais', en: 'Neural Networks' },
      { pt: 'Visão por Computador', en: 'Computer Vision' },
      'PyTorch',
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'OpenCV',
      'NumPy',
      'Pandas',
      'Data Augmentation',
      'Hugging Face',
      'LLMs',
      'AI Agents',
      'RAG',
      'MCP',
      'Prompt Engineering',
    ],
  },
  {
    id: 'languages',
    label: { pt: 'Linguagens', en: 'Programming Languages' },
    items: [
      'Python',
      'Java',
      'TypeScript',
      'JavaScript',
      'C',
      'SQL',
      'Haskell',
      'Assembly',
      'MATLAB',
    ],
  },
  {
    id: 'backend',
    label: { pt: 'Backend & APIs', en: 'Backend & APIs' },
    items: [
      'FastAPI',
      'Django',
      'Spring',
      'REST APIs',
    ],
  },
  {
    id: 'frontend',
    label: { pt: 'Frontend & Web', en: 'Frontend & Web' },
    items: [
      'React',
      'Next.js',
      'Vue.js',
      'TypeScript',
    ],
  },
  {
    id: 'data',
    label: { pt: 'Dados & Bases de Dados', en: 'Data & Databases' },
    items: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'MongoDB',
      'Apache Spark',
    ],
  },
  {
    id: 'cloud',
    label: { pt: 'Cloud & DevOps', en: 'Cloud & DevOps' },
    items: [
      'Docker',
      'Docker Compose',
      'GCP',
      'Linux',
    ],
  },
  {
    id: 'tools',
    label: { pt: 'Ferramentas & Práticas', en: 'Tools & Practices' },
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Figma',
      'Notion',
      'UML',
    ],
  },
  {
    id: 'soft',
    label: { pt: 'Competências Transversais', en: 'Soft Skills' },
    items: [
      { pt: 'Equipas multiculturais', en: 'Multicultural teams' },
      { pt: 'Falar em público', en: 'Public speaking' },
      { pt: 'Mentoria', en: 'Mentoring' },
      { pt: 'Trabalho em equipa', en: 'Teamwork' },
      { pt: 'Comunicação', en: 'Communication' },
    ],
  },
  {
    id: 'spoken',
    label: { pt: 'Idiomas', en: 'Languages' },
    items: [
      { pt: 'Português — Nativo', en: 'Portuguese — Native' },
      { pt: 'Inglês — C1', en: 'English — C1' },
    ],
  },
];
