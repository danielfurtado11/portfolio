import { useOS } from '@/store/useOS';

/**
 * Tiny synthesized sound engine (Web Audio API).
 * All sounds are generated on the fly — no external/proprietary audio files.
 * Respects the global `muted` preference from the OS store.
 */

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** Prime the audio context on a user gesture (called on Enter / boot click). */
export function primeAudio() {
  ac();
}

function muted() {
  return useOS.getState().muted;
}

interface ToneOpts {
  freq: number;
  start?: number;
  dur?: number;
  type?: OscillatorType;
  gain?: number;
  glideTo?: number;
}

function tone({ freq, start = 0, dur = 0.18, type = 'sine', gain = 0.14, glideTo }: ToneOpts) {
  const c = ac();
  if (!c) return;
  const t0 = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function guard(fn: () => void) {
  if (muted()) return;
  try {
    fn();
  } catch {
    /* ignore audio errors */
  }
}

export const sfx = {
  /** Warm ascending arpeggio for the boot / login. */
  startup() {
    guard(() => {
      const notes = [329.63, 493.88, 659.25, 987.77]; // E4 B4 E5 B5
      notes.forEach((f, i) =>
        tone({ freq: f, start: i * 0.14, dur: 0.5, type: 'triangle', gain: 0.13 }),
      );
      tone({ freq: 659.25, start: 0.56, dur: 0.9, type: 'sine', gain: 0.08 });
    });
  },
  open() {
    guard(() => tone({ freq: 420, dur: 0.14, type: 'sine', gain: 0.09, glideTo: 720 }));
  },
  close() {
    guard(() => tone({ freq: 620, dur: 0.14, type: 'sine', gain: 0.08, glideTo: 300 }));
  },
  click() {
    guard(() => tone({ freq: 1200, dur: 0.05, type: 'square', gain: 0.03 }));
  },
  toggle() {
    guard(() => tone({ freq: 880, dur: 0.07, type: 'triangle', gain: 0.06 }));
  },
  error() {
    guard(() => {
      tone({ freq: 220, dur: 0.22, type: 'square', gain: 0.06 });
      tone({ freq: 165, start: 0.12, dur: 0.28, type: 'square', gain: 0.06 });
    });
  },
  boom() {
    guard(() => {
      const c = ac();
      if (!c) return;
      const t0 = c.currentTime;
      const buffer = c.createBuffer(1, c.sampleRate * 0.4, c.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
      }
      const src = c.createBufferSource();
      const g = c.createGain();
      g.gain.setValueAtTime(0.25, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
      src.buffer = buffer;
      src.connect(g).connect(c.destination);
      src.start(t0);
    });
  },
  win() {
    guard(() => {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => tone({ freq: f, start: i * 0.1, dur: 0.3, type: 'triangle', gain: 0.1 }));
    });
  },
};
