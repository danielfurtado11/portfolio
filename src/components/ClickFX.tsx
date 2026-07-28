import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';

interface Burst { id: number; x: number; y: number; }

/** A retro pixel spark burst wherever the user clicks. */
export function ClickFX() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (reduce) return;
    let n = 0;
    const onDown = (e: PointerEvent) => {
      const id = n++;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setBursts((b) => b.filter((k) => k.id !== id)), 520);
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="clickfx-layer">
      {bursts.map((b) => (
        <span key={b.id} className="clickfx" style={{ left: b.x, top: b.y }}>
          <span className="clickfx__ring" />
          <i className="clickfx__spark s1" />
          <i className="clickfx__spark s2" />
          <i className="clickfx__spark s3" />
          <i className="clickfx__spark s4" />
        </span>
      ))}
    </div>
  );
}
