'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

export function TextReveal({
  children,
  as: Tag = 'h1',
  className = '',
  delay = 0,
  staggerSpeed = 0.04,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  staggerSpeed?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  if (shouldReduceMotion || !text) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotateX: -80 }}
            whileInView={{ y: '0%', rotateX: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.8,
              delay: delay + i * staggerSpeed,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: 'transform' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
