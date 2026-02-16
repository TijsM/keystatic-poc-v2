'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

type FaqItem = {
  slug: string;
  entry: {
    question: string;
    answer: string;
    order: number | null;
  };
};

const ease = [0.16, 1, 0.3, 1] as const;

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease,
      }}
      className="border-b border-border/70"
    >
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-6 text-lg font-medium text-foreground transition-colors group-hover:text-primary md:text-xl">
          {item.entry.question}
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
          >
            <line x1="7" y1="0" x2="7" y2="14" />
            <line x1="0" y1="7" x2="14" y2="7" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">
              {item.entry.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq({ items }: { items: FaqItem[] }) {
  const sorted = [...items].sort(
    (a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0),
  );

  return (
    <section id="faq" className="bg-background py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — consistent style */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                FAQ
              </span>
            </motion.div>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-foreground md:text-5xl lg:text-6xl"
              >
                Veelgestelde vragen
              </TextReveal>
            </div>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease }}
              className="max-w-md text-lg leading-relaxed text-muted lg:ml-auto"
            >
              Alles wat je wilt weten over Website als Service
            </motion.p>
          </div>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-16 max-w-3xl">
          {sorted.map((item, i) => (
            <FaqAccordionItem key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
