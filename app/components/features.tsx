'use client';

import { motion } from 'framer-motion';
import { StaggerChildren, StaggerItem } from './ui/stagger-children';
import { FadeIn } from './ui/fade-in';

type Feature = {
  slug: string;
  entry: {
    title: string;
    description: string;
    icon: string;
    order: number | null;
  };
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-card p-8 shadow-sm"
    >
      <span className="text-4xl">{feature.entry.icon}</span>
      <h3 className="mt-4 font-heading text-xl text-foreground">
        {feature.entry.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {feature.entry.description}
      </p>
    </motion.div>
  );
}

export function Features({ features }: { features: Feature[] }) {
  const sorted = [...features].sort(
    (a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0),
  );

  return (
    <section id="voordelen" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h2 className="text-center font-heading text-4xl text-foreground md:text-5xl">
            Waarom Rodi Digital?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Alles wat je nodig hebt voor een succesvolle online aanwezigheid
          </p>
        </FadeIn>

        <StaggerChildren className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((feature) => (
            <StaggerItem key={feature.slug}>
              <FeatureCard feature={feature} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
