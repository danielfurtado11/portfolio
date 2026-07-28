/** Monochrome line/brand icons for the Contact app (no emojis, inherits currentColor). */
export type ContactIconId = 'email' | 'linkedin' | 'github' | 'phone' | 'location';

export function ContactIcon({ id }: { id: ContactIconId }) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} role="img" aria-hidden="true">
      {GLYPHS[id]}
    </svg>
  );
}

const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const GLYPHS: Record<ContactIconId, React.ReactNode> = {
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" {...line} />
      <path d="m3.5 7 8.5 5.5L20.5 7" {...line} />
    </>
  ),
  phone: (
    <path
      d="M6.6 3.5c.53 0 .99.36 1.11.87l.86 3.3a1.14 1.14 0 0 1-.3 1.1L7 10.05a12.7 12.7 0 0 0 5.2 5.2l1.28-1.28c.3-.3.74-.42 1.14-.31l3.3.87c.5.13.87.6.87 1.11v2.85c0 .68-.55 1.24-1.23 1.2A14.55 14.55 0 0 1 3.7 4.73 1.16 1.16 0 0 1 4.9 3.5Z"
      {...line}
    />
  ),
  location: (
    <>
      <path d="M12 21c4.5-4.2 6.8-7.6 6.8-10.6A6.8 6.8 0 0 0 5.2 10.4C5.2 13.4 7.5 16.8 12 21Z" {...line} />
      <circle cx="12" cy="10.2" r="2.5" {...line} />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.6h3.05v11.9H3.5zM9.1 8.6h2.92v1.63h.04c.41-.73 1.4-1.63 3.13-1.63 3.34 0 3.96 2.1 3.96 4.92v6.98h-3.05v-6.19c0-1.48-.03-3.38-2.1-3.38-2.1 0-2.42 1.6-2.42 3.27v6.3H9.1Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2.2A9.8 9.8 0 0 0 8.9 21.3c.49.09.67-.21.67-.47l-.01-1.66c-2.73.59-3.3-1.32-3.3-1.32-.45-1.13-1.09-1.44-1.09-1.44-.89-.61.07-.6.07-.6.98.07 1.5 1.01 1.5 1.01.87 1.5 2.29 1.07 2.85.82.09-.63.34-1.07.62-1.31-2.18-.25-4.47-1.09-4.47-4.85 0-1.07.38-1.95 1.01-2.63-.1-.25-.44-1.25.1-2.61 0 0 .82-.26 2.7 1a9.4 9.4 0 0 1 4.9 0c1.87-1.26 2.69-1 2.69-1 .54 1.36.2 2.36.1 2.61.63.68 1 1.56 1 2.63 0 3.77-2.29 4.6-4.48 4.84.35.31.67.91.67 1.84l-.01 2.72c0 .26.18.57.68.47A9.8 9.8 0 0 0 12 2.2Z"
    />
  ),
};
