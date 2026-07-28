import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { sfx } from '@/lib/sfx';

interface DocButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary';
  children: ReactNode;
}

/** Flat, minimal button used inside app content (not the OS chrome). */
export function DocButton({ variant = 'default', children, onClick, className = '', ...rest }: DocButtonProps) {
  return (
    <button
      {...rest}
      className={`docbtn ${variant === 'primary' ? 'docbtn--primary' : ''} ${className}`}
      onClick={(e) => {
        sfx.click();
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
