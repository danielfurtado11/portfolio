import type { Localized } from '@/i18n/types';

export const profile = {
  firstName: 'Daniel',
  lastName: 'Furtado',
  fullName: 'Daniel José Silva Furtado',
  avatar: '/assets/profile_image.png',
  photo: '/assets/profile_image.png',
  bornISO: '2002-09-11',
  age: 23,
  location: { pt: 'Barcelos, Portugal', en: 'Barcelos, Portugal' } as Localized,

  /** Rotating taglines under the name on the login screen. */
  taglines: [
    { pt: 'AI & Software Engineer @ NEXI', en: 'AI & Software Engineer @ NEXI' },
    { pt: 'Mestrado em Engenharia Informática', en: 'MSc in Computer Engineering' },
    { pt: 'Deep Learning · Computer Vision · Software Engineering', en: 'Deep Learning · Computer Vision · Software Engineering' },
  ] as Localized[],

  headline: {
    pt: 'AI & Software Engineer',
    en: 'AI & Software Engineer',
  } as Localized,

  /** Short biography used by the terminal about command. */
  bio: {
    pt: 'Sou Daniel, um Engenheiro de Software e IA de 23 anos, de Barcelos, atualmente a trabalhar na NEXI.',
    en: "I'm Daniel, a 23-year-old AI & Software Engineer from Barcelos, currently working at NEXI.",
  } as Localized,

  /** Quick facts that scroll by on the login ticker. */
  facts: [
    { pt: 'Barcelos, Portugal', en: 'Barcelos, Portugal' },
    { pt: 'AI & Software Engineer na NEXI', en: 'AI & Software Engineer at NEXI' },
    { pt: 'Mestrado em Eng. Informática · UMinho', en: 'MSc Computer Engineering · UMinho' },
    { pt: 'Deep Learning · Computer Vision · Software Engineering', en: 'Deep Learning · Computer Vision · Software Engineering' },
  ] as Localized[],

  /** Structured "About Me" story — each block is a card in the About app. */
  aboutSections: [
    {
      color: ['#5aa0ec', '#2a5fd6'] as [string, string],
      title: { pt: 'Quem sou', en: 'Who I am' },
      text: {
        pt: 'Sou o Daniel, um Engenheiro de Software e IA de 23 anos, de Barcelos. Terminei recentemente o mestrado na Universidade do Minho e estou atualmente a trabalhar na NEXI. Desenvolvo e trabalho na manutenção da nossa plataforma, assim como investigar, desenvolver e testar novos modelos de Deep Learning, Visão Computacional e Voice AI.',
        en: "I'm Daniel, a 23-year-old AI & Software Engineer from Barcelos. Fresh off my Master's at UMinho, I'm currently working at NEXI. My day-to-day involves developing and maintaining our core platform, as well as researching, building, and testing new Deep Learning, Computer Vision, and Voice AI models.",
      },
    },
    {
      color: ['#f0a72a', '#d8752a'] as [string, string],
      title: { pt: 'Como trabalho', en: 'My approach' },
      text: {
        pt: 'Procuro o equilíbrio entre a exploração de novos modelos de IA e a fiabilidade do software. Gosto de testar novas tecnologias, mas faço sempre questão de escrever código limpo e fácil de manter. Tudo isto apoiado em organização, aprendizagem contínua e bom trabalho de equipa.',
        en: "I focus on balancing AI research with reliable software. I love experimenting with new models, but writing clean, maintainable code is just as important to me. Ultimately, the best results come from staying organized, learning constantly, and working well as a team.",
      },
    },
    {
      color: ['#3fc06a', '#2f9a4f'] as [string, string],
      title: { pt: 'Fora do trabalho', en: 'Outside work' },
      text: {
        pt: 'Fora do trabalho, adoro viajar, treinar e jogar futebol num clube da minha terra. Também jogo bastante computador, aliás, foram os videojogos que me despertaram a paixão por criar aplicações e que me levaram a seguir Engenharia de Software.',
        en: "When I'm not coding, I'm usually traveling, working out, or playing football for my hometown club. I'm also a big gamer, in fact, video games are what originally sparked my passion for building apps and becoming a software engineer.",
      },
    },
  ] as { icon: string; color: [string, string]; title: Localized; text: Localized }[],


};
