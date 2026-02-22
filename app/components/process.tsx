'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

type Step = {
  slug: string;
  entry: {
    title: string;
    description: string;
    stepNumber: number | null;
  };
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Process({ steps }: { steps: Step[] }) {
  const sorted = [...steps].sort(
    (a, b) => (a.entry.stepNumber ?? 0) - (b.entry.stepNumber ?? 0),
  );

  return (
    <section id="proces" className="bg-primary-light py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
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
                Het proces
              </span>
            </motion.div>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-foreground md:text-5xl lg:text-6xl"
              >
                In drie stappen online.
              </TextReveal>
            </div>
          </div>
          <div className="flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease }}
              className="max-w-md text-lg leading-relaxed text-foreground/60 lg:ml-auto"
            >
              Geen ingewikkeld traject. Wij maken het simpel — van eerste
              gesprek tot een live website.
            </motion.p>
          </div>
        </div>

        {/* Steps — large numbered cards */}
        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {sorted.map((step, i) => (
            <motion.div
              key={step.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease,
              }}
              className="group relative overflow-hidden rounded-2xl bg-card p-8 shadow-sm transition-all duration-500 hover:shadow-lg md:p-10"
            >
              {/* Large step number watermark */}
              <span className="absolute -right-4 -top-6 font-heading text-[8rem] leading-none text-foreground/[0.03] select-none">
                {step.entry.stepNumber ?? i + 1}
              </span>

              <div className="relative z-10">
                {/* Step number badge */}
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                    {step.entry.stepNumber ?? i + 1}
                  </span>
                  {i < sorted.length - 1 && (
                    <div className="hidden h-px flex-1 bg-border/60 lg:block" />
                  )}
                </div>

                <h3 className="mt-8 font-heading text-2xl text-foreground md:text-3xl">
                  {step.entry.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {step.entry.description}
                </p>
              </div>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
