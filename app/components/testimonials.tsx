'use client';

import { motion } from 'framer-motion';
import { TextReveal } from './ui/text-reveal';

type Testimonial = {
  slug: string;
  entry: {
    name: string;
    role: string;
    company: string;
    quote: string;
  };
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section aria-label="Klantervaringen" className="overflow-hidden bg-foreground py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header — consistent with other sections */}
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
                Ervaringen
              </span>
            </motion.div>
            <div className="mt-4">
              <TextReveal
                as="h2"
                className="font-heading text-4xl text-background md:text-5xl lg:text-6xl"
              >
                Wat onze klanten zeggen
              </TextReveal>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease,
              }}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 backdrop-blur-sm md:p-10"
            >
              <div>
                <svg className="h-8 w-8 text-primary/40" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="mt-6 text-lg leading-relaxed text-background/80">
                  {t.entry.quote}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  {t.entry.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-semibold text-background">
                    {t.entry.name}
                  </p>
                  <p className="text-sm text-background/50">
                    {t.entry.role}, {t.entry.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
