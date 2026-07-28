import type { Localized } from '@/i18n/types';

export interface Project {
  id: string;
  name: string;
  featured?: boolean;
  year: string;
  category: Localized;
  tagline: Localized;
  description: Localized;
  tech: string[];
  repo?: string;
  repoExtra?: { label: string; url: string };
  demo?: string;
  /** emoji used as the project "thumbnail" tile */
  emoji: string;
  /** accent gradient for the thumbnail */
  accent: [string, string];
}

export const projects: Project[] = [
  {
    id: 'agromoreira',
    name: 'AgroMoreira',
    featured: true,
    year: '2026',
    category: { pt: 'Full-stack · Web', en: 'Full-stack · Web' },
    tagline: {
      pt: 'Loja online e painel de gestão para um negócio agrícola de duas lojas.',
      en: 'Storefront and admin panel for a two-store agricultural business.',
    },
    description: {
      pt: 'Projeto full-stack completo: um site público (catálogo de produtos, notícias, contactos das lojas) e um painel de administração protegido para os donos gerirem tudo. Frontend em Next.js 16 com React Server Components e um design derivado do logótipo da empresa; backend em FastAPI com PostgreSQL, imagens em Cloudflare R2 e deployment no Google Cloud Run. Tipos TypeScript gerados a partir do schema OpenAPI da API, autenticação por JWT em cookie httpOnly e animações 100% CSS com respeito por prefers-reduced-motion.',
      en: 'A complete full-stack project: a public website (product catalogue, news, store contacts) and a protected admin panel for the owners to manage everything. Frontend in Next.js 16 with React Server Components and a design derived from the company logo; backend in FastAPI with PostgreSQL, images on Cloudflare R2 and deployment on Google Cloud Run. TypeScript types generated from the API OpenAPI schema, JWT auth in an httpOnly cookie, and 100% CSS animations that honour prefers-reduced-motion.',
    },
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'FastAPI', 'PostgreSQL', 'Cloud Run', 'Cloudflare R2'],
    repo: 'https://github.com/danielfurtado11/agromoreira-web',
    repoExtra: { label: 'API', url: 'https://github.com/danielfurtado11/agromoreira-api' },
    demo: 'https://agromoreira.vercel.app/',
    emoji: '🌱',
    accent: ['#1e5631', '#8dbe3d'],
  },
  {
    id: 'dissertation',
    name: 'Student Engagement Assessment',
    featured: true,
    year: '2025',
    category: { pt: 'Dissertação · ML / Computer Vision', en: 'Thesis · ML / Computer Vision' },
    tagline: {
      pt: 'Modelo de deep learning para avaliar o envolvimento de alunos em aula.',
      en: 'A deep learning model to assess student engagement in class.',
    },
    description: {
      pt: 'Dissertação de mestrado: "Development of a Model for Assessing Student Engagement in Class". Investigação e desenvolvimento de um modelo de Deep Learning / Computer Vision capaz de estimar o nível de envolvimento e atenção de estudantes num contexto de sala de aula, cruzando visão computacional com técnicas de aprendizagem profunda.',
      en: 'Master\'s thesis: "Development of a Model for Assessing Student Engagement in Class". Research and development of a Deep Learning / Computer Vision model that estimates the engagement and attention level of students in a classroom setting, blending computer vision with deep learning techniques.',
    },
    tech: ['Python', 'Deep Learning', 'Computer Vision', 'PyTorch', 'TensorFlow'],
    emoji: '🎓',
    accent: ['#2a5fd6', '#6cb3f2'],
  },
  {
    id: 'so-project',
    name: 'Operating Systems Project',
    year: '2024',
    category: { pt: 'Sistemas · C', en: 'Systems · C' },
    tagline: {
      pt: 'Trabalho da cadeira de Sistemas Operativos.',
      en: 'Project for the Operating Systems course.',
    },
    description: {
      pt: 'Projeto em C explorando conceitos de sistemas operativos — processos, comunicação entre processos e gestão de recursos a baixo nível.',
      en: 'A C project exploring operating-system concepts — processes, inter-process communication and low-level resource management.',
    },
    tech: ['C', 'Linux', 'Processes', 'IPC'],
    repo: 'https://github.com/danielfurtado11/SO-Project',
    emoji: '⚙️',
    accent: ['#4a5568', '#94a3b8'],
  },
  {
    id: 'ia-project',
    name: 'Artificial Intelligence Project',
    year: '2023',
    category: { pt: 'IA · Python', en: 'AI · Python' },
    tagline: {
      pt: 'Trabalho da cadeira de Inteligência Artificial.',
      en: 'Project for the Artificial Intelligence course.',
    },
    description: {
      pt: 'Implementação de algoritmos de procura e técnicas de IA clássica em Python para resolver problemas de decisão e otimização.',
      en: 'Implementation of search algorithms and classic AI techniques in Python to solve decision and optimization problems.',
    },
    tech: ['Python', 'Search Algorithms', 'AI'],
    repo: 'https://github.com/danielfurtado11/IA-Project',
    emoji: '🤖',
    accent: ['#7c3aed', '#a78bfa'],
  },
  {
    id: 'sd-project',
    name: 'Distributed Systems Project',
    year: '2023',
    category: { pt: 'Sistemas Distribuídos · Java', en: 'Distributed Systems · Java' },
    tagline: {
      pt: 'Trabalho da cadeira de Sistemas Distribuídos.',
      en: 'Project for the Distributed Systems course.',
    },
    description: {
      pt: 'Aplicação cliente-servidor em Java com comunicação por sockets, concorrência e coordenação entre múltiplos clientes.',
      en: 'A client-server Java application with socket communication, concurrency and coordination across multiple clients.',
    },
    tech: ['Java', 'Sockets', 'Concurrency'],
    repo: 'https://github.com/danielfurtado11/SD-Project',
    emoji: '🔗',
    accent: ['#b45309', '#f59e0b'],
  },
  {
    id: 'cg-project',
    name: 'Computer Graphics Project',
    year: '2023',
    category: { pt: 'Computação Gráfica · C++', en: 'Computer Graphics · C++' },
    tagline: {
      pt: 'Trabalho da cadeira de Computação Gráfica.',
      en: 'Project for the Computer Graphics course.',
    },
    description: {
      pt: 'Motor gráfico 3D com geração de primitivas, transformações geométricas e renderização de cenas hierárquicas.',
      en: 'A 3D graphics engine with primitive generation, geometric transformations and hierarchical scene rendering.',
    },
    tech: ['C++', 'OpenGL', '3D'],
    repo: 'https://github.com/danielfurtado11/CG-Project',
    emoji: '🎨',
    accent: ['#be185d', '#f472b6'],
  },
];

export const githubProfile = 'https://github.com/danielfurtado11';
