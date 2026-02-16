'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  size = 'default',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'white';
  href?: string;
  className?: string;
  size?: 'default' | 'large';
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center rounded-full font-semibold transition-colors cursor-pointer overflow-hidden';
  const sizeStyles = {
    default: 'px-8 py-4 text-base',
    large: 'px-10 py-5 text-lg',
  };
  const variants = {
    primary: 'bg-accent text-foreground hover:bg-accent-hover',
    secondary:
      'bg-transparent border-2 border-foreground/20 text-foreground hover:border-foreground/40',
    white: 'bg-white text-primary hover:bg-white/90',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}
