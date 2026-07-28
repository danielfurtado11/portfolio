import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { useNow } from '@/hooks/useNow';
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';
import { HitCounter } from '@/components/HitCounter';

export function Gadgets() {
  const { lang, L } = useI18n();
  const now = useNow();
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  const time = now.toLocaleTimeString(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = now.toLocaleDateString(lang === 'pt' ? 'pt-PT' : 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const bob = (delay: number) =>
    reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay } };

  return (
    <div className="gadgets" aria-hidden="true">
      <motion.div className="gadget gadget--clock" {...bob(0)}>
        <div className="gadget__time">{time}</div>
        <div className="gadget__date">{date}</div>
      </motion.div>

      <HitCounter />

      <motion.div className="gadget gadget--note" {...bob(0.8)}>
        📌 {L({
          pt: 'Dica: clica duas vezes nos ícones. Experimenta o Terminal!',
          en: 'Tip: double-click the icons. Try the Terminal!',
        })}
      </motion.div>
    </div>
  );
}
