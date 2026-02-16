'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
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

function FeatureCard({
  feature,
  index,
  large = false,
}: {
  feature: Feature;
  index: number;
  large?: boolean;
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [2, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={
        shouldReduceMotion
          ? undefined
          : { rotateX: rotate, scale, willChange: 'transform' }
      }
      className={`group relative overflow-hidden rounded-3xl bg-card p-8 transition-shadow duration-500 hover:shadow-xl md:p-10 ${
        large ? 'lg:col-span-2 lg:row-span-2 lg:p-14' : ''
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <motion.span
          className="inline-block text-4xl"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {feature.entry.icon}
        </motion.span>
        <h3
          className={`mt-5 font-heading text-foreground ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}
        >
          {feature.entry.title}
        </h3>
        <p
          className={`mt-3 leading-relaxed text-muted ${large ? 'max-w-md text-lg' : 'text-[15px]'}`}
        >
          {feature.entry.description}
        </p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full bg-primary"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: 0.3 + index * 0.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ originX: 0, willChange: 'transform' }}
      />
    </motion.div>
  );
}

export function Features({ features }: { features: Feature[] }) {
  const sorted = [...features].sort(
    (a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0),
  );

  return (
    <section id="voordelen" className="bg-background py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-widest text-primary uppercase"
          >
            Voordelen
          </motion.span>
          <div className="mt-4">
            <TextReveal
              as="h2"
              className="font-heading text-4xl text-foreground md:text-6xl"
            >
              Waarom Rodi Digital?
            </TextReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-lg text-muted"
          >
            Alles wat je nodig hebt voor een succesvolle online aanwezigheid
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {sorted.map((feature, i) => (
            <FeatureCard
              key={feature.slug}
              feature={feature}
              index={i}
              large={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
