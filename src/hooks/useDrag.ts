import { useRef, useCallback } from 'react';

interface DragEventInfo {
  dx: number; // total delta from drag start
  dy: number;
  x: number; // current pointer position
  y: number;
}

interface UseDragOptions {
  onStart?: () => void;
  onMove: (info: DragEventInfo) => void;
  onEnd?: () => void;
  disabled?: boolean;
}

/** Pointer-based drag. Spread the returned handler onto the drag handle. */
export function useDrag({ onStart, onMove, onEnd, disabled }: UseDragOptions) {
  const origin = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      if (e.button !== 0) return;
      const target = e.currentTarget as HTMLElement;
      origin.current = { x: e.clientX, y: e.clientY };
      target.setPointerCapture(e.pointerId);
      onStart?.();

      const handleMove = (ev: PointerEvent) => {
        if (!origin.current) return;
        onMove({
          dx: ev.clientX - origin.current.x,
          dy: ev.clientY - origin.current.y,
          x: ev.clientX,
          y: ev.clientY,
        });
      };
      const handleUp = (ev: PointerEvent) => {
        origin.current = null;
        target.releasePointerCapture?.(ev.pointerId);
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        onEnd?.();
      };
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    },
    [disabled, onStart, onMove, onEnd],
  );

  return { onPointerDown };
}
