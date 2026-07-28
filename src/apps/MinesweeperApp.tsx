import { useCallback, useMemo, useState } from 'react';
import { useI18n } from '@/i18n/useI18n';
import { sfx } from '@/lib/sfx';

const COLS = 9;
const ROWS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adj: number;
}

const NUM_COLORS = ['', '#1a56d6', '#2a8a2a', '#d64545', '#12297a', '#8a2a2a', '#177a7a', '#222', '#666'];

function build(): Cell[] {
  const cells: Cell[] = Array.from({ length: COLS * ROWS }, () => ({
    mine: false, revealed: false, flagged: false, adj: 0,
  }));
  let placed = 0;
  while (placed < MINES) {
    const i = Math.floor(Math.random() * cells.length);
    if (!cells[i].mine) {
      cells[i].mine = true;
      placed++;
    }
  }
  const at = (r: number, c: number) => (r >= 0 && r < ROWS && c >= 0 && c < COLS ? cells[r * COLS + c] : null);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (cells[r * COLS + c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) if (at(r + dr, c + dc)?.mine) n++;
      cells[r * COLS + c].adj = n;
    }
  }
  return cells;
}

export function MinesweeperApp() {
  const { t } = useI18n();
  const [cells, setCells] = useState<Cell[]>(build);
  const [status, setStatus] = useState<'play' | 'won' | 'lost'>('play');

  const reset = useCallback(() => {
    setCells(build());
    setStatus('play');
    sfx.click();
  }, []);

  const flagsUsed = useMemo(() => cells.filter((c) => c.flagged).length, [cells]);

  const reveal = (idx: number) => {
    if (status !== 'play') return;
    setCells((prev) => {
      const next = prev.map((c) => ({ ...c }));
      const cell = next[idx];
      if (cell.revealed || cell.flagged) return prev;

      if (cell.mine) {
        next.forEach((c) => { if (c.mine) c.revealed = true; });
        setStatus('lost');
        sfx.boom();
        return next;
      }

      // flood fill
      const stack = [idx];
      while (stack.length) {
        const i = stack.pop()!;
        const cc = next[i];
        if (cc.revealed || cc.flagged || cc.mine) continue;
        cc.revealed = true;
        if (cc.adj === 0) {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          for (let dr = -1; dr <= 1; dr++)
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) stack.push(nr * COLS + nc);
            }
        }
      }

      const safeLeft = next.filter((c) => !c.mine && !c.revealed).length;
      if (safeLeft === 0) {
        setStatus('won');
        sfx.win();
      }
      return next;
    });
  };

  const flag = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    if (status !== 'play') return;
    setCells((prev) => prev.map((c, i) => (i === idx && !c.revealed ? { ...c, flagged: !c.flagged } : c)));
    sfx.toggle();
  };

  const face = status === 'won' ? '😎' : status === 'lost' ? '😵' : '🙂';

  return (
    <div className="ms">
      <div className="ms__hud">
        <div className="ms__count">{String(Math.max(0, MINES - flagsUsed)).padStart(2, '0')}</div>
        <button className="ms__face" onClick={reset} aria-label={t('msNew')}>{face}</button>
        <div className="ms__count">{status === 'won' ? '★' : status === 'lost' ? '✖' : '9x9'}</div>
      </div>

      <div className="ms__grid" style={{ gridTemplateColumns: `repeat(${COLS}, 28px)` }}>
        {cells.map((cell, i) => (
          <button
            key={i}
            className={`ms__cell ${cell.revealed ? 'open' : ''} ${cell.revealed && cell.mine ? 'mine' : ''}`}
            onClick={() => reveal(i)}
            onContextMenu={(e) => flag(e, i)}
            style={{ color: cell.revealed && !cell.mine ? NUM_COLORS[cell.adj] : undefined }}
          >
            {cell.revealed
              ? cell.mine ? '💣' : cell.adj > 0 ? cell.adj : ''
              : cell.flagged ? '🚩' : ''}
          </button>
        ))}
      </div>

      <div className="ms__result">
        {status === 'won' ? t('msWin') : status === 'lost' ? t('msLose') : `${t('msFlagsLeft')}: ${MINES}`}
      </div>
    </div>
  );
}
