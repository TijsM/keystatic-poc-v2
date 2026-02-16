'use client';

import { motion } from 'framer-motion';
import { NumberCounter } from './ui/number-counter';
import { FadeIn } from './ui/fade-in';

const ease = [0.16, 1, 0.3, 1] as const;

type StatItem = {
  value: string;
  suffix: string;
  label: string;
};

export function Stats({ items }: { items: readonly StatItem[] }) {
  return (
    <section className="border-y border-border/40 bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <div className="font-heading text-4xl text-foreground md:text-5xl">
                <NumberCounter
                  value={parseFloat(item.value)}
                  suffix={item.suffix}
                  decimals={item.value.includes('.') ? 1 : 0}
                />
              </div>
              <p className="mt-2 text-sm text-muted">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
