import type { Localized } from '@/i18n/types';
import type { ContactIconId } from '@/components/ContactIcon';

export interface ContactLink {
  id: string;
  label: Localized;
  value: string;
  href: string;
  icon: ContactIconId;
  hint: Localized;
  copyable?: boolean;
}

const same = (s: string): Localized => ({ pt: s, en: s });

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    label: same('Email'),
    value: 'danielfurtado1109@gmail.com',
    href: 'mailto:danielfurtado1109@gmail.com',
    icon: 'email',
    hint: { pt: 'A melhor forma de me contactares', en: 'The best way to reach me' },
    copyable: true,
  },
  {
    id: 'linkedin',
    label: same('LinkedIn'),
    value: 'in/daniel-furtado',
    href: 'https://www.linkedin.com/in/daniel-furtado-450067224/',
    icon: 'linkedin',
    hint: { pt: 'Percurso profissional', en: 'Professional profile' },
  },
  {
    id: 'github',
    label: same('GitHub'),
    value: 'danielfurtado11',
    href: 'https://github.com/danielfurtado11',
    icon: 'github',
    hint: { pt: 'Código e projetos', en: 'Code and projects' },
  },
  {
    id: 'phone',
    label: { pt: 'Telemóvel', en: 'Phone' },
    value: '+351 925 353 617',
    href: 'tel:+351925353617',
    icon: 'phone',
    hint: { pt: 'Chamada ou mensagem', en: 'Call or message' },
    copyable: true,
  },
  {
    id: 'location',
    label: { pt: 'Localização', en: 'Location' },
    value: 'Barcelos, Portugal',
    href: 'https://www.google.com/maps/place/Barcelos',
    icon: 'location',
    hint: { pt: 'Disponível para remoto e híbrido', en: 'Open to remote and hybrid' },
  },
];
