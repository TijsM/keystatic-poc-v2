'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function FaqItem({
  item,
  index,
}: {
  item: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-answer-${index}`;

  return (
    <div
      className={`border-b border-border/70 transition-colors duration-300 ${open ? 'bg-primary-light/50' : ''}`}
    >
      <h3>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={answerId}
          className="group flex w-full items-center justify-between px-6 py-6 text-left"
        >
          <span className="flex items-center gap-4 pr-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-lg font-medium text-foreground transition-colors group-hover:text-primary md:text-xl">
              {item.question}
            </span>
          </span>
          <motion.div
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:text-primary"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <line x1="7" y1="0" x2="7" y2="14" />
              <line x1="0" y1="7" x2="14" y2="7" />
            </svg>
          </motion.div>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <p
              className="max-w-2xl pb-6 pr-6 leading-relaxed text-muted"
              style={{ paddingLeft: 'calc(2rem + 2.5rem)' }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
