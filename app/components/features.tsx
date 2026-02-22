'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

type Feature = {
  slug: string;
  entry: {
    title: string;
    description: string;
    icon: string;
    order: number | null;
  };
};

const ease = [0.16, 1, 0.3, 1] as const;

/* Icon set for features */
const featureIcons: Record<string, React.ReactNode> = {
  design: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  default: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
};

export function Features({ features }: { features: Feature[] }) {
  const sorted = [...features].sort(
    (a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0),
  );
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="voordelen" className="relative overflow-hidden bg-primary-light py-32 lg:py-40">
      {/* Subtle dot grid */}
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      {/* Decorative ring */}
      <div className="decorative-ring pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px]" aria-hidden="true" />

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
                Voordelen
              </span>
            </motion.div>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-foreground md:text-5xl lg:text-6xl"
              >
                Alles inbegrepen. Geen verrassingen.
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
              Van ontwerp tot onderhoud — wij regelen alles zodat jij je kunt
              focussen op je vak.
            </motion.p>
          </div>
        </div>

        {/* Bento grid — mixed sizes */}
        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((feature, i) => {
            // First 2 cards span full width on their column, rest are standard
            const isLarge = i < 2;
            return (
              <motion.div
                key={feature.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease,
                }}
                className={`group ${isLarge && i === 0 ? 'lg:col-span-2' : ''}`}
              >
                <div className="card-elevated relative h-full overflow-hidden rounded-2xl bg-card p-8 transition-all duration-500 md:p-10">
                  {/* Decorative corner gradient */}
                  <div
                    className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-primary/[0.04] to-transparent transition-opacity duration-500 group-hover:from-primary/[0.08]"
                    aria-hidden="true"
                  />

                  {/* Icon + number */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20">
                      {featureIcons[feature.entry.icon] || featureIcons.default}
                    </div>
                    <span className="font-heading text-sm text-muted/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-border/40 transition-colors group-hover:bg-primary/20" />
                  </div>

                  <h3 className="mt-6 font-heading text-2xl text-foreground md:text-3xl">
                    {feature.entry.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">
                    {feature.entry.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-primary/30 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
