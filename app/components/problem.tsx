'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

const ease = [0.16, 1, 0.3, 1] as const;

const painPoints = [
  { number: '€5.000+', label: 'gemiddelde kosten website' },
  { number: '6-12', label: 'weken doorlooptijd' },
  { number: '2 jaar', label: 'voor het verouderd is' },
];

export function Problem({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-foreground py-32 lg:py-40">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(71,48,198,0.08),transparent_60%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary-bright uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
                Het probleem
              </span>
            </motion.div>

            <div className="mt-6">
              <TextReveal
                as="h2"
                className="font-heading text-4xl leading-snug text-background md:text-5xl lg:text-6xl lg:leading-snug"
                staggerSpeed={0.03}
              >
                {headline}
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease,
              }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-background/60"
            >
              {body}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="mt-8 h-px w-24 origin-left bg-primary-bright"
            />
          </div>

          {/* Right: pain point stats */}
          <div className="space-y-6 lg:pt-8">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.15,
                  ease,
                }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="font-heading text-3xl text-primary-bright md:text-4xl">
                  {point.number}
                </p>
                <p className="mt-1 text-sm text-background/50">
                  {point.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
