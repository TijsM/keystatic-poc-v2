'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './ui/fade-in';

type FaqItem = {
  slug: string;
  entry: {
    question: string;
    answer: string;
    order: number | null;
  };
};

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-lg font-medium text-foreground">
          {item.entry.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-2xl text-muted"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-muted">
              {item.entry.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq({ items }: { items: FaqItem[] }) {
  const sorted = [...items].sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));

  return (
    <section id="faq" className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="text-center font-heading text-4xl text-foreground md:text-5xl">
            Veelgestelde vragen
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12">
            {sorted.map((item) => (
              <FaqAccordionItem key={item.slug} item={item} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
