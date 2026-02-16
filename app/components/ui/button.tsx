'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
}) {
  const baseStyles =
    'inline-block rounded-lg px-8 py-4 text-base font-semibold transition-colors cursor-pointer';
  const variants = {
    primary: 'bg-accent text-foreground hover:bg-accent-hover',
    secondary:
      'bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}
