import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';

const rand = (min: number, max: number) => min + Math.random() * (max - min);

interface Bird { top: number; delay: number; size: number; }
interface Flock { id: number; dir: 1 | -1; top: number; dur: number; birds: Bird[]; }

/** A small flock of birds glides across the sky every so often. */
export function Birds() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [flock, setFlock] = useState<Flock | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduce || isMobile) return;
    let alive = true;

    const makeFlock = (): Flock => {
      const n = Math.floor(rand(2, 6));
      return {
        id: Date.now(),
        dir: Math.random() < 0.5 ? 1 : -1,
        top: rand(5, 30),
        dur: rand(9000, 16000),
        birds: Array.from({ length: n }, () => ({
          top: rand(-14, 14),
          delay: rand(0, 1.6),
          size: rand(14, 26),
        })),
      };
    };

    const loop = () => {
      timer.current = window.setTimeout(() => {
        if (!alive) return;
        const cfg = makeFlock();
        setFlock(cfg);
        timer.current = window.setTimeout(() => {
          if (!alive) return;
          setFlock(null);
          loop();
        }, cfg.dur + 2500);
      }, rand(6000, 17000));
    };
    loop();

    return () => {
      alive = false;
      window.clearTimeout(timer.current);
    };
  }, [reduce, isMobile]);

  if (!flock) return null;

  return (
    <div
      className="birds"
      data-dir={flock.dir}
      style={{ top: `${flock.top}vh`, '--dur': `${flock.dur}ms` } as CSSProperties}
      aria-hidden="true"
    >
      {flock.birds.map((b, i) => (
        <span
          key={i}
          className="bird"
          style={{ top: `${b.top}px`, width: b.size, height: b.size * 0.7, animationDelay: `${b.delay}s` }}
        >
          <BirdSVG />
        </span>
      ))}
    </div>
  );
}

function BirdSVG() {
  return (
    <svg viewBox="0 0 16 10" fill="none" stroke="#2b3a55" strokeWidth="1.4" strokeLinecap="round">
      <g className="wUp">
        <path d="M1 6 Q4.5 1 8 5" />
        <path d="M8 5 Q11.5 1 15 6" />
      </g>
      <g className="wDown">
        <path d="M1 3 Q4.5 7 8 4" />
        <path d="M8 4 Q11.5 7 15 3" />
      </g>
    </svg>
  );
}
