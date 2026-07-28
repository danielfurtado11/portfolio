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

/** Os projetos em destaque (pinned) no perfil de GitHub. */
export const projects: Project[] = [
  {
    id: 'engagement-model',
    name: 'Student Engagement Model',
    featured: true,
    year: '2026',
    category: { pt: 'Dissertação · ML / Computer Vision', en: 'Thesis · ML / Computer Vision' },
    tagline: {
      pt: 'Modelo multimodal de deep learning que classifica o empenho de alunos em aula.',
      en: 'Multimodal deep learning model that classifies student engagement in class.',
    },
    description: {
      pt: 'Dissertação de mestrado em Engenharia Informática na Universidade do Minho (janeiro de 2026, nota final 18/20), em parceria com a NEXI: classificação automática do nível de empenho de estudantes em sala de aula usando Computer Vision e Deep Learning multimodal.\n\nO trabalho seguiu a metodologia CRISP-DM em cinco etapas: um pipeline de visão computacional que extrai ~2 imagens por segundo por participante a partir de vídeos reais de aulas (deteção, tracking, pose da cabeça, direção do olhar, estado dos olhos e expressão facial); uma plataforma web de anotação onde vários anotadores classificaram o empenho numa escala de 1 a 5 (6951 anotações, 221 respostas válidas); a construção do dataset final com 5712 amostras; e um modelo multimodal de late fusion que combina um MLP (dados tabulares) com duas CNNs pré-treinadas (imagem da cara e imagem de contexto da sala).\n\nO modelo final — MobileNetV3-Large com treino em duas fases — atinge F1-score de 0.842 em validação e 0.835 em teste na classificação binária, superando consistentemente as abordagens clássicas de ML (LightGBM, 0.788), com a vantagem a crescer à medida que a tarefa se torna mais complexa. Foram ainda aplicadas técnicas de Explainable AI (Grad-CAM, SHAP, PDP/ICE, permutation importance) para tornar o modelo interpretável.',
      en: 'MSc dissertation in Informatics Engineering at the University of Minho (January 2026, final grade 18/20), in partnership with NEXI: automatic classification of student engagement levels in the classroom using Computer Vision and multimodal Deep Learning.\n\nThe work followed the CRISP-DM methodology across five stages: a computer vision pipeline extracting ~2 images per second per participant from real classroom video (detection, tracking, head pose, gaze direction, eye state and facial expression); a web annotation platform where multiple annotators rated engagement on a 1–5 scale (6951 annotations, 221 valid responses); the construction of the final 5712-sample dataset; and a multimodal late-fusion model combining an MLP (tabular data) with two pre-trained CNNs (face crop and classroom context image).\n\nThe final model — MobileNetV3-Large with two-stage training — reaches an F1-score of 0.842 on validation and 0.835 on test for binary classification, consistently outperforming classical ML approaches (LightGBM, 0.788), with the advantage growing as the task gets harder. Explainable AI techniques (Grad-CAM, SHAP, PDP/ICE, permutation importance) were applied to make the model interpretable.',
    },
    tech: ['Python', 'PyTorch', 'Computer Vision', 'MobileNetV3', 'Scikit-learn', 'LightGBM', 'SHAP', 'Grad-CAM'],
    repo: 'https://github.com/danielfurtado11/engagement-model',
    emoji: '🎓',
    accent: ['#2a5fd6', '#6cb3f2'],
  },
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
      pt: 'Projeto full-stack completo para um negócio familiar de produtos agrícolas e animais com duas lojas físicas — site público e painel de administração privado.\n\nO frontend é feito em Next.js 16 (App Router) com React Server Components: homepage com carrossel de novidades, destaques e promoções, catálogo filtrável com sidebar de categorias, detalhe de produto com galeria, feed de novidades (texto, fotos, vídeos do YouTube e embeds de Instagram/Facebook), contactos das lojas e página institucional. São 19 páginas e 28 componentes, mais um painel de administração com dez secções atrás de login. O design é derivado dos logótipos da empresa, com toda a paleta centralizada no bloco @theme do Tailwind v4.\n\nO backend é uma API REST assíncrona em FastAPI — 41 endpoints, 11 tabelas e 66 testes automatizados — com PostgreSQL 17, SQLModel, migrações Alembic, autenticação JWT (bcrypt, cookie httpOnly), imagens em armazenamento S3-compatível (MinIO local, Cloudflare R2 em produção) e deployment no Google Cloud Run. Não é e-commerce: não há carrinho, stock nem pagamentos — o cliente navega no catálogo e liga para a loja. Custo de produção: 0 €/mês, dentro dos free tiers.',
      en: 'A complete full-stack project for a family-run farm & animal supplies business with two physical stores — a public website plus a private admin panel.\n\nThe frontend is built with Next.js 16 (App Router) and React Server Components: a homepage with a news carousel, featured and on-sale products, a filterable catalogue with a sticky category sidebar, product detail pages with an image gallery, a news feed (text, photos, YouTube videos and Instagram/Facebook embeds), store contacts and an about page. That is 19 pages and 28 components, plus a ten-section admin panel behind a login. The design derives from the company logos, with the whole palette centralised in Tailwind v4\'s @theme block.\n\nThe backend is an async FastAPI REST API — 41 endpoints, 11 tables and 66 automated tests — with PostgreSQL 17, SQLModel, Alembic migrations, JWT auth (bcrypt, httpOnly cookie), images on S3-compatible storage (MinIO locally, Cloudflare R2 in production) and deployment on Google Cloud Run. It is not e-commerce: no cart, no stock, no payments — customers browse the catalogue and phone the store. Production cost: €0/month, within the free tiers.',
    },
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'FastAPI', 'PostgreSQL', 'Cloud Run', 'Cloudflare R2'],
    repo: 'https://github.com/danielfurtado11/agromoreira-web',
    repoExtra: { label: 'API', url: 'https://github.com/danielfurtado11/agromoreira-api' },
    demo: 'https://agromoreira.vercel.app/',
    emoji: '🌱',
    accent: ['#1e5631', '#8dbe3d'],
  },
  {
    id: 'portfolio',
    name: 'Daniel OS',
    year: '2026',
    category: { pt: 'Frontend · React', en: 'Frontend · React' },
    tagline: {
      pt: 'Um portefólio que arranca — estás a olhar para ele neste momento.',
      en: 'A portfolio that boots — you are looking at it right now.',
    },
    description: {
      pt: 'Não é uma página para fazer scroll: é um sistema operativo onde se faz login. Nostalgia do Windows XP, vidro Aero, janelas arrastáveis, um Minesweeper jogável e um terminal que responde.\n\nCada secção — Sobre, Experiência, Projetos — é uma janela real que se arrasta, redimensiona, minimiza e empilha. Não há posição de scroll para lembrar, só um ambiente de trabalho para explorar: fazer duplo clique na Reciclagem, arrastar a personagem pixelizada pelas colinas, ou abrir o Terminal e escrever "sudo".\n\nTodo o artwork em estilo Windows é original — wallpaper, ícones e som de arranque construídos à mão com SVG, CSS e a Web Audio API. Sem assets da Microsoft. Construído em React 19 + TypeScript + Vite, bilingue (PT/EN), com animações em Framer Motion que respeitam prefers-reduced-motion, e alojado na Vercel.',
      en: 'Not a page you scroll — an operating system you log into. Windows XP nostalgia, Aero glass, draggable windows, a working Minesweeper and a terminal that actually answers back.\n\nEvery section — About, Experience, Projects — is a real window you can drag, resize, minimise and stack. There is no scroll position to remember, only a desktop to rummage through: double-click the Recycle Bin, drag the pixel character across the hills, or open the Terminal and type "sudo".\n\nAll the Windows-style artwork is original — wallpaper, icons and startup chime hand-built with SVG, CSS and the Web Audio API. No Microsoft assets. Built with React 19 + TypeScript + Vite, bilingual (PT/EN), with Framer Motion animations that honour prefers-reduced-motion, and hosted on Vercel.',
    },
    tech: ['React 19', 'TypeScript', 'Vite 6', 'Framer Motion', 'CSS', 'Web Audio API', 'Vercel'],
    repo: 'https://github.com/danielfurtado11/portfolio',
    demo: 'https://portfolio-sable-eight-93.vercel.app/',
    emoji: '🪟',
    accent: ['#0b6fd6', '#7cc3f7'],
  },
  {
    id: 'survey-platform',
    name: 'NEXI Survey Platform',
    year: '2025',
    category: { pt: 'Web · Recolha de dados', en: 'Web · Data collection' },
    tagline: {
      pt: 'Plataforma de anotação humana que deu origem ao dataset da dissertação.',
      en: 'Human annotation platform that produced the dissertation dataset.',
    },
    description: {
      pt: 'Plataforma web usada para recolher anotações humanas de empenho estudantil a partir de imagens de sala de aula — é daqui que saem as etiquetas do dataset do modelo de engagement.\n\nCada participante vê a imagem de contexto da sala, com todas as caras detetadas marcadas por caixas verdes numeradas, e a cara a avaliar (recorte com o número correspondente), classificando o empenho numa escala de 1 ("nada empenhado") a 5 ("totalmente empenhado"), com a opção "Unknown" para imagens que não permitem avaliação. O questionário começa com um ecrã de instruções e um formulário de dados demográficos totalmente opcional, e demora cerca de 5 minutos.\n\nAs imagens vêm do Firebase Storage com uma lógica de seleção que prioriza os datasets menos respondidos e salta os já avaliados, para que as respostas se distribuam uniformemente pelo corpus. Respostas e avaliações são gravadas no Firestore e há uma área de administração protegida por password para consultar o que foi recolhido. Construída em React 18 com React Router 7, Tailwind CSS e alojada na Vercel.',
      en: 'A web platform used to collect human annotations of student engagement from classroom images — this is where the labels for the engagement model dataset come from.\n\nEach participant sees the context image of the room, with every detected face marked by a numbered green box, and the face to evaluate (the matching cropped face), rating engagement on a scale from 1 ("not engaged at all") to 5 ("totally engaged"), plus an "Unknown" option for images that cannot be assessed. The survey opens with an instructions screen and a fully optional demographics form, and takes about 5 minutes.\n\nImages are pulled from Firebase Storage with a selection strategy that prioritises the least-answered datasets and skips already-evaluated subfolders, so responses spread evenly across the corpus. Responses and evaluations are written to Firestore, and a password-protected admin area lists everything collected. Built with React 18 and React Router 7, Tailwind CSS, hosted on Vercel.',
    },
    tech: ['React 18', 'React Router 7', 'Tailwind CSS', 'Firebase', 'Firestore', 'Vercel'],
    repo: 'https://github.com/danielfurtado11/survey-platform',
    demo: 'https://nexisurvey.vercel.app/',
    emoji: '📋',
    accent: ['#7c3aed', '#a78bfa'],
  },
];

export const githubProfile = 'https://github.com/danielfurtado11';
