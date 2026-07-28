import type { Localized } from '@/i18n/types';

export interface EducationItem {
  degree: Localized;
  school: string;
  location: Localized;
  start: string;
  end: Localized | string;
  current?: boolean;
  grade?: Localized;
  eqf?: string;
  summary: Localized;
  highlights: Localized[];
}

export const education: EducationItem[] = [
  {
    degree: { pt: "Mestrado em Engenharia Informática", en: "Master's in Computer Engineering" },
    school: 'Universidade do Minho',
    location: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    start: '2023',
    end: '2026',
    grade: { pt: 'Média final: 16,4', en: 'Final grade: 16.4' },
    summary: {
      pt: 'Aprofundamento em Sistemas Inteligentes e Engenharia de Aplicações, com foco em IA, deep learning e arquiteturas de software.',
      en: 'Specializing in Intelligent Systems and Applications Engineering, focused on AI, deep learning and software architectures.',
    },
    highlights: [
      {
        pt: 'Sistemas Inteligentes: Agentes e Sistemas Multi-agente, Deep Learning, Sensorização e Ambiente.',
        en: 'Intelligent Systems: Agents & Multi-agent Systems, Deep Learning, Sensorization & Environment.',
      },
      {
        pt: 'Engenharia de Aplicações: Administração de BD, Arquiteturas de Aplicações, Sistemas Interativos Confiáveis.',
        en: 'Applications Engineering: Database Administration, Application Architectures, Reliable Interactive Systems.',
      },
      {
        pt: 'Cloud Computing (GCP, Laravel), Computação Paralela, Métodos Formais e Engenharia de Requisitos (React, Django).',
        en: 'Cloud Computing (GCP, Laravel), Parallel Computing, Formal Methods and Requirements Engineering (React, Django).',
      },
      {
        pt: 'Ferramentas back/front-end: Spring, Hibernate, Vue.js, JSF, Svelte; metadados com Apache Spark.',
        en: 'Back/front-end tools: Spring, Hibernate, Vue.js, JSF, Svelte; metadata with Apache Spark.',
      },
    ],
  },
  {
    degree: { pt: 'Licenciatura em Engenharia Informática', en: "Bachelor's in Computer Engineering" },
    school: 'Universidade do Minho',
    location: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
    start: '2020',
    end: '2023',
    grade: { pt: 'Média final: 14,7', en: 'Final grade: 14.7' },
    summary: {
      pt: 'Base sólida em engenharia informática através de projetos práticos nas áreas fundamentais da área.',
      en: 'A solid foundation in computer engineering through hands-on projects across the field.',
    },
    highlights: [
      {
        pt: 'Programação: Haskell, C, Java, C++, Python, SQL, MatLab.',
        en: 'Programming: Haskell, C, Java, C++, Python, SQL, MatLab.',
      },
      {
        pt: 'Algoritmos, Bases de Dados, Inteligência Artificial e Análise de Dados.',
        en: 'Algorithms, Databases, Artificial Intelligence and Data Analysis.',
      },
      {
        pt: 'Sistemas Distribuídos, Redes, Computação Gráfica e Interfaces.',
        en: 'Distributed Systems, Networks, Computer Graphics and User Interfaces.',
      },
    ],
  },
];
