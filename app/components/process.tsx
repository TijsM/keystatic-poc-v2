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

const stepIcons = [
  // Chat/conversation icon
  <svg key="1" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>,
  // Design/pen tool icon
  <svg key="2" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
  // Rocket/launch icon
  <svg key="3" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>,
];

export function Process({ steps }: { steps: Step[] }) {
  const sorted = [...steps].sort(
    (a, b) => (a.entry.stepNumber ?? 0) - (b.entry.stepNumber ?? 0),
  );

  return (
    <section id="proces" className="relative overflow-hidden bg-background py-32 lg:py-40">
      {/* Subtle background texture */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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

        {/* Steps — cards with connector */}
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
              className="group relative"
            >
              {/* Connector line between cards */}
              {i < sorted.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-16 hidden h-px w-6 -translate-x-0 translate-y-0 bg-gradient-to-r from-border to-transparent lg:block" aria-hidden="true" style={{ right: '-24px' }} />
              )}

              <div className="card-elevated relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 md:p-10">
                {/* Large step number watermark */}
                <span className="absolute -right-4 -top-6 font-heading text-[8rem] leading-none text-primary/[0.04] select-none" aria-hidden="true">
                  {step.entry.stepNumber ?? i + 1}
                </span>

                <div className="relative z-10">
                  {/* Step icon + number */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      {stepIcons[i] || stepIcons[0]}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs font-bold text-muted">
                      {step.entry.stepNumber ?? i + 1}
                    </div>
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
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-warm/50 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
