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

    const duration = 1400;
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
  const { status, count, counted } = useViews();
  const reduce = useReducedMotion();
  const shown = useCountUp(count ?? 0, reduce);

  // No counter configured (or the request failed) — stay out of the way.
  if (status !== 'ready' || count === null) return null;

  const digits = String(shown).padStart(DIGITS, '0').slice(-DIGITS).split('');

  return (
    <motion.div
      className="gadget gadget--hits"
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <div className="hits__head">
        <span className="hits__led" />
        {L({ pt: 'Visitantes', en: 'Visitors' })}
      </div>

      <div className="hits__display" role="img" aria-label={String(count)}>
        {digits.map((digit, i) => (
          <span className="hits__cell" key={i}>
            {/* remounting on digit change gives each wheel its mechanical roll */}
            <motion.span
              className="hits__digit"
              key={digit}
              initial={reduce ? undefined : { y: '-100%' }}
              animate={reduce ? undefined : { y: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {digit}
            </motion.span>
          </span>
        ))}
        {!reduce && <span className="hits__sweep" />}
      </div>

      <div className="hits__caption">
        {counted
          ? L({ pt: `és o visitante nº ${count}`, en: `you are visitor #${count}` })
          : L({ pt: 'visitas ao Daniel OS', en: 'visits to Daniel OS' })}
      </div>
    </motion.div>
  );
}
