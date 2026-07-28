import type { Localized } from '@/i18n/types';

export interface JourneyItem {
  title: Localized;
  place: Localized;
  period: string;
  flag: string;
  description: Localized;
}

export interface JourneySection {
  heading: Localized;
  icon: string;
  items: JourneyItem[];
}

export const journey: JourneySection[] = [
  {
    heading: { pt: 'Mobilidades Erasmus+', en: 'Erasmus+ Mobilities' },
    icon: '',
    items: [
      {
        title: { pt: 'Seeking a New Life', en: 'Seeking a New Life' },
        place: { pt: 'Braga, Portugal', en: 'Braga, Portugal' },
        period: '10/2025',
        flag: '🇵🇹',
        description: {
          pt: 'Facilitação de aprendizagem com educação não-formal (role-plays, simulações), desenho de programas educativos e colaboração em equipas multiculturais.',
          en: 'Facilitating learning with non-formal education (role-plays, simulations), designing educational programs and collaborating in multicultural teams.',
        },
      },
      {
        title: { pt: 'United for Peace', en: 'United for Peace' },
        place: { pt: 'Leporano, Itália', en: 'Leporano, Italy' },
        period: '09/2024',
        flag: '🇮🇹',
        description: {
          pt: 'Inclusão social e cooperação internacional, multilinguismo, expressão criativa através da arte e desenvolvimento de soft skills.',
          en: 'Social inclusion and international cooperation, multilingualism, creative expression through art and soft-skill development.',
        },
      },
      {
        title: { pt: 'Using Mobile Apps in Classes', en: 'Using Mobile Apps in Classes' },
        place: { pt: 'Kresna, Bulgária', en: 'Kresna, Bulgaria' },
        period: '11/2019',
        flag: '🇧🇬',
        description: {
          pt: 'Exploração de aplicações móveis na sala de aula, criação de apps, competências digitais e compreensão intercultural.',
          en: 'Exploring mobile apps in the classroom, building apps, digital skills and intercultural understanding.',
        },
      },
    ],
  },
  {
    heading: { pt: 'Redes & Mentoria', en: 'Networks & Mentoring' },
    icon: '',
    items: [
      {
        title: { pt: 'Mentorias UMinho 2024', en: 'UMinho Mentoring 2024' },
        place: { pt: 'Universidade do Minho', en: 'University of Minho' },
        period: '2024',
        flag: '🇺🇲',
        description: {
          pt: 'Programa de apoio à transição para o mercado de trabalho. Mentorado pelo Sr. Bruno Silva (Administrador no Grupo Trofa Saúde), desenvolvendo competências transversais.',
          en: 'Job-market transition support program. Mentored by Mr. Bruno Silva (Administrator at Trofa Saúde Group), developing transversal skills.',
        },
      },
      {
        title: { pt: 'Projeto de Integração de Pares', en: 'Peer Integration Project' },
        place: { pt: 'Universidade do Minho', en: 'University of Minho' },
        period: '2022/2023',
        flag: '🇺🇲',
        description: {
          pt: 'Embaixador de acolhimento de novos estudantes no projeto de integração de pares da UMinho.',
          en: 'Ambassador for welcoming new students in UMinho\'s peer integration project.',
        },
      },
    ],
  },
];
