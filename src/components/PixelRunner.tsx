import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useIsMobile } from '@/hooks/useMediaQuery';
import { sfx } from '@/lib/sfx';

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Daniel's pixel emotes — cycled one at a time as the figure wanders. */
const EMOTES = [
  '/assets/emotes/football.png',
  '/assets/emotes/work.png',
  '/assets/emotes/beach.png',
  '/assets/emotes/drive.png',
];

interface State {
  x: number;
  y: number;
  baseY: number;
  dir: 1 | -1;
  speed: number;
  phase: number;
  amp: number;
  waveSpeed: number;
  dragging: boolean;
  ox: number;
  oy: number;
}

/**
 * A friendly pixel figure of Daniel that wanders across the desktop on a wavy
 * path, cycling through his emotes. You can grab it with the mouse, drag it
 * anywhere and drop it — it then carries on from there.
 */
export function PixelRunner() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const nodeRef = useRef<HTMLDivElement>(null);
  const [emote, setEmote] = useState(0);
  const [grabbed, setGrabbed] = useState(false);
  const s = useRef<State>({
    x: -120, y: 400, baseY: 400, dir: 1, speed: 55,
    phase: 0, amp: 20, waveSpeed: 2, dragging: false, ox: 0, oy: 0,
  });

  useEffect(() => {
    if (reduce || isMobile) return;
    const st = s.current;

    const respawn = (fromEdge: boolean) => {
      st.dir = Math.random() < 0.5 ? 1 : -1;
      if (fromEdge) st.x = st.dir === 1 ? -120 : window.innerWidth + 120;
      st.baseY = rand(window.innerHeight * 0.42, window.innerHeight - 190);
      st.speed = rand(34, 66);
      st.amp = rand(12, 40);
      st.waveSpeed = rand(1.4, 2.9);
      st.phase = Math.random() * Math.PI * 2;
    };
    respawn(true);
    st.y = st.baseY;

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const node = nodeRef.current;
      if (!st.dragging && node) {
        const dt = Math.min((now - last) / 1000, 0.05);
        st.x += st.dir * st.speed * dt;
        st.phase += st.waveSpeed * dt;
        if ((st.dir === 1 && st.x > window.innerWidth + 130) || (st.dir === -1 && st.x < -130)) {
          respawn(true);
          setEmote((e) => (e + 1) % EMOTES.length); // change figure each crossing
        }
        st.y = st.baseY + Math.sin(st.phase) * st.amp;
        node.style.transform = `translate(${st.x}px, ${st.y}px)`;
      }
      last = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, isMobile]);

  if (reduce || isMobile) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const st = s.current;
    st.dragging = true;
    st.ox = e.clientX - st.x;
    st.oy = e.clientY - st.y;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setGrabbed(true);
    sfx.toggle();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    st.x = e.clientX - st.ox;
    st.y = e.clientY - st.oy;
    const node = nodeRef.current;
    if (node) node.style.transform = `translate(${st.x}px, ${st.y}px)`;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const st = s.current;
    if (!st.dragging) return;
    st.dragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    // carry on wandering from where it was dropped
    st.baseY = Math.min(Math.max(st.y, 40), window.innerHeight - 160);
    st.dir = Math.random() < 0.5 ? 1 : -1;
    st.speed = rand(34, 66);
    st.amp = rand(12, 40);
    st.phase = 0;
    setGrabbed(false);
    setEmote((em) => (em + 1) % EMOTES.length); // switch figure on drop too
  };

  return (
    <div
      className={`runner ${grabbed ? 'runner--grab' : ''}`}
      ref={nodeRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      title="✋ Arrasta-me!"
    >
      <div className="runner__bob">
        <img src={EMOTES[emote]} alt="" draggable={false} />
      </div>
    </div>
  );
}
