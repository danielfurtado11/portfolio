import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n/useI18n';
import { useViews } from '@/hooks/useViews';
import { useReducedMotion } from '@/hooks/useMediaQuery';

const DIGITS = 6;

/** Odometer spin-up, GeoCities style. */
function useCountUp(target: number, instant: boolean): number {
  const [value, setValue] = useState(instant ? target : 0);

  useEffect(() => {
    if (instant || target <= 0) {
      setValue(target);
      return;
    }

    const duration = 1100;
    const startedAt = performance.now();
    let frame = requestAnimationFrame(function tick(now: number) {
      const t = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, [target, instant]);

  return value;
}

export function HitCounter() {
  const { L } = useI18n();
  const { status, count } = useViews();
  const reduce = useReducedMotion();
  const shown = useCountUp(count ?? 0, reduce);

  // No counter configured (or the request failed) — stay out of the way.
  if (status !== 'ready' || count === null) return null;

  const digits = String(shown).padStart(DIGITS, '0').slice(-DIGITS).split('');
  const bob = reduce
    ? {}
    : {
        animate: { y: [0, -6, 0] },
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
      };

  return (
    <motion.div className="gadget gadget--hits" {...bob}>
      <div className="gadget__title">{L({ pt: 'Visitantes', en: 'Visitors' })}</div>
      <div className="hits__display" role="img" aria-label={`${count}`}>
        {digits.map((digit, i) => (
          <span className="hits__digit" key={i}>
            {digit}
          </span>
        ))}
      </div>
      <div className="hits__caption">
        {L({ pt: 'desde 2025', en: 'since 2025' })}
      </div>
    </motion.div>
  );
}
