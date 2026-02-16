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

export function Features({ features }: { features: Feature[] }) {
  const sorted = [...features].sort(
    (a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0),
  );
  const shouldReduceMotion = useReducedMotion();

  // Split into two columns for the staggered layout
  const left = sorted.filter((_, i) => i % 2 === 0);
  const right = sorted.filter((_, i) => i % 2 === 1);

  return (
    <section id="voordelen" className="bg-background py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — left-aligned */}
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
              className="max-w-md text-lg leading-relaxed text-muted lg:ml-auto"
            >
              Van ontwerp tot onderhoud — wij regelen alles zodat jij je kunt
              focussen op waar je goed in bent.
            </motion.p>
          </div>
        </div>

        {/* Feature grid — two columns with vertical offset */}
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            {left.map((feature, i) => (
              <FeatureCard
                key={feature.slug}
                feature={feature}
                index={i * 2}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
          {/* Right column — offset down */}
          <div className="space-y-6 md:mt-16">
            {right.map((feature, i) => (
              <FeatureCard
                key={feature.slug}
                feature={feature}
                index={i * 2 + 1}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  shouldReduceMotion,
}: {
  feature: Feature;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease,
      }}
      className="group relative rounded-2xl border border-border/60 bg-card p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg md:p-10"
    >
      {/* Number indicator */}
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-sm font-semibold text-primary">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="h-px flex-1 bg-border/60 transition-colors group-hover:bg-primary/20" />
      </div>

      <h3 className="mt-6 font-heading text-2xl text-foreground md:text-3xl">
        {feature.entry.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">
        {feature.entry.description}
      </p>
    </motion.div>
  );
}
