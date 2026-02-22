'use client';

import { motion } from 'framer-motion';
import { NumberCounter } from './ui/number-counter';

const ease = [0.16, 1, 0.3, 1] as const;

type StatItem = {
  value: string;
  suffix: string;
  label: string;
};

export function Stats({ items }: { items: readonly StatItem[] }) {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-background py-24 lg:py-28">
      {/* Subtle background gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group relative text-center"
            >
              {/* Decorative top dot */}
              <div className="mx-auto mb-4 h-1.5 w-1.5 rounded-full bg-warm" aria-hidden="true" />

              <div className="font-heading text-5xl text-foreground md:text-6xl">
                <NumberCounter
                  value={parseFloat(item.value)}
                  suffix={item.suffix}
                  decimals={item.value.includes('.') ? 1 : 0}
                />
              </div>
              <p className="mt-3 text-sm font-medium tracking-wide text-muted uppercase">
                {item.label}
              </p>

              {/* Vertical divider between items on desktop */}
              {i < items.length - 1 && (
                <div
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border/40 md:block"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
