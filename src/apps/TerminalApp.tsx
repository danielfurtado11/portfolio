import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useOS } from '@/store/useOS';
import { useI18n } from '@/i18n/useI18n';
import { APPS, type AppId } from '@/apps/apps.config';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skillGroups, skillLabel } from '@/data/skills';
import { contactLinks } from '@/data/contact';
import type { Lang } from '@/i18n/types';
import { sfx } from '@/lib/sfx';

interface Line { id: number; node: ReactNode; }
let uid = 0;
const line = (node: ReactNode): Line => ({ id: uid++, node });

const PROMPT = (
  <>
    <span className="term__prompt">daniel@portfolio</span>:<span className="term__path">~</span>${' '}
  </>
);

function run(raw: string, lang: Lang, openApp: (id: AppId) => void): ReactNode[] | 'clear' {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(' ');
  const tr = (pt: string, en: string) => (lang === 'pt' ? pt : en);

  switch (cmd.toLowerCase()) {
    case '':
      return [];
    case 'help':
      return [
        tr('Comandos disponíveis:', 'Available commands:'),
        '  help        ' + tr('esta ajuda', 'this help'),
        '  whoami      ' + tr('quem sou eu', 'who I am'),
        '  about       ' + tr('sobre mim', 'about me'),
        '  skills      ' + tr('as minhas competências', 'my skills'),
        '  projects    ' + tr('os meus projetos', 'my projects'),
        '  experience  ' + tr('experiência profissional', 'work experience'),
        '  education   ' + tr('formação', 'education'),
        '  contact     ' + tr('como me contactar', 'how to reach me'),
        '  open <app>  ' + tr('abrir uma janela (ex: open projects)', 'open a window (e.g. open projects)'),
        '  date        ' + tr('data e hora', 'date and time'),
        '  sudo        ' + tr('tenta a tua sorte', 'try your luck'),
        '  clear       ' + tr('limpar o ecrã', 'clear the screen'),
      ];
    case 'whoami':
      return [`${profile.fullName} — Machine Learning Engineer @ NEXI`];
    case 'about':
      return [profile.bio[lang]];
    case 'skills':
      return skillGroups.flatMap((g, i) => [
        ...(i === 0 ? [] : [' ']),
        `${g.label[lang]}:`,
        '  ' + g.items.map((s) => skillLabel(s, lang)).join(', '),
      ]);
    case 'projects':
      return [
        tr('Projetos em destaque:', 'Featured projects:'),
        ...projects.map((p) => `  • ${p.name} — ${p.tagline[lang]}`),
        <span className="term__muted">{tr("Dica: 'open projects' para ver a galeria.", "Tip: 'open projects' to see the gallery.")}</span>,
      ];
    case 'experience':
      return ['NEXI — Machine Learning Engineer (2024→)', 'Universidade do Minho — Comunicação & Imagem, ARQUS'];
    case 'education':
      return [
        tr("Mestrado em Eng. Informática — U. Minho (2023→)", "MSc Computer Engineering — U. Minho (2023→)"),
        tr('Licenciatura em Eng. Informática — U. Minho (2020–2023)', 'BSc Computer Engineering — U. Minho (2020–2023)'),
      ];
    case 'contact':
      return contactLinks.map((c) => `  ${c.icon} ${c.label[lang]}: ${c.value}`);
    case 'date':
      return [new Date().toString()];
    case 'echo':
      return [arg];
    case 'sudo':
      return [<span className="term__accent">{tr('Boa tentativa 😄 — permissão negada.', 'Nice try 😄 — permission denied.')}</span>];
    case 'ls':
      return [Object.values(APPS).map((a) => a.id).join('  ')];
    case 'open': {
      const target = arg.toLowerCase() as AppId;
      if (target && target in APPS) {
        openApp(target);
        sfx.open();
        return [tr(`A abrir ${target}…`, `Opening ${target}…`)];
      }
      return [<span className="term__accent">{tr(`App desconhecida: ${arg || '∅'}`, `Unknown app: ${arg || '∅'}`)}</span>];
    }
    case 'clear':
      return 'clear';
    default:
      return [<span className="term__accent">{tr(`comando não encontrado: ${cmd}. Escreve 'help'.`, `command not found: ${cmd}. Type 'help'.`)}</span>];
  }
}

export function TerminalApp() {
  const { lang, L } = useI18n();
  const openApp = useOS((s) => s.openApp);
  const [lines, setLines] = useState<Line[]>(() => [
    line(<span className="term__accent">Daniel OS Terminal [v1.0]</span>),
    line(L({ pt: "Escreve 'help' para começar.", en: "Type 'help' to get started." })),
    line(' '),
  ]);
  const [input, setInput] = useState('');
  const [hist, setHist] = useState<string[]>([]);
  const [, setHidx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const submit = () => {
    const value = input;
    const result = run(value, lang, openApp);
    setLines((prev) => {
      const echo = line(<span className="term__line">{PROMPT}{value}</span>);
      if (result === 'clear') return [];
      const out = result.map((r) => line(<span className="term__line">{r}</span>));
      return [...prev, echo, ...out];
    });
    if (value.trim()) setHist((h) => [value, ...h]);
    setHidx(-1);
    setInput('');
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHidx((i) => {
        const ni = Math.min(i + 1, hist.length - 1);
        if (hist[ni] !== undefined) setInput(hist[ni]);
        return ni;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHidx((i) => {
        const ni = Math.max(i - 1, -1);
        setInput(ni === -1 ? '' : hist[ni] ?? '');
        return ni;
      });
    }
  };

  return (
    <div className="term scroll" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l) => (
        <div key={l.id} className="term__line">{l.node}</div>
      ))}
      <div className="term__in">
        <span>{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          autoFocus
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
