import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/**
 * An original "Bliss"-style scene: blue sky, sun glow, drifting clouds and
 * rolling green hills — drawn as SVG/CSS (no Microsoft assets). The cloud and
 * hill layers parallax gently with the pointer.
 */
export function Wallpaper() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const hillsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        if (cloudsRef.current)
          cloudsRef.current.style.transform = `translate(${nx * -34}px, ${ny * -16}px)`;
        if (hillsRef.current)
          hillsRef.current.style.transform = `translate(${nx * -12}px, ${ny * -5}px)`;
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div className="wallpaper" ref={rootRef} aria-hidden="true">
      <div className="wallpaper__sun" />

      <div className="wallpaper__layer wallpaper__clouds" ref={cloudsRef}>
        <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMin slice">
          <g fill="#ffffff" opacity="0.9">
            <Cloud x={120} y={90} s={1} />
            <Cloud x={520} y={60} s={1.4} />
            <Cloud x={900} y={130} s={0.8} />
            <Cloud x={1080} y={70} s={1.1} />
            <Cloud x={300} y={190} s={0.6} />
          </g>
        </svg>
      </div>

      <div className="wallpaper__layer wallpaper__hills" ref={hillsRef}>
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice">
          <path d="M0 190 C 240 120 460 150 700 110 C 900 78 1050 120 1200 96 L1200 400 L0 400 Z" fill="var(--hill-far)" />
          <path d="M0 250 C 200 190 420 240 640 210 C 880 178 1040 236 1200 200 L1200 400 L0 400 Z" fill="var(--hill-mid)" />
          <path d="M0 320 C 260 250 520 320 780 292 C 980 270 1100 316 1200 300 L1200 400 L0 400 Z" fill="var(--hill-near)" />
          <path d="M0 372 C 300 336 560 380 900 360 C 1040 352 1140 370 1200 364 L1200 400 L0 400 Z" fill="var(--hill-shadow)" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}

function Cloud({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="60" ry="24" />
      <ellipse cx="42" cy="8" rx="52" ry="22" />
      <ellipse cx="-40" cy="10" rx="44" ry="20" />
      <ellipse cx="6" cy="-16" rx="38" ry="20" />
    </g>
  );
}
