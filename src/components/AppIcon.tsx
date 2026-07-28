import type { AppId } from '@/apps/apps.config';

/** A custom, XP/Aero-flavoured icon set drawn as inline SVG (no MS assets). */
export function AppIcon({ id, size = 40 }: { id: AppId; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.35))', display: 'block' }}
    >
      <defs>
        <linearGradient id="ic-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".9" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity=".15" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {GLYPHS[id]}
      {/* shared aero highlight on top half */}
      <rect x="6" y="5" width="36" height="18" rx="7" fill="url(#ic-glass)" opacity=".55" />
    </svg>
  );
}

const tile = (from: string, to: string) => (
  <>
    <defs>
      <linearGradient id={`t-${from}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="40" height="40" rx="9" fill={`url(#t-${from})`} stroke="rgba(255,255,255,.6)" strokeWidth="1" />
  </>
);

const GLYPHS: Record<AppId, React.ReactNode> = {
  about: (
    <>
      {tile('#5aa0ec', '#2a5fd6')}
      <circle cx="24" cy="19" r="7" fill="#fff" />
      <path d="M12 39c1.5-8 22.5-8 24 0z" fill="#fff" />
    </>
  ),
  experience: (
    <>
      {tile('#f0b45a', '#d8862a')}
      <rect x="12" y="18" width="24" height="16" rx="2.5" fill="#fff" />
      <rect x="19" y="14" width="10" height="5" rx="1.5" fill="#7a4a12" />
      <rect x="12" y="24" width="24" height="3" fill="#e3a24a" />
      <rect x="22" y="23" width="4" height="5" rx="1" fill="#b9761f" />
    </>
  ),
  education: (
    <>
      {tile('#8a6cf0', '#5b3fd6')}
      <path d="M24 13 40 20 24 27 8 20z" fill="#fff" />
      <path d="M15 22v7c0 3 18 3 18 0v-7" fill="none" stroke="#fff" strokeWidth="2.4" />
      <path d="M40 20v7" stroke="#ffe08a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="29" r="2" fill="#ffe08a" />
    </>
  ),
  skills: (
    <>
      {tile('#ef6ea0', '#c72d6b')}
      <path
        d="M24 12c5 0 8 3 8 7 2 1 3 3 3 5 0 3-2 5-5 6 0 3-3 5-6 5s-6-2-6-5c-3-1-5-3-5-6 0-2 1-4 3-5 0-4 3-7 8-7z"
        fill="#fff"
      />
      <path d="M24 16v20M18 24h12M20 30h8" stroke="#c72d6b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  ),
  projects: (
    <>
      {tile('#ffd15a', '#f0a72a')}
      <path d="M9 15h11l3 4h16v18a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z" fill="#fff5da" />
      <path d="M9 20h30v17a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z" fill="#ffe9a8" />
    </>
  ),
  erasmus: (
    <>
      {tile('#3fd0e0', '#1f96c8')}
      <circle cx="24" cy="24" r="12" fill="#eaffff" />
      <path
        d="M24 12a12 12 0 0 0 0 24M12 24h24M16 17c4 3 12 3 16 0M16 31c4-3 12-3 16 0"
        stroke="#1f96c8"
        strokeWidth="1.6"
        fill="none"
      />
    </>
  ),
  contact: (
    <>
      {tile('#6ec8f0', '#2a86d6')}
      <rect x="10" y="15" width="28" height="19" rx="2.5" fill="#fff" />
      <path d="M10 17l14 10 14-10" fill="none" stroke="#2a86d6" strokeWidth="2.2" />
    </>
  ),
  cv: (
    <>
      {tile('#eef3fb', '#c7d6ea')}
      <path d="M15 8h13l6 6v26a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 14 40V9.5A1.5 1.5 0 0 1 15 8z" fill="#fff" stroke="#9fb4d0" />
      <path d="M28 8v6h6" fill="#dbe6f5" />
      <rect x="18" y="20" width="12" height="2" rx="1" fill="#d64545" />
      <rect x="18" y="25" width="14" height="1.8" rx="1" fill="#9fb0c8" />
      <rect x="18" y="29" width="14" height="1.8" rx="1" fill="#9fb0c8" />
      <rect x="18" y="33" width="9" height="1.8" rx="1" fill="#9fb0c8" />
    </>
  ),
  minesweeper: (
    <>
      {tile('#cfd8e6', '#94a6c0')}
      <circle cx="24" cy="25" r="9" fill="#1c2533" />
      <path d="M24 11v6M24 33v4M11 25h6M31 25h6M15 16l4 4M33 34l-4-4M33 16l-4 4M15 34l4-4" stroke="#1c2533" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="21" cy="22" r="2.5" fill="#fff" opacity=".8" />
      <rect x="27" y="9" width="3" height="7" fill="#d64545" />
    </>
  ),
  terminal: (
    <>
      {tile('#3a4a63', '#1a2436')}
      <rect x="9" y="12" width="30" height="24" rx="3" fill="#0b1220" stroke="#54627a" />
      <path d="M14 20l5 4-5 4" stroke="#59e07a" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="24" y="27" width="9" height="2.4" rx="1" fill="#59e07a" />
    </>
  ),
  recycle: (
    <>
      {tile('#a7e08a', '#5aa84a')}
      <path d="M15 18h18l-2 20a2 2 0 0 1-2 1.8H19a2 2 0 0 1-2-1.8z" fill="#eafbe4" stroke="#4b8f3c" />
      <path d="M20 22v13M24 22v13M28 22v13" stroke="#4b8f3c" strokeWidth="1.6" />
      <path d="M18 14h12l1.5 4H16.5z" fill="#7bc063" />
      <path d="M24 8a4 4 0 0 1 4 4M24 40l-2-3h4z" fill="#eafbe4" />
      <path d="M20 30a5 5 0 0 1 8-3" stroke="#4b8f3c" strokeWidth="1.6" fill="none" />
    </>
  ),
};
